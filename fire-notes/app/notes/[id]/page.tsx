async function getNode(nodeId: string) {
  debugger;
  const res = await fetch(
    `http://127.0.0.1:8090/api/collections/notes/records/${nodeId}`,
    {
      next: { revalidate: 10 },
    },
  );

  const data = await res.json();
  return data;
}

export default async function NotePage({ params }: { params: { id: string } }) {
  const note = await getNode(params.id);
  return (
    <div className="flex flex-col border p-5 border-black rounded-lg border-solid gap-2 drop-shadow">
      <h1 className="text-xs">notes/{note.id}</h1>
      <div className="flex flex-col text-xl gap-3">
        <h3>{note.title}</h3>
        <h5 className="text-sm whitespace-pre-wrap">
          {note.content.replace("\\n", "\n")}
        </h5>
        <p className="text-xs">{note.created}</p>
      </div>
    </div>
  );
}
