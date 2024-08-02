"use client";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextStyle from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import React, { useState } from "react";

const MenuBar: React.FC<{ editor: any; toggleColorPicker: () => void }> = ({
  editor,
  toggleColorPicker,
}) => {
  if (!editor) {
    return null;
  }

  return (
    <div className="flex space-x-2 mb-2">
      <button
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().toggleBold().run();
        }}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={editor.isActive("bold") ? "bg-gray-200 p-1" : "p-1"}
      >
        Bold
      </button>
      <button
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().toggleItalic().run();
        }}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={editor.isActive("italic") ? "bg-gray-200 p-1" : "p-1"}
      >
        Italic
      </button>
      <button
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().toggleStrike().run();
        }}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        className={editor.isActive("strike") ? "bg-gray-200 p-1" : "p-1"}
      >
        Strike
      </button>
      <button
        onClick={(e) => {
          e.preventDefault();
          toggleColorPicker();
        }}
        className="p-1 bg-blue-500 text-white"
      >
        Colors
      </button>
    </div>
  );
};

interface RichTextEditorProps {
  content: string;
  onChange: (value: string) => void;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({
  content,
  onChange,
}) => {
  const [showColorPicker, setShowColorPicker] = useState(false);

  const toggleColorPicker = () => {
    setShowColorPicker(!showColorPicker);
  };

  const editor = useEditor({
    extensions: [StarterKit, TextStyle, Color],
    content: content || "",
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  if (!editor) {
    return null;
  }

  return (
    <div className="border rounded p-2 h-64">
      <MenuBar editor={editor} toggleColorPicker={toggleColorPicker} />
      {showColorPicker && (
        <div className="control-group mb-2">
          <div className="button-group">
            <input
              type="color"
              onInput={(event) =>
                editor
                  .chain()
                  .focus()
                  .setColor((event.target as HTMLInputElement).value)
                  .run()
              }
              value={editor.getAttributes("textStyle").color}
              data-testid="setColor"
              className="p-1"
            />
            <button
              onClick={(e) => {
                e.preventDefault();
                editor.chain().focus().setColor("#958DF1").run();
              }}
              className={
                editor.isActive("textStyle", { color: "#958DF1" })
                  ? "is-active p-1"
                  : "p-1"
              }
              data-testid="setPurple"
            >
              Purple
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                editor.chain().focus().setColor("#F98181").run();
              }}
              className={
                editor.isActive("textStyle", { color: "#F98181" })
                  ? "is-active p-1"
                  : "p-1"
              }
              data-testid="setRed"
            >
              Red
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                editor.chain().focus().setColor("#FBBC88").run();
              }}
              className={
                editor.isActive("textStyle", { color: "#FBBC88" })
                  ? "is-active p-1"
                  : "p-1"
              }
              data-testid="setOrange"
            >
              Orange
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                editor.chain().focus().setColor("#FAF594").run();
              }}
              className={
                editor.isActive("textStyle", { color: "#FAF594" })
                  ? "is-active p-1"
                  : "p-1"
              }
              data-testid="setYellow"
            >
              Yellow
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                editor.chain().focus().setColor("#70CFF8").run();
              }}
              className={
                editor.isActive("textStyle", { color: "#70CFF8" })
                  ? "is-active p-1"
                  : "p-1"
              }
              data-testid="setBlue"
            >
              Blue
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                editor.chain().focus().setColor("#94FADB").run();
              }}
              className={
                editor.isActive("textStyle", { color: "#94FADB" })
                  ? "is-active p-1"
                  : "p-1"
              }
              data-testid="setTeal"
            >
              Teal
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                editor.chain().focus().setColor("#B9F18D").run();
              }}
              className={
                editor.isActive("textStyle", { color: "#B9F18D" })
                  ? "is-active p-1"
                  : "p-1"
              }
              data-testid="setGreen"
            >
              Green
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                editor.chain().focus().unsetColor().run();
              }}
              data-testid="unsetColor"
              className="p-1"
            >
              Unset color
            </button>
          </div>
        </div>
      )}
      <EditorContent editor={editor} className="h-full" />
    </div>
  );
};

export default RichTextEditor;
