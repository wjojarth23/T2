import { Editor } from "@tiptap/react";
import { TextInput, Button } from "flowbite-react";
export const EditButtons = ({ editor }) => {
  if (!editor) {
    return null;
  }
  //define color palette
  const buttonColor = "blue";
  const actionColor = "red";
  return (
    <div className="grid grid-cols-3 gap-4 ">
      <Button
        color={buttonColor}
        className = "w-32"
        onClick={() => editor.chain().focus().toggleBold().run()}
      >
        <strong>B</strong>
      </Button>
      <Button
        color={buttonColor}
        className = "w-32"
        onClick={() => editor.chain().focus().toggleItalic().run()}
      >
        <em>I</em>
      </Button>
      <Button
        color={buttonColor}
        className = "w-32"
        onClick={() => editor.chain().focus().toggleUnderline().run()}
      >
        <u>U</u>
      </Button>
    </div>
  );
};
