import React, { FC } from "react";
import { Icon } from "@/components/Icon";
import { Typography } from "@/components/UI/Typography";
import { useNavigate } from "react-router-dom";
import { IUser } from "@/models/IUser";
import styles from "./Header.module.sass";

export const Header: FC = () => {
    const navigate = useNavigate();
    const user: IUser = JSON.parse(localStorage.getItem("user") as string);

    function onHandleClick(): void {
        navigate("/profile");
    }

    return (
        <header className={styles.header}>
            <Icon className={styles.logo} name="logo"/>
            <div className={styles.user}>
                <Typography className={styles.name} size="small">{user.name}</Typography>
                <div className={styles.avatar}>
                    {user.avatarUrl
                        ? <img onClick={onHandleClick} className={styles.image} src={user.avatarUrl} alt="avatar"/>
                        : <Icon onClick={onHandleClick} className={styles.image} name="profile"/>
                    }
                </div>
            </div>
        </header>
    );
};
