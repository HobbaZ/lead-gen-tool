import { useState } from "react";
import { auth } from "../lib/firebase";

export default function useValidatePassword() {
  const [passwordMessage, setPasswordMessage] = useState<string | null>(null);

  const checkPassword = async (passwordFromUser: string) => {
    let statusMessage = "";

    try {
      if (passwordFromUser !== "") {
        const needsLowerCase = !/[a-z]/.test(passwordFromUser);
        const needsUpperCase = !/[A-Z]/.test(passwordFromUser);
        const needsNumber = !/[0-9]/.test(passwordFromUser);
        const needsSpecial = !/[^A-Za-z0-9]/.test(passwordFromUser);
        const minLength = passwordFromUser.length < 8;

        if (minLength) {
          statusMessage += "❌ Password needs to be at least 8 characters \n";
        }

        if (needsLowerCase) {
          statusMessage +=
            "❌ Password needs to include a lower case letter \n";
        }

        if (needsUpperCase) {
          statusMessage +=
            "❌ Password needs to include an upper case letter \n";
        }

        if (needsNumber) {
          statusMessage += "❌ Password needs to include a number \n";
        }

        if (needsSpecial) {
          statusMessage +=
            "❌ Password needs to include a special character. E.g. ^ $ * . [ ] { } ( ) ? ! @ # % & / , > < ' : ; | _ ~ \n";
        }

        if (statusMessage !== "") {
          setPasswordMessage(statusMessage);
        } else {
          setPasswordMessage(null);
        }
      }
      return { passwordMessage };
    } catch (error: unknown) {
      if (error instanceof Error) {
        `❌ An error occured when trying to validate password: ${error.message}`;
      }
    }
  };
  return { checkPassword, passwordMessage };
}
