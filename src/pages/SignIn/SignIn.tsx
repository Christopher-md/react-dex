import React, { FC } from "react";
import { Input } from "@/components/UI/Input";
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import Banner from "@/assets/image/im-sign-up-banner.png";
import styles from "./SignIn.module.sass";
import { Password } from "@/components/UI/Password";
import { Button } from "@/components/UI/Button";

interface Inputs {
    login: string
    password: string
}

export const SignIn: FC = () => {
    const { control, handleSubmit } = useForm<Inputs>({
        defaultValues: {
            login: "",
            password: ""
        }
    });

    const onSubmit: SubmitHandler<Inputs> = data => console.log(data);

    return (
        <div className={styles.auth}>
            <div className={styles.left}>
                <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
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
                </form>
            </div>
            <div className={styles.right}>
                <img className={styles.banner} src={Banner} alt="Banner"/>
            </div>
        </div>
    );
};
