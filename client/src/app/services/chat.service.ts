import { ChatMessage } from "@nx-chat-assignment/shared-models";
import { API_URL } from "../constants/httpRequest";

export const fetchChatHistory = async (currentUserId: string, selectedUserId: string): Promise<ChatMessage[]> => {
  try {
    const response = await fetch(`${API_URL}/messages/history/${currentUserId}/${selectedUserId}`);
    if (!response.ok) {
      throw new Error("Failed to fetch chat history");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching chat history:", error);
    return [];
  }
};
