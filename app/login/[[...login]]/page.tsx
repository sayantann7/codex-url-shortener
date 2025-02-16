import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-7">
      <SignIn />
    </div>
  );
}
