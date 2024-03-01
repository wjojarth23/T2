import React from "react";
import { Button, Label, TextInput, Checkbox, Modal } from "flowbite-react";
import { useForm } from "react-hook-form";
import { useAuth } from "../hooks/useAuth";

export function LoginModal() {
  const [isOpen, setOpenModal] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const { register, handleSubmit, reset } = useForm();
  const { adminLogin, login, logout, error, clear } = useAuth();

  async function onSubmit(data) {
    setIsLoading(true);
    const { admin, ...rest } = data;
    const response = admin ? await adminLogin(rest) : await login(rest);
    setIsLoading(false);
    if (response) return hide();
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
      <Button size="sm" color="gray" onClick={show}>
        Login
      </Button>
      <Modal dismissible show={isOpen} onClose={hide} size="sm">
        <Modal.Header>Login</Modal.Header>
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
              autoComplete="current-password"
              {...register("password")}
            />
            {error && (
              <div className="text-red-600">Failed to authenticate</div>
            )}
            <div className="flex mt-3 items-center gap-2">
              <Button
                className="flex-1"
                type="submit"
                isProcessing={isLoading}
                disabled={isLoading}
              >
                Login
              </Button>
              <Checkbox id="remember" {...register("Teacher")} />
              <Label htmlFor="remember">Teacher</Label>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
}
