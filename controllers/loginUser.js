/** @format */

import { getDBConnection } from "../db/db.js";

export async function loginUser(req, res) {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ error: "Username and password are required." });
  }

  try {
    const db = await getDBConnection();
    const user = await db.get("SELECT * FROM users WHERE username = ?", [
      username,
    ]);
    await db.close();

    if (!user) {
      return res.status(401).json({ error: "Invalid credentials." });
    }

    // In a real app, you should compare hashed passwords using bcrypt
    if (user.password !== password) {
      return res.status(401).json({ error: "Invalid credentials." });
    }

    // Set session
    req.session.user = {
      id: user.id,
      username: user.username,
      name: user.name,
      email: user.email,
    };

    return res.json({ message: "Login successful", user: req.session.user });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}
