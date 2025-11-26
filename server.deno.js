import { serveDir } from "jsr:@std/http/file-server";

Deno.serve(async (req) => {
  const pathname = new URL(req.url).pathname;
  const url = new URL(req.url);
  const id = url.searchParams.get("id");
  console.log(pathname);
  
  // //検索機能
 if (req.method === "GET" && pathname === "/api" && id) {
    
    const kv = await Deno.openKv();
    await kv.set(["userId", "0"], { name: "Alice", like: 1010100 });
    const entry = await kv.get(["userId", id]);
    console.log("GETデータ:", entry);
    return new Response(JSON.stringify(entry.value));
  }

  //登録機能
  if (req.method === "POST" && pathname === "/api/save-data") {
    const data = await req.json();
    console.log("POSTデータ:", data);
    const kv = await Deno.openKv();
    const myUUID = crypto.randomUUID();
    console.log("Random UUID:", myUUID);
    await kv.set(["userId", `${myUUID}`], data);
    return new Response(myUUID);
  }


  return serveDir(req, {
    fsRoot: "public",
    urlRoot: "",
    showDirListing: true,
    enableCors: true,
  });
});