import React, {useCallback, useEffect, useState} from 'react';

import { generatePath, useNavigate } from 'react-router-dom';

import { Loader } from '../../shared/Loader';
import { ItemsList } from '../../widgets/ItemsList';
import { ProfessorFields } from '../../components/ProfessorsModal/ProfessorsForm';

import { ProfessorModal } from '../../components/ProfessorsModal';

import { routes } from './routes';

import {GroupsType, ProfessorsType} from "../../services/types/types";
import GroupsService from "../../services/GroupsService";
import ProfessorsService from "../../services/ProfessorsService";

export const ProfessorsList = () => {
    const [ professors, setProfessor ] = useState<ProfessorsType[]>([]);
    const [currentProfessor, setCurrentProfessor] = useState<ProfessorsType>();
    const [isLoading, setIsLoading] = useState(false);
    const [createVisible, setCreateVisible] = useState(false);
    const [editVisible, setEditVisible] = useState(false);
    const navigate = useNavigate();

    const request = useCallback(async () => {
        setIsLoading(true);
        ProfessorsService.getAllProfessors().then((response) => {
            setProfessor(response.data);
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

    const mappedList = professors?.map(({ lastName, firstName, middleName, id }) => ({
        info: `${lastName} ${firstName} ${middleName}`,
        id: id,
    }));
    const toggleCreateVisible = () => {
        setCreateVisible((prev) => !prev);
    };

    const toggleEditVisible = () => {
        setEditVisible((prev) => !prev);
    };
    const onSubmitCreate = async (values: ProfessorFields) => {
        await ProfessorsService.addProfessor(values);
        toggleCreateVisible();
        await request();
    };

    const onSubmitEdit = async (values: ProfessorFields) => {
        await ProfessorsService.updateProfessor(values);
        toggleEditVisible();
        await request();
    };

    const onEdit = async (id: string) => {
        await ProfessorsService.getProfessorById(id).then((response) => {
            console.log(response)
            setCurrentProfessor(response.data);
        }).catch(error => {
            console.log(error)
        });
        toggleEditVisible();
    };
    const onDelete = async (id: string) => {
        await ProfessorsService.deleteProfessor(id);
        await request();
    };

    const onItemClick = (id: string) => {
        navigate(generatePath(routes.view, { id }));
    };

    return (
        <>
            <ItemsList
                data={mappedList ?? []}
                title={'Профессоры'}
                onDeleteItem={onDelete}
                onEditItem={onEdit}
                onCreate={toggleCreateVisible}
                onItemClick={onItemClick}
            />
            <ProfessorModal visible={createVisible} onClose={toggleCreateVisible} onSubmit={onSubmitCreate}/>
            <ProfessorModal
                visible={editVisible}
                onClose={toggleEditVisible}
                onSubmit={onSubmitEdit}
                professor={currentProfessor}
                submitText={'Сохранить'}
            />
        </>
    );
};
