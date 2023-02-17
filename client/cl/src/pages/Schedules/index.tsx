import React, {useCallback, useEffect, useState} from 'react';

import { generatePath, useNavigate } from 'react-router-dom';

import { Loader } from '../../shared/Loader';
import { ItemsList } from '../../widgets/ItemsList';
import { ScheduleFields } from '../../components/SchedulesModal/SchedulesForm';

import {ScheduleModal } from '../../components/SchedulesModal';

import { routes } from './routes';

import { SchedulesType, GroupsType, ProfessorsType } from "../../services/types/types";
import ProfessorsService from "../../services/ProfessorsService";
import SchedulesService from "../../services/SchedulesService";

interface UserFormProps {
    group: string;
    numberOfWeek: string;
    oldGroup?: string;
    scheduleTest?: SchedulesType[];
    groupName?: string;
    numberOfWeekNumber?: string;
}

export const SchedulesList: React.FC<UserFormProps> = ({
                                                           group,
                                                           numberOfWeek,
                                                           oldGroup,
                                                           groupName,
                                                           numberOfWeekNumber
                                                       }) => {
    const [ schedules, setSchedule ] = useState<SchedulesType[]>();
    const [currentSchedule, setCurrentSchedule] = useState<SchedulesType>();
    const [isLoading, setIsLoading] = useState(false);
    const [createVisible, setCreateVisible] = useState(false);
    const [editVisible, setEditVisible] = useState(false);
    const navigate = useNavigate();

    const request = useCallback(async () => {
        // // @ts-ignore
        // setCurrentSchedule(scheduleTest)
        setIsLoading(true);
        await SchedulesService.getSchedulesByGroupAndWeek(group, numberOfWeek).then((response) => {
            setSchedule(response.data);
            setIsLoading(false);
        }).catch(error => {
            console.log(error);
        });
    }, []);

    useEffect(() => {
        // if (oldGroup != group) {
            request();
        // }
    }, []);

    console.log("Old Group - ", oldGroup);
    console.log("Group - ", group);
    console.log("Week - ", numberOfWeek);
    console.log("Schedules - ", schedules);

    if (isLoading) {
        return <Loader />;
    }

    const mappedList = schedules?.map(({ subject, auditory, type, professor, group,
                                           numberOfWeek, day, timeBegin, timeEnd, id }) => ({
        info: `${group.groupName} ${numberOfWeek} ${day} ${timeBegin} ${timeEnd}`,
        id: id,
        professor: professor.lastName + " " + professor.firstName.substring(0,1) + ". " + professor?.middleName.substring(0, 1) + ".",
        auditory: auditory,
        subject: subject,
        type: type
    }));
    // .filter(sch => {
    //     return sch.info.split(" ")[1] == numberOfWeek && sch.info.split(" ")[0] == group
    // });

    const toggleEditVisible = () => {
        setEditVisible((prev) => !prev);
    };

    const onSubmitEdit = async (values: ScheduleFields) => {
        await SchedulesService.updateSchedule(values);
        toggleEditVisible();
        await request();
    };

    const onEdit = async (id: string) => {
        await SchedulesService.getScheduleById(id).then((response) => {
            console.log(response)
            setCurrentSchedule(response.data);
        }).catch(error => {
            console.log(error)
        });
        toggleEditVisible();
    };

    const onDelete = async (id: string) => {
        await SchedulesService.deleteSchedule(id);
        await request();
    };

    return (
        <>
            <ItemsList
                dataSchedule={mappedList ?? []}
                title={'Расписание'}
                onDeleteItem={onDelete}
                onEditItem={onEdit}
            />
            <ScheduleModal
                visible={editVisible}
                onClose={toggleEditVisible}
                onSubmit={onSubmitEdit}
                schedule={currentSchedule}
                submitText={'Сохранить'}
            />
        </>
    );
};
