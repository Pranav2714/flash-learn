import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <main className="flex items-center h-screen w-full justify-center">
      <SignUp />
    </main>
  );
}
