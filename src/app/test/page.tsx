"use client";

import { useState } from "react";

export default function TestPage() {
  const [count, setCount] = useState(0);

  return (
    <main className="flex min-h-svh flex-col items-center justify-center gap-4">
      <h1 className="text-2xl font-bold">Client JS Test</h1>
      <p className="text-5xl font-extrabold text-primary">{count}</p>
      <button
        onClick={() => setCount(count + 1)}
        className="rounded-full bg-primary px-6 py-3 font-bold text-primary-foreground"
      >
        Klik saya!
      </button>
    </main>
  );
}