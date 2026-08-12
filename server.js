import "dotenv/config";
import path from "node:path";
import { fileURLToPath } from "node:url";
import express from "express";
import pg from "pg";

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

async function notifyTelegram({ name, phone, type, message }) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) {
    console.warn("Telegram notification skipped: TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID is not set");
    return;
  }

  const text = [
    "📩 Новая заявка с сайта",
    `Имя: ${name}`,
    `Телефон/Telegram: ${phone}`,
    `Тип объекта: ${PROJECT_TYPE_LABELS[type] ?? "—"}`,
    message ? `Сообщение: ${message}` : null,
  ]
    .filter(Boolean)
    .join("\n");

  const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text }),
  });

  if (!response.ok) {
    throw new Error(`Telegram API responded with ${response.status}`);
  }
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

  try {
    await notifyTelegram({ name: name.trim(), phone: phone.trim(), type: projectType, message: trimmedMessage });
  } catch (err) {
    console.error("Failed to send Telegram notification:", err);
  }

  res.status(201).json({ ok: true });
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
