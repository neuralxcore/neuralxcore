import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-zinc-200 bg-white">
      <div className="mx-auto flex max-w-5xl flex-col gap-6 px-5 py-12 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p className="max-w-md text-sm italic leading-relaxed text-zinc-600">
          Turning AI research into real-world impact
        </p>
        <div className="flex flex-wrap gap-4 text-sm text-zinc-500">
          <Link href="/" className="hover:text-zinc-800">
            Home
          </Link>
          <Link href="/contact" className="hover:text-zinc-800">
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
}
