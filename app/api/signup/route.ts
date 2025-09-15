import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();
    if (!email || !password) {
      return NextResponse.json({ error: "Email and password required" }, { status: 400 });
    }

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 });
    }

    const hashed = await hash(password, 10);
    const user = await prisma.user.create({
      data: { name, email, passwordHash: hashed },
    });

    return NextResponse.json({ user });
  } catch {
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
