import React, { VFC } from 'react';

import { Box, Modal } from '@mui/material';

import { SchedulesType } from "../../services/types/types";
import { ScheduleFields, ScheduleForm } from '../../components/SchedulesModal/SchedulesForm';

type Props = {
    onClose: () => void;
    visible: boolean;
    schedule?: SchedulesType;
    submitText?: string;
    onSubmit: (values: ScheduleFields) => void;
};

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    padding: '20px',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    borderRadius: '10px',
    boxShadow: 24,
    p: 4,
};

export const ScheduleModal: VFC<Props> = (props) => {
    return (
        <Modal open={props.visible}>
            <Box sx={style}>
                <ScheduleForm title="Создать расписание" onCancel={props.onClose} {...props} />
            </Box>
        </Modal>
    );
};
