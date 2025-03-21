"use client";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";


export default function Navbar() {
  const [RWDisOpen, setRWDisOpen] = useState(false);
  const pathname = usePathname();

  if (pathname.startsWith('/admin')) {
    return null;
  }

  return (
    <nav className="bg-blue-500 shadow-lg">
      <div className="mx-auto px-4">
        <div className="flex justify-between items-center w-full h-16">
          <div className="flex-shrink-0 flex justify-center">
            <Link href="/" className="text-xl font-bold text-white">
              電影系統
            </Link>
          </div>
          <div className="flex justify-between md:justify-center md:w-full space-x-7 text-white">
            {/* Cinema Name */}

            {/* Web Navber */}
            <div className="hidden md:flex space-x-10">
              <Link
                href="/about"
                className="flex items-center hover:text-gray-300 px-2 px-2 transition-colors duration-300"
              >
                影城介紹
              </Link>
              <Link
                href="/movies"
                className="flex items-center hover:text-gray-300 px-4 px-2 transition-colors duration-300"
              >
                電影訂票
              </Link>
              <Link
                href="/activity"
                className="flex items-center hover:text-gray-300 px-4 px-2 transition-colors duration-300"
              >
                活動公告
              </Link>
              <Link
                href="/member"
                className="flex items-center hover:text-gray-300 px-4 px-2 transition-colors duration-300"
              >
                會員專區
              </Link>
            </div>

            {/* Mobile Navber */}
            <div className="flex md:hidden right-0">
              <button
                onClick={() => setRWDisOpen(!RWDisOpen)}
                className="text-gray-600 hover:text-gray-900"
              >
                <svg
                  className="h-6 w-6 text-white"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {RWDisOpen ? (
                    <path d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
            {RWDisOpen && (
              <div
                className={`
            fixed top-16 right-0 
            w-64 h-screen 
            bg-blue-800 
            transform transition-transform duration-200
            ${RWDisOpen ? "translate-x-0 opacity-100" : "translate-x-full"}
            md:hidden
            z-50
          `}
              >
                <div className="flex flex-col p-4 space-y-4">
                  <Link
                    href="/about"
                    className="hover:text-gray-300 transition-colors"
                    onClick={() => setRWDisOpen(false)}
                  >
                    影城介紹
                  </Link>
                  <Link
                    href="/movies"
                    className="hover:text-gray-300 transition-colors"
                    onClick={() => setRWDisOpen(false)}
                  >
                    電影訂票
                  </Link>
                  <Link
                    href="/activity"
                    className="hover:text-gray-300 transition-colors"
                    onClick={() => setRWDisOpen(false)}
                  >
                    活動公告
                  </Link>
                  <Link
                    href="/member"
                    className="hover:text-gray-300 transition-colors"
                    onClick={() => setRWDisOpen(false)}
                  >
                    會員專區
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
