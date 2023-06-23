import axios from "axios";
import CONFIG from "../../utils/security/headers";
import UTILS from "../../utils/utils";
import { organizationModel } from "../../models/organizatinos/organizationsModel";


const HOST = process.env.REACT_APP_HOST;
let tokenValues = UTILS.GET_TOKEN();


export async function getAllOrganizations() {
    if (tokenValues) {
        CONFIG.headers["Authorization"] = "Bearer " + tokenValues.token
        let response = axios.post(HOST + "/organizations/all", {}, CONFIG)
            .then(response => {
                if (response.data) {
                    let organizations: organizationModel[] = response.data;
                    return organizations;
                } else {
                    return [];
                }
            })
            .catch(
                function (error) {
                    return [];
                }
            );
        return response;
    }
    else {
        return [];
    }
}
