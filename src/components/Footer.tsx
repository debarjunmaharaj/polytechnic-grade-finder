
import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Send, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-bteb-primary text-white">
      <div className="container mx-auto py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-6">
              <Link to="/" className="hover:underline">Individual Results</Link>
              <Link to="/group-results" className="hover:underline">Group Results</Link>
              <Link to="/institute-results" className="hover:underline">Institute Results</Link>
            </div>
            <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-6">
              <Link to="/latest-results" className="hover:underline">Latest Results</Link>
              <Link to="/point-results" className="hover:underline">Point Results</Link>
              <Link to="/favorites" className="hover:underline">Favorites</Link>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-6">
              <Link to="/about" className="hover:underline">About Us</Link>
              <Link to="/contact" className="hover:underline">Contact Us</Link>
              <a href="#" className="hover:underline">Join Us On Telegram</a>
            </div>
            <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-6">
              <Link to="/privacy-policy" className="hover:underline">Privacy Policy</Link>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-4 border-t border-gray-700">
          <div className="flex justify-between items-center flex-col md:flex-row">
            <div className="flex space-x-4 mb-4 md:mb-0">
              <a href="#" aria-label="Facebook" className="hover:text-bteb-accent">
                <Facebook size={20} />
              </a>
              <a href="#" aria-label="Telegram" className="hover:text-bteb-accent">
                <Send size={20} />
              </a>
              <a href="#" aria-label="Email" className="hover:text-bteb-accent">
                <Mail size={20} />
              </a>
            </div>
            <div className="text-sm text-gray-300">
              ©2021-2024 "BTEB Results Zone" All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
