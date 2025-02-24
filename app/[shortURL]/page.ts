import { redirect } from "next/navigation";
import clientPromise from "@/lib/mongodb";

export default async function Page({ params }) {
  const shorturl = (await params).shortURL;

  const client = await clientPromise;
  const db = client.db("url-shortener");
  const collection = db.collection("url");

  const doc = await collection.findOne({ shorturl: shorturl });
  console.log(doc);
  if (doc) {
    console.log("Redirecting to:", doc.url);
    redirect(doc.url);
  } else {
    console.log("Short URL not found, redirecting to home page");
    redirect(`http://localhost:3000/home`);
  }
}
