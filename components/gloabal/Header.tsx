import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

export default function HomePageHeader() {
  return (
    <header className="w-full p-4 flex justify-between gap-4 items-center">
      <Link href={"/"}>
        <h1 className="text-2xl font-bold">TravelAI</h1>
      </Link>
      <div className="flex justify-between items-center gap-4">
        <SignedOut>
          <Button>
            <Link href={"/sign-in"}>SignIn</Link>
          </Button>
        </SignedOut>
        <SignedIn>
          <Button asChild variant={"default"}>
            <Link href={"/generate"}>Get Started</Link>
          </Button>
          <UserButton />
        </SignedIn>
      </div>
    </header>
  );
}
