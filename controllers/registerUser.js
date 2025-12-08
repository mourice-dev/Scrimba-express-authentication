/** @format */

import validator from "validator";
import { getDBConnection } from "../db/db.js";

export async function registerUser(req, res) {
  let { name, email, username, password } = req.body;

  if (!name || !email || !username || !password) {
    return res.status(400).json({ error: "All fields are required." });
  }

  name = name.trim();
  email = email.trim();
  username = username.trim();

  if (!/^[a-zA-Z0-9_-]{1,20}$/.test(username)) {
    return res.status(400).json({
      error:
        "Username must be 1–20 characters, using letters, numbers, _ or -.",
    });
  }

  if (!validator.isEmail(email)) {
    return res.status(400).json({ error: "Invalid email format" });
  }

  try {
    const db = await getDBConnection();

    // Check if user exists
    const existingUser = await db.get(
      "SELECT * FROM users WHERE username = ? OR email = ?",
      [username, email]
    );
    console.log("Existing user:", existingUser);

    if (existingUser) {
      await db.close();
      return res
        .status(409)
        .json({ error: "Email or username already in use." });
    }

    console.log("Inserting user...");
    // Insert new user
    await db.run(
      "INSERT INTO users (name, email, username, password) VALUES (?, ?, ?, ?)",
      [name, email, username, password]
    );
    console.log("User inserted.");

    await db.close();
    return res.status(201).json({ message: "User registered" });
  } catch (err) {
    console.error("Registration error:", err.message);
    res.status(500).json({ error: "Registration failed. Please try again." });
  }
}

// /** @format */
// import validator from 'validator';

// export async function registerUser(req, res) {

//   let { name, email, username, password } = req.body;

//   /*
// Challenge:
// 1. Validate the incoming user data.
//   - Make sure all fields are present.
//   - Remove any whitespace where appropriate.
//   - Use regex /^[a-zA-Z0-9_-]{1,20}$/ to check the username contains only the allowed characters.
//   - Use the Validator package to check the email format is valid.

// If fields are not present, the username uses disallowed characters, or the email address is not of a valid format, end the response with a suitable code and send an error object with a suitable message. For example:

//    { error: 'All fields are required.' }

//   - Test with console.logs.

// hint.md for help!
// */
//   if (!name || !email || !username || !password) {
//     return res.status(400).json({ error: "All fields are required." });
//   }

//   name = name.trim();
//   email = email.trim();
//   username = username.trim();

//   if (! /^[a-zA-Z0-9_-]{1,20}$/.test(username)) {
//     return res.status(400).json({
//       error:
//         "Username must be 1–20 characters, using letters, numbers, _ or -.",
//     });

//   }

//   if (!validator.isEmail(email)) {
//     return res.status(400).json({
//       error:
//         "Invalid email"
//     });

//   }

// }
