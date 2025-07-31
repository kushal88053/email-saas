"use client";

import Link from "next/link";
import { Button } from "@heroui/react";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

const Toolbar = () => {
  return (
    <div className="flex items-center gap-4">
      <Button color="primary">Start Trial</Button>

      <SignedIn>
        <Link href="/dashboard">
          <UserButton />
        </Link>
      </SignedIn>

      <SignedOut>
        <Link href="/sign-in" className="text-blue-600 hover:underline">
          Login
        </Link>
      </SignedOut>
    </div>
  );
};

export default Toolbar;
