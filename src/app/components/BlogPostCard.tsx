import { Link } from 'react-router';
import { motion } from 'framer-motion';
import { Calendar, User, Eye, ArrowRight, Heart, MessageSquare } from 'lucide-react';
import type { BlogPost } from './NewsPage';

interface BlogPostCardProps {
  post: BlogPost;
}

export function BlogPostCard({ post }: BlogPostCardProps) {
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="group h-full bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:border-primary/50 transition-all duration-300 backdrop-blur-sm"
    >
      <div className="h-full flex flex-col p-6">
        {/* Image */}
        {post.image && (
          <div className="relative h-48 -mx-6 -mt-6 mb-4 overflow-hidden">
            <img 
              src={post.image} 
              alt={post.title} 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a1a] to-transparent opacity-60" />
            <div className="absolute bottom-3 left-6">
              <span className="inline-block px-3 py-1 text-xs font-semibold text-primary bg-primary/10 backdrop-blur-md border border-primary/20 rounded-full">
                {post.category}
              </span>
            </div>
          </div>
        )}

        {/* Category Badge (Fallback if no image) */}
        {!post.image && (
          <div className="mb-4">
            <span className="inline-block px-3 py-1 text-xs font-semibold text-primary bg-primary/10 rounded-full">
              {post.category}
            </span>
          </div>
        )}

        {/* Title */}
        <Link to={`/news/${post.id}`}>
          <h3 className="text-xl font-bold mb-3 line-clamp-2 group-hover:text-primary transition-colors cursor-pointer">
            {post.title}
          </h3>
        </Link>

        {/* Excerpt */}
        <p className="text-gray-300 text-sm mb-4 line-clamp-3 flex-grow">
          {post.excerpt}
        </p>

        {/* Meta Information */}
        <div className="space-y-3 mb-6 border-t border-white/10 pt-4">
          {/* Author */}
          <div className="flex items-center gap-3">
            {post.author.avatar ? (
              <img
                src={post.author.avatar}
                alt={post.author.name}
                className="w-8 h-8 rounded-full object-cover"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <span className="text-xs font-bold text-white">
                  {post.author.name.charAt(0)}
                </span>
              </div>
            )}
            <div>
              <Link
                to={`/profile/${post.author.id}`}
                className="text-sm font-semibold text-white hover:text-primary transition-colors"
              >
                {post.author.name}
              </Link>
              {post.author.title && (
                <p className="text-xs text-gray-400">{post.author.title}</p>
              )}
            </div>
          </div>

          {/* Engagement Stats */}
          <div className="flex items-center gap-4 text-xs text-gray-400">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>{formatDate(post.createdAt)}</span>
            </div>
            <div className="flex items-center gap-1">
              <Eye className="w-4 h-4" />
              <span>{post.views}</span>
            </div>
            <div className="flex items-center gap-1">
              <Heart className="w-4 h-4 text-pink-500" />
              <span>{post._count?.likes || 0}</span>
            </div>
            <div className="flex items-center gap-1">
              <MessageSquare className="w-4 h-4 text-blue-500" />
              <span>{post._count?.comments || 0}</span>
            </div>
          </div>
        </div>

        {/* Read More Button */}
        <Link to={`/news/${post.id}`}>
          <motion.div
            whileHover={{ x: 4 }}
            className="flex items-center gap-2 text-primary font-semibold text-sm group-hover:gap-3 transition-all cursor-pointer"
          >
            <span>Read Article</span>
            <ArrowRight className="w-4 h-4" />
          </motion.div>
        </Link>
      </div>
    </motion.div>
  );
}
