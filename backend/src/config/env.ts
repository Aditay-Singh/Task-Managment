import dotenv from "dotenv";

dotenv.config();

export const ACCESS_SECRET = process.env.ACCESS_SECRET as string;
export const REFRESH_SECRET = process.env.REFRESH_SECRET as string;