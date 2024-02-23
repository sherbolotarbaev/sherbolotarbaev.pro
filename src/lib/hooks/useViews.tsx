"use client";

import React from "react";
import * as API from "@/../_api";

interface ViewsHook {
  views: string;
  isLoading: boolean;
}

export function useViews(): ViewsHook {
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [countViews, setCountViews] = React.useState<number>(0);

  React.useEffect(() => {
    const fetchViews = async () => {
      try {
        const count = await API.views.addViews();

        setCountViews(count);
      } catch (e: any) {
        console.error("Failed to fetch views", e);
      } finally {
        setIsLoading(false);
      }
    };

    fetchViews();
  }, []);

  const number = new Number(countViews);

  return {
    views: `${number.toLocaleString()} views`,
    isLoading,
  };
}
