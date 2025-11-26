import { serveDir } from "jsr:@std/http/file-server";

Deno.serve(async (req) => {
  const pathname = new URL(req.url).pathname;
  console.log(pathname);
  const user = pathname.slice(1);

  
  //検索機能
  if (req.method === "GET" && pathname === `/${userId}`) {
    
    const kv = await Deno.openKv();
    await kv.set(["userId", "0"], { name: "Alice", like: 1010100 });
    const entry = await kv.get(["userId", `${userId}`]);

    return new Response(JSON.stringify(entry.value));
  }

  //登録機能
  if (req.method === "POST" && pathname === "/save-data") {
    const data = await req.json();
    console.log("POSTデータ:", data);
    const kv = await Deno.openKv();
    //createUserID

    await kv.set(["userId", `${userId}`], data);
    return new Response("Data saved successfully");
  }


  return serveDir(req, {
    fsRoot: "public",
    urlRoot: "",
    showDirListing: true,
    enableCors: true,
  });
});