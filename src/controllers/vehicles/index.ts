import axios from "axios";
import CONFIG from "../../utils/security/headers";
import UTILS from "../../utils/utils";
import { EmptyVehicles, vehiclesModel } from "../../models/vehicles/vehiclesModel";
import { expensesModel, incomesModel } from "../../models/vehicles";

const HOST = process.env.REACT_APP_HOST;
let tokenValues = UTILS.GET_TOKEN();


export async function getAllVehicles(type: string) {
    let organization = UTILS.GET_ORGANIZATION();
    if (tokenValues && organization) {
        CONFIG.headers["Authorization"] = "Bearer " + tokenValues.token
        let response = axios.post(HOST + "/vehicles/all", { organization: organization.organization, type: type }, CONFIG)
            .then(response => {
                if (response.data) {
                    let users: vehiclesModel[] = response.data;
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

export async function getVehicleById(_id: string) {
    let emptyVehicle = new EmptyVehicles();
    if (tokenValues) {
        CONFIG.headers["Authorization"] = "Bearer " + tokenValues.token
        let response = axios.post(HOST + "/vehicles/" + _id, {}, CONFIG)
            .then(response => {
                if (response.data) {
                    let vehicle: vehiclesModel = response.data;
                    return vehicle;
                } else {
                    return emptyVehicle;
                }
            })
            .catch(
                function (error) {
                    return emptyVehicle;
                }
            );
        return response;
    }
    else {
        return emptyVehicle;
    }
}


export async function eventVehicle(user: vehiclesModel) {
    if (tokenValues) {
        CONFIG.headers["Authorization"] = "Bearer " + tokenValues.token;
        const URL = HOST + (user._id === "" ? "/vehicles/add" : "/vehicles/update/" + user._id);
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

export async function picturesVehicle(id: string,fileId: string, type: string, nameFile: string) {
    if (tokenValues) {
        CONFIG.headers["Authorization"] = "Bearer " + tokenValues.token;
        const URL = HOST + "/vehicles/files/"+id;
        let body = {
            fileId: fileId,
            type: type,
            nameFile: nameFile
        }
        let response = axios.post(URL, body, CONFIG)
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


export async function billsVehicle(bills: incomesModel | expensesModel, id: string, type: string) {
    if (tokenValues) {
        CONFIG.headers["Authorization"] = "Bearer " + tokenValues.token;
        const URL = `${HOST}/vehicles/${type}/${id}`;
        let response = axios.post(URL, bills, CONFIG)
            .then(response => {
                if (response.data) {
                    return type === "incomes" ? response.data.incomes : response.data.expenses;
                } else {
                    return false;
                }
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

export async function publishVehicle(id: string | undefined, type: boolean, promo: any) {
    let organization = UTILS.GET_ORGANIZATION();


    if (tokenValues && organization && id !== undefined) {
        CONFIG.headers["Authorization"] = "Bearer " + tokenValues.token;
        const URL = type ? `${HOST}/vehicles/unpublish/${id}` : `${HOST}/vehicles/publish/${id}`;

        promo.starredAt = promo.starredAt ? new Date() : null;

        let body = {
            organization: organization.organization,
            profile: organization._id,
            promo: promo
        }
        let response = axios.post(URL, body, CONFIG)
            .then(response => {
                if (response.data) {
                    return response.data;
                } else {
                    return false;
                }
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

export async function storeVehicle(id: string | undefined) {
    let organization = UTILS.GET_ORGANIZATION();


    if (tokenValues && organization && id !== undefined) {
        CONFIG.headers["Authorization"] = "Bearer " + tokenValues.token;
        const URL = `${HOST}/vehicles/store/${id}`;

        let body = {
            organization: organization.organization,
            profile: organization._id,
        }
        let response = axios.post(URL, body, CONFIG)
            .then(response => {
                if (response.data) {
                    return response.data;
                } else {
                    return false;
                }
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




