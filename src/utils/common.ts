import { compare } from "bcrypt";

export const isCorrectPassword = async (
  oldPassword: string,
  currentPassword: string,
) => await compare(oldPassword, currentPassword);
