import React, {useCallback, useEffect, useState} from 'react';

import { Delete, Edit } from '@mui/icons-material';
import {Box, Button, IconButton, InputLabel, Stack, TextareaAutosize} from '@mui/material';
import {Select} from "../../shared/Select"
import './TextStyles.css'
import {GroupsType, NumberOfWeekType, SchedulesType} from "../../services/types/types";
import GroupsService from "../../services/GroupsService";
import SchedulesService from "../../services/SchedulesService";
import {SchedulesList} from "../../pages/Schedules";
import {Loader} from "../../shared/Loader";

type Props = {
  title: string;
  data?: Array<{ id: string; info: string }>;
  onDeleteItem?: (id: string) => void;
  onEditItem?: (id: string) => void;
  onItemClick?: (id: string) => void;
  onCreate?: () => void;
  dataSchedule?: Array<{ id: string; info: string; professor: string; auditory: string; subject: string; type: string }>;
};
export const ItemsList: React.FC<Props> = ({ title, data, onDeleteItem, onEditItem, onItemClick, onCreate, dataSchedule }) => {
    if(title == "Расписание") {
        let i = 0;
        const day = () => {
            i++;
            if(i == 8) {
                i = 0;
                return false;
            }
            else if(i == 1) {
                return true;
            }
            else return false;
        }

        return (
            <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" marginTop="20px">
                <Stack gap={2} width={'100%'}>
                    {dataSchedule?.map(({ info, id, professor, auditory, subject, type}) => (
                        <>
                            { day() &&
                                <h2>{info.split(" ")[2]}</h2>
                            }
                            {subject &&
                                <Box key={id} className="TextStyle" border={'3px solid black'} borderRadius={'10px'} sx={{ backgroundColor: '#e6e6e6' }}>
                                    <Stack
                                        direction="row"
                                        justifyContent="space-between"
                                        alignItems="center"
                                        spacing={1}
                                        padding={'10px'}
                                    >
                                        <div style={{ width: '100%' }}>
                                            <b>{info.split(" ")[3]}-{info.split(" ")[4]}</b>: {subject} ◉ {professor} ◉ {auditory} ◉ {type}
                                        </div>

                                        <Stack justifyContent="center" direction="row" gap="16px" className="edit-buttons">
                                            <IconButton
                                                onClick={(e: React.MouseEvent) => {
                                                    e.stopPropagation();
                                                    if (onEditItem) onEditItem(id);
                                                }}
                                            >
                                                <Edit />
                                            </IconButton>

                                            <IconButton
                                                onClick={(e: React.MouseEvent) => {
                                                    e.stopPropagation();
                                                    if (onDeleteItem) onDeleteItem(id);
                                                }}
                                            >
                                                <Delete />
                                            </IconButton>
                                        </Stack>
                                    </Stack>
                                </Box>
                            }
                            {!subject &&
                                <Box key={id} className="TextStyle" border={'3px solid black'} borderRadius={'10px'} sx={{ backgroundColor: '#e6e6e6' }}>
                                    <Stack
                                        direction="row"
                                        justifyContent="space-between"
                                        alignItems="center"
                                        spacing={1}
                                        padding={'10px'}
                                    >
                                        <div style={{ width: '100%' }}>
                                            <b>{info.split(" ")[3]}-{info.split(" ")[4]}</b>:
                                        </div>

                                        <Stack justifyContent="center" direction="row" gap="16px" className="edit-buttons">
                                            <IconButton
                                                onClick={(e: React.MouseEvent) => {
                                                    e.stopPropagation();
                                                    if (onEditItem) onEditItem(id);
                                                }}
                                            >
                                                <Edit />
                                            </IconButton>

                                            <IconButton
                                                onClick={(e: React.MouseEvent) => {
                                                    e.stopPropagation();
                                                    if (onDeleteItem) onDeleteItem(id);
                                                }}
                                            >
                                                <Delete />
                                            </IconButton>
                                        </Stack>
                                    </Stack>
                                </Box>
                            }
                        </>
                    ))}
                </Stack>
            </Box>
        );
    }
    else
    if(title == "Расписание групп") {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [ groups, setGroups ] = useState<GroupsType[]>([]);
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [ numberOfWeeks, setNumberOfWeeks ] = useState<NumberOfWeekType[]>([]);
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [isLoading, setIsLoading] = useState(false);

        // eslint-disable-next-line react-hooks/rules-of-hooks
        const request = useCallback(async () => {
            setIsLoading(true);
            GroupsService.getAllGroups().then((response) => {
                setGroups(response.data);
            }).catch(error => {
                console.log(error);
            });

            SchedulesService.getAllNumberOfWeeks().then((response) => {
                setNumberOfWeeks(response.data);
                setIsLoading(false);
            }).catch(error => {
                console.log(error);
            });
        }, []);

        // eslint-disable-next-line react-hooks/rules-of-hooks
        useEffect(() => {
            request();
        }, []);

        const mappedListG = groups?.map(({ groupName, id }) => ({
            label: groupName,
            value: id,
        }));

        const mappedListNW = numberOfWeeks?.map(({ numberOfWeek, id }) => ({
            label: numberOfWeek,
            value: id,
        }));

        // let listNumberOfWeek = [{label: '', value: 0}]
        // for (let i = 1; i <= 18; i += 1) {
        //     listNumberOfWeek[i - 1] = {label: i.toString(), value: i};
        // }

        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [currGroup, setCurrGroup] = useState<GroupsType>();
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [oldGroup, setOldGroup] = useState<GroupsType>();
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [currNumberOfWeek, setCurrNumberOfWeek] = useState<NumberOfWeekType>(); //listNumberOfWeek?.at(0)!.value
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [currentSchedules, setCurrentSchedules] = useState<SchedulesType[]>();

        if (isLoading) {
            return <Loader />;
        }

        const getGroupValue = () => {
            return currGroup ? mappedListG!.find(g => g.value ===  currGroup.id) : ''
        }

        const onGroupChange = async (newValue: GroupsType) => {
            setOldGroup(currGroup)
            setCurrGroup(newValue)
            await request();
            // setCurrentSchedules(schedules)
        }

        const getWeekValue = () => {
            return currNumberOfWeek ? mappedListNW!.find(nw => nw.value === currNumberOfWeek.id) : 0
        }

        const onWeekChange = async (newValue: NumberOfWeekType) => {
            setCurrNumberOfWeek(newValue)
            await request();
            // setCurrentSchedules(schedules)
        }

        return (
            <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
                <Box width={'100%'} display="flex" flexDirection="row" justifyContent="flex-start" alignItems={'center'}>
                    <h2>{title}</h2>
                </Box>
                <Box width={'50%'} display="flex" flexDirection="row" justifyContent="space-between" alignItems={'center'}>
                    <div>
                        {// @ts-ignore
                        <InputLabel><h2>Группа: <b>{currGroup?.label}</b></h2></InputLabel>
                        }
                        {// @ts-ignore
                        <Select options={mappedListG} value={getGroupValue()} onChange={onGroupChange}
                                size={'small'}
                                variant="contained"
                                style={{ height: '40px', marginLeft: '15px' }} />
                        }
                    </div>
                    <div>
                        {// @ts-ignore
                        <InputLabel><h2>Номер недели: <b>{currNumberOfWeek?.label}</b></h2></InputLabel>
                        }
                        {// @ts-ignore
                        <Select options={mappedListNW} value={getWeekValue()} onChange={onWeekChange}
                                size={'small'}
                                variant="contained"
                                style={{ height: '40px', marginLeft: '15px' }} />
                        }
                    </div>
                </Box>

                {   currGroup &&
                    currNumberOfWeek &&
                    <SchedulesList oldGroup={
                        // @ts-ignore
                        oldGroup?.value} group={currGroup.value} numberOfWeek={currNumberOfWeek.value}></SchedulesList>}
            </Box>
        );
    } else {
        return (
            <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
                <Box width={'100%'} display="flex" flexDirection="row" justifyContent="flex-start" alignItems={'center'}>
                    <h2>{title}</h2>
                    <Button
                        size={'small'}
                        style={{ height: '40px', marginLeft: '15px' }}
                        variant="contained"
                        color="secondary"
                        disabled={!onCreate}
                        onClick={onCreate}
                    >
                        Создать
                    </Button>
                </Box>
                {!data?.length && <div>Пусто</div>}
                <Stack gap={2} width={'100%'}>
                    {data?.map(({ info, id }) => (
                        <Box key={id} className="TextStyle" border={'3px solid black'} borderRadius={'10px'} sx={{ backgroundColor: '#e6e6e6' }}>
                            <Stack
                                direction="row"
                                justifyContent="space-between"
                                alignItems="center"
                                onClick={() => {
                                    if (onItemClick) onItemClick(id);
                                }}
                                spacing={1}
                                padding={'10px'}
                            >
                                <div style={{ width: '100%' }}>{info}</div>

                                <Stack justifyContent="center" direction="row" gap="16px" className="edit-buttons">
                                    <IconButton
                                        onClick={(e: React.MouseEvent) => {
                                            e.stopPropagation();
                                            if (onEditItem) onEditItem(id);
                                        }}
                                    >
                                        <Edit />
                                    </IconButton>

                                    <IconButton
                                        onClick={(e: React.MouseEvent) => {
                                            e.stopPropagation();
                                            if (onDeleteItem) onDeleteItem(id);
                                        }}
                                    >
                                        <Delete />
                                    </IconButton>
                                </Stack>
                            </Stack>
                        </Box>
                    ))}
                </Stack>
            </Box>
        );
    }
};
