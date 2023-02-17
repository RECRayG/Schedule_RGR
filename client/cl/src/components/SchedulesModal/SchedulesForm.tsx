import React, {useEffect, useState} from 'react';

import { Controller, useForm } from 'react-hook-form';

import {Button, InputLabel, TextareaAutosize} from '@mui/material';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import "../../pages/TextareaAutosizeMessageStyle.css";
import { Select } from '../../shared/Select';
import {GroupsType, ProfessorsType, SchedulesType} from "../../services/types/types";
import ProfessorsService from "../../services/ProfessorsService";

export interface ScheduleFields {
    id: string;
    subject: string;
    auditory: string;
    type: string;
    day: string;
    timeBegin: string;
    timeEnd: string;
    numberOfWeek: string;
    professor: ProfessorsType;
    group: GroupsType;
}
interface UserFormProps {
    title: string;
    onSubmit: (values: ScheduleFields) => void;
    onCancel: () => void;
    schedule?: SchedulesType;
    submitText?: string;
}

export const ScheduleForm: React.FC<UserFormProps> = ({
                                                           title,
                                                           schedule,
                                                           onSubmit,
                                                           submitText = 'Добавить расписание',
                                                           onCancel,
                                                       }) => {
    const {
        register,
        formState: {errors},
        handleSubmit,
        control,
        watch
    } = useForm<ScheduleFields>({
        defaultValues: schedule,
        mode: "onSubmit"
    });

    console.log('Schedule inside', schedule);

    // const { data: professors } = useMeteorCall<Professor[]>('professors.get');
    const [ professors, setProfessor ] = useState<ProfessorsType[]>();

    const fetchDetailsProf = async () => {
        try {
            const professorLocal = await ProfessorsService.getAllProfessors().then((response) => {
                console.log(response.data)
                return response.data
            }).catch(error => { console.log(error) });

            setProfessor(professorLocal)
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchDetailsProf();
    }, [])

    const mappedListP = professors?.map(({ lastName, firstName, middleName, id }) => ({
        label: `${lastName} ${firstName} ${middleName}`,
        value: id,
    }));

    let listType = [{label: '', value: ''}];
    listType[0] = {label: 'Лекция', value: 'Лекция'};
    listType[1] = {label: 'Практика', value: 'Практика'};

    return (
        <form onSubmit={handleSubmit(onSubmit)} title={title}>
            <Stack spacing={2} width={'100%'}>
                <InputLabel>Номер недели</InputLabel>
                <TextareaAutosize {...register('numberOfWeek', {required: true})} minRows={1} readOnly={true} placeholder={schedule?.numberOfWeek} className="TextareaAutosizeStyleMessage"></TextareaAutosize>

                <InputLabel>День недели</InputLabel>
                <TextareaAutosize {...register('day', {required: true})} minRows={1} readOnly={true} placeholder={schedule?.day} className="TextareaAutosizeStyleMessage"></TextareaAutosize>

                <InputLabel>Начало занятия</InputLabel>
                <TextareaAutosize {...register('timeBegin', {required: true})} minRows={1} readOnly={true} placeholder={schedule?.timeBegin} className="TextareaAutosizeStyleMessage"></TextareaAutosize>

                <InputLabel>Конец занятия</InputLabel>
                <TextareaAutosize {...register('timeEnd', {required: true})} minRows={1} readOnly={true} placeholder={schedule?.timeEnd} className="TextareaAutosizeStyleMessage"></TextareaAutosize>

                <TextField {...register('subject', {required: true})} label="Предмет" />
                <div style={{color: "red"}}>
                    {errors?.subject && <p>{errors?.subject?.message || "Обязательное поле"}</p>}
                </div>

                <TextField {...register('auditory', {required: true})} label="Аудитория" />
                <div style={{color: "red"}}>
                    {errors?.subject && <p>{errors?.subject?.message || "Обязательное поле"}</p>}
                </div>

                <InputLabel>Тип занятия</InputLabel>
                <Controller
                    render={({ field }) => {
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-ignore
                        return <Select {...field} options={listType} />;
                    }}
                    name={'type'}
                    control={control}
                    rules={{
                        required: {value: true, message: 'Обязательное поле'},
                    }}
                />

                <InputLabel>Профессор</InputLabel>
                <Controller
                    render={({ field }) => {
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-ignore
                        return <Select {...field} options={mappedListP} />;
                    }}
                    name={'professor'}
                    control={control}
                    rules={{
                        required: {value: true, message: 'Обязательное поле'},
                    }}
                />

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
