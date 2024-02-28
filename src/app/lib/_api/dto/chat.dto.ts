export interface CreateChatDto {
  title: string;
}

type ConversationRole = "USER" | "ASSISTANT" | "SYSTEM";

export interface CreateConversationDto {
  role: ConversationRole;
  content: string;
}
