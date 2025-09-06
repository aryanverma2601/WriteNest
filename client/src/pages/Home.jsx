import React, { useState, useEffect } from "react";
import {
  Search,
  Filter,
  Heart,
  MessageCircle,
  Eye,
  TrendingUp,
  Award,
  Zap,
  Star,
  Crown,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const HomePage = ({ blogs, navigateToPage }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredBlogs, setFilteredBlogs] = useState(blogs);
  const [isLoaded, setIsLoaded] = useState(false);

  const blogsPerPage = 6;
  const categories = [
    "All",
    "Technology",
    "Design",
    "AI",
    "Innovation",
    "Lifestyle",
  ];

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    let filtered = blogs.filter(
      (blog) =>
        blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.tags.some((tag) =>
          tag.toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    if (selectedCategory !== "All") {
      filtered = filtered.filter((blog) => blog.category === selectedCategory);
    }

    setFilteredBlogs(filtered);
    setCurrentPage(1);
  }, [searchTerm, selectedCategory, blogs]);

  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = filteredBlogs.slice(indexOfFirstBlog, indexOfLastBlog);
  const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage);

  const featuredBlogs = blogs.filter((blog) => blog.featured).slice(0, 3);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 relative overflow-hidden">
      {/* Dynamic Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-conic from-purple-400 via-pink-400 to-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-spin-slow"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-conic from-blue-400 via-purple-400 to-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-spin-slow animation-reverse"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-purple-600/10 via-transparent to-transparent rounded-full animate-pulse"></div>
      </div>

      <Header navigateToPage={navigateToPage} currentPage="home" />

      {/* Hero Section */}
      <section
        className={`relative z-10 py-20 px-6 transition-all duration-1000 ${
          isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        }`}
      >
        <div className="max-w-6xl mx-auto text-center">
          {/* Hero Badge */}
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-xl border border-purple-400/30 rounded-full px-6 py-2 mb-8">
            <Crown className="w-4 h-4 text-yellow-400" />
            <span className="text-purple-200 font-medium">
              Premium Blog Experience
            </span>
            <Sparkles className="w-4 h-4 text-purple-400" />
          </div>

          <h1 className="text-7xl md:text-8xl font-black mb-8 leading-none">
            <span className="block bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent animate-gradient">
              Discover
            </span>
            <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent animate-gradient animation-delay-500">
              Extraordinary
            </span>
            <span className="block bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 bg-clip-text text-transparent animate-gradient animation-delay-1000">
              Stories
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-slate-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            Immerse yourself in premium content crafted by visionaries, enhanced
            by AI, and designed for the extraordinary mind.
          </p>

          {/* Enhanced Search Bar */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl blur opacity-25 group-hover:opacity-40 transition-opacity duration-500"></div>
              <div className="relative bg-white/5 backdrop-blur-2xl border border-white/20 rounded-3xl p-2">
                <div className="flex items-center">
                  <Search className="ml-6 text-purple-300 w-6 h-6 group-focus-within:text-purple-200 transition-colors duration-300" />
                  <input
                    type="text"
                    placeholder="Search for extraordinary content..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="flex-1 px-6 py-4 bg-transparent text-white placeholder-slate-400 focus:outline-none text-lg"
                  />
                  <button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 px-8 py-4 rounded-2xl text-white font-semibold shadow-xl transform hover:scale-105 transition-all duration-300 mr-2">
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Premium Category Pills */}
          <div className="flex flex-wrap justify-center gap-3 mb-16">
            {categories.map((category, index) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`group relative px-8 py-4 rounded-2xl font-medium transition-all duration-500 transform hover:scale-105 ${
                  selectedCategory === category
                    ? "bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 text-white shadow-2xl shadow-purple-500/25"
                    : "bg-white/5 backdrop-blur-xl text-slate-300 hover:text-white hover:bg-white/10 border border-white/20 hover:border-purple-400/50"
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <span className="relative z-10">{category}</span>
                {selectedCategory === category && (
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 rounded-2xl transform -skew-x-12 animate-slide-shine"></div>
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Articles Showcase */}
      {featuredBlogs.length > 0 && (
        <section
          className={`relative z-10 px-6 mb-20 transition-all duration-1000 delay-300 ${
            isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <div className="max-w-7xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-16">
              <div className="inline-flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg shadow-yellow-500/25">
                  <Star className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-4xl font-bold bg-gradient-to-r from-white via-yellow-200 to-orange-200 bg-clip-text text-transparent">
                  Featured Masterpieces
                </h2>
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-yellow-400 rounded-2xl flex items-center justify-center shadow-lg shadow-orange-500/25">
                  <Award className="w-6 h-6 text-white" />
                </div>
              </div>
              <p className="text-slate-300 text-lg max-w-2xl mx-auto">
                Handpicked extraordinary content that pushes boundaries and
                ignites imagination
              </p>
            </div>

            {/* Featured Grid */}
            <div className="grid lg:grid-cols-3 gap-8">
              {featuredBlogs.map((blog, index) => (
                <div
                  key={blog.id}
                  className={`group cursor-pointer transform transition-all duration-700 hover:scale-105 hover:-translate-y-4 ${
                    index === 1 ? "lg:-mt-12" : ""
                  }`}
                  onClick={() => navigateToPage("view", blog)}
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <div className="relative bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-2xl rounded-3xl overflow-hidden border border-white/20 hover:border-purple-400/50 shadow-2xl hover:shadow-purple-500/25 transition-all duration-700">
                    {/* Premium Badge */}
                    <div className="absolute top-6 right-6 z-10 bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-4 py-2 rounded-full text-sm font-bold shadow-lg flex items-center space-x-1">
                      <Crown className="w-4 h-4" />
                      <span>FEATURED</span>
                    </div>

                    {/* Image Section */}
                    <div className="h-56 bg-gradient-to-br from-purple-400 via-pink-500 to-orange-400 relative overflow-hidden">
                      <div className="absolute inset-0 bg-black/20"></div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                      <div className="absolute bottom-6 left-6 text-white">
                        <div className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium mb-2">
                          {blog.category}
                        </div>
                        <div className="text-sm opacity-90">
                          {blog.readTime}
                        </div>
                      </div>

                      {/* Floating Elements */}
                      <div className="absolute top-4 left-4 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                        <Sparkles className="w-4 h-4 text-white animate-pulse" />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-8">
                      <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-purple-200 transition-colors duration-300 line-clamp-2">
                        {blog.title}
                      </h3>
                      <p className="text-slate-300 mb-6 leading-relaxed line-clamp-3">
                        {blog.excerpt}
                      </p>

                      <div className="flex items-center justify-between mb-6">
                        <div>
                          <div className="font-semibold text-purple-200">
                            {blog.author}
                          </div>
                          <div className="text-sm text-slate-400">
                            {blog.date}
                          </div>
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-slate-400">
                          <div className="flex items-center space-x-1 hover:text-red-400 transition-colors duration-300">
                            <Heart className="w-4 h-4" />
                            <span>{blog.likes.toLocaleString()}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Eye className="w-4 h-4" />
                            <span>{blog.views.toLocaleString()}</span>
                          </div>
                        </div>
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2">
                        {blog.tags.slice(0, 3).map((tag, tagIndex) => (
                          <span
                            key={tag}
                            className="px-3 py-1 bg-purple-600/20 text-purple-200 rounded-full text-xs font-medium border border-purple-400/30"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Hover Effect Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-purple-600/0 via-transparent to-purple-600/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Blog Grid Section */}
      <section
        className={`relative z-10 px-6 mb-20 transition-all duration-1000 delay-500 ${
          isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        }`}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Explore Premium Content
            </h2>
            <p className="text-slate-400 text-lg">
              Discover articles that challenge, inspire, and transform
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {currentBlogs.map((blog, index) => (
              <div
                key={blog.id}
                className="group cursor-pointer transform transition-all duration-500 hover:scale-105 hover:-translate-y-2"
                onClick={() => navigateToPage("view", blog)}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="bg-white/5 backdrop-blur-2xl rounded-2xl overflow-hidden border border-white/10 hover:border-purple-400/30 shadow-xl hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-500 h-full">
                  {/* Image Header */}
                  <div className="h-48 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 relative overflow-hidden">
                    <div className="absolute inset-0 bg-black/10"></div>
                    <div className="absolute top-3 left-3 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs text-white font-medium">
                      {blog.category}
                    </div>
                    <div className="absolute bottom-3 right-3 text-white text-xs font-medium">
                      {blog.readTime}
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-lg font-bold text-white mb-3 group-hover:text-purple-200 transition-colors duration-300 line-clamp-2">
                      {blog.title}
                    </h3>
                    <p className="text-slate-400 text-sm mb-4 line-clamp-3">
                      {blog.excerpt}
                    </p>

                    <div className="flex items-center justify-between text-xs text-slate-500 mb-4">
                      <span className="font-medium text-purple-300">
                        {blog.author}
                      </span>
                      <span>{blog.date}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-xs text-slate-400">
                        <div className="flex items-center space-x-1 hover:text-red-400 transition-colors duration-300">
                          <Heart className="w-4 h-4" />
                          <span>{blog.likes}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MessageCircle className="w-4 h-4" />
                          <span>{blog.comments}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Eye className="w-4 h-4" />
                          <span>{blog.views}</span>
                        </div>
                      </div>
                      <TrendingUp className="w-4 h-4 text-green-400 group-hover:scale-110 transition-transform duration-300" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Premium Pagination */}
      {totalPages > 1 && (
        <section
          className={`relative z-10 px-6 mb-20 transition-all duration-1000 delay-700 ${
            isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center space-x-3">
              {/* Previous Button */}
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="w-14 h-14 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/20 text-slate-400 hover:text-white hover:border-purple-400/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105"
              >
                ←
              </button>

              {/* Page Numbers */}
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let page;
                if (totalPages <= 5) {
                  page = i + 1;
                } else if (currentPage <= 3) {
                  page = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  page = totalPages - 4 + i;
                } else {
                  page = currentPage - 2 + i;
                }

                return (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-14 h-14 rounded-2xl font-medium transition-all duration-300 transform hover:scale-110 ${
                      currentPage === page
                        ? "bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 text-white shadow-lg shadow-purple-500/25"
                        : "bg-white/5 backdrop-blur-xl text-slate-400 hover:text-white hover:bg-white/10 border border-white/20 hover:border-purple-400/50"
                    }`}
                  >
                    {page}
                  </button>
                );
              })}

              {/* Next Button */}
              <button
                onClick={() =>
                  setCurrentPage(Math.min(totalPages, currentPage + 1))
                }
                disabled={currentPage === totalPages}
                className="w-14 h-14 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/20 text-slate-400 hover:text-white hover:border-purple-400/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105"
              >
                →
              </button>
            </div>

            <div className="text-center mt-6 text-slate-400">
              Showing {indexOfFirstBlog + 1}-
              {Math.min(indexOfLastBlog, filteredBlogs.length)} of{" "}
              {filteredBlogs.length} articles
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
};

export default HomePage;
