import React, { useState, useEffect } from "react";
import {
  Plus,
  Search,
  Menu,
  X,
  Crown,
  Sparkles,
  Star,
  Diamond,
} from "lucide-react";

const Header = ({ navigateToPage, currentPage }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Home", page: "home", icon: Star },
    { name: "Explore", page: "home", icon: Search },
    { name: "Create", page: "editor", icon: Plus },
  ];

  return (
    <>
      {/* Floating Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
          isLoaded ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
        }`}
      >
        <div
          className={`mx-4 mt-4 rounded-3xl transition-all duration-500 ${
            isScrolled
              ? "backdrop-blur-2xl bg-gradient-to-r from-black/40 via-purple-900/30 to-black/40 border border-white/20 shadow-2xl shadow-purple-500/20"
              : "backdrop-blur-xl bg-white/5 border border-white/10"
          }`}
        >
          <nav className="px-6 py-4">
            <div className="flex items-center justify-between">
              {/* Logo Section */}
              <div
                className="flex items-center space-x-4 group cursor-pointer"
                onClick={() => navigateToPage("home")}
              >
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-400 via-pink-500 to-orange-400 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/25 group-hover:shadow-purple-500/50 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3">
                    <Crown className="w-6 h-6 text-white group-hover:text-yellow-300 transition-colors duration-300" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center animate-pulse">
                    <Diamond className="w-2 h-2 text-white" />
                  </div>
                </div>
                <div className="hidden sm:block">
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent group-hover:from-purple-200 group-hover:via-pink-200 group-hover:to-orange-200 transition-all duration-500">
                    BlogLux
                  </h1>
                  <p className="text-xs text-purple-300 -mt-1 group-hover:text-purple-200 transition-colors duration-300">
                    Premium Edition
                  </p>
                </div>
              </div>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-2">
                {navItems.map((item, index) => {
                  const Icon = item.icon;
                  const isActive = currentPage === item.page;
                  return (
                    <button
                      key={item.name}
                      onClick={() => navigateToPage(item.page)}
                      className={`group relative px-6 py-3 rounded-2xl font-medium transition-all duration-500 transform hover:scale-105 ${
                        isActive
                          ? "bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white shadow-lg shadow-purple-500/30"
                          : "text-purple-200 hover:text-white hover:bg-white/10 border border-transparent hover:border-white/20"
                      }`}
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="flex items-center space-x-2">
                        <Icon
                          className={`w-4 h-4 transition-all duration-300 ${
                            isActive
                              ? "text-white"
                              : "text-purple-300 group-hover:text-white"
                          }`}
                        />
                        <span>{item.name}</span>
                      </div>
                      {isActive && (
                        <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Premium CTA Button */}
              <div className="hidden md:flex items-center space-x-4">
                <button
                  onClick={() => navigateToPage("editor")}
                  className="group relative bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 hover:from-purple-500 hover:via-pink-500 hover:to-orange-500 px-8 py-3 rounded-2xl text-white font-semibold shadow-lg shadow-purple-500/25 hover:shadow-purple-500/50 transform hover:scale-105 transition-all duration-500 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  <div className="relative flex items-center space-x-2">
                    <Sparkles className="w-5 h-5 group-hover:rotate-12 group-hover:scale-110 transition-transform duration-300" />
                    <span>Create Magic</span>
                  </div>
                </button>
              </div>

              {/* Mobile Menu Button */}
              <button
                className="md:hidden p-3 rounded-xl bg-white/10 backdrop-blur-xl border border-white/20 text-white hover:bg-white/20 transition-all duration-300"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>
            </div>
          </nav>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden mx-4 mt-2 rounded-3xl backdrop-blur-2xl bg-gradient-to-b from-black/50 to-purple-900/50 border border-white/20 shadow-2xl transition-all duration-500 overflow-hidden ${
            isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="p-6 space-y-4">
            {navItems.map((item, index) => {
              const Icon = item.icon;
              const isActive = currentPage === item.page;
              return (
                <button
                  key={item.name}
                  onClick={() => {
                    navigateToPage(item.page);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full group flex items-center space-x-3 px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                    isActive
                      ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                      : "text-purple-200 hover:text-white hover:bg-white/10"
                  }`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.name}</span>
                </button>
              );
            })}
            <button
              onClick={() => {
                navigateToPage("editor");
                setIsMobileMenuOpen(false);
              }}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-3 rounded-xl font-semibold shadow-lg flex items-center justify-center space-x-2 hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              <Sparkles className="w-5 h-5" />
              <span>Create Magic</span>
            </button>
          </div>
        </div>
      </header>

      {/* Header Spacer */}
      <div className="h-24"></div>
    </>
  );
};

export default Header;
