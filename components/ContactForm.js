"use client";

import { useState } from "react";

const WEB3FORMS_URL = "https://api.web3forms.com/submit";
const WEB3FORMS_ACCESS_KEY =
  process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY ||
  "376945c8-64a9-4c5e-832d-859b8d4b4010";

export default function ContactForm() {
  const [status, setStatus] = useState("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    setErrorMessage("");
    setStatus("sending");
    const form = event.currentTarget;
    const formData = new FormData(form);
    formData.append("access_key", WEB3FORMS_ACCESS_KEY);

    try {
      const response = await fetch(WEB3FORMS_URL, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setStatus("sent");
        form.reset();
      } else {
        setStatus("idle");
        setErrorMessage(
          typeof data.message === "string"
            ? data.message
            : "Something went wrong. Please try again.",
        );
      }
    } catch {
      setStatus("idle");
      setErrorMessage("Network error. Please try again.");
    }
  }

  if (status === "sent") {
    return (
      <div
        className="rounded-xl border border-indigo-200 bg-indigo-50/80 px-6 py-8 text-center"
        role="status"
      >
        <p className="text-lg font-medium text-zinc-900">Thank you</p>
        <p className="mt-2 text-sm text-zinc-600">
          We received your message and will get back to you soon.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <label htmlFor="name" className="text-sm font-medium text-zinc-700">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          autoComplete="name"
          className="rounded-lg border border-zinc-300 bg-white px-4 py-3 text-zinc-900 outline-none ring-indigo-500/25 transition-[border-color,box-shadow] placeholder:text-zinc-400 focus:border-indigo-500 focus:ring-2"
          placeholder="Your name"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="text-sm font-medium text-zinc-700">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className="rounded-lg border border-zinc-300 bg-white px-4 py-3 text-zinc-900 outline-none ring-indigo-500/25 transition-[border-color,box-shadow] placeholder:text-zinc-400 focus:border-indigo-500 focus:ring-2"
          placeholder="you@example.com"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="message" className="text-sm font-medium text-zinc-700">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className="resize-y rounded-lg border border-zinc-300 bg-white px-4 py-3 text-zinc-900 outline-none ring-indigo-500/25 transition-[border-color,box-shadow] placeholder:text-zinc-400 focus:border-indigo-500 focus:ring-2"
          placeholder="How can we help?"
        />
      </div>
      <button
        type="submit"
        disabled={status === "sending"}
        className="rounded-full bg-[#2299D4] px-6 py-3 text-sm font-semibold text-white transition-[filter,colors] hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "sending" ? "Sending…" : "Send message"}
      </button>
      {errorMessage ? (
        <p className="text-sm text-red-600" role="alert">
          {errorMessage}
        </p>
      ) : null}
    </form>
  );
}
