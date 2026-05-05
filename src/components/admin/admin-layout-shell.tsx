"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";

import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { cn } from "@/lib/utils";

const mobileLinks = [
  { href: "/admin/dashboard", label: "Dashboard" },
  { href: "/admin/hero", label: "Hero" },
  { href: "/admin/services", label: "Services" },
  { href: "/admin/blogs", label: "Blogs" },
  { href: "/admin/enquiries", label: "Enquiries" },
  { href: "/admin/settings", label: "Settings" }
];

export function AdminLayoutShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const isLogin = pathname === "/admin/login";
  const [isChecking, setIsChecking] = useState(!isLogin);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    let mounted = true;

    async function checkAuth() {
      if (isLogin) {
        setIsChecking(false);
        return;
      }

      setIsChecking(true);

      try {
        const res = await fetch("/api/auth/me", {
          method: "GET",
          credentials: "include",
          cache: "no-store"
        });

        if (!mounted) return;

        if (!res.ok) {
          setIsAuthenticated(false);
          router.replace("/admin/login");
          return;
        }

        setIsAuthenticated(true);
      } catch {
        if (!mounted) return;
        setIsAuthenticated(false);
        router.replace("/admin/login");
      } finally {
        if (mounted) {
          setIsChecking(false);
        }
      }
    }

    checkAuth();

    return () => {
      mounted = false;
    };
  }, [isLogin, router, pathname]);

  if (isLogin) {
    return <div className="min-h-screen">{children}</div>;
  }

  if (isChecking || !isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <p className="text-sm text-muted-foreground">Checking admin access...</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar />
      <div className="min-w-0 flex-1">
        <div className="sticky top-0 z-20 bg-surface-bright/70 backdrop-blur-xl lg:hidden">
          <div className="flex gap-2 overflow-x-auto px-3 py-3">
            {mobileLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "whitespace-nowrap rounded-[0.75rem] px-3 py-1.5 text-xs font-medium ring-1 ring-outline-variant/15",
                  pathname === item.href
                    ? "bg-secondary-container text-secondary-foreground"
                    : "bg-surface-high text-muted-foreground"
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
        {children}
      </div>
    </div>
  );
}
