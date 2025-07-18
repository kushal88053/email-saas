"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@heroui/react";
// import { useUser } from "@clerk/nextjs";

const Toolbar = () => {
  // Uncomment if you use Clerk for authentication
  // const { user } = useUser();

  return (
    <div className="flex items-center gap-4">
      <Button color="primary" >
        Start Trial
      </Button>
      <Button color="primary">Button</Button>
      {/*
      {user ? (
        <Link href="/dashboard" className="flex items-center gap-2">
          <Image
            src={user?.imageUrl || "/default-avatar.png"}
            alt="User Avatar"
            width={40}
            height={40}
            className="rounded-full"
          />
        </Link>
      ) : (
        <Link href="/sign-in" className="text-blue-600 hover:underline">
          Login
        </Link>
      )}
      */}
    </div>
  );
};

export default Toolbar;
