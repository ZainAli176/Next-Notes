"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { SignedIn, UserButton, useAuth } from "@clerk/nextjs";
import { NotebookPen } from "lucide-react";
import React from "react";
import AddNotes from "@/components/AddNotes";
import Card from "@/components/Card";
import { useRouter } from "next/navigation";

interface Note {
  id: number;
  title: string;
  content: string;
}

const Page = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [notes, setNotes] = useState<Note[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const { isLoaded: isAuthLoaded, userId } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthLoaded && !userId) {
      router.push("/sign-in");
    }
  }, [isAuthLoaded, userId, router]);

  useEffect(() => {
    const savedNotes = localStorage.getItem("notes");
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes));
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("notes", JSON.stringify(notes));
    }
  }, [notes, isLoaded]);

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  const addNote = (title: string, content: string) => {
    const newNote = { id: Date.now(), title, content };
    setNotes((prevNotes) => [...prevNotes, newNote]);
    setIsPopupOpen(false);
  };

  const deleteNote = (id: number) => {
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
  };

  if (!isAuthLoaded || !isLoaded) {
    return <div>Loading...</div>;
  }

  if (!userId) {
    return null;
  }

  return (
    <SignedIn>
      <div>
        <div className="flex justify-between m-7">
          <div className="flex text-xl gap-1 text-white">
            <NotebookPen /> NextNotes
          </div>
          <div className="flex items-center">
            <Button variant="outline" onClick={togglePopup}>
              Add Notes
            </Button>
            <div className="ml-2">
              <UserButton afterSignOutUrl="/sign-in" />
            </div>
          </div>
        </div>
        <AddNotes isOpen={isPopupOpen} onClose={togglePopup} onSave={addNote} />
        <div className="notes-container flex flex-wrap">
          {notes.map((note) => (
            <Card
              key={note.id}
              id={note.id}
              title={note.title}
              content={note.content}
              onDelete={() => deleteNote(note.id)}
            />
          ))}
        </div>
      </div>
    </SignedIn>
  );
};

export default Page;
