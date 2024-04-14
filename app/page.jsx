"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

// Define the Home component
export default function Home() {
  const router = useRouter();
  useEffect(() => {
    router.push("/sign_in");
  }, []);
  return <main className="  min-h-screen"></main>;
}
