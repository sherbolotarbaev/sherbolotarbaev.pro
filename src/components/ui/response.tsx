"use client";

import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/cjs/styles/prism";

import { useAtom } from "jotai";
import { responseAtom, textAtom } from "@/lib/utils/store";

import Logo from "./logo";
import aiLogo from "@/../public/ai.jpeg";
import styles from "../styles/response.module.scss";

export default function Response() {
  const [response] = useAtom(responseAtom);
  const [text] = useAtom(textAtom);

  return response && response.length > 0 ? (
    <>
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <p>
            <strong>You: </strong>

            <br />

            {text}
          </p>
        </div>

        <Logo alt="AI" src={aiLogo} />

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
          {response}
        </Markdown>
      </div>
    </>
  ) : null;
}
