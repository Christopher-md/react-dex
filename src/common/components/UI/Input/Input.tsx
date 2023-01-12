import React, { FC, forwardRef } from "react";
import { InputBase } from "@/common/components/UI/InputBase";
import classNames from "classnames";
import styles from "./Input.module.sass";

interface Props {
    onChange: React.ChangeEventHandler<HTMLInputElement>
    value?: string | number
    label: string
    disabled?: boolean
    className?: string
    error?: string
    fullWidth?: boolean

    // all other props
    [x: string]: any
}

export const Input: FC<Props> = forwardRef<HTMLInputElement, Props>((props, ref) => {
    const { value, onChange, label, disabled, className, error, fullWidth, ...rest } = props;

    return (
        <div className={classNames(styles.wrapper, className)}>
            <label className={styles.label}>{label}</label>
            <InputBase
                ref={ref}
                onChange={onChange}
                value={value}
                fullWidth={fullWidth}
                error={error}
                disabled={disabled}
                {...rest}
            />
            {error && <span className={styles.error}>{error}</span>}
        </div>
    );
});

Input.displayName = "Input";