"use client";

import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/cjs/styles/prism";

import { type Message } from "ai";

import { AiSvg, UserSvg } from "@/app/lib/assets/svg";
import styles from "@/app/components/styles/message.module.scss";

interface Props {
  message: Message;
}

export default function Message({ message, ...props }: Props) {
  const assistant = message.role === "assistant";

  return (
    <>
      <div className={styles.wrapper} {...props}>
        <span
          className={styles.logo}
          style={
            assistant
              ? {
                  background: "#fafafa",
                }
              : undefined
          }>
          {assistant ? (
            <AiSvg style={{ fontSize: "1.45rem" }} />
          ) : (
            <UserSvg style={{ fontSize: "1.45rem", fill: "#fff" }} />
          )}
        </span>

        {assistant ? (
          <Markdown
            rehypePlugins={[rehypeRaw]}
            remarkPlugins={[remarkGfm]}
            components={{
              code({ node, inline, className, children, ...props }: any) {
                const match = /language-(\w+)/.exec(className || "");
                return !inline && match ? (
                  <SyntaxHighlighter
                    style={dracula}
                    PreTag="div"
                    language={match[1]}
                    showLineNumbers
                    {...props}>
                    {String(children).replace(/\n$/, "")}
                  </SyntaxHighlighter>
                ) : (
                  <code className={className} {...props}>
                    {children}
                  </code>
                );
              },
            }}
            className={styles.container}>
            {message.content}
          </Markdown>
        ) : (
          <div className={styles.container}>
            <p>{message.content}</p>
          </div>
        )}
      </div>
    </>
  );
}
