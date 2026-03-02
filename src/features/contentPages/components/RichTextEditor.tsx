import { useEffect, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import { Button } from "../../../components/customControl/Button";
import {
  Undo,
  Redo,
  Bold,
  Italic,
  Strikethrough,
  List,
  ListOrdered,
  Link as LinkIcon,
} from "lucide-react";

interface Props {
  value: string;
  onChange: (html: string) => void;
}

export const RichTextEditor = ({ value, onChange }: Props) => {
  const [, forceUpdate] = useState({});

  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({
        openOnClick: false,
      }),
    ],
    content: value,
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
    onTransaction: () => {
      forceUpdate({});
    },
  });

  // sync khi load edit mode
  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value);
    }
  }, [value, editor]);

  if (!editor) return null;

  const setLink = () => {
    const url = prompt("Enter URL");
    if (!url) return;
    editor.chain().focus().setLink({ href: url }).run();
  };

  const activeBtn = "!bg-gray-200 !text-gray-900";

  return (
    <div className="flex flex-col flex-1 border border-transparent rounded-b-2xl overflow-hidden">
      {/* Toolbar */}
      <div className="px-4 py-2 border-b border-gray-100 flex items-center gap-1 bg-white">
        {/* Undo / Redo */}
        <Button
          variant="toolbar"
          onClick={() => editor.chain().focus().undo().run()}
        >
          <Undo size={14} />
        </Button>

        <Button
          variant="toolbar"
          onClick={() => editor.chain().focus().redo().run()}
        >
          <Redo size={14} />
        </Button>

        {/* Bold / Italic / Strike */}
        <Button
          variant="toolbar"
          className={editor.isActive("bold") ? activeBtn : ""}
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          <Bold size={14} />
        </Button>

        <Button
          variant="toolbar"
          className={editor.isActive("italic") ? activeBtn : ""}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          <Italic size={14} />
        </Button>

        <Button
          variant="toolbar"
          className={editor.isActive("strike") ? activeBtn : ""}
          onClick={() => editor.chain().focus().toggleStrike().run()}
        >
          <Strikethrough size={14} />
        </Button>

        {/* Bullet list */}
        <Button
          variant="toolbar"
          className={editor.isActive("bulletList") ? activeBtn : ""}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        >
          <List size={14} />
        </Button>

        {/* Ordered list */}
        <Button
          variant="toolbar"
          className={editor.isActive("orderedList") ? activeBtn : ""}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        >
          <ListOrdered size={14} />
        </Button>

        {/* Link */}
        <Button
          variant="toolbar"
          className={editor.isActive("link") ? activeBtn : ""}
          onClick={setLink}
        >
          <LinkIcon size={14} />
        </Button>
      </div>

      {/* Editor Container*/}
      <div
        className="flex-1 w-full bg-white cursor-text"
        onClick={() => editor.chain().focus().run()}
      >
        <EditorContent
          editor={editor}
          className="w-full h-full p-6 text-gray-600 leading-relaxed min-h-[450px]
               outline-none focus:outline-none ring-0 border-0 [&>.ProseMirror]:min-h-full [&>.ProseMirror]:outline-none"
        />
      </div>
    </div>
  );
};
