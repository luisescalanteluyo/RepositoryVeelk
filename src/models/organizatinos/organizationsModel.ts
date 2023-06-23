import { colorsModel } from "./colorsModel";
import { externalModel } from "./externalEnableModel";
import { picturesModel } from "./picturesModel";


export interface organizationModel {
    _id: string,
    name: string,
    email: string,
    phone: string,
    domain: string,
    nin: string,
    public?: Object,
    external: externalModel,
    addressComponents: string,
    representatives: string,
    streetNumber: string,
    legalName: string,
    business: string,
    pictures: picturesModel,
    colors: colorsModel,
    createdBy: string,
    apiKey: string,
    createdAt: string,
    updatedAt: string,
    __v: number

};


export const showInDT = [
    "_id",
    "name",
    "email",
    "phone",
    "domain",
    "nin",
    "createdAt",
    "updatedAt"
];

export const inputsNotRequiredEvent = [
    "_id",
    "createdAt",
    "updatedAt",
    "__v"
]

export class EmptyOrganization implements organizationModel {
    _id: string = '';
    public: Object = {};
    external: externalModel = {
        yapo: { enabled: false },
        chileautos: { enabled: false },
        meli: { enabled: false }
    };
    addressComponents: string = '';
    representatives: string = '';
    streetNumber: string = '';
    legalName: string = '';
    business: string = '';
    name: string = '';
    email: string = '';
    phone: string = '';
    domain: string = '';
    nin: string = '';
    pictures: picturesModel = {
        isoType: '',
        logotype: ''
    };
    colors: colorsModel = {
        primary: '',
        info: '',
        danger: '',
        success: '',
        warning: ''
    };
    createdBy: string = '';
    apiKey: string = '';
    createdAt: string = '';
    updatedAt: string = '';
    __v: number = 0;
}
