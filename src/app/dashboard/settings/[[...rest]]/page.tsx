"use client";

import SettingsTab from "@/shared/components/tabs/settings.tabs";
import useGetMembership from "@/shared/hooks/useGetMembership";
import useSettingsFilter from "@/shared/hooks/useSettingsFilter";
import { UserProfile } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { ICONS } from "@/shared/utils/icons";

const Page = () => {
  const { activeItem } = useSettingsFilter();
  const { data } = useGetMembership();
  const [apiKey, setApiKey] = useState("");

  useEffect(() => {
    const storedKey = Cookies.get("api_key");
    if (!storedKey) {
      generateApiKeyHandler();
    } else {
      setApiKey(storedKey);
    }
  }, []);

  const generateApiKeyHandler = async () => {
    try {
      const res = await fetch("/api/generate-api-key", { method: "POST" });
      const { key } = await res.json();
      Cookies.set("api_key", key);
      setApiKey(key);
    } catch {
      toast.error("Failed to generate API key");
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(apiKey).then(() => {
      toast.success("Copied");
    });
  };

  const handleRegenerateApiKey = async () => {
    try {
      const res = await fetch("/api/regenerate-api-key", { method: "POST" });
      const { key } = await res.json();
      Cookies.set("api_key", key);
      setApiKey(key);
      toast.success("API Key updated!");
    } catch {
      toast.error("Failed to regenerate API key");
    }
  };

  return (
    <div className="w-[85%] p-5">
      <SettingsTab />

      {activeItem === "Customize Profile" && (
        <div className="w-full flex justify-center">
          {/* If you don't use catch-all route, add routing="hash" */}
          <UserProfile routing="hash" />
        </div>
      )}

      {activeItem === "API Access" && (
        <div className="w-full flex flex-col items-center">
          {data?.plan === "LAUNCH" ? (
            <h3>Please update your subscription plan to get API access.</h3>
          ) : (
            <>
              <h3>API KEY:</h3>
              <textarea
                readOnly
                value={apiKey}
                className="w-full h-32 p-3 font-mono text-sm text-gray-800 bg-gray-100 border border-gray-300 rounded-md resize-none overflow-auto focus:outline-none"
              ></textarea>
              <div className="flex items-center">
                <div
                  className="h-[38px] w-[90px] rounded my-3 cursor-pointer bg-[#DFE7FF] flex items-center justify-center"
                  onClick={handleCopy}
                >
                  <span className="text-lg">{ICONS.copy}</span>
                  <span className="pl-1">Copy</span>
                </div>
                <div
                  className="h-[38px] w-[120px] ml-4 rounded my-3 cursor-pointer bg-[#DFE7FF] flex items-center justify-center"
                  onClick={handleRegenerateApiKey}
                >
                  <span className="text-lg">{ICONS.regenerate}</span>
                  <span className="pl-1">Regenerate</span>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Page;
