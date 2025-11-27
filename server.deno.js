import { serveDir } from "jsr:@std/http/file-server";

Deno.serve(async (req) => {
  const pathname = new URL(req.url).pathname;
  const url = new URL(req.url);
  const id = url.searchParams.get("id");
  const like = url.searchParams.get("like");
  console.log(pathname);
  
  // //検索機能
 if (req.method === "GET" && pathname === "/api" && id) {
    
    const kv = await Deno.openKv();
    const entry = await kv.get(["userId", id]);

    return new Response(JSON.stringify(entry.value), {headers: {"Content-Type": "application/json"}});
  }

  //登録機能
  if (req.method === "POST" && pathname === "/api/save-data") {
    const data = await req.json();
    console.log("POSTデータ:", data);
    const kv = await Deno.openKv();
    //UUID生成
    const myUUID = id||crypto.randomUUID();
    console.log("Random UUID:", myUUID);
    await kv.set(["userId", `${myUUID}`], data);
    return new Response(myUUID);
  }

  if(req.method === "GET" && pathname === "/all-data"){
    const kv = await Deno.openKv();
    const allData=[];
  if(like){
  for await (const entry of kv.list({ prefix: ["userId"] })) {
    if (entry.value.likes === like) {
      allData.push(entry);
    }
  }
  }else {
    for await (const entry of kv.list({prefix: ["userId"]})) {
      allData.push(entry);
    }
    }
    return new Response(JSON.stringify(allData), {headers: {"Content-Type": "application/json"}});
  }

  return serveDir(req, {
    fsRoot: "public",
    urlRoot: "",
    showDirListing: true,
    enableCors: true,
  });
});