"use client";

import { toast } from "sonner";

export default function TestToastButton() {
  return (
    <button
      onClick={() => toast.success("✅ Toast working perfectly!")}
      className="rounded-md bg-green-600 px-4 py-2 text-white font-medium"
    >
      Show Test Toast
    </button>
  );
}
