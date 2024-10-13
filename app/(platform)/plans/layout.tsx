import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";

const FormLayoutPage = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full flex flex-col w-full">
      <header className="w-full z-50 flex justify-between p-4 bg-background border-b shadow-xl">
        <Link href={"/"}>
          <h1 className="text-2xl font-bold">TravelAI</h1>
        </Link>
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <div className="flex justify-between gap-3 items-center">
            <Link href={"/plans"}>
              <Button>View all plans</Button>
            </Link>
            <UserButton />
          </div>
        </SignedIn>
      </header>
      {children}
    </div>
  );
};

export default FormLayoutPage;
