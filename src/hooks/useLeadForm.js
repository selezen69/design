import { useState } from "react";

/**
 * Общая логика формы заявки — одинаковая механика во всех вариантах
 * прототипа (state, submit, статусы). Различается только вёрстка вокруг неё.
 */
export function useLeadForm(initialStatus = "idle") {
  const [form, setForm] = useState({ name: "", phone: "", type: "", message: "" });
  const [status, setStatus] = useState(initialStatus); // idle | sending | done | error

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!response.ok) throw new Error("request failed");
      setStatus("done");
    } catch {
      setStatus("error");
    }
  };

  return { form, status, handleChange, handleSubmit };
}
