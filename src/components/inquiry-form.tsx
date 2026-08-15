"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Send, CheckCircle2, AlertCircle } from "lucide-react";

const topics = ["Pendaftaran", "Kerjasama Sekolah", "Bantuan Teknis", "Lainnya"];

export default function InquiryForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    topic: topics[0],
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("http://localhost:3001/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error("Gagal mengirim pesan");
      setStatus("success");
      setFormData({ name: "", email: "", topic: topics[0], message: "" });
    } catch {
      setStatus("error");
    }
  };

  // Success screen after sending
  if (status === "success") {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl bg-card p-10 text-center text-foreground shadow-lg">
        <CheckCircle2 className="h-12 w-12 text-success" />
        <h3 className="mt-4 font-heading text-xl font-bold">Pesan Terkirim!</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Terima kasih! Tim kami akan membalas dalam 1×24 jam kerja.
        </p>
        <Button
          variant="outline"
          className="mt-6 rounded-full"
          onClick={() => setStatus("idle")}
        >
          Kirim pesan lain
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 rounded-xl bg-card p-6 text-foreground shadow-lg md:p-8"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-sm font-bold font-heading">Nama</label>
          <input
            name="name"
            type="text"
            required
            placeholder="Budi Santoso"
            value={formData.name}
            onChange={handleChange}
            className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-bold font-heading">Email</label>
          <input
            name="email"
            type="email"
            required
            placeholder="nama@email.com"
            value={formData.email}
            onChange={handleChange}
            className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-bold font-heading">Topik</label>
        <select
          name="topic"
          value={formData.topic}
          onChange={handleChange}
          className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
        >
          {topics.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-bold font-heading">Pesan</label>
        <textarea
          name="message"
          required
          rows={4}
          placeholder="Tulis pertanyaan atau masukanmu di sini..."
          value={formData.message}
          onChange={handleChange}
          className="w-full resize-none rounded-lg border border-border bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
        />
      </div>

      {status === "error" && (
        <div className="flex items-center gap-2 rounded-lg bg-red-500/10 p-3 text-sm font-medium text-red-600">
          <AlertCircle className="h-4 w-4" />
          Gagal mengirim pesan. Silakan coba lagi.
        </div>
      )}

      <Button
        type="submit"
        className="w-full rounded-full font-heading"
        isLoading={status === "loading"}
        disabled={status === "loading"}
      >
        {status === "loading" ? "Mengirim..." : "Kirim Pesan"}
        <Send className="ml-2 h-4 w-4" />
      </Button>
    </form>
  );
}