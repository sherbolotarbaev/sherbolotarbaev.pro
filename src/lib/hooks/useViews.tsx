"use client";

import React from "react";
import * as API from "@/../api";

interface ViewsHook {
  count: number;
}

export function useViews(): ViewsHook {
  const [views, setViews] = React.useState<number>(0);

  React.useEffect(() => {
    const fetchViews = async () => {
      const count = await API.views.getViews();
      setViews(count);
    };

    fetchViews();
  }, []);

  return {
    count: views,
  };
}
