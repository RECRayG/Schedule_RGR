import React from 'react';

import { Controller, useForm } from 'react-hook-form';

import { Button, InputLabel } from '@mui/material';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { ProfessorsType } from "../../services/types/types";

export interface ProfessorFields {
    id: string;
    firstName: string;
    lastName: string;
    middleName: string;
}
interface UserFormProps {
    title: string;
    onSubmit: (values: ProfessorFields) => void;
    onCancel: () => void;
    professor?: ProfessorsType;
    submitText?: string;
}

export const ProfessorForm: React.FC<UserFormProps> = ({
                                                         title,
                                                         professor,
                                                         onSubmit,
                                                         submitText = 'Добавить профессора',
                                                         onCancel,
                                                     }) => {
    const {
        register,
        formState: {errors},
        handleSubmit,
    } = useForm<ProfessorFields>({
        defaultValues: {
            ...professor
        },
    });

    console.log('professor inside', professor);

    return (
        <form onSubmit={handleSubmit(onSubmit)} title={title}>
            <Stack spacing={2} width={'100%'}>
                <TextField {...register('lastName', {required: true})} label="Фамилия" />
                <div style={{color: "red"}}>
                    {errors?.lastName && <p>{errors?.lastName?.message || "Обязательное поле"}</p>}
                </div>
                <TextField {...register('firstName', {required: true})} label="Имя" />
                <div style={{color: "red"}}>
                    {errors?.firstName && <p>{errors?.firstName?.message || "Обязательное поле"}</p>}
                </div>
                <TextField {...register('middleName')} label="Отчество" />

                <Stack direction={'row'} justifyContent={'end'} spacing={2} width={'100%'}>
                    <Button type={'reset'} variant={'contained'} color={'primary'} onClick={onCancel}>
                        Отмена
                    </Button>
                    <Button type={'submit'} variant={'contained'} color={'secondary'}>
                        {submitText}
                    </Button>
                </Stack>
            </Stack>
        </form>
    );
};
