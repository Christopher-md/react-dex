import * as Yup from "yup";
import { IRequest } from "@/modules/auth/interfaces/ILogin";

export const validationSchema = Yup.object<Record<keyof IRequest, Yup.AnySchema>>({
    login: Yup.string()
        .trim()
        .required("Required")
        .matches(/^[a-zA-Z]+$/, "The login must contain only letters")
        .min(5, "Login must be at least 5 characters")
        .max(24, "Login must be at most 24 characters"),
    password: Yup.string()
        .trim()
        .required("Required")
        .matches(/^[a-zA-Z0-9]+$/, "Invalid character entered")
        .min(5, "Password must be at least 5 characters")
        .max(24, "Password must be at most 24 characters")
});
