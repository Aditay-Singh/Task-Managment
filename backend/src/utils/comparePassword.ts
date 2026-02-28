import bcrypt from "bcrypt";

export const comparePassword = async (
  password: string,
  hashed: string
) => {
  return await bcrypt.compare(password, hashed);
};