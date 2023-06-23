import axios from "axios";
import CONFIG from "../../utils/security/headers";
import UTILS from "../../utils/utils";
import { profileModel } from "../../models/profiles/profilesModel";
import S3Aws from "../../utils/aws/session";


const HOST = process.env.REACT_APP_HOST;
let tokenValues = UTILS.GET_TOKEN();


export async function getAllProfiles() {
    if (tokenValues) {
        CONFIG.headers["Authorization"] = "Bearer " + tokenValues.token
        let response = axios.post(HOST + "/profiles/all", {}, CONFIG)
            .then(response => {
                if (response.data) {
                    let profiles: profileModel[] = response.data;
                    return profiles;
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

const setProfileImage =  async (key: string, type: string) => {
    let image = "/assets/img/elements/default.png";
    if (key !== "") {
        const getS3Image: any = await S3Aws.getImage(key);
        if (typeof getS3Image === 'string') {
            image = `data:${type};base64, ${getS3Image}`;
        }
    }
    return image;
}

export async function getAllProfilesByUserId() {
    if (tokenValues) {
        CONFIG.headers["Authorization"] = "Bearer " + tokenValues.token
        let response = axios.post(HOST + "/profiles/user/" + tokenValues._id, {}, CONFIG)
            .then(async response => {
                if (response.data) {
                    let profiles: profileModel[] = response.data;
                    for (let index = 0; index < profiles.length; index++) {
                        profiles[index].logo = await setProfileImage(profiles[index].isotype[0].key, profiles[index].isotype[0].type);
                    }
                    console.log({profiles})
                    return profiles;
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
