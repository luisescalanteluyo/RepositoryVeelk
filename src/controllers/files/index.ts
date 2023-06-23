import axios from "axios";
import CONFIG from "../../utils/security/headers";
import UTILS from "../../utils/utils";
import { EmptyFile, fileModel } from "../../models/file/fileModel";

const HOST = process.env.REACT_APP_HOST;
let tokenValues = UTILS.GET_TOKEN();


export async function getAllFiles() {
    if (tokenValues) {
        CONFIG.headers["Authorization"] = "Bearer " + tokenValues.token
        let response = axios.post(HOST + "/files/all", {}, CONFIG)
            .then(response => {
                if (response.data) {
                    let files: fileModel[] = response.data;
                    return files;
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

export async function getFileById(_id: string) {
    let emptyFile = new EmptyFile();
    if (tokenValues) {
        CONFIG.headers["Authorization"] = "Bearer " + tokenValues.token
        let response = axios.post(HOST + "/files/" + _id, {}, CONFIG)
            .then(response => {
                if (response.data) {
                    let file: fileModel = response.data;
                    return file;
                } else {
                    return emptyFile;
                }
            })
            .catch(
                function (error) {
                    return emptyFile;
                }
            );
        return response;
    }
    else {
        return emptyFile;
    }
}

export async function uploadFile(fileKey: string, fileName: string, fileType: string) {
    let organization = UTILS.GET_ORGANIZATION();
    if (tokenValues && organization) {
        CONFIG.headers["Authorization"] = "Bearer " + tokenValues.token;
        const URL = HOST + "/files/add";
        let body = {
            organization: organization.organization,
            user: organization._id,
            name: fileName,
            type: fileType,
            key: `files/${fileKey}`
        }
        let response = axios.post(URL, body, CONFIG)
            .then(response => {
                return response.data ? response.data : false;
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