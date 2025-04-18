"use client";

import Image from "next/image";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";

const Footer = () => {
  return (
    <footer className="bg-dark-3 text-white py-10 border-t border-white/10">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Logo and Description */}
          <div>
            <div className="mb-4">
              <Image
                src="/icons/logoipsum-custom-logo.svg"
                alt="FlashCard SaaS Logo"
                width={150}
                height={45}
              />
            </div>
            <p className="text-sm md:text-base text-white/70 max-w-xs">
              Your go-to platform for creating, managing, and studying
              flashcards. Learn faster, smarter, and better.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-3">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/generate"
                  className="text-sm md:text-base text-white/80 hover:underline"
                >
                  Generate Flashcards
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="text-sm md:text-base text-white/80 hover:underline"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="text-sm md:text-base text-white/80 hover:underline"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-3">Contact Us</h4>
            <p className="text-sm md:text-base text-white/70">
              Email: pranav.mahamunkar11@gmail.com
            </p>
            <p className="text-sm md:text-base text-white/70 mt-2">
              Phone: +1 (123) 456-7890
            </p>
          </div>
        </div>

        <Separator className="my-8 bg-white/20" />

        {/* Copyright */}
        <p className="text-center text-xs md:text-sm text-white/60">
          &copy; {new Date().getFullYear()} FlashLearn. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
