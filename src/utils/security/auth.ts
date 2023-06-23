import axios from "axios";
import { tokenModel } from "../../models/user/tokenModel";
import STORAGE from "../storage";
import CONFIG from "./headers";

const HOST = process.env.REACT_APP_HOST;

export async function validateLogin(email: string, password: string) {
    let response = axios.post(HOST + "/login", { email, password }, CONFIG)
        .then(response => {
            let token: tokenModel = response.data;
            STORAGE.SET('TOKEN', token);
            return true;
        })
        .catch(
            function (error) {
                console.log(error.message)
                return false;
            }
        );
    return response;
}