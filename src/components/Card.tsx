import React from "react";
import { useRouter } from "next/navigation";

interface CardProps {
  id: number;
  title: string;
  content: string;
  onDelete: () => void;
}

const stripHtmlTags = (html: string) => {
  const doc = new DOMParser().parseFromString(html, "text/html");
  return doc.body.textContent || "";
};

const Card: React.FC<CardProps> = ({ id, title, content, onDelete }) => {
  const router = useRouter();

  const handleOpenNote = () => {
    router.push(`/note?id=${id}`);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete();
  };

  return (
    <div className="bg-white p-4 m-4 w-48 h-36 rounded shadow-md text-black flex flex-col cursor-default">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-bold self-start">{title}</h3>
        <button
          onClick={handleDelete}
          className="text-red-500 hover:text-red-700"
        >
          &times;
        </button>
      </div>
      <hr className="mb-1" />
      <div className="text-sm">
        {stripHtmlTags(content).split(" ").slice(0, 8).join(" ")}...
      </div>
      <button
        onClick={handleOpenNote}
        className="mt-2 text-blue-500 hover:text-blue-700"
      >
        Open Note
      </button>
    </div>
  );
};

export default Card;
