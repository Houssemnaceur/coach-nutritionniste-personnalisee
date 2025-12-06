import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Calendar, User, Tag } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";
import { blogPosts } from "@/lib/data";
import ReactMarkdown from 'react-markdown';

const BlogPost = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<any>(null);
  const [relatedPosts, setRelatedPosts] = useState<any[]>([]);

  useEffect(() => {
    if (id) {
      const currentPost = blogPosts.find(post => post.id === parseInt(id));
      setPost(currentPost);
      
      if (currentPost) {
        // Find related posts by category or tags
        const related = blogPosts
          .filter(p => p.id !== currentPost.id)
          .filter(p => 
            p.category === currentPost.category || 
            p.tags.some(tag => currentPost.tags.includes(tag))
          )
          .slice(0, 3);
        
        setRelatedPosts(related);
      }
    }
  }, [id]);

  if (!post) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
        <Navigation />
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Article not found</h1>
          <Link to="/blog">
            <Button>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Nutrition": return "bg-green-100 text-green-800";
      case "Fitness": return "bg-blue-100 text-blue-800";
      case "Wellness": return "bg-purple-100 text-purple-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <Link to="/blog">
            <Button variant="ghost" className="pl-0">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Button>
          </Link>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div 
              className="h-64 w-full bg-cover bg-center rounded-lg mb-6" 
              style={{ backgroundImage: `url(${post.image})` }}
            ></div>
            
            <Badge className={`mb-4 ${getCategoryColor(post.category)}`}>
              {post.category}
            </Badge>
            
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{post.title}</h1>
            
            <div className="flex items-center text-sm text-gray-500 mb-8">
              <Calendar className="h-4 w-4 mr-1" />
              <span className="mr-4">{new Date(post.date).toLocaleDateString()}</span>
              <User className="h-4 w-4 mr-1" />
              <span>{post.author}</span>
            </div>
            
            <div className="prose prose-lg max-w-none">
              {post.content ? (
                <ReactMarkdown>{post.content}</ReactMarkdown>
              ) : (
                <p className="text-gray-600">{post.excerpt}</p>
              )}
            </div>
            
            <div className="flex flex-wrap gap-2 mt-8">
              {post.tags.map((tag: string) => (
                <span key={tag} className="text-sm bg-gray-100 text-gray-600 px-3 py-1 rounded-full">
                  #{tag}
                </span>
              ))}
            </div>
          </div>
          
          <div>
            <div className="sticky top-8 space-y-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold mb-4">About the Author</h3>
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-bold mr-4">
                      {post.author.split(' ').map((n: string) => n[0]).join('')}
                    </div>
                    <div>
                      <p className="font-semibold">{post.author}</p>
                      <p className="text-sm text-gray-500">Fitness Expert</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {relatedPosts.length > 0 && (
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-bold mb-4">Related Articles</h3>
                    <div className="space-y-4">
                      {relatedPosts.map(relatedPost => (
                        <Link key={relatedPost.id} to={`/blog/${relatedPost.id}`} className="block">
                          <div className="flex items-start">
                            <div 
                              className="w-16 h-16 bg-cover bg-center rounded flex-shrink-0 mr-3" 
                              style={{ backgroundImage: `url(${relatedPost.image})` }}
                            ></div>
                            <div>
                              <p className="font-medium text-gray-900 hover:text-green-600 transition-colors">
                                {relatedPost.title}
                              </p>
                              <p className="text-xs text-gray-500 mt-1">
                                {new Date(relatedPost.date).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
              
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold mb-4">Categories</h3>
                  <div className="space-y-2">
                    {Array.from(new Set(blogPosts.map(p => p.category))).map(category => (
                      <Link key={category} to={`/blog?category=${category}`}>
                        <Badge className={`mr-2 ${getCategoryColor(category as string)}`}>
                          {category}
                        </Badge>
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;