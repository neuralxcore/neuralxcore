import HeroSection from "@/components/HeroSection";

const services = [
  {
    title: "AI Product Development",
    description:
      "End-to-end development of AI-powered applications tailored to your needs.",
  },
  {
    title: "Machine Learning Solutions",
    description:
      "Predictive models, recommendation systems, and data-driven insights.",
  },
  {
    title: "Generative AI",
    description:
      "Custom chatbots, LLM-powered tools, and intelligent automation systems.",
  },
  {
    title: "AI Consulting",
    description:
      "Helping businesses identify, design, and implement AI strategies.",
  },
];

const reasons = [
  {
    title: "Research-driven approach",
    description:
      "We ground every build in solid research, ensuring decisions hold up in production.",
  },
  {
    title: "Scalable and production-ready systems",
    description:
      "Architecture and MLOps-minded delivery so your stack grows with demand.",
  },
  {
    title: "Fast prototyping and iteration",
    description:
      "Rapid experiments and tight feedback loops without sacrificing quality.",
  },
  {
    title: "Custom-built solutions",
    description:
      "No one-size templates: systems shaped around your data, constraints, and goals.",
  },
];

function Section({ id, eyebrow, title, children }) {
  return (
    <section id={id} className="scroll-mt-24">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-600">
        {eyebrow}
      </p>
      <h2 className="mt-3 text-2xl font-semibold tracking-tight text-zinc-900 sm:text-3xl">
        {title}
      </h2>
      <div className="mt-6">{children}</div>
    </section>
  );
}

export default function Home() {
  return (
    <main className="flex w-full flex-1 flex-col">
      <HeroSection />

      <div className="mx-auto w-full max-w-5xl flex-1 px-5 pb-14 sm:px-6 sm:pb-20">
        <div className="flex flex-col gap-20 py-16 sm:gap-24 sm:py-20">
          <Section id="about" eyebrow="About" title="Who We Are">
            <p className="max-w-3xl text-lg leading-relaxed text-zinc-600 text-pretty">
              Neuralxcore is an AI research and development startup focused on
              building practical, high-impact AI solutions. We combine deep
              research with strong engineering to deliver systems that work in
              the real world.
            </p>
          </Section>

          <Section id="services" eyebrow="Services" title="What We Do">
            <ul className="grid gap-4 sm:grid-cols-2" role="list">
              {services.map((item) => (
                <li
                  key={item.title}
                  className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm transition-colors hover:border-zinc-300"
                >
                  <h3 className="font-semibold text-zinc-900">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-600">
                    {item.description}
                  </p>
                </li>
              ))}
            </ul>
          </Section>

          <Section eyebrow="Why us" title="Why Neuralxcore">
            <ul className="grid gap-4 sm:grid-cols-2" role="list">
              {reasons.map((item) => (
                <li
                  key={item.title}
                  className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm"
                >
                  <h3 className="font-semibold text-zinc-900">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-600">
                    {item.description}
                  </p>
                </li>
              ))}
            </ul>
          </Section>
        </div>
      </div>
    </main>
  );
}
