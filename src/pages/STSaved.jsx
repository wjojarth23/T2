import React from "react";
import { useForm } from "react-hook-form";
import { TextInput, Checkbox, Button, Label, Spinner } from "flowbite-react";
import { useAuth } from "../hooks/useAuth";
import {
  useList,
  useInsert,
  useUpdate,
  useRemove,
  useRemoveAll,
  usePreload,
  useFind,
} from "../hooks/database";
let lod = false;
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Placeholder from "@tiptap/extension-placeholder";
import { EditButtons } from "../components/EditButtons.jsx";
//import Link from "@tiptap/extension-link";
import { useState } from "react";

export function STSaved() {
  const { register, handleSubmit, reset } = useForm();
  const { user } = useAuth();
  const [grade, setGrade] = useState({'prog':0,'feedback':null});
  let DEFAULT_TASKS = { name: "UntitledDoc", body: "abccc", userId: "hhh" };
  if (user) DEFAULT_TASKS.userId = user.id;
  const update = useUpdate("txs");
  //const list = useList("todos");
  let currentdoc = 0;
  //if (user) currentdoc = user.currentdoc;
  const list = useList("txs", { filter: { userId: user?.id, uid: user?.id } });
  console.log(list); // (Uncomment this to only show todos by the registered user (filters todos to only show ones where the userID in the todo matches the current user))
  //const insert = useInsert("txs");
  //const removeAll = useRemoveAll("txs");

  //useInitialize will populate 'todos' with default tasks if it is empty
  let txx = "";
  //let txx = list.data[0].body;
  //console.log("<<<>>>");
  //console.log(txx);
  const editor = useEditor({
    extensions: [StarterKit, Underline, Placeholder],
  });

  function xys() {
    let obj = editor.getJSON();
    console.log(obj);
    fetch("https://flqz6g-3000.csb.app/gradeAssignment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setGrade(data);
      });
  }
  if (!list.isLoading) {
    if (lod == false) {editor.commands.setContent(list.data[currentdoc].body);
    lod = true;
    console.log({lod})
    }
  }
  function save() {
    console.log("hmmm");
    const dat = editor.getHTML();
    update.call(list.data[currentdoc].id, { body: dat });
  }
  function aaa(item) {
    return (
      <div className="outline outline-1 rounded-md w-48 text-blue-700 p-3">
        <div className="text-6lg font-bold">{item.title}</div>
        <div>{item.body}</div>
      </div>
    );
  }
  //let prs = { handleClick: { save }, editor: { editor } };
  if (list.isLoading)
    return (
      <div>
        <Spinner />
      </div>
    );
  return (
    <div>
      <br/>
      <div class="w-full h-4 mb-4 bg-gray-200 rounded-full dark:bg-gray-700">
        <div class="h-4 bg-blue-600 rounded-full dark:bg-blue-500" style = {{width: `${grade['prog']}%`}}></div>
      </div>
      <div className="App flex grid-cols-2 gap-4 ">
        <div>
            <Button color={"red"} onClick={save} className="w-48">Save</Button>
            <br/>
            <Button color = {"blue"} className = "w-48"onClick={xys}>Get Writing Help</Button>
            <br/>
            <div className="flex gap-4 flex-col">{grade["feedback"] && grade["feedback"].map(aaa)}</div>
        </div>
        <div className="w-full">
          <EditButtons editor={editor} />
          <br />
          <div class="outline outline-1 rounded outline-blue-500 p-3 width-96 rounded-md" style = {{width: "100%"}}>
            <EditorContent editor={editor} />
          </div>
        </div>
      </div>
    </div>
  );
}
/* {`width: ${grade && grade['p']}%`}
{`width: ${grade && grade['p']}%`} */