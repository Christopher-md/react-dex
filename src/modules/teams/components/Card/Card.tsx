import React, { FC } from "react";
import { IData } from "@/modules/teams/interfaces/ITeams";
import { Typography } from "@/common/components/UI/Typography";
import classNames from "classnames";
import styles from "./Card.module.sass";

interface Props {
    team: IData
    className?: string
}

const baseUrl = process.env.REACT_APP_BASE_URL;

export const Card: FC<Props> = (props) => {
    const { team, className } = props;
    const { imageUrl, name, foundationYear, division, conference } = team;
    const image = `${baseUrl}${imageUrl}`;

    return (
        <div className={classNames(styles.card, className)}>
            <div className={styles.title}>
                <Typography className={styles.text}>Teams</Typography>
                <Typography className={styles["forward-slash"]}>/</Typography>
                <Typography className={styles.text}>{name}</Typography>
            </div>
            <div className={styles.content}>
                <div className={styles.container}>
                    <div className={styles.flex}>
                        <div className={styles.image}>
                            <img src={image} alt="image"/>
                        </div>
                        <div className={styles.info}>
                            <Typography size="large" tag="h1" className={styles.name}>{name}</Typography>
                            <div className={styles.grid}>
                                <div>
                                    <Typography tag="h4" size="medium" className={styles.header}>
                                        Year of foundation
                                    </Typography>
                                    <Typography className={classNames(styles.year, styles.text)}>
                                        {foundationYear}
                                    </Typography>
                                </div>
                                <div>
                                    <Typography tag="h4" size="medium" className={styles.header}>
                                        Division
                                    </Typography>
                                    <Typography className={classNames(styles.division, styles.text)}>
                                        {division}
                                    </Typography>
                                </div>
                                <div>
                                    <Typography tag="h4" size="medium" className={styles.header}>
                                        Conference
                                    </Typography>
                                    <Typography className={classNames(styles.conference, styles.text)}>
                                        {conference}
                                    </Typography>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
