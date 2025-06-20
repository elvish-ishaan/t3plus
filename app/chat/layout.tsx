"use client";

import Sidebar from "@/components/Sidebar/Sidebar";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Layout({children}: {children: React.ReactNode}) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [threads, setThreads] = useState<Thread[]>([]);

  useEffect(() => {
    const fetchThreads = async () => {
      const res = await axios.get("/api/chat/threads");
      setThreads(res.data?.threads);
    };
    fetchThreads();
  }, [])
  
  return (
    <div className="relative bg-[#f2e6f5] dark:bg-[#1d131a] h-screen overflow-hidden flex">
      {/* Sidebar */}
      <div className="hidden md:block">
        <Sidebar
          threads={threads}
          setThreads={setThreads}
          isCollapsed={isCollapsed}
          setIsCollapsed={setIsCollapsed}
        />
      </div>

      {/* Main Content */}
      <div
        className={`flex-1 transition-all duration-300 h-screen ${
          !isCollapsed ? "md:mt-3.5" : ""
        }`}
      >
        {children}
      </div>
    </div>
  );
}
