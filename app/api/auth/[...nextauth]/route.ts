<<<<<<< HEAD
import { handlers } from "@/lib/auth";
=======
// app/api/auth/[...nextauth]/route.ts
export const runtime = "nodejs"; // 🔑 এই লাইনটা যোগ করো

import { handlers } from "@/lib/auth";

>>>>>>> deploy/courses-v1
export const { GET, POST } = handlers;
