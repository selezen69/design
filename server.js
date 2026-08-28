import "dotenv/config";
import path from "node:path";
import { fileURLToPath } from "node:url";
import express from "express";
import pg from "pg";
import nodemailer from "nodemailer";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  // Управляемые базы данных (в т.ч. Timeweb Cloud) обычно требуют TLS.
  // Локальный PostgreSQL обычно его не поддерживает, поэтому включается явно через PGSSL=true.
  ssl: process.env.PGSSL === "true" ? { rejectUnauthorized: false } : undefined,
});
pool.on("error", (err) => {
  console.error("Unexpected PostgreSQL pool error:", err);
});

const PROJECT_TYPES = new Set(["apartment", "house", "other"]);
const PROJECT_TYPE_LABELS = {
  apartment: "Квартира",
  house: "Загородный дом",
  other: "Другое",
};

const mailTransporter = process.env.EMAIL_USER
  ? nodemailer.createTransport({
      host: process.env.EMAIL_HOST || "smtp.mail.ru",
      port: Number(process.env.EMAIL_PORT) || 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    })
  : null;

async function notifyEmail({ name, phone, type, message }) {
  if (!mailTransporter) {
    console.warn("Email notification skipped: EMAIL_USER is not set");
    return;
  }

  const text = [
    "Новая заявка с сайта",
    `Имя: ${name}`,
    `Телефон/Telegram: ${phone}`,
    `Тип объекта: ${PROJECT_TYPE_LABELS[type] ?? "—"}`,
    message ? `Сообщение: ${message}` : null,
  ]
    .filter(Boolean)
    .join("\n");

  await mailTransporter.sendMail({
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_TO || process.env.EMAIL_USER,
    subject: "Новая заявка с сайта",
    text,
  });
}

const app = express();
app.use(express.json());

app.post("/api/leads", async (req, res) => {
  const { name, phone, type, message } = req.body ?? {};

  if (typeof name !== "string" || !name.trim() || typeof phone !== "string" || !phone.trim()) {
    return res.status(400).json({ error: "name and phone are required" });
  }

  const projectType = PROJECT_TYPES.has(type) ? type : null;
  const trimmedMessage = typeof message === "string" && message.trim() ? message.trim() : null;

  try {
    await pool.query(
      `INSERT INTO leads (name, contact, project_type, message) VALUES ($1, $2, $3, $4)`,
      [name.trim(), phone.trim(), projectType, trimmedMessage]
    );
  } catch (err) {
    console.error("Failed to save lead:", err);
    return res.status(500).json({ error: "Failed to save lead" });
  }

  res.status(201).json({ ok: true });

  notifyEmail({ name: name.trim(), phone: phone.trim(), type: projectType, message: trimmedMessage }).catch(
    (err) => console.error("Failed to send email notification:", err)
  );
});

const distPath = path.join(__dirname, "dist");
app.use(express.static(distPath));

app.use((req, res, next) => {
  if (req.method !== "GET" || req.path.startsWith("/api/")) return next();
  res.sendFile(path.join(distPath, "index.html"));
});

app.use((req, res) => res.status(404).json({ error: "Not found" }));

const port = Number(process.env.PORT) || 3000;
app.listen(port, "0.0.0.0", () => {
  console.log(`Server listening on port ${port}`);
});
