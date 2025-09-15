// app/api/auth/[...nextauth]/route.ts
export const runtime = "nodejs"; // 🔑 এই লাইনটা যোগ করো

import { handlers } from "@/lib/auth";

export const { GET, POST } = handlers;
