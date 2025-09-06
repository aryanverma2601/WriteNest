import React, { useState, useEffect } from "react";
import {
  ArrowLeft,
  Heart,
  MessageCircle,
  Eye,
  Share2,
  Bookmark,
  Clock,
  User,
  Calendar,
  Tag,
  ThumbsUp,
  Star,
  Crown,
  Zap,
  TrendingUp,
  ArrowRight,
} from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const BlogView = ({ blog, blogs, navigateToPage }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [likeCount, setLikeCount] = useState(blog?.likes || 0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);

  const relatedBlogs =
    blogs
      ?.filter(
        (b) =>
          b.id !== blog?.id &&
          (b.category === blog?.category ||
            b.tags.some((tag) => blog?.tags.includes(tag)))
      )
      .slice(0, 3) || [];

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      setReadingProgress(Math.min(100, Math.max(0, progress)));
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1));
  };

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: blog.title,
        text: blog.excerpt,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      // You could add a toast notification here
    }
  };

  if (!blog) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Blog not found</h2>
          <button
            onClick={() => navigateToPage("home")}
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl text-white font-semibold"
          >
            Return Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 relative overflow-hidden">
      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <div
          className="h-1 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 transform origin-left transition-transform duration-300"
          style={{ transform: `scaleX(${readingProgress / 100})` }}
        ></div>
      </div>

      {/* Dynamic Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-pulse animation-delay-2000"></div>
      </div>

      <Header navigateToPage={navigateToPage} currentPage="view" />

      {/* Article Header */}
      <div
        className={`relative z-10 px-6 py-8 transition-all duration-1000 ${
          isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        }`}
      >
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <button
            onClick={() => navigateToPage("home")}
            className="group flex items-center space-x-2 mb-8 text-slate-400 hover:text-white transition-colors duration-300"
          >
            <div className="w-10 h-10 bg-white/10 backdrop-blur-xl rounded-xl border border-white/20 hover:border-purple-400/50 flex items-center justify-center group-hover:scale-105 transition-all duration-300">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
            </div>
            <span className="font-medium">Back to Articles</span>
          </button>

          {/* Article Meta */}
          <div className="mb-8">
            {blog.featured && (
              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 backdrop-blur-xl border border-yellow-400/30 rounded-full px-4 py-2 mb-6">
                <Crown className="w-4 h-4 text-yellow-400" />
                <span className="text-yellow-300 font-medium text-sm">
                  Featured Article
                </span>
                <Star className="w-4 h-4 text-yellow-400" />
              </div>
            )}

            <div className="inline-block bg-purple-600/20 backdrop-blur-xl border border-purple-400/30 rounded-full px-4 py-2 mb-6">
              <span className="text-purple-300 font-medium text-sm">
                {blog.category}
              </span>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-5xl md:text-6xl font-black mb-6 leading-tight">
            <span className="bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
              {blog.title}
            </span>
          </h1>

          {/* Excerpt */}
          <p className="text-xl text-slate-300 mb-8 leading-relaxed">
            {blog.excerpt}
          </p>

          {/* Article Meta Info */}
          <div className="flex flex-wrap items-center gap-6 mb-8 text-slate-400">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
              <span className="font-medium text-slate-300">{blog.author}</span>
            </div>

            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4" />
              <span>
                {new Date(blog.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>

            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4" />
              <span>{blog.readTime}</span>
            </div>
          </div>

          {/* Engagement Stats */}
          <div className="flex items-center justify-between mb-12 p-6 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/20">
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-2 text-slate-400">
                <Eye className="w-5 h-5" />
                <span className="font-medium">
                  {blog.views?.toLocaleString() || 0}
                </span>
                <span className="text-sm">views</span>
              </div>

              <div className="flex items-center space-x-2 text-slate-400">
                <MessageCircle className="w-5 h-5" />
                <span className="font-medium">{blog.comments || 0}</span>
                <span className="text-sm">comments</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-3">
              <button
                onClick={handleLike}
                className={`group flex items-center space-x-2 px-4 py-2 rounded-xl border transition-all duration-300 transform hover:scale-105 ${
                  isLiked
                    ? "bg-red-600/20 border-red-400/50 text-red-300"
                    : "bg-white/10 border-white/20 text-slate-400 hover:text-red-300 hover:border-red-400/50"
                }`}
              >
                <Heart
                  className={`w-4 h-4 group-hover:scale-110 transition-transform duration-300 ${
                    isLiked ? "fill-current" : ""
                  }`}
                />
                <span className="font-medium">{likeCount}</span>
              </button>

              <button
                onClick={() => setIsBookmarked(!isBookmarked)}
                className={`p-3 rounded-xl border transition-all duration-300 transform hover:scale-105 ${
                  isBookmarked
                    ? "bg-blue-600/20 border-blue-400/50 text-blue-300"
                    : "bg-white/10 border-white/20 text-slate-400 hover:text-blue-300 hover:border-blue-400/50"
                }`}
              >
                <Bookmark
                  className={`w-4 h-4 ${isBookmarked ? "fill-current" : ""}`}
                />
              </button>

              <button
                onClick={handleShare}
                className="p-3 bg-white/10 hover:bg-purple-600/20 border border-white/20 hover:border-purple-400/50 rounded-xl text-slate-400 hover:text-purple-300 transition-all duration-300 transform hover:scale-105"
              >
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <div
        className={`relative z-10 px-6 pb-16 transition-all duration-1000 delay-300 ${
          isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        }`}
      >
        <div className="max-w-4xl mx-auto">
          <article className="bg-white/5 backdrop-blur-2xl rounded-3xl border border-white/20 shadow-2xl p-8 md:p-12">
            <div className="prose prose-invert prose-lg max-w-none">
              <div className="text-slate-200 leading-relaxed whitespace-pre-wrap text-lg">
                {blog.content}
              </div>
            </div>

            {/* Article Tags */}
            <div className="mt-12 pt-8 border-t border-white/10">
              <div className="flex items-center space-x-2 mb-4">
                <Tag className="w-4 h-4 text-purple-400" />
                <span className="text-slate-400 font-medium">Topics</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {blog.tags?.map((tag, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-purple-600/20 backdrop-blur-xl border border-purple-400/30 rounded-full text-purple-300 text-sm font-medium hover:bg-purple-600/30 transition-colors duration-300 cursor-pointer"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </article>
        </div>
      </div>

      {/* Related Articles */}
      {relatedBlogs.length > 0 && (
        <div
          className={`relative z-10 px-6 pb-20 transition-all duration-1000 delay-500 ${
            isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4 flex items-center justify-center">
                <TrendingUp className="w-8 h-8 text-purple-400 mr-3" />
                Related Articles
                <Zap className="w-8 h-8 text-yellow-400 ml-3" />
              </h2>
              <p className="text-slate-400">
                Continue your journey with these handpicked articles
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {relatedBlogs.map((relatedBlog, index) => (
                <div
                  key={relatedBlog.id}
                  className="group cursor-pointer transform transition-all duration-500 hover:scale-105 hover:-translate-y-2"
                  onClick={() => navigateToPage("view", relatedBlog)}
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <div className="bg-white/5 backdrop-blur-2xl rounded-2xl overflow-hidden border border-white/10 hover:border-purple-400/30 shadow-xl hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-500 h-full">
                    {/* Image */}
                    <div className="h-48 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 relative overflow-hidden">
                      <div className="absolute inset-0 bg-black/20"></div>
                      <div className="absolute top-3 left-3 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs text-white font-medium">
                        {relatedBlog.category}
                      </div>
                      <div className="absolute bottom-3 right-3 text-white text-xs font-medium">
                        {relatedBlog.readTime}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h3 className="text-lg font-bold text-white mb-3 group-hover:text-purple-200 transition-colors duration-300 line-clamp-2">
                        {relatedBlog.title}
                      </h3>
                      <p className="text-slate-400 text-sm mb-4 line-clamp-3">
                        {relatedBlog.excerpt}
                      </p>

                      <div className="flex items-center justify-between text-xs text-slate-500 mb-4">
                        <span className="font-medium text-purple-300">
                          {relatedBlog.author}
                        </span>
                        <span>{relatedBlog.date}</span>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-xs text-slate-400">
                          <div className="flex items-center space-x-1">
                            <Heart className="w-4 h-4" />
                            <span>{relatedBlog.likes}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Eye className="w-4 h-4" />
                            <span>{relatedBlog.views}</span>
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-purple-400 group-hover:translate-x-1 group-hover:text-purple-300 transition-all duration-300" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* View More Button */}
            <div className="text-center mt-12">
              <button
                onClick={() => navigateToPage("home")}
                className="group px-8 py-4 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 hover:from-purple-500 hover:via-pink-500 hover:to-orange-400 rounded-2xl text-white font-semibold shadow-lg shadow-purple-500/25 hover:shadow-purple-500/50 transition-all duration-300 transform hover:scale-105 flex items-center space-x-2 mx-auto"
              >
                <span>Explore More Articles</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default BlogView;
