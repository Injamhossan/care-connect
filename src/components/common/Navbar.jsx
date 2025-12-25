"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { FiUser } from "react-icons/fi";
import NavLogo from "../../assets/care-01.png";
import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";

import { useSession, signOut } from "next-auth/react";

const Navbar = () => {
  const { data: session } = useSession();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const links = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  const navOptions = (
    <>
      {links.map((link) => (
        <li key={link.href}>
          <Link
            href={link.href}
            onClick={() => setIsMobileMenuOpen(false)}
            className={`font-medium transition-colors ${
              pathname === link.href
                ? "text-[#389482] font-bold"
                : "text-gray-600 hover:text-[#389482]"
            }`}
          >
            {pathname === link.href && (
              <motion.span
                layoutId="underline"
                className="absolute left-0 top-full block h-0.5 w-full bg-[#389482]"
              />
            )}
            {link.name}
          </Link>
        </li>
      ))}
    </>
  );

  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="sticky top-0 z-50 w-full bg-white/80 border-b border-gray-100 shadow-sm backdrop-blur-xl whitespace-nowrap rounded-3xl max-w-7xl mx-auto"
    >
      <div className="relative px-4 mx-auto navbar sm:px-6 lg:px-8 max-w-7xl">
        
        {/* Mobile Menu Dropdown (Absolute Positioning) */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.ul
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute left-0 right-0 p-2 mx-4 mt-2 bg-white border border-gray-100 shadow-xl menu menu-sm dropdown-content z-[200] rounded-2xl top-full"
            >
              {navOptions}
              
              <div className="divider my-1"></div>
              
              {session ? (
                  <>
                    <li>
                        <Link href="/dashboard" onClick={() => setIsMobileMenuOpen(false)} className="py-3 font-medium text-gray-700 hover:text-[#389482]">
                            Dashboard
                        </Link>
                    </li>
                    <li>
                        <button 
                            onClick={() => {
                                setIsMobileMenuOpen(false);
                                signOut({ callbackUrl: "/" });
                            }} 
                            className="py-3 font-medium text-red-500 hover:text-red-600"
                        >
                            Logout
                        </button>
                    </li>
                  </>
              ) : (
                  <>
                    <li>
                        <Link href="/login" onClick={() => setIsMobileMenuOpen(false)} className="py-3 font-medium text-gray-700 hover:text-[#389482]">
                            Login
                        </Link>
                    </li>
                     <li>
                        <Link href="/register" onClick={() => setIsMobileMenuOpen(false)} className="py-3 font-medium text-[#389482]">
                            Create Account
                        </Link>
                    </li>
                  </>
              )}
            </motion.ul>
          )}
        </AnimatePresence>

        {/* Navbar Start: Hamburger (Mobile) & Logo (Desktop) */}
        <div className="navbar-start">
            {/* Mobile Toggle */}
            <button 
              className="pl-0 btn btn-ghost lg:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
              </svg>
            </button>

            {/* Desktop Logo */}
            <Link href="/" className="hidden gap-2 text-xl font-bold lg:flex items-center">
                <motion.div whileHover={{ rotate: 10 }} transition={{ type: "spring", stiffness: 300 }}>
                    <Image src={NavLogo} alt="CareConnect Logo" width={40} weight={40} priority className="object-contain" />
                </motion.div>
                <span className="text-[#1f242e]">Care<span className="text-[#389482]">Connect</span></span>
            </Link>
        </div>

        {/* Navbar Center: Logo (Mobile) & Links (Desktop) */}
        <div className="navbar-center">
             {/* Mobile Logo */}
             <Link href="/" className="flex items-center gap-2 text-xl font-bold lg:hidden">
                <motion.div whileHover={{ rotate: 10 }} transition={{ type: "spring", stiffness: 300 }}>
                    <Image src={NavLogo} alt="CareConnect Logo" width={40} height={40} priority className="object-contain" />
                </motion.div>
                <span className="text-[#1f242e]">Care<span className="text-[#389482]">Connect</span></span>
            </Link>

            {/* Desktop Menu Links */}
            <ul className="hidden px-1 text-base gap-8 menu menu-horizontal lg:flex">
                {links.map((link) => (
                    <li key={link.href} className="relative">
                    <Link
                        href={link.href}
                        className={`font-medium transition-colors relative py-2 ${
                        pathname === link.href
                            ? "text-[#389482] font-bold"
                            : "text-gray-600 hover:text-[#389482] rounded-4xl"
                        }`}
                    >
                        {link.name}
                        {pathname === link.href && (
                            <motion.span
                                layoutId="underline"
                                className="absolute left-0 bottom-0 block h-0.5 w-full bg-[#389482]"
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            />
                        )}
                    </Link>
                    </li>
                ))}
            </ul>
        </div>

        {/* Navbar End: Auth Buttons */}
        <div className="navbar-end gap-4 flex items-center">
            {session ? (
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full border border-gray-200 ring ring-[#389482] ring-offset-base-100 ring-offset-2">
                  {session.user?.image ? (
                    <Image src={session.user.image} alt={session.user.name || "User"} width={40} height={40} />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-[#389482] text-white text-lg font-bold">
                      {session.user?.name?.charAt(0).toUpperCase() || "U"}
                    </div>
                  )}
                </div>
              </label>
              <ul tabIndex={0} className="p-2 mt-3 bg-white border border-gray-100 shadow-lg z-1 menu menu-sm dropdown-content rounded-box w-60">
                <li className="px-4 py-3 border-b border-gray-100 cursor-default hover:bg-transparent">
                  <div className="flex flex-col gap-1">
                    <p className="font-bold text-gray-800 truncate">{session.user?.name || "User"}</p>
                    <p className="text-xs text-gray-500 truncate">{session.user?.email}</p>
                  </div>
                </li>
                <li>
                  <Link href="/dashboard" className="flex items-center gap-2 text-gray-700 hover:bg-gray-50 hover:text-[#389482]">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                    </svg>
                    Dashboard
                  </Link>
                </li>
                <li>
                  <button onClick={() => signOut({ callbackUrl: "/" })} className="flex items-center gap-2 text-red-500 hover:bg-red-50 hover:text-red-600">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <>
              <Link
                href="/login"
                className="flex items-center gap-2 font-semibold text-gray-700 transition-colors rounded-full px-6 capitalize hover:text-white hover:bg-[#2f7f70] border-none shadow-[#389482]/20 min-h-11 h-11 whitespace-nowrap"
              >
                <FiUser size={18} />
                Login
              </Link>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href="/register"
                  className="btn rounded-full px-6 capitalize text-white bg-[#389482] hover:bg-[#2f7f70] border-none shadow-md shadow-[#389482]/20 min-h-11 h-11 whitespace-nowrap"
                >
                  Get Started
                </Link>
              </motion.div>
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Navbar;
