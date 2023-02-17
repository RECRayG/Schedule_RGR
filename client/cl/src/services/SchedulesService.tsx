import axios from "axios";
import { ScheduleFields } from "../../src/components/SchedulesModal/SchedulesForm";

const SCHEDULES_BASE_REST_API_URL = 'http://localhost:8080/api/schedules';

class SchedulesService {
    getSchedulesByGroupAndWeek(idGroup: string, idWeek: string) {
        return axios.get(SCHEDULES_BASE_REST_API_URL + "/group/" + idGroup + "/week/" + idWeek,
            {headers: {"Access-Control-Allow-Origin": "*"}});
    }

    getScheduleById(id: String) {
        return axios.get(SCHEDULES_BASE_REST_API_URL + "/" + id,
            {headers: {"Access-Control-Allow-Origin": "*"}});
    }

    getAllNumberOfWeeks() {
        return axios.get(SCHEDULES_BASE_REST_API_URL + "/numberOfWeeks",
            {headers: {"Access-Control-Allow-Origin": "*"}});
    }

    updateSchedule(values: ScheduleFields) {
        const temp = {
            id: values.id,
            subject: values.subject,
            auditory: values.auditory,
            // @ts-ignore
            type: values.type?.value,
            day: values.day,
            timeBegin: values.timeBegin,
            timeEnd: values.timeEnd,
            numberOfWeek: values.numberOfWeek,
            // @ts-ignore
            idProfessor: values.professor?.value,
            idGroup: values.group?.id
        }
        console.log("Temp - ", temp);
        return axios.put(SCHEDULES_BASE_REST_API_URL + "/update/" + values.id, {...temp},
            {headers: {'Content-Type': 'application/json',
                    "Access-Control-Allow-Origin": "*"}
            }).then().catch(error => {
            return error
        });
    }

    deleteSchedule(id: String) {
        return axios.delete(SCHEDULES_BASE_REST_API_URL + "/" + id,
            {headers: {"Access-Control-Allow-Origin": "*"}});
    }
}

export default new SchedulesService();