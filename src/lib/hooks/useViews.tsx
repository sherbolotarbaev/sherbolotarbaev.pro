"use client";

import React from "react";
import * as API from "@/../api";

interface ViewsHook {
  views: string;
}

export function useViews(): ViewsHook {
  const [countViews, setCountViews] = React.useState<number>(0);

  React.useEffect(() => {
    const fetchViews = async () => {
      const [count] = await Promise.all([
        API.views.getViews(),
        API.views.addViews(),
      ]);

      setCountViews(count);
    };

    fetchViews();
  }, []);

  const number = new Number(countViews);

  return {
    views: `${number.toLocaleString()} views`,
  };
}
