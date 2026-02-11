"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { supabase } from "@/lib/supabase";
export function AnalyticsTracker() {
    const pathname = usePathname();
    useEffect(() => {
        const logView = async () => {
            try {
                await supabase.from("analytics_events").insert({
                    event_name: "page_view",
                    path: pathname,
                    metadata: {
                        referrer: document.referrer,
                        userAgent: navigator.userAgent,
                    },
                });
            } catch (error) {
                console.error("Analytics error:", error);
            }
        };
        const timer = setTimeout(logView, 1000);
        return () => clearTimeout(timer);
    }, [pathname]);
    return null;
}
