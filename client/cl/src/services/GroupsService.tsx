import axios from "axios";
import { GroupFields } from "../../src/components/GroupsModal/GroupsForm";

const GROUPS_BASE_REST_API_URL = 'http://localhost:8080/api/groups';

class GroupsService {
    getAllGroups() {
        return axios.get(GROUPS_BASE_REST_API_URL);
    }

    addGroup(values: GroupFields) {
        const temp = {
            groupName: values.groupName
        }
        return axios.post(GROUPS_BASE_REST_API_URL + "/add", {...temp},
            {headers: {'Content-Type': 'application/json',
                    "Access-Control-Allow-Origin": "*"}
            }).then().catch(error => {
            return error
        });
    }

    updateGroup(values: GroupFields) {
        const temp = {
            id: values.id,
            groupName: values.groupName
        }
        return axios.put(GROUPS_BASE_REST_API_URL + "/update/" + values.id, {...temp},
            {headers: {'Content-Type': 'application/json',
                    "Access-Control-Allow-Origin": "*"}
            }).then().catch(error => {
            return error
        });
    }

    getGroupById(id: String) {
        return axios.get(GROUPS_BASE_REST_API_URL + "/" + id,
            {headers: {"Access-Control-Allow-Origin": "*"}});
    }

    deleteGroup(id: String) {
        return axios.delete(GROUPS_BASE_REST_API_URL + "/" + id,
            {headers: {"Access-Control-Allow-Origin": "*"}});
    }
}

export default new GroupsService();