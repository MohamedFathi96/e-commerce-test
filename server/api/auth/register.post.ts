import { defineEventHandler, readBody, createError } from "h3";
import { User } from "~/server/types/server.type";
import bcrypt from "bcrypt";

const users = new Map();

export default defineEventHandler(async (event) => {
  try {
    const body = (await readBody(event)) as User;
    console.log(body);
    if (!body.email || !body.password) {
      throw createError({
        statusCode: 400,
        statusMessage: "Invalid input: Name, email, and password are required.",
      });
    }

    const hashedPassword = await bcrypt.hash(body.password, 10);
    const user: User = {
      id: crypto.randomUUID(),
      name: body.name,
      email: body.email,
      password: hashedPassword,
    };

    // Check if user already exists
    if (Array.from(users.values()).some((u) => u.email === body.email)) {
      throw createError({
        statusCode: 409,
        statusMessage: "User with this email already exists.",
      });
    }

    users.set(user.id, user);

    return {
      id: user.id,
      message: "Registration successful",
    };
  } catch (error: any) {
    return createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || "Something went wrong!!!",
    });
  }
});
