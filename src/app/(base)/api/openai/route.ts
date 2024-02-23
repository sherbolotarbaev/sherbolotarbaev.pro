import { OpenAIStream, OpenAIStreamPayload } from "@/lib/utils/openai";

export const config = {
  runtime: "edge",
};

async function handler(requset: Request): Promise<Response> {
  if (!process.env.OPEN_AI_SECRET_KEY) {
    return new Response("Missing ENV: OPEN_AI_SECRET_KEY", { status: 400 });
  }

  const { text } = (await requset.json()) as {
    text?: string;
  };

  if (!text) {
    return new Response("No text in the request", { status: 400 });
  }

  const payload: OpenAIStreamPayload = {
    model: "gpt-4",
    messages: [
      { role: "user", content: text! },
      {
        role: "system",
        content: `Imagine you're an AI functioning as my personal Jarvis, your name is Jarvis, and you can call me Sher, assisting me in various tasks. Answer very shortly and clearly. Use Markdown since I'm using react-markdown for formatting. Additionally, you can use emojis.`,
      },
    ],
    temperature: 0.7,
    max_tokens: 1000,
    stream: true,
  };

  const stream = await OpenAIStream(payload);
  return new Response(stream, {
    headers: new Headers({
      "Cache-Control": "no-cache",
    }),
  });
}

export { handler as POST };
