import { Button } from "flowbite-react";
import { LoginModal } from "../components/LoginModal";
import { SignupModal } from "../components/SignupModal";
export function HomePage() {
  return (
    <div>
      <div className="flex flex-col justify-center bg-white dark:bg-gray-800 text-black dark:text-white">
        <div className="text-xl text-center my-3">Welcome to DraftApp</div>
        <div className="flex justify-center">
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            alt="DraftApp Logo"
            style={{ width: "200px", height: "auto" }} // Adjust width as needed
          />
        </div>

        <div>
          DraftApp is your smart writing companion! To get started, make an
          account to start editing a document.
        </div>
      </div>
    </div>
  );
}
