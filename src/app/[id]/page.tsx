"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

interface Note {
  id: number;
  title: string;
  content: string;
}

const CardOpen: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [note, setNote] = useState<Note | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchNote = () => {
      const savedNotes = localStorage.getItem("notes");
      if (savedNotes && id) {
        const notes: Note[] = JSON.parse(savedNotes);
        const foundNote = notes.find((note) => note.id === Number(id));
        setNote(foundNote || null);
      }
      setIsLoading(false);
    };

    fetchNote();
  }, [id]);

  if (isLoading) return <div>Loading...</div>;
  if (!note) return <div>Note not found</div>;

  return (
    <div className="p-4 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4 text-white text-center underline">
        {note.title}
      </h1>
      <div
        className="text-lg mb-4 text-white"
        dangerouslySetInnerHTML={{ __html: note.content }}
      ></div>
      <hr className="w-full mb-4" />
      <Button variant="outline" onClick={() => router.push("/")}>
        Back to Notes
      </Button>
    </div>
  );
};

export default CardOpen;
