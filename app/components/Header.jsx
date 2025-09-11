"use client";
import { useState } from "react";
import Link from "next/link";
import { Bell, ShoppingCart, User, Search, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { label: "Events", href: "/events" },
  { label: "Participate", href: "/participate" },
  { label: "Vote", href: "/vote" },
  { label: "Gallery", href: "/gallery" },
  { label: "Sponsorship", href: "/sponsorship" },
  { label: "Market Place", href: "/marketplace" },
  { label: "Support", href: "/support" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="w-full bg-white shadow-md fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
        
        {/* Logo */}
        <div className="text-2xl font-bold text-green-600">Logo</div>

        {/* Desktop Nav */}
        <div className="hidden md:flex space-x-6 items-center text-black">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-green-600">
              {item.label}
            </Link>
          ))}
          <Search className="w-5 h-5 cursor-pointer hover:text-green-600 text-black" />
        </div>

        {/* Right Icons */}
        <div className="flex space-x-4 items-center text-black">
          <Bell className="w-5 h-5 cursor-pointer hover:text-green-600" />
          <ShoppingCart className="w-5 h-5 cursor-pointer hover:text-green-600" />
          <User className="w-5 h-5 cursor-pointer hover:text-green-600" />

          {/* Mobile Hamburger */}
          <button
            className="md:hidden focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer + Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black z-40"
              onClick={() => setIsOpen(false)}
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed top-0 right-0 w-3/4 max-w-sm h-full bg-white shadow-lg z-50 p-8"
            >
              {/* Drawer Header */}
              <div className="flex justify-between items-center mb-8">
                <X
                  className="w-6 h-6 cursor-pointer"
                  onClick={() => setIsOpen(false)}
                />
              </div>

              {/* Nav Links */}
              <div className="flex flex-col space-y-6 text-black">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-lg font-semibold hover:text-green-600"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}

                {/* Search Icon */}
                <div className="mt-6">
                  <Search className="w-6 h-6 cursor-pointer hover:text-green-600" />
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}
