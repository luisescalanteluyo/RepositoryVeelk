import axios from "axios";
import CONFIG from "../../utils/security/headers";
import UTILS from "../../utils/utils";
import { EmptyUser, userModel } from "../../models/user/userModel";

const HOST = process.env.REACT_APP_HOST;
let tokenValues = UTILS.GET_TOKEN();


export async function getAllUsers() {
    if (tokenValues) {
        CONFIG.headers["Authorization"] = "Bearer " + tokenValues.token
        let response = axios.post(HOST + "/users/all", {}, CONFIG)
            .then(response => {
                if (response.data) {
                    let users: userModel[] = response.data;
                    return users;
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

export async function getUserById(_id: string) {
    let emptyUser = new EmptyUser();
    if (tokenValues) {
        CONFIG.headers["Authorization"] = "Bearer " + tokenValues.token
        let response = axios.post(HOST + "/users/" + _id, {}, CONFIG)
            .then(response => {
                if (response.data) {
                    let users: userModel = response.data;
                    return users;
                } else {
                    return emptyUser;
                }
            })
            .catch(
                function (error) {
                    return emptyUser;
                }
            );
        return response;
    }
    else {
        return emptyUser;
    }
}


export async function eventUser(user: userModel) {
    if (tokenValues) {
        CONFIG.headers["Authorization"] = "Bearer " + tokenValues.token;
        const URL = HOST + (user._id === "" ? "/users/add" : "/users/update/" + user._id);
        let response = axios.post(URL, user, CONFIG)
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

