import React, { VFC } from 'react';

import { Box, Modal } from '@mui/material';

import { GroupsType } from "../../services/types/types";
import { GroupFields, GroupForm } from '../../components/GroupsModal/GroupsForm';

type Props = {
    onClose: () => void;
    visible: boolean;
    group?: GroupsType;
    submitText?: string;
    onSubmit: (values: GroupFields) => void;
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

export const GroupModal: VFC<Props> = (props) => {
    return (
        <Modal open={props.visible}>
            <Box sx={style}>
                <GroupForm title="Создать группу" onCancel={props.onClose} {...props} />
            </Box>
        </Modal>
    );
};
