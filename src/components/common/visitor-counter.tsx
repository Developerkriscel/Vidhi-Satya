"use client";

import { useEffect, useState } from "react";

const VISITOR_MARK_KEY = "vidhisatya_visitor_mark_date";

type VisitorResponse = {
  success?: boolean;
  data?: {
    count?: number;
  };
};

export function VisitorCounter() {
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    let active = true;

    const getTodayMark = () => new Date().toISOString().slice(0, 10);

    const fetchCount = async (method: "GET" | "POST") => {
      const response = await fetch("/api/visitor-count", {
        method,
        cache: "no-store"
      });
      const payload = (await response.json()) as VisitorResponse;
      return payload?.data?.count ?? 0;
    };

    const syncVisitorCount = async () => {
      try {
        const todayMark = getTodayMark();
        const savedMark = window.localStorage.getItem(VISITOR_MARK_KEY);

        if (savedMark !== todayMark) {
          const updated = await fetchCount("POST");
          if (!active) return;
          setCount(updated);
          window.localStorage.setItem(VISITOR_MARK_KEY, todayMark);
          return;
        }

        const current = await fetchCount("GET");
        if (!active) return;
        setCount(current);
      } catch {
        if (!active) return;
        setCount(0);
      }
    };

    void syncVisitorCount();

    return () => {
      active = false;
    };
  }, []);

  return (
    <p className="inline-flex items-center gap-2 rounded-[0.7rem] border border-[#68BA7F]/45 bg-[#68BA7F]/16 px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.15em] text-[#CFFFDC] shadow-[0_8px_22px_rgba(104,186,127,0.14)]">
      Visitors
      <span className="rounded bg-[#68BA7F] px-2 py-0.5 text-[11px] font-extrabold text-[#183124]">
        {count.toLocaleString("en-IN")}
      </span>
    </p>
  );
}
