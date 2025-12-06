import { useState } from "react";
import { Search, Calendar, User, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { blogPosts } from "@/lib/data";

const Blog = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const filteredPosts = blogPosts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Nutrition":
        return "bg-green-100 text-green-800";
      case "Fitness":
        return "bg-blue-100 text-blue-800";
      case "Wellness":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleReadArticle = (postId: number) => {
    navigate(`/blog/${postId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Health & Fitness Blog</h1>
          <p className="text-lg text-gray-600 mb-6">
            Expert advice, tips, and insights for your fitness journey
          </p>

          <div className="max-w-xl mx-auto relative">
            <Input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          </div>
        </div>

        {/* Featured Post */}
        {blogPosts.length > 0 && (
          <div className="mb-12">
            <Card className="overflow-hidden">
              <div className="grid md:grid-cols-2">
                <div
                  className="h-64 md:h-auto bg-cover bg-center"
                  style={{ backgroundImage: `url(${blogPosts[0].image})` }}
                ></div>
                <CardContent className="p-8 flex flex-col justify-center">
                  <Badge className={`mb-2 ${getCategoryColor(blogPosts[0].category)}`}>
                    {blogPosts[0].category}
                  </Badge>
                  <h2 className="text-2xl font-bold mb-3">{blogPosts[0].title}</h2>
                  <p className="text-gray-600 mb-4">{blogPosts[0].excerpt}</p>
                  <div className="flex items-center text-sm text-gray-500 mb-4">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span className="mr-4">
                      {new Date(blogPosts[0].date).toLocaleDateString()}
                    </span>
                    <User className="h-4 w-4 mr-1" />
                    <span>{blogPosts[0].author}</span>
                  </div>
                  <Button
                    className="self-start bg-green-600 hover:bg-green-700"
                    onClick={() => handleReadArticle(blogPosts[0].id)}
                  >
                    Read Article
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </div>
            </Card>
          </div>
        )}

        {/* Blog Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.slice(1).map((post) => (
            <Card
              key={post.id}
              className="overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div
                className="h-48 bg-cover bg-center"
                style={{ backgroundImage: `url(${post.image})` }}
              ></div>
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-3">
                  <Badge className={getCategoryColor(post.category)}>{post.category}</Badge>
                  <span className="text-sm text-gray-500">
                    {new Date(post.date).toLocaleDateString()}
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-2">{post.title}</h3>
                <p className="text-gray-600 mb-4 line-clamp-2">{post.excerpt}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500 flex items-center">
                    <User className="h-3 w-3 mr-1" />
                    {post.author}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-green-600 hover:text-green-700 p-0"
                    onClick={() => handleReadArticle(post.id)}
                  >
                    Read More
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No articles found matching "{searchQuery}"</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;