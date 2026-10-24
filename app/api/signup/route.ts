import { randomBytes, scrypt as scryptCallback } from "node:crypto";
import { promisify } from "node:util";
import { NextResponse } from "next/server";

const scrypt = promisify(scryptCallback);

type SignupInput = {
  name?: unknown;
  email?: unknown;
  password?: unknown;
  phone?: unknown;
  address?: unknown;
};

type User = {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  phone: string;
  address: string;
};

const users: User[] = [];

function cleanString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

export async function POST(request: Request) {
  let input: SignupInput;

  try {
    input = (await request.json()) as SignupInput;
  } catch {
    return NextResponse.json({ error: "Request body must be valid JSON." }, { status: 400 });
  }

  const name = cleanString(input.name);
  const email = cleanString(input.email).toLowerCase();
  const password = typeof input.password === "string" ? input.password : "";
  const phone = cleanString(input.phone);
  const address = cleanString(input.address);

  if (!name || !email || !password || !phone || !address) {
    return NextResponse.json({ error: "All fields are required." }, { status: 400 });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Please provide a valid email address." }, { status: 400 });
  }

  if (password.length < 8) {
    return NextResponse.json({ error: "Password must be at least 8 characters." }, { status: 400 });
  }

  if (users.some((user) => user.email === email)) {
    return NextResponse.json({ error: "An account with this email already exists." }, { status: 409 });
  }

  const salt = randomBytes(16).toString("hex");
  const derivedKey = (await scrypt(password, salt, 64)) as Buffer;
  const user: User = {
    id: randomBytes(16).toString("hex"),
    name,
    email,
    passwordHash: `${salt}:${derivedKey.toString("hex")}`,
    phone,
    address,
  };

  users.push(user);

  return NextResponse.json(
    { user: { id: user.id, name: user.name, email: user.email, phone: user.phone, address: user.address } },
    { status: 201 },
  );
}
