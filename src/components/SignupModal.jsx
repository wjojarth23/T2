import React from "react";
import { Button, Label, TextInput, Checkbox, Modal } from "flowbite-react";
import { useForm } from "react-hook-form";
import { useAuth } from "../hooks/useAuth";

export function SignupModal() {
  const [isOpen, setOpenModal] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const { signup, error, clear } = useAuth();
  const { register, handleSubmit, reset } = useForm();

  async function onSubmit(data) {
    setIsLoading(true);
    const success = await signup(data);
    setIsLoading(false);
    if (success) hide();
  }

  function show() {
    setOpenModal(true);
  }
  function hide() {
    reset();
    clear();
    setOpenModal(false);
  }

  return (
    <div>
      <Button className="bg-blue-700 text-white" size="sm" onClick={show}>
        Signup
      </Button>

      <Modal dismissible show={isOpen} onClose={hide} size="sm">
        <Modal.Header>Signup</Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit(onSubmit)} className="grid gap-2">
            <Label>Email:</Label>
            <TextInput
              type="email"
              autoComplete="email"
              {...register("email")}
            />
            <Label>Password:</Label>
            <TextInput
              type="password"
              autoComplete="new-password"
              {...register("password")}
            />
            <Label>Confirm Password:</Label>
            <TextInput
              type="password"
              autoComplete="new-password"
              {...register("passwordConfirm")}
            />
            <div style={{ display: "flex", alignItems: "center" }}>
              <Checkbox id="remember" {...register("Teacher")} />
              <Label htmlFor="remember" style={{ marginLeft: "5px" }}>
                Teacher
              </Label>
            </div>
            <Button type="submit" isProcessing={isLoading} disabled={isLoading}>
              Create New User
            </Button>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
}
