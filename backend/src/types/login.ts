import * as z from "zod";
import { LoginSuccsesObjectSchema } from "../schema/user.schema.ts";

export type LoginSuccessObject = z.infer<typeof LoginSuccsesObjectSchema>;