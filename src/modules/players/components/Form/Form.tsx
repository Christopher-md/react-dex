import React, { FC } from "react";
import { Paginate } from "@/common/components/UI/Select/Paginate";
import { Async } from "@/common/components/UI/Select/Async/Async";
import { Upload } from "@/common/components/UI/Upload";
import { Number } from "@/common/components/UI/Number";
import { Button } from "@/common/components/UI/Button";
import { Input } from "@/common/components/UI/Input";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { positionOptions } from "@/modules/players/components/Select/Position";
import { teamOptions } from "@/modules/players/components/Select/Team";
import { IFields } from "@/modules/players/interfaces/IPlayers";
import { yupResolver } from "@hookform/resolvers/yup";
import { Date } from "@/common/components/UI/Date";
import { validationSchema } from "./schema";
import styles from "./Form.module.sass";

interface Props {
    onSubmit: SubmitHandler<IFields>
    onCancel: () => void
    defaultValue?: Partial<IFields>
}

export const Form: FC<Props> = (props) => {
    const { defaultValue, onSubmit, onCancel } = props;
    const { handleSubmit, register, control, formState: { errors } } = useForm<IFields>({
        resolver: yupResolver(validationSchema),
        defaultValues: defaultValue
    });

    return (
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <Controller
                control={control}
                name="avatarUrl"
                render={({ field: { onChange, value } }) => (
                    <Upload
                        value={value}
                        onChange={e => onChange(e)}
                        className={styles.upload}
                    />
                )}
            />
            <div className={styles.fields}>
                <Input
                    {...register("name")}
                    error={errors.name?.message}
                    label="Name"
                    className={styles.input}
                    fullWidth
                />
                <Controller
                    control={control}
                    name="position"
                    render={({ field: { onChange, value }, fieldState: { error } }) => (
                        <Async
                            isClearable
                            value={value}
                            defaultOptions
                            label="Position"
                            variant="secondary"
                            error={error?.message}
                            className={styles.input}
                            loadOptions={positionOptions}
                            onChange={value => onChange(value)}
                        />
                    )}
                />
                <Controller
                    control={control}
                    name="team"
                    render={({ field: { onChange, value }, fieldState: { error } }) => (
                        <Paginate
                            isClearable
                            value={value}
                            defaultOptions
                            label="Team"
                            variant="secondary"
                            error={error?.message}
                            className={styles.input}
                            loadOptions={teamOptions}
                            onChange={value => onChange(value)}
                        />
                    )}
                />
                <div className={styles.grid}>
                    <Number
                        {...register("height")}
                        error={errors.height?.message}
                        label="Height (cm)"
                        className={styles.input}
                        fullWidth
                    />
                    <Number
                        {...register("weight")}
                        error={errors.weight?.message}
                        label="Weight (kg)"
                        className={styles.input}
                        fullWidth
                    />
                    <Date
                        fullWidth
                        max="9999-12-31"
                        label="Birthdate"
                        className={styles.input}
                        {...register("birthday")}
                        error={errors.birthday?.message}
                    />
                    <Number
                        {...register("number")}
                        error={errors.number?.message}
                        label="Number"
                        className={styles.input}
                        fullWidth
                    />
                </div>
                <div className={styles.actions}>
                    <Button
                        type={"button"}
                        onClick={onCancel}
                        variant="secondary"
                        fullWidth
                    >
                        Cancel
                    </Button>
                    <Button
                        type={"submit"}
                        fullWidth
                    >
                        Save
                    </Button>
                </div>
            </div>
        </form>
    );
};
