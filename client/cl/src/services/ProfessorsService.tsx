import axios from "axios";
import { ProfessorFields } from "../../src/components/ProfessorsModal/ProfessorsForm";

const PROFESSORS_BASE_REST_API_URL = 'http://localhost:8080/api/professors';

class ProfessorsService {
    getAllProfessors() {
        return axios.get(PROFESSORS_BASE_REST_API_URL);
    }

    addProfessor(values: ProfessorFields) {
        const temp = {
            lastName: values.lastName,
            firstName: values.firstName,
            middleName: values?.middleName
        }
        return axios.post(PROFESSORS_BASE_REST_API_URL + "/add", {...temp},
            {headers: {'Content-Type': 'application/json',
                    "Access-Control-Allow-Origin": "*"}
            }).then().catch(error => {
            return error
        });
    }

    updateProfessor(values: ProfessorFields) {
        const temp = {
            id: values.id,
            lastName: values.lastName,
            firstName: values.firstName,
            middleName: values?.middleName,
        }
        return axios.put(PROFESSORS_BASE_REST_API_URL + "/update/" + values.id, {...temp},
            {headers: {'Content-Type': 'application/json',
                    "Access-Control-Allow-Origin": "*"}
            }).then().catch(error => {
            return error
        });
    }

    getProfessorById(id: String) {
        return axios.get(PROFESSORS_BASE_REST_API_URL + "/" + id,
            {headers: {"Access-Control-Allow-Origin": "*"}});
    }

    deleteProfessor(id: String) {
        return axios.delete(PROFESSORS_BASE_REST_API_URL + "/" + id,
            {headers: {"Access-Control-Allow-Origin": "*"}});
    }
}

export default new ProfessorsService();