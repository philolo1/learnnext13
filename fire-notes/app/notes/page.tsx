import Link from "@/node_modules/next/link";
import CreateNote from "./CreateNote";

async function getNotes() {
  const res = await fetch(
    "http://127.0.0.1:8090/api/collections/notes/records",
    { cache: "no-store" },
  );
  const data = await res.json();
  return data?.items;
}

export default async function NotesPage() {
  const notes = await getNotes();

  return (
    <div>
      <h1>Notes 2</h1>
      <div className="flex flex-col gap-4 mt-4">
        {notes?.map((note) => {
          return <Note key={note.id} note={note} />;
        })}
      </div>
      <CreateNote />
    </div>
  );
}

function Note({ note }: any) {
  const { id, title, content, created } = note || {};

  return (
    <Link href={`/notes/${id}`}>
      <div className="flex flex-col border p-5 border-black rounded-lg border-solid gap-2 drop-shadow max-w-xl">
        <h2 className="text-xl">{title}</h2>
        <h4 className="text-sm whitespace-pre-wrap ">
          {content.replace("\\n", "\n")}
        </h4>
        <p className="text-xs">{created}</p>
      </div>
    </Link>
  );
}
