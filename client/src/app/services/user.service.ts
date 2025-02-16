import { User } from "@nx-chat-assignment/shared-models";
import { API_URL } from "../constants/httpRequest";

export const fetchOnlineUsers = async (): Promise<User[]> => {
  try {
    const response = await fetch(API_URL + "/users/online");
    if (!response.ok) {
      throw new Error("Failed to fetch online users");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching online users:", error);
    return [];
  }
};