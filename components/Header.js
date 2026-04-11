"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const desktopLinkClass = "text-sm font-semibold text-zinc-900 transition-colors";
const desktopInactiveClass = "hover:text-[#2299D4]";
const desktopActiveClass = "text-[#2299D4]";
const mobileLinkClass =
  "-mx-3 block rounded-lg px-3 py-2 text-base font-semibold text-zinc-900 transition-colors hover:bg-[#2299D4] hover:text-white";

export default function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isHome = pathname === "/";
  const isContact = pathname === "/contact";
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="absolute inset-x-0 top-0 z-50 bg-white/90 backdrop-blur-sm">
      <nav
        aria-label="Global"
        className="mx-auto flex max-w-5xl items-center justify-between p-6 lg:px-8"
      >
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5" onClick={closeMenu}>
            <span className="sr-only">Neuralxcore</span>
            <Image
              src="/neuralxcore-logo.png"
              alt=""
              width={140}
              height={36}
              className="h-8 w-auto"
              priority
            />
          </Link>
        </div>

        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setIsMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-zinc-700 transition-colors hover:bg-[#2299D4] hover:text-white"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              aria-hidden="true"
              className="size-6"
            >
              <path
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-10">
          <Link
            href="/"
            className={`${desktopLinkClass} ${isHome ? desktopActiveClass : desktopInactiveClass}`}
          >
            Home
          </Link>
          <Link
            href="/contact"
            className={`${desktopLinkClass} ${isContact ? desktopActiveClass : desktopInactiveClass}`}
          >
            Contact Us
          </Link>
        </div>
      </nav>

      {isMenuOpen && (
        <div className="lg:hidden" role="dialog" aria-modal="true">
          <div className="fixed inset-0 bg-zinc-900/20" onClick={closeMenu} />
          <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white p-6 sm:max-w-sm sm:ring-1 sm:ring-zinc-900/10">
            <div className="flex items-center justify-between">
              <Link href="/" className="-m-1.5 p-1.5" onClick={closeMenu}>
                <span className="sr-only">Neuralxcore</span>
                <Image
                  src="/neuralxcore-logo.png"
                  alt=""
                  width={140}
                  height={36}
                  className="h-8 w-auto"
                />
              </Link>
              <button
                type="button"
                onClick={closeMenu}
                className="-m-2.5 rounded-md p-2.5 text-zinc-700 transition-colors hover:bg-[#2299D4] hover:text-white"
              >
                <span className="sr-only">Close menu</span>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  aria-hidden="true"
                  className="size-6"
                >
                  <path
                    d="M6 18 18 6M6 6l12 12"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-zinc-500/10">
                <div className="space-y-2 py-6">
                  <Link href="/" className={mobileLinkClass} onClick={closeMenu}>
                    Home
                  </Link>
                  <Link href="/#services" className={mobileLinkClass} onClick={closeMenu}>
                    Services
                  </Link>
                  <Link href="/contact" className={mobileLinkClass} onClick={closeMenu}>
                    Contact Us
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
