"use client";
import Link from "next/link";
import { Bell, ShoppingCart, User, Search } from "lucide-react";

export default function Header() {
  return (
    <nav className="w-full bg-white shadow-md fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
        
        {/* Logo */}
        <div className="text-2xl font-bold text-green-600">Logo</div>

        {/* Center Links */}
        <div className="hidden md:flex space-x-6 items-center">
          <Link href="/events" className="hover:text-green-600">Events</Link>
          <Link href="/participate" className="hover:text-green-600">Participate</Link>
          <Link href="/vote" className="hover:text-green-600">Vote</Link>
          <Link href="/gallery" className="hover:text-green-600">Gallery</Link>
          <Link href="/sponsorship" className="hover:text-green-600">Sponsorship</Link>
          <Link href="/marketplace" className="hover:text-green-600">Market Place</Link>
          <Link href="/support" className="hover:text-green-600">Support</Link>
          <Search className="w-5 h-5 cursor-pointer hover:text-green-600" />
        </div>

        {/* Right Icons */}
        <div className="flex space-x-4 items-center">
          <Bell className="w-5 h-5 cursor-pointer hover:text-green-600" />
          <ShoppingCart className="w-5 h-5 cursor-pointer hover:text-green-600" />
          <User className="w-5 h-5 cursor-pointer hover:text-green-600" />
        </div>
      </div>
    </nav>
  );
}
