"use client";

import posthog from "posthog-js";
import { PostHogProvider as PHProvider } from "posthog-js/react";
import React from "react";

if (typeof window !== "undefined") {
  const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
  const host = process.env.NEXT_PUBLIC_POSTHOG_HOST;
  
  if (key && key !== "your_project_key_here") {
    posthog.init(key, {
      api_host: host || "https://us.i.posthog.com",
      person_profiles: "identified_only",
      capture_pageview: false, // Pageviews handled manually
    });
  }
}

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  return <PHProvider client={posthog}>{children}</PHProvider>;
}
