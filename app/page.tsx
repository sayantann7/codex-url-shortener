import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-7">
      <h1 className="text-6xl">Welcome to my URL Shortener</h1>
      <p className="text-2xl">This is a URL shortener built with Next.js. You can use it to shorten your URLs.</p>
      <Link href="/home"><button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Shorten</button></Link>
    </div>
  );
}
