/** @format */

// ===== Check if user is signed in =====
export async function checkAuth() {
  try {
    const res = await fetch("api/auth/me");

    if (res.ok) {
      const data = await res.json();
      return data.user.name; // Return the user's name
    } else {
      return null; // Not logged in
    }
  } catch (err) {
    console.log(err, "Auth check failed");
    return null;
  }
}

// ===== Greet user or guest =====

export function renderGreeting(username) {
  const greeting = username ? `Welcome, ${username}!` : "Welcome, Guest!";
  document.getElementById("greeting").textContent = greeting;
}

// ===== Only display logout button if logged in, else display log in/sign in options =====

export function showHideMenuItems(username) {
  const isLoggedIn = username;
  document.getElementById("login").style.display = isLoggedIn
    ? "none"
    : "inline";
  document.getElementById("signup").style.display = isLoggedIn
    ? "none"
    : "inline";
  document.getElementById("logout-btn").style.display = isLoggedIn
    ? "inline"
    : "none";
}
