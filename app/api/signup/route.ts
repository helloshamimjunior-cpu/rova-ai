<<<<<<< HEAD
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();
=======
// app/api/signup/route.ts
export const runtime = "nodejs"; // ✅ bcryptjs চলবে

import { NextResponse } from "next/server";
import { hash } from "bcryptjs";
import { prisma } from "@/lib/prisma"; // একটাই শেয়ার্ড ক্লায়েন্ট ব্যবহার
>>>>>>> deploy/courses-v1

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();
<<<<<<< HEAD
    if (!email || !password) {
      return NextResponse.json({ error: "Email and password required" }, { status: 400 });
=======

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password required" },
        { status: 400 }
      );
>>>>>>> deploy/courses-v1
    }

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 });
    }

    const hashed = await hash(password, 10);
<<<<<<< HEAD
    const user = await prisma.user.create({
      data: { name, email, passwordHash: hashed },
    });

    return NextResponse.json({ user });
  } catch {
=======

    const user = await prisma.user.create({
      data: { name, email, passwordHash: hashed },
      select: { id: true, name: true, email: true, createdAt: true }, // নিরাপত্তার জন্য
    });

    return NextResponse.json({ user }, { status: 201 });
  } catch (err) {
    console.error("signup error", err);
>>>>>>> deploy/courses-v1
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
