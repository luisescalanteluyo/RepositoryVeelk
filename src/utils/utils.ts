import { profileModel } from "../models/profiles/profilesModel";
import STORAGE from "./storage";

const UTILS = {
    GET_TOKEN: () => {
        let token = STORAGE.GET("TOKEN");
        return (token !== null) ? token : false;
    },

    SET_ORGANIZATION: (profileId: profileModel) => {
        STORAGE.SET('ORGANIZATION', profileId);
        window.location.href = "/vehicles";
    },

    GET_ORGANIZATION: () => {
        let organization = STORAGE.GET("ORGANIZATION");
        return (organization !== null) ? organization : false;
    },

    VALIDATE_ORGANIZATION: () => {
        let organization = STORAGE.GET("ORGANIZATION");
        if (organization === null) {
            window.location.href = "/dashboard";
        }
    },

    RIGHT_MENU_EXPANDED: () => {
        let leftMenu = STORAGE.GET("LEFT_MENU");
        leftMenu = !leftMenu;

        STORAGE.SET("LEFT_MENU", leftMenu);
        let html = document.querySelector("html")?.classList;
        if (leftMenu) {
            html?.add("layout-menu-expanded")
        } else {
            html?.remove("layout-menu-expanded")
        }
    },

    SET_COLUMNS_DATATABLE: (model: any) => {
        return Object.keys(model).map(key => {
            return {
                id: `${key}_${Math.floor(Math.random() * 1000)}`,
                name: key
            }
        });
    },

    SET_RANDOM_KEY: (key: string) => `${key}_${Math.floor(Math.random() * 1000)}`,

    ACTION_TEMPLATE_TEXT: (is: string) => {
        return is === "add" ? "Agregar" : "Editar";
    },
    VALIDATE_EMPTY_FIELDS: (model: object, inputsNotRequiredEvent: string[]) => {
        let count = 0;
        Object.entries(model).map(item => {
            if (!inputsNotRequiredEvent.includes(item[0])) {
                if (typeof item[1] == 'string') {
                    if (item[1] === '') { console.log("string", item[0], " ---->  ", item[1]); count++; }
                } else if (typeof item[1] == 'object') {
                    if (item[1] && Object.keys(item[1]).length === 0) { console.log("obj", item[0], " ---->  ", item[1]); count++; }
                }
            }
        })
        return count > 0;
    },

    FORMAT_CURRENCY_ITEM: (value: string | undefined | number) => {
        const formatter = new Intl.NumberFormat('en-US', {
            style: 'decimal',
            currency: 'USD',
        });

        if(typeof value === "number"){
            return formatter.format(value)
        }else {
            return value !== undefined ? formatter.format(parseInt(value)) : formatter.format(0);
        }

        
    }
}

export default UTILS;