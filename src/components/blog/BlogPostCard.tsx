import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Link } from "react-router-dom";

interface BlogPostCardProps {
  title: string;
  summary: string;
  date: string;
  slug: string;
}

const BlogPostCard: React.FC<BlogPostCardProps> = ({ title, summary, date, slug }) => (
  <Card className="bg-gray-900/50 border-gray-700 hover:border-neon-green transition-all">
    <CardHeader>
      <CardTitle className="text-neon-green">{title}</CardTitle>
      <p className="text-xs text-gray-400">{date}</p>
    </CardHeader>
    <CardContent>
      <p className="text-gray-300">{summary}</p>
      <Link to={`/blog/${slug}`} className="text-neon-green hover:underline mt-4 inline-block">
        Decrypt Message {">>"}
      </Link>
    </CardContent>
  </Card>
);

export default BlogPostCard;
