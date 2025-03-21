"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/admin/ui/button";
import {
  LayoutDashboard,
  Film,
  Building,
  Calendar,
  BookText,
  Settings,
  AlignJustify,
  ChevronLeft,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const menuItems = [
  { name: "首頁", icon: LayoutDashboard, path: "/admin" },
  { name: "電影管理", icon: Film, path: "/admin/movies" },
  { name: "影城管理", icon: Building, path: "/admin/theaters" },
  { name: "場次管理", icon: Calendar, path: "/admin/showtimes" },
  { name: "訂單管理", icon: BookText, path: "/admin/bookings" },
  { name: "設定", icon: Settings, path: "/admin/settings" },
];

export default function Sidebar() {
  const [expanded, setExpanded] = useState(true);
  const pathname = usePathname();

  return (
    <aside className="h-screen bg-gray-900">
      <nav className="h-full flex flex-col bg-gray-900 shadow-sm">
        <div className="p-4 pb-2 flex justify-end items-center">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setExpanded((curr) => !curr)}
            className="text-gray-300 hover:text-white hover:bg-gray-800"
          >
            {expanded ? <ChevronLeft /> : <AlignJustify />}
          </Button>
        </div>

        {expanded && (
          <div className="flex-1 px-3">
            {menuItems.map(({ name, icon: Icon, path }) => {
              const isActive = pathname === path;
              return (
                <Link
                  key={name}
                  href={path}
                  className={cn(
                    "flex items-center py-3 px-3 my-1 rounded-lg cursor-pointer",
                    "transition-colors group",
                    isActive
                      ? "bg-gray-800 text-white"
                      : "text-gray-400 hover:bg-gray-800 hover:text-white"
                  )}
                >
                  <Icon className="w-6 h-6" />
                  <span
                    className={cn(
                      "overflow-hidden transition-all",
                      expanded ? "w-40 ml-3" : "w-0"
                    )}
                  >
                    {name}
                  </span>
                </Link>
              );
            })}
          </div>
        )}
      </nav>
    </aside>
  );
}
