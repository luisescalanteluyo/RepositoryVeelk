import { fileModel } from "../file/fileModel";
import { organizationModel } from "../organizatinos/organizationsModel";


export interface profileModel {
    _id: string,
    roles: Array<string>,
    email: string,
    job: string,
    organization: string,
    detailOrganization: Array<organizationModel>,
    createdBy: string,
    user: string,
    hash: string,
    createdAt: string,
    updatedAt: string,
    isotype: Array<fileModel>,
    logo?:string,
    logotype: Array<fileModel>
    __v: number
};


export const showInDT = [
    "_id",
    "email",
    "job",
    "createdBy",
    "logotype",
    "isotype",
    "createdAt",
    "updatedAt"
];

export const inputsNotRequiredEvent = [
    "_id",
    "createdAt",
    "updatedAt",
    "logotype",
    "isotype",
    "__v"
]

export class EmptyProfile implements profileModel {
    _id: string = '';
    roles: Array<string> = [];
    email: string = '';
    job: string = '';
    organization: string = '';
    detailOrganization: Array<organizationModel> = [];
    createdBy: string = '';
    user: string = '';
    hash: string = '';
    createdAt: string = '';
    logotype: Array<any> = [];
    isotype: Array<any> = [];
    updatedAt: string = '';
    __v: number = 0;
}