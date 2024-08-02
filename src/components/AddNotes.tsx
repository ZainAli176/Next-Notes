"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import RichTextEditor from "./Editor";

interface AddNotesProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (title: string, content: string) => void;
}

const AddNotes: React.FC<AddNotesProps> = ({ isOpen, onClose, onSave }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(title, content);
    setTitle("");
    setContent("");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-5 rounded shadow-lg max-w-2xl w-full">
        <div className="flex justify-between items-center">
          <h2 className="text-xl">Add New Note</h2>
          <button onClick={onClose} className="text-xl">
            &times;
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mt-4">
            <label className="block">Title</label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              placeholder="Note title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="mt-4">
            <label className="block">Your Note</label>
            <RichTextEditor content={content} onChange={setContent} />
          </div>
          <div className="mt-4 flex justify-end">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="ml-2">
              Save
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNotes;
