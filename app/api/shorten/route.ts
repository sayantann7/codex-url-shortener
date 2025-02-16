import clientPromise from "@/lib/mongodb";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log("🔄 Received request body:", body);

    const client = await clientPromise;
    console.log("✅ MongoDB client connected!");

    const db = client.db("url-shortener");
    const collection = db.collection("url");

    console.log("🔄 Checking if short URL exists...");
    const doc = await collection.findOne({ shorturl: body.shorturl });
    if (doc) {
      console.warn("⚠️ Short URL already exists!");
      return new Response(
        JSON.stringify({ success: false, error: true, message: "URL already exists!" }),
        { status: 400 }
      );
    }

    console.log("🔄 Inserting new URL...");
    const result = await collection.insertOne({
      url: body.url,
      shorturl: body.shorturl,
    });

    console.log("✅ Inserted URL:", result);
    return new Response(
      JSON.stringify({ success: true, error: false, message: "URL Generated Successfully" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ Error in POST route:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return new Response(
      JSON.stringify({ success: false, error: true, message: "Internal Server Error, Error: " + errorMessage }),
      { status: 500 }
    );
  }
}