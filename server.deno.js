import { serveDir } from "jsr:@std/http/file-server";

Deno.serve(async (req) => {
  const pathname = new URL(req.url).pathname;
  console.log(pathname);

  if (req.method === "GET" && pathname === "/welcome-message") {
    const kv = await Deno.openKv();  // DBを開く（または新規作成）

    // 値を保存（または更新）
    await kv.set(["user", "alice"], { name: "Alice", age: 30 });

    // 値を取得
    const entry = await kv.get(["user", "alice"]);

    return new Response(JSON.stringify(entry.value));
  }

  return serveDir(req, {
    fsRoot: "public",
    urlRoot: "",
    showDirListing: true,
    enableCors: true,
  });
});