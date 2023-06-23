import axios from "axios";
import CONFIG from "../../utils/security/headers";
import UTILS from "../../utils/utils";
import { EmptyBranch, branchModel } from "../../models/branch/branchModel";

const HOST = process.env.REACT_APP_HOST;
let tokenValues = UTILS.GET_TOKEN();


export async function getAllBranches() {
    if (tokenValues) {
        CONFIG.headers["Authorization"] = "Bearer " + tokenValues.token
        let response = axios.post(HOST + "/branches/all", {}, CONFIG)
            .then(response => {
                if (response.data) {
                    let branches: branchModel[] = response.data;
                    return branches;
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

export async function getBranchById(_id: string) {
    let emptyBranch = new EmptyBranch();
    if (tokenValues) {
        CONFIG.headers["Authorization"] = "Bearer " + tokenValues.token
        let response = axios.post(HOST + "/branches/" + _id, {}, CONFIG)
            .then(response => {
                if (response.data) {
                    let branches: branchModel = response.data;
                    return branches;
                } else {
                    return emptyBranch;
                }
            })
            .catch(
                function (error) {
                    return emptyBranch;
                }
            );
        return response;
    }
    else {
        return emptyBranch;
    }
}


export async function eventBranch(branch: branchModel) {
    if (tokenValues) {
        CONFIG.headers["Authorization"] = "Bearer " + tokenValues.token;
        const URL = HOST + (branch._id === "" ? "/branches/add" : "/branches/update/" + branch._id);
        let response = axios.post(URL, branch, CONFIG)
            .then(response => {
                return response.data ? true : false;
            })
            .catch(
                function (error) { return false }
            );
        return response;
    }
    else {
        return false;
    }
}

