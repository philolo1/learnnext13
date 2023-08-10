"use client";

import { useRouter } from "@/node_modules/next/router";
import { useState } from "react";

export default function CreateNote() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const create = async () => {
    await fetch("http://127.0.0.1:8090/api/collections/notes/records", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        content,
      }),
    });

    setTitle("");
    setContent("");
  };

  return (
    <form className="mt-5" onSubmit={create}>
      <h3 className="text-xl">Create a new Note</h3>

      <div className="flex flex-col">
        <label>Title:</label>
        <input
          className="p-2 border mt-2"
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label className="mt-2">Content:</label>
        <textarea
          placeholder="Content"
          className="p-2 border mt-2"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
      <button
        className="mt-3 bg-blue-500 p-2 rounded-md text-white"
        type="submit"
      >
        Create note
      </button>
    </form>
  );
}
