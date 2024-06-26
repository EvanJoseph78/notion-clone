"use client";

import {
  BlockNoteEditor,
  PartialBlock
} from "@blocknote/core";

import "@blocknote/core/style.css"
import { useTheme } from "next-themes";

import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/core/fonts/inter.css";
import "@blocknote/mantine/style.css";

import { useEdgeStore } from "@/lib/edgstore";

interface EditorProps {
  onChange: (value: string) => void;
  initialContent?: string;
  editable?: boolean;
};

const isValidJSON = (str: string): boolean => {
  try {
    JSON.parse(str);
    return true;
  } catch (e) {
    return false;
  }
};

const Editor = ({
  onChange,
  initialContent,
  editable
}: EditorProps) => {
  const { resolvedTheme } = useTheme();
  const { edgestore } = useEdgeStore();

  const handleUpload = async (file: File) => {
    const response = await edgestore.publicFiles.upload({
      file,
    });

    return response.url;
  };

  let parsedContent: PartialBlock[] | undefined = undefined;

  if (initialContent && isValidJSON(initialContent)) {
    parsedContent = JSON.parse(initialContent) as PartialBlock[];
  } else if (initialContent) {
    console.error("Invalid initialContent JSON:", initialContent);
  }

  const editor: BlockNoteEditor = useCreateBlockNote({
    initialContent: parsedContent,
    uploadFile: handleUpload,
  });

  return (
    <div>
      <BlockNoteView
        editable={editable}
        editor={editor}
        theme={resolvedTheme === "dark" ? "dark" : "light"}
        onChange={() => onChange(JSON.stringify(editor.document))}
      />
    </div>
  );
};

export default Editor;
