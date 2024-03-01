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

export function TodoListDatabase() {
  const { register, handleSubmit, reset } = useForm();
  const { user } = useAuth();
  let DEFAULT_TASKS = { complete: false, task: "abccc", userId: "hhh" };
  if (user) DEFAULT_TASKS.userId = user.id;

  //const list = useList("todos");
  const list = useList("txs", { filter: { userId: user?.id } }); // (Uncomment this to only show todos by the registered user (filters todos to only show ones where the userID in the todo matches the current user))
  const insert = useInsert("txs");
  const removeAll = useRemoveAll("txs");
  usePreload("txs", DEFAULT_TASKS);

  //useInitialize will populate 'todos' with default tasks if it is empty

  function add(data) {
    // Add a task to the list
    insert.call({ task: data.task, complete: false, userId: user.id }); // Insert the task into the database
    reset(); // Reset (clear) the form
  }
  function clear() {
    removeAll.call(list); // Remove all items from the database
  }

  // If the user isn't logged in, return a message to login
  if (!user) return <div>Please login to use Todo List Database</div>;

  // If the list is loading, return a spinner component
  if (list.isLoading)
    return (
      <div>
        <Spinner />
      </div>
    );

  // If neither of the above return statements have run, it will use this return statement and return the full app
  return (
    <div className="grid justify-center">
      <div className="text-xl font-medium text-center">Todo List Database</div>
      <h6>
          {list.data?[0].task}
      </h6>  
    </div>
  );
}
