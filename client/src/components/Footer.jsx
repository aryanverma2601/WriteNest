import React, { useState, useEffect } from "react";
import {
  Crown,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Heart,
  Zap,
  Star,
  Diamond,
  Sparkles,
  ArrowUp,
} from "lucide-react";

const Footer = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    const footerElement = document.getElementById("footer");
    if (footerElement) {
      observer.observe(footerElement);
    }

    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      if (footerElement) observer.unobserve(footerElement);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const socialLinks = [
    { icon: Twitter, name: "Twitter", color: "hover:text-blue-400" },
    { icon: Instagram, name: "Instagram", color: "hover:text-pink-400" },
    { icon: Linkedin, name: "LinkedIn", color: "hover:text-blue-500" },
    { icon: Mail, name: "Email", color: "hover:text-green-400" },
  ];

  const footerLinks = [
    {
      title: "Platform",
      links: ["Home", "Explore", "Create", "Premium"],
    },
    {
      title: "Community",
      links: ["Writers", "Readers", "Events", "Support"],
    },
    {
      title: "Resources",
      links: ["Help Center", "Guidelines", "API Docs", "Blog"],
    },
  ];

  return (
    <>
      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 z-50 w-14 h-14 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl shadow-2xl shadow-purple-500/25 text-white hover:shadow-purple-500/50 transform transition-all duration-500 ${
          showScrollTop
            ? "translate-y-0 opacity-100 scale-100"
            : "translate-y-16 opacity-0 scale-75"
        } hover:scale-110 hover:-translate-y-1`}
      >
        <ArrowUp className="w-6 h-6 mx-auto" />
        <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 rounded-2xl transform -translate-x-full hover:translate-x-full transition-transform duration-1000"></div>
      </button>

      <footer id="footer" className="relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/20 to-black/50">
          <div className="absolute inset-0">
            <div className="absolute top-0 left-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse animation-delay-4000"></div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="relative z-10 backdrop-blur-xl bg-gradient-to-b from-black/20 via-purple-900/30 to-black/50 border-t border-white/10">
          <div className="max-w-7xl mx-auto px-6 py-16">
            {/* Top Section */}
            <div
              className={`text-center mb-16 transition-all duration-1000 ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
            >
              <div className="flex items-center justify-center mb-6">
                <div className="relative group">
                  <div className="w-20 h-20 bg-gradient-to-br from-purple-400 via-pink-500 to-orange-400 rounded-3xl flex items-center justify-center shadow-2xl shadow-purple-500/25 group-hover:shadow-purple-500/50 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3">
                    <Crown className="w-10 h-10 text-white group-hover:text-yellow-300 transition-colors duration-300" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center animate-bounce">
                    <Diamond className="w-3 h-3 text-white" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-400 via-pink-500 to-orange-400 rounded-3xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-500 -z-10"></div>
                </div>
              </div>

              <h3 className="text-4xl font-bold mb-4">
                <span className="bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
                  BlogLux
                </span>
              </h3>
              <p className="text-xl text-purple-200 mb-8 max-w-2xl mx-auto leading-relaxed">
                Where premium content meets extraordinary experiences. Elevate
                your blogging journey with AI-powered creativity.
              </p>

              {/* Social Links */}
              <div className="flex items-center justify-center space-x-6">
                {socialLinks.map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <button
                      key={social.name}
                      className={`group w-14 h-14 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 hover:border-white/40 text-purple-200 ${social.color} transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 shadow-lg hover:shadow-xl`}
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <Icon className="w-6 h-6 mx-auto group-hover:scale-110 transition-transform duration-300" />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Links Section */}
            <div
              className={`grid md:grid-cols-4 gap-8 mb-16 transition-all duration-1000 delay-300 ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
            >
              {footerLinks.map((section, index) => (
                <div
                  key={section.title}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <h4 className="text-lg font-semibold text-white mb-6 flex items-center">
                    <Sparkles className="w-4 h-4 text-purple-400 mr-2" />
                    {section.title}
                  </h4>
                  <ul className="space-y-3">
                    {section.links.map((link, linkIndex) => (
                      <li key={link}>
                        <button className="text-purple-200 hover:text-white transition-colors duration-300 hover:translate-x-1 transform text-left">
                          {link}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              {/* Newsletter Signup */}
              <div>
                <h4 className="text-lg font-semibold text-white mb-6 flex items-center">
                  <Star className="w-4 h-4 text-yellow-400 mr-2" />
                  Stay Updated
                </h4>
                <p className="text-purple-200 text-sm mb-4 leading-relaxed">
                  Get the latest premium content and platform updates.
                </p>
                <div className="space-y-3">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-400/50 focus:border-purple-400/50 transition-all duration-300"
                  />
                  <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 px-4 py-3 rounded-xl text-white font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2">
                    <Zap className="w-4 h-4" />
                    <span>Subscribe</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Bottom Section */}
            <div
              className={`border-t border-white/10 pt-8 transition-all duration-1000 delay-500 ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
            >
              <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
                <div className="flex items-center space-x-2 text-purple-200">
                  <span>Made with</span>
                  <Heart className="w-4 h-4 text-red-400 animate-pulse" />
                  <span>by the BlogLux team</span>
                </div>

                <div className="flex items-center space-x-6 text-sm text-purple-300">
                  <button className="hover:text-white transition-colors duration-300">
                    Privacy Policy
                  </button>
                  <button className="hover:text-white transition-colors duration-300">
                    Terms of Service
                  </button>
                  <button className="hover:text-white transition-colors duration-300">
                    Cookie Policy
                  </button>
                </div>

                <div className="text-purple-300 text-sm">
                  © 2024 BlogLux. Premium Edition.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500"></div>
      </footer>
    </>
  );
};

export default Footer;
