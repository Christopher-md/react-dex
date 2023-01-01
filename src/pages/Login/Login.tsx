import React, { FC } from "react";
import { AuthLayout } from "@/layouts/AuthLayout";
import { Typography } from "@/components/UI/Typography";
import { Input } from "@/components/UI/Input";
import { Password } from "@/components/UI/Password";
import { Button } from "@/components/UI/Button";
import { Link } from "@/components/UI/Link";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import { addNotification } from "@/store/reducers/notificationReducer";
import { validationSchema } from "@/pages/Login/schema";
import { IRequest } from "@/models/ILogin";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/hooks";
import { login } from "@/api/login";
import { AxiosError } from "axios";
import Banner from "@/assets/image/im-sign-in-banner.png";
import styles from "./Login.module.sass";

export const Login: FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { control, handleSubmit } = useForm<IRequest>({
        resolver: yupResolver(validationSchema),
        defaultValues: {
            login: "",
            password: ""
        }
    });

    const onSubmit: SubmitHandler<IRequest> = async data => {
        try {
            const response = await login(data);
            const responseData = response.data;
            const { name, avatarUrl, token } = responseData;
            
            localStorage.setItem("user", JSON.stringify({ name, avatarUrl }));
            localStorage.setItem("token", token);
            dispatch(addNotification({
                message: "You have successfully logged in",
                type: "success"
            }));

            navigate("/");
        } catch (e) {
            const error = e as AxiosError;

            if (error.response?.status === 401) {
                dispatch(addNotification(
                    "User with the specified username / password was not found"
                ));
            }
        }
    };

    return (
        <AuthLayout image={Banner}>
            <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                <Typography tag="h1" size="large" className={styles.title}>Sign In</Typography>
                <Controller
                    control={control}
                    name="login"
                    render={({ field: { onChange, value }, fieldState: { error } }) => (
                        <Input
                            label="Login"
                            value={value}
                            onChange={onChange}
                            className={styles.input}
                            error={error?.message}
                            fullWidth
                        />
                    )}
                />
                <Controller
                    control={control}
                    name="password"
                    render={({ field: { onChange, value }, fieldState: { error } }) => (
                        <Password
                            label="Password"
                            value={value}
                            onChange={onChange}
                            className={styles.input}
                            error={error?.message}
                            fullWidth
                        />
                    )}
                />
                <Button type="submit" fullWidth>Sign In</Button>
                <div className={styles.bottom}>
                    <Typography className={styles.typography} color="secondary">Not a member yet?</Typography>
                    <Link className={styles.link} to="/register">Sign up</Link>
                </div>
            </form>
        </AuthLayout>
    );
};
