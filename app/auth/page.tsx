"use client";
import { ArrowLeft } from "lucide-react";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Page() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError(null);
    try {
      setLoading(true)
      await signIn("google", { callbackUrl: "/" });
      setLoading(false);
    } catch (err) {
      console.log(err, "err in signing with google");
      setError("Failed to sign in with Google.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center p-8 bg-[#f2e2f5] dark:bg-[#160f15]  ">
      {/* Background Gradient & Noise */}

      {/* Back Button */}
      <div className="absolute left-4 top-4">
        <button
          onClick={() => router.push("/")}
          className="flex items-center cursor-pointer h-9 px-4 py-2 gap-2 rounded-md text-sm font-medium text-[#501854] hover:bg-[#f0cee5] transition-colors dark:text-white dark:bg-[#171016] dark:hover:bg-[#2d222c]"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Chat
        </button>
      </div>

      {/* Main Content */}
      <h1 className="mb-5 text-xl font-bold text-[#501854] dark:text-[#f9f8fb] flex items-center gap-2">
        Welcome to
        <Image
          src="/logo.png"
          alt="T3.chat"
          width={96}
          height={20}
          className="-mt-1 block dark:hidden"
        />
        {/* Dark logo */}
        <Image
          src="/darklogo.png"
          alt="T3.chat"
          width={96}
          height={20}
          className="-mt-1 hidden dark:block"
        />
      </h1>

      <div className="mb-8 text-center text-[#a74576] dark:text-[#e7d0dd]">
        <p>
          Sign in below (we&apos;ll increase your message limits if you do 😉)
        </p>
      </div>

      {/* Google Sign-In Button */}
      <div className="w-full max-w-sm">
        <button
          onClick={handleGoogleLogin}
          disabled={loading}
          className="flex items-center justify-center gap-3 w-full h-14 px-6 py-2 text-lg font-semibold text-white bg-[#a23b67] hover:bg-[#d56698] active:bg-[#a23b67] dark:bg-[#3a0f25] dark:text-white rounded-lg shadow transition-all hover:shadow-lg cursor-pointer backdrop-blur-sm"
        >
          <Image src="/google.png" alt="Google" width={24} height={24} />
          Continue with Google
        </button>
        {error && (
          <p className="mt-4 text-red-500 text-sm text-center">{error}</p>
        )}
      </div>

      {/* Terms */}
      <div className="mt-6 text-center text-sm text-[#a74576]/80 dark:text-[#93838d]">
        <p>
          By continuing, you agree to our{" "}
          <a href="/terms-of-service" className="hover:underline">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="/privacy-policy" className="hover:underline">
            Privacy Policy
          </a>
        </p>
      </div>
    </div>
  );
}
