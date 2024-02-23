"use client";

import React from "react";
import * as API from "../../../_api";

import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Image from "@tiptap/extension-image";
import { EditorContent, useEditor } from "@tiptap/react";

import { filesAtom, responseAtom, textAtom } from "@/lib/utils/store";
import { useRecordVoice } from "@/lib/hooks/useRecordVoice";
import { useAtom } from "jotai";
import { errorNotification } from "@/lib/utils/notification";

import {
  createParser,
  ParsedEvent,
  ReconnectInterval,
} from "eventsource-parser";

import {
  // ImageSvg,
  LoadSvg,
  MickroPhone,
  SendSvg,
  StopSvg,
} from "@/lib/assets/svg";
import styles from "../styles/conversation.module.scss";

type Booleans = {
  isLoading: boolean;
  isStreaming: boolean;
  isButtonDisabled: boolean;
  isTranscoding: boolean;
};

export default function Conversation() {
  const [_response, setResponse] = useAtom(responseAtom);
  const [_text, setText] = useAtom(textAtom);
  // const [_files, setFiles] = useAtom(filesAtom);

  const { recording, audioBlob, startRecording, stopRecording } =
    useRecordVoice();

  const [message, setMessage] = React.useState<string>("");
  const [error, setError] = React.useState<string | null>(null);

  // const [images, setImages] = React.useState<File[] | null>(null);

  const [booleans, setBooleans] = React.useState<Booleans>({
    isLoading: false,
    isStreaming: false,
    isButtonDisabled: false,
    isTranscoding: false,
  });

  const editor = useEditor({
    autofocus: true,
    editable: true,
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: "Message ChatGPT...",
      }),
      Image.configure({
        inline: true,

        HTMLAttributes: {
          class: "editor_image",
        },
      }),
    ],
    editorProps: {
      attributes: {
        class: "editor",
      },
      // handleKeyDown: (view, event) => {
      //   if (event.key === "Backspace" || event.key === "Delete") {
      //     const { state } = view;
      //     const { from, to } = state.selection;
      //     const pos = event.key === "Backspace" ? from : to;
      //     const offset = view.domAtPos(pos).offset;
      //     const node = state.doc.nodeAt(offset);

      //     if (node?.type.name === "image") {
      //       const tr = view.state.tr.delete(from, to);
      //       view.dispatch(tr);

      //       setImages((prevImages) => {
      //         const updatedImages = prevImages ? [...prevImages] : [];
      //         const imageIndex = updatedImages.findIndex(
      //           (img) => img.name === node.attrs.alt
      //         );
      //         if (imageIndex !== -1) {
      //           updatedImages.splice(imageIndex, 1);
      //         }
      //         return updatedImages;
      //       });
      //     }
      //   }
      // },
    },
    onUpdate: ({ editor }) => {
      setMessage(editor.getText());
    },
  });

  // const fileInputRef = React.useRef<HTMLInputElement>(null);
  // const audioRef = React.useRef<HTMLAudioElement | null>(null);

  // const setFile = React.useCallback(() => {
  //   if (editor) {
  //     fileInputRef.current?.click();
  //   }
  // }, [editor]);

  // const onImageSelected = React.useCallback(
  //   async (e: React.ChangeEvent<HTMLInputElement>) => {
  //     if (
  //       editor &&
  //       e.target.files &&
  //       e.target.files.length > 0 &&
  //       e.target.files.length <= 5
  //     ) {
  //       const files = e.target.files;
  //       const newImages = Array.from(files);

  //       setImages((prevImages) => [...(prevImages || []), ...newImages]);

  //       for (const file of newImages) {
  //         editor
  //           .chain()
  //           .focus()
  //           .setImage({
  //             src: URL.createObjectURL(file),
  //             alt: file.name,
  //             title: file.name,
  //           })
  //           .run();
  //       }
  //     } else if (
  //       (e.target.files && e.target.files.length > 5) ||
  //       (images && images.length >= 5)
  //     ) {
  //       errorNotification("Please select up to 5 images");
  //       e.target.value = "";
  //       return;
  //     }
  //   },
  //   [editor]
  // );

  // const handlePlayAudio = (audioUrl: string) => {
  //   if (audioRef.current) {
  //     audioRef.current.pause();
  //     audioRef.current.src = audioUrl;
  //     audioRef.current.play();
  //   }
  // };

  const newConversation = async (text: string) => {
    if (!text || text.length < 2 || text.length > 8192) {
      errorNotification(`Invalid text for AI: ${text}`);
      return;
    }

    editor?.commands.clearContent();

    setText(text);
    setResponse("");
    setError(null);
    setBooleans((prevState) => ({
      ...prevState,
      isLoading: true,
      isStreaming: true,
      isButtonDisabled: true,
    }));

    const onParse = (event: ParsedEvent | ReconnectInterval) => {
      if (event.type === "event") {
        const data = event.data;
        try {
          const text = JSON.parse(data).text ?? "";
          setResponse((prev) => prev + text);
        } catch (e: any) {
          console.error(e);
        }
      }
    };

    // const formData = new FormData();
    // formData.append("text", text);
    // if (images) {
    //   setFiles(images);

    //   for (const image of images) {
    //     formData.append("files", image);
    //   }
    // }

    try {
      const response = await fetch("/api/openai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
        credentials: "include",
      });

      if (response.ok) {
        const reader = response.body?.getReader()!;
        const decoder = new TextDecoder("utf-8");
        const parser = createParser(onParse);

        const processStream = async () => {
          let done = false;

          while (!done) {
            const { done: doneReading, value } = await reader.read();
            done = doneReading;
            const chunk = decoder.decode(value);
            parser.feed(chunk);
          }

          setBooleans((prevState) => ({
            ...prevState,
            isStreaming: false,
            isButtonDisabled: false,
          }));
        };
        processStream();
      } else {
        setError(await response.text());
        setBooleans((prevState) => ({
          ...prevState,
          isStreaming: false,
          isButtonDisabled: false,
        }));
      }
    } catch (e: any) {
      console.error(e);
      setError("Server Temporarily Unavailable");
    } finally {
      setBooleans((prevState) => ({
        ...prevState,
        isLoading: false,
      }));
    }
  };

  React.useEffect(() => {
    if (!message || message.length < 2 || message.length > 8192) {
      setBooleans((prevState) => ({
        ...prevState,
        isButtonDisabled: true,
      }));
    } else
      setBooleans((prevState) => ({
        ...prevState,
        isButtonDisabled: false,
      }));
  }, [message]);

  React.useEffect(() => {
    if (audioBlob) {
      const speechToText = async () => {
        setBooleans((prevState) => ({
          ...prevState,
          isTranscoding: true,
        }));

        try {
          const transcript = await API.chatGpt.transcribeAudio(audioBlob);

          setMessage(transcript);
          editor?.chain().focus().setContent(transcript).run();
        } catch (e: any) {
          console.error(e);
          setError(`Server Temporarily Unavailable: ${e.msg}`);
        } finally {
          setBooleans((prevState) => ({
            ...prevState,
            isTranscoding: false,
          }));
        }
      };

      speechToText();
    }
  }, [audioBlob]);

  return (
    <div className={styles.conversation}>
      {error && (
        <div className={styles.text}>
          <div className={styles.error}>{error}</div>
        </div>
      )}

      <div className={styles.form}>
        <div className={styles.icons}>
          {/* <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple={true}
            aria-hidden="true"
            disabled={images && images.length >= 5 ? true : false}
            style={{ display: "none" }}
            onChange={onImageSelected}
          />

          <ImageSvg
            className={
              images && images.length >= 5
                ? `${styles.icon} ${styles.disabled}`
                : styles.icon
            }
            style={{ fontSize: "1.45rem" }}
            onClick={setFile}
          /> */}

          {!recording && !booleans.isTranscoding ? (
            <MickroPhone
              className={styles.icon}
              onClick={startRecording}
              style={{ fontSize: "1.55rem", fill: "#444" }}
            />
          ) : booleans.isTranscoding ? (
            <LoadSvg
              className={`${styles.icon} ${styles.load}`}
              style={{ fontSize: "1.55rem", fill: "#444" }}
            />
          ) : (
            <StopSvg
              className={styles.icon}
              onClick={stopRecording}
              style={{ fontSize: "1.55rem", fill: "red" }}
            />
          )}
        </div>

        <EditorContent editor={editor} className={styles.editor} />

        <div className={styles.icons}>
          {booleans.isButtonDisabled && !booleans.isLoading ? (
            <SendSvg
              className={`${styles.icon} ${styles.disabled}`}
              style={{
                fontSize: "1.55rem",
                fill: "#444",
              }}
            />
          ) : booleans.isLoading ? (
            <LoadSvg
              className={`${styles.icon} ${styles.load}`}
              style={{ fontSize: "1.55rem", fill: "#444" }}
            />
          ) : (
            <SendSvg
              className={styles.icon}
              style={{
                fontSize: "1.55rem",
                fill: "#fafafa",
              }}
              onClick={() => newConversation(message)}
            />
          )}
        </div>
      </div>

      {/* <audio ref={audioRef}>
        <source type="audio/mpeg" />
      </audio> */}
    </div>
  );
}
