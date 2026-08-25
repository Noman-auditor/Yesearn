"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Users, Trophy, Bell, Settings, User } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Profile", href: "/profile", icon: User },
  { name: "Community", href: "/community", icon: Users },
  { name: "Leaderboard", href: "/leaderboard", icon: Trophy },
  { name: "Notifications", href: "/notifications", icon: Bell },
  { name: "Settings", href: "/settings", icon: Settings },
];

export default function DashboardSidebar() {
  const pathname = usePathname();
  return (
    <>
      <aside className="hidden md:flex flex-col w-64 h-screen sticky top-0 border-r border-white/10 p-4 space-y-2">
        {navItems.map((item) => (
          <Link key={item.name} href={item.href} className={cn(
            "flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-colors",
            pathname === item.href ? "bg-white/10 text-white" : "text-gray-400 hover:bg-white/5 hover:text-white"
          )}>
            <item.icon className="h-5 w-5" /> {item.name}
          </Link>
        ))}
      </aside>
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#0A0A0B]/90 backdrop-blur-xl border-t border-white/10 flex justify-around py-2">
        {navItems.map((item) => (
          <Link key={item.name} href={item.href} className={cn(
            "p-2 rounded-lg flex flex-col items-center text-[10px]",
            pathname === item.href ? "text-purple-400" : "text-gray-500"
          )}>
            <item.icon className="h-5 w-5 mb-1" />
          </Link>
        ))}
      </nav>
    </>
  );
}