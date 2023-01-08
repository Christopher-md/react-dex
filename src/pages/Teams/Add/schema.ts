import * as Yup from "yup";
import { IFields } from "@/modules/teams/interfaces/IAdd";

export const validationSchema = Yup.object<Record<keyof IFields, Yup.AnySchema>>({
    name: Yup.string()
        .trim()
        .required("Required"),
    division: Yup.string()
        .trim()
        .required("Required"),
    foundationYear: Yup.number()
        .required("Required")
        .min(1950, "Year must be greater than 1950")
        .max(2050, "Year must be less than 1950"),
    conference: Yup.string()
        .required("Required"),
    imageUrl: Yup.mixed()
        .required("Required")
});
