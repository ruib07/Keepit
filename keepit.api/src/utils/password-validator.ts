import { ValidationError } from "../errors/validation.error.js";
import { Prisma } from "../generated/prisma/client.js";

export const passwordRegexPattern =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&\-_])[A-Za-z\d@$!%*?&\-_]{9,}$/;

export class PasswordValidator {
  static validate(password: string | Prisma.StringFieldUpdateOperationsInput) {
    const passwordStr = typeof password === "string" ? password : password.set;

    if (!passwordStr || !passwordRegexPattern.test(passwordStr)) {
      throw new ValidationError(
        "Password must have at least 9 characters, one uppercase letter, one lowercase letter, one number, and one special character (@$!%*?&).",
      );
    }
  }
}
