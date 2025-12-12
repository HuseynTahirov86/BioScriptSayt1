'use client';

import { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';

export function ClientOnlyRandomActivity() {
  const [siteActivity, setSiteActivity] = useState<number | null>(null);

  useEffect(() => {
    // This effect runs only on the client, avoiding hydration mismatches.
    // It generates a pseudo-random number for display purposes.
    const newActivity = 2100 + Math.floor(Math.random() * 200);
    setSiteActivity(newActivity);
  }, []);

  return (
    <div className="flex h-[36px] items-center text-3xl font-bold">
      {siteActivity === null ? (
        <Loader2 className="h-6 w-6 animate-spin" />
      ) : (
        siteActivity.toLocaleString()
      )}
    </div>
  );
}
