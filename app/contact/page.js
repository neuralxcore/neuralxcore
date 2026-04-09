import ContactForm from "@/components/ContactForm";

export const metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Neuralxcore about AI product development, ML solutions, and consulting.",
};

export default function ContactPage() {
  return (
    <main className="mx-auto w-full max-w-5xl flex-1 px-5 pt-24 pb-14 sm:px-6 sm:pt-28 sm:pb-20">
      <div className="mx-auto max-w-lg">
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 sm:text-4xl">
          Contact Us
        </h1>
        <p className="mt-3 leading-relaxed text-zinc-600">
          Tell us about your project or question. We will respond as soon as we
          can.
        </p>
        <div className="mt-10 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8">
          <ContactForm />
        </div>
      </div>
    </main>
  );
}
