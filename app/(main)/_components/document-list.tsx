"use client"

import { api } from "@/convex/_generated/api";
import { Doc, Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { Item } from "./item";
import { cn } from "@/lib/utils";
import { FileIcon } from "lucide-react";

interface DocumentListProps {
  parentDocumentId?: Id<"documents">;
  level?: number;
  data?: Doc<"documents">[];
}

export const DocumentLit = ({
  parentDocumentId,
  level = 0,
}: DocumentListProps) => {
  const params = useParams();
  const router = useRouter();
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const onExpand = (documentId: string) => {
    setExpanded(prevExpanded => ({
      ...prevExpanded,
      [documentId]: !prevExpanded[documentId]
    }));
  };

  const documents = useQuery(api.documents.getSideBar, {
    parentDocument: parentDocumentId
  });

  const onRedirect = (documentId: string) => {
    router.push(`/documents/${documentId}`);
  };

  if (documents === undefined) {
    return (
      <>
        <Item.Skeleton level={level}></Item.Skeleton>
        {level === 0 && (
          <>
            <Item.Skeleton level={level}></Item.Skeleton>
            <Item.Skeleton level={level}></Item.Skeleton>
          </>
        )}
      </>
    )
  }

  return (
    <>
      <p
        style={{
          paddingLeft: level ? `${(level * 12 + 25)}px` : undefined
        }}
        className={cn(
          "hidden text-sm font-medium to-muted-foreground/80",
          expanded && "last:block",
          level === 0 && "hidden"
        )}
      >
        Sem páginas internas
      </p>

      {documents.map((document) => (
        <div key={document._id}>
          <Item
            id={document._id}
            onClick={() => onRedirect(document._id)}
            label={document.title}
            icon={FileIcon}
            documentIcon={document.icon}
            active={params.documentId === document._id}
            level={level}
            onExpand={() => onExpand(document._id)}
            expanded={expanded[document._id]}
          >
          </Item>

          {expanded[document._id] && (
            <DocumentLit
              parentDocumentId={document._id}
              level={level + 1}
            ></DocumentLit>
          )}

        </div>
      ))}
    </>
  );
}

