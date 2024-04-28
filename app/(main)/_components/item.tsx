"use client"

import { ChevronDown, ChevronRight, LucideIcon, Plus } from "lucide-react";

import { Id } from "@/convex/_generated/dataModel";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface ItemsProps {
  id?: Id<"documents">;
  documentIcon?: string;
  active?: boolean;
  expanded?: boolean;
  isSearch?: boolean;
  level?: number;
  onExpand?: () => void;
  label: string;
  onClick: () => void;
  icon: LucideIcon;
}

export const Item = ({
  id,
  label,
  onClick,
  active,
  icon: Icon,
  documentIcon,
  isSearch,
  level = 0,
  onExpand,
  expanded,
}: ItemsProps) => {

  const router = useRouter();
  const create = useMutation(api.documents.create);

  const handleExpand = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.stopPropagation();
    onExpand?.();
  }

  const onCreate = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.stopPropagation();
    if (!id) return;
    const promise = create({ title: "Sem título", parentDocument: id })
      .then((documentId) => {
        if (!expanded) {
          onExpand?.();
        }
        // router.push(`/documents/${documentId}`);
      })
    toast.promise(promise, {
      loading: "Criando nova nota",
      success: "Nova nota criada",
      error: "Falha ao criar nova nota"
    });
  };

  const ChevronIcon = expanded ? ChevronDown : ChevronRight;

  return (
    <div
      onClick={onClick}
      role="button"
      style={{
        paddingLeft: level ? `${level * 12 + 12}px` : "12px"
      }}
      className={cn(
        "group min-h-[27px] text-sm py-1 pr-3 w-full hover:bg-primary/5 flex items-center to-muted-foreground",
        active && "bg-primary/5 text-primary "
      )}
    >
      {!!id && (
        <div
          role="button"
          className=" h-full rounded-sm hover:bg-neutral-300 dark:bg-neutral-600 mr-1"
          onClick={handleExpand}
        >
          <ChevronIcon className="h-4 w-4 shrink-0 to-muted-foreground/50"></ChevronIcon>
        </div>
      )}

      {documentIcon ? (
        <div className="shrink-0 h-[18px] mr-2 to-muted-foreground">
          {documentIcon}
        </div>
      ) : (
        <Icon className="shrink-0 h-[18px] mr-2 to-muted-foreground"></Icon>
      )}

      <span className="truncate">
        {label}
      </span>

      {isSearch && (
        <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px]">
          <span className="text-xs">Ctrl+P</span>
        </kbd>
      )}

      {!!id && (
        <div
          role="button"
          onClick={onCreate}
          className="ml-auto flex items-center gap-x-2 "
        >
          <div className="opacity-0 group-hover:opacity-100 h-full ml-auto rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600">
            <Plus className="h-4 w-4 to-muted-foreground" />
          </div>
        </div>
      )}

    </div>
  );
}

Item.Skeleton = function ItemSkeleton({ level }: { level?: number }) {
  return (
    <div
      style={{
        paddingLeft: level ? `${(level * 12) + 25}px` : "12px"
      }}
      className="flex gap-x-2 py-[3px]"
    >
      <Skeleton className="h-4 w-4" />
      <Skeleton className="h-4 w-[30%]" />
    </div>
  )
}
