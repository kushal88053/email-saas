"use client";

import { deleteEmail } from "@/actions/delete.email";
import { getEmails } from "@/actions/get.emails";
import { ICONS } from "@/shared/utils/icons";
import { useClerk } from "@clerk/nextjs";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export const Write = () => {
  const [emailTitle, setEmailTitle] = useState("");
  const [emails, setEmails] = useState<any>([]);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { user } = useClerk();

  const handleCreate = () => {
    if (emailTitle.length === 0) {
      toast.error("Enter the email subject to continue!");
    } else {
      const formattedTitle = emailTitle.replace(/\s+/g, "-").replace(/&/g, "-");
      router.push(`/dashboard/new-email?subject=${formattedTitle}`);
    }
  };

    useEffect(() => {
      FindEmails();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);

    const FindEmails = async () => {
      await getEmails({ newsLetterOwnerId: user?.id! })
        .then((res :any) => {
          setEmails(res);
        })
        .catch((error : any) => {
          console.log(error);
        });
    };

    const deleteHanlder = async (id: string) => {
      await deleteEmail({ emailId: id }).then((res :any) => {
        FindEmails();
      });
    };

  return (
    <div className="w-full flex p-5 flex-wrap gap-6 relative">
      <div
        className="w-[200px] h-[200px] bg-slate-50 flex flex-col items-center justify-center rounded border cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <span className="text-2xl block text-center mb-3">{ICONS.plus}</span>
        <h5 className="text-2xl">Create New</h5>
      </div>

      {/* saved emails */}
      {emails &&
        emails.map((i: any) => {
          const formattedTitle = i?.title
            ?.replace(/\s+/g, "-")
            .replace(/&/g, "-");
          return (
            <div
              key={i?._id}
              className="w-[200px] h-[200px] z-[0] relative bg-slate-50 flex flex-col items-center justify-center rounded border cursor-pointer"
            >
              <span
                className="absolute block z-20 right-2 top-2 text-2xl cursor-pointer"
              onClick={() => deleteHanlder(i?._id)}
              >
                {ICONS.delete}
              </span>
              <Link
                href={`/dashboard/new-email?subject=${formattedTitle}`}
                className="text-xl"
              >
                {i.title}
              </Link>
            </div>
          );
        })}

      {open && (
        <div className="fixed inset-0 flex items-center justify-center bg-[#00000028] z-50">
          <div className="w-[600px] p-5 bg-white rounded shadow relative">
            <button
              className="absolute top-3 right-3 text-lg"
              onClick={() => setOpen(false)}
            >
              {ICONS.cross}
            </button>

            <h5 className="text-2xl mb-2">Enter your Email subject</h5>

            <input
              type="text"
              className="border w-full h-[35px] px-2 outline-none"
              value={emailTitle}
              onChange={(e) => setEmailTitle(e.target.value)}
            />

            <Button
              color="primary"
              className="rounded text-xl mt-3"
              onClick={handleCreate} // use onClick, not onPress
            >
              Continue
            </Button>
          </div>
        </div>
      )}

    </div>
  );
};

