import React, {useEffect, useState} from 'react';

import { useParams } from 'react-router-dom';

import '../index.css';

import Box from '@mui/material/Box';

import { Loader } from '../../shared/Loader';
import { ItemsList } from '../../widgets/ItemsList';
import { ProfessorsType } from "../../services/types/types";
import ProfessorsService from "../../services/ProfessorsService";

export const ProfessorView = () => {
    const params = useParams<{ id: string }>();
    const [professor, setProfessor] = useState<ProfessorsType>()

    const [createVisible, setCreateVisible] = useState(false);
    const [editVisible, setEditVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const fetchDetails = async () => {
        try {
            setIsLoading(true)
            const professorLocal = await ProfessorsService.getProfessorById(params.id!).then((response) => {
                console.log(response.data)
                setIsLoading(false)
                return response.data
            }).catch(error => { console.log(error) });

            setProfessor(professorLocal)
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchDetails()
    }, [])

    if (isLoading) {
        return <Loader />;
    }
    const toggleCreateVisible = () => {
        setCreateVisible((prev) => !prev);
    };

    const toggleEditVisible = () => {
        setEditVisible((prev) => !prev);
    };

    return (
        <div className="pageView">
            <h1>Профессор {`${professor?.lastName} ${professor?.firstName} ${professor?.middleName} `}</h1>
            <Box borderRadius="8px" border={'1px solid blue'} padding={'10px'} display="flex" flexDirection="column">
                <h2>Информация о профессоре</h2>
                <div>{`Фамилия: ${professor?.lastName}`}</div>
                <div>{`Имя: ${professor?.firstName}`}</div>
                <div>{`Отчество: ${professor?.middleName}`}</div>
            </Box>
        </div>
    );
};
