"use client";

import { useState } from "react";

export default function ContactForm() {
  const [status, setStatus] = useState("idle");

  function handleSubmit(e) {
    e.preventDefault();
    setStatus("sent");
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
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-6"
      noValidate
    >
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
        className="rounded-full bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-indigo-500"
      >
        Send message
      </button>
    </form>
  );
}
