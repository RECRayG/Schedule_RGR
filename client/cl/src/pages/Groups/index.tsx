import React, {useCallback, useEffect, useState} from 'react';

import { generatePath, useNavigate } from 'react-router-dom';

import { Loader } from '../../shared/Loader';
import { ItemsList } from '../../widgets/ItemsList';
import { GroupFields } from '../../components/GroupsModal/GroupsForm';

import {GroupModal } from '../../components/GroupsModal';

import { routes } from './routes';

import { GroupsType } from "../../services/types/types";
import {ScheduleFields} from "../../components/SchedulesModal/SchedulesForm";
import {Schedule} from "@mui/icons-material";
import GroupsService from "../../services/GroupsService";

export const GroupsList = () => {
    const [ groups, setGroups ] = useState<GroupsType[]>([]);
    const [currentGroup, setCurrentGroup] = useState<GroupsType>();
    const [isLoading, setIsLoading] = useState(false);
    const [createVisible, setCreateVisible] = useState(false);
    const [editVisible, setEditVisible] = useState(false);
    const navigate = useNavigate();

    const request = useCallback(async () => {
        setIsLoading(true);
        GroupsService.getAllGroups().then((response) => {
            setGroups(response.data);
            setIsLoading(false);
        }).catch(error => {
            console.log(error);
        });
    }, []);

    useEffect(() => {
        request();
    }, [request]);


    if (isLoading) {
        return <Loader />;
    }

    const mappedList = groups?.map(({ groupName, id }) => ({
        info: groupName,
        id: id,
    }));

    const toggleCreateVisible = () => {
        setCreateVisible((prev) => !prev);
    };

    const toggleEditVisible = () => {
        setEditVisible((prev) => !prev);
    };
    const onSubmitCreate = async (values: GroupFields) => {
        await GroupsService.addGroup(values);
        toggleCreateVisible();
        await request();
    };

    const onSubmitEdit = async (values: GroupFields) => {
        await GroupsService.updateGroup(values);
        toggleEditVisible();
        await request();
    };

    const onEdit = async (id: string) => {
        await GroupsService.getGroupById(id).then((response) => {
            console.log(response)
            setCurrentGroup(response.data);
        }).catch(error => {
            console.log(error)
        });
        toggleEditVisible();
    };
    const onDelete = async (id: string) => {
        await GroupsService.deleteGroup(id);
        await request();
    };

    return (
        <>
            <ItemsList
                data={mappedList ?? []}
                title={'Группы'}
                onDeleteItem={onDelete}
                onEditItem={onEdit}
                onCreate={toggleCreateVisible}
            />
            <GroupModal visible={createVisible} onClose={toggleCreateVisible} onSubmit={onSubmitCreate}/>
            <GroupModal
                visible={editVisible}
                onClose={toggleEditVisible}
                onSubmit={onSubmitEdit}
                group={currentGroup}
                submitText={'Сохранить'}
            />
        </>
    );
};
