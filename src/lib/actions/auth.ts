"use server";

import bcrypt from "bcryptjs";
import { db } from "@/lib/db";

export async function registerUser(
  _prevState: { error?: string; success?: boolean } | undefined,
  formData: FormData,
) {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");

  if (name.length < 2) return { error: "Enter your full name." };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { error: "Enter a valid email." };
  if (password.length < 8) return { error: "Password must be at least 8 characters." };

  const existing = await db.user.findUnique({ where: { email } });
  if (existing) return { error: "An account with this email already exists." };

  const hashed = await bcrypt.hash(password, 10);
  await db.user.create({
    data: { name, email, password: hashed, role: "USER" },
  });

  return { success: true };
}