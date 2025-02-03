import React from "react";
import parse from "html-react-parser";

interface BlogProps {
  title: string;
  content: string;
  author: string;
  date: string;
  onClick: () => void;
}

const Blog: React.FC<BlogProps> = ({ title, content, author, date, onClick }) => {
    const text = parse(content);
    // const text = convert(content,{wordwrap:false});
    // console.log(text.slice(0,100));
  return (
    <div onClick={onClick} className="w-3/4 mx-auto py-6 border-b">
      <div  className="flex items-center gap-2 text-gray-600 text-sm">
        <span className="font-medium">{author}</span>
      </div>

      <h2 className="text-xl font-bold mt-1">{title}</h2>

      <div className="text-gray-600 mt-1">{text}</div>
      <div className="text-gray-500 text-sm mt-2">{date.slice(0,10)}</div>
    </div>
  );
};

export default Blog;
