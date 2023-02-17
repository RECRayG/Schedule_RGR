export type GroupsType = {
    id: string;
    groupName: string;
}

export type ProfessorsType = {
    id: string;
    firstName: string;
    lastName: string;
    middleName: string;
}

export type SchedulesType = {
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

export type NumberOfWeekType = {
    id: string;
    numberOfWeek: string;
}