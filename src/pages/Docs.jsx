import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
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

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Placeholder from "@tiptap/extension-placeholder";
import { EditButtons } from "../components/EditButtons.jsx";

export function Docs() {
  const { user } = useAuth();
  const insert = useInsert("txs");
  const update = useUpdate("txs");
  const [newName, setNewName] = useState("");
  const [renamingItemId, setRenamingItemId] = useState(null);
  const list = useList("txs", { filter: { userId: user?.id } });
  const navigate = useNavigate()
  function handleRename(id) {
    setRenamingItemId(id);
  }

  function handleNameChange(event) {
    setNewName(event.target.value);
  }

  function handleRenameSubmit(item) {
    update.call(item.id, { name: newName });
    setRenamingItemId(null);
    setNewName("");
  }

  function getnames(item, index) {
    index += 1;
    function reste(itm) {
      update.call(itm.id, { uid: "none" });
    }
    function updateV() {
      list.data.map(reste);
      update.call(item.id, { uid: user.id });
      navigate("/STSaved");
    }
    if (!list.isLoading) {
      return (
        <div key={item.id} className = "grid outline outline-blue-700 outline-1 rounded-md">
          <Button className = "w-48 bg-blue-700 text-white m-4"onClick={updateV}color = {"blue"}>{item.name}</Button>
          {renamingItemId === item.id ? (
            <>
              <TextInput
                className="outline outline-blue-700 outline-1 rounded-md p-1 w-48 text-blue-700 mb-4 mr-4 ml-4"
                value={newName}
                onChange={handleNameChange}
                placeholder="Enter new name"
              />
              <Button
                className="outline outline-blue-700 outline-1 rounded-md p-1 w-48 bg-white text-blue-700 mb-4 mr-4 ml-4"
                style={{ fontSize: "12px" }} // Adjust the styles as needed
                color = {"blue"}
                onClick={() => handleRenameSubmit(item)}      >
                Save
              </Button>
            </>
          ) : (
            <Button
            className="outline hover:text-white outline-blue-700 outline-1 rounded-md p-1 w-48 bg-white text-blue-700 mb-4 mr-4 ml-4"
              style={{ fontSize: "12px"}} // Adjust the styles as needed
              onClick={() => handleRename(item.id)}
              color = {"blue"}
            >
              Rename
            </Button>
          )}
        </div>
      );
    }
  }

  function newDoc() {
    insert.call({
      userId: user?.id,
      name: "Untitled Document",
      body: "",
    });
  }

  if (list?.isLoading) {
    return <Spinner />;
  }

  return (
    <div className="grid gap-4 m-4">
      <Button onClick={newDoc} className = "bg-blue-700" color = {"blue"}>New Document</Button>
      <div className="grid auto-cols-max grid-flow gap-4 grid-cols-3">
        {list.data.map(getnames)}
      </div>
    </div>
  );
}
