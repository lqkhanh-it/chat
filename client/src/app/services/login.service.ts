import { User } from "@nx-chat-assignment/shared-models";
import { API_URL } from "../constants/httpRequest";

export const loginUser = async (username: string): Promise<User> => {
  try {
    const response = await fetch(API_URL + "/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username }),
    });

    if (!response.ok) {
      const message = await response.json();
      throw new Error(message?.error || "Login failed");
    }

    const res = await response.json();
    if (res === null || res.error) {
      throw new Error("User already logged in");
    }

    return res;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};

export const Logout = async (userid: string): Promise<string> => {
  try {
    const response = await fetch(API_URL + "/auth/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userid }),
    });

    if (!response.ok) {
      const message = await response.json();
      throw new Error(message?.error || "Logout failed");
    }

    const res = await response.json();
    return res?.message || "Logout successful";
  } catch (error) {
    console.error("Error logging out:", error);
    throw error;
  }
};