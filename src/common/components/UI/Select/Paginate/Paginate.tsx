import React from "react";
import { AsyncPaginate, AsyncPaginateProps } from "react-select-async-paginate";
import { MultiValue } from "../components/MultiValue";
import { Label } from "@/common/components/UI/Label";
import { Error } from "@/common/components/UI/Error";
import { GroupBase } from "react-select";
import { style } from "../style";
import styles from "../Select.module.sass";
import classNames from "classnames";

interface CustomProps {
    label?: string
    error?: string
    variant?: "primary" | "secondary"
}

export function Paginate<
    OptionType,
    Additional,
    Group extends GroupBase<OptionType>,
    IsMulti extends boolean = false
>(props: AsyncPaginateProps<OptionType, Group, Additional, IsMulti> & CustomProps): JSX.Element {
    const { className, components, label, variant = "primary", error, ...rest } = props;
    const MultiValueComponent = MultiValue<OptionType>;
    const customStyles = style<OptionType, IsMulti, Group>({
        variant,
        error
    });

    return (
        <div className={classNames(styles.wrapper, className)}>
            {label && <Label>{label}</Label>}
            <AsyncPaginate
                menuPlacement="auto"
                styles={customStyles}
                components={{
                    MultiValue: MultiValueComponent,
                    ...components
                }}
                {...rest}
            />
            {error && <Error className={styles.error}>{error}</Error>}
        </div>
    );
}
