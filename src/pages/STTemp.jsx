import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Placeholder from "@tiptap/extension-placeholder";
import { EditButtons } from "../components/EditButtons.jsx";
//import Link from "@tiptap/extension-link";
import { useState } from "react";
import { TextInput, Button } from "flowbite-react";
const suggestions = [
  { typea: "Writing Outline", titlae: "Hook", bodya: "Write a hook for the essay! This could be a quote, a common saying, or a startling fact. Get your reader enganged." },
  { typea: "tysaaafffpe", titlae: "adddbc", bodya: "ooohhdsadnoo" },
  { typea: "tyadpe", titlae: "afffbc", bodya: "oaaaaoohhnoo" },
];
export function STTemp() {
  //const [text, setText] = useState("");
  const editor = useEditor({
    extensions: [StarterKit, Underline, Placeholder],
  });
  function abc(item){
    return(<div className= "bg-blue-300 w-48 text-white p-3">
      <div className = "text-6lg font-bold">{item.titlae}</div><div className = "italic">Type: {item.typea}</div><div>{item.bodya}</div></div>)
  }
  return (
    <div className="App grid grid-cols-2">
      <div className = "flex gap-4 flex-col">
        {suggestions.map(abc)}  
      </div>
      <div>
      <h1>Text Editor</h1>
      
      <EditButtons editor={editor} />
      <br />
      <div class="outline outline-4 outline-blue-500 p-3" onPaste={console.log("dont paste AI written essays. If you think this was a mistake, contact your teacher")}>
        <EditorContent editor={editor} />
      </div>
      </div>
    </div>
  );
}
