export interface userModel {
    _id: string,
    firstname: string,
    lastname: string,
    roles: Array<string>,
    gender: string,
    email: string,
    nin: string,
    password: string,
    createdAt: string,
    updatedAt: string,
    __v?: number
};

export const showInDT = [
    "_id",
    "firstname",
    "lastname",
    "gender",
    "email",
    "createdAt",
    "updatedAt"
];

export const inputsNotRequiredEvent = [
    "_id",
    "createdAt",
    "updatedAt",
    "__v"
]

export class EmptyUser implements userModel {
    _id: string = '';
    firstname: string = '';
    lastname: string = '';
    roles: Array<string> = [];
    gender: string = '';
    email: string = '';
    nin: string = '';
    password: string = '';
    createdAt: string = '';
    updatedAt: string = '';
    __v?: number = 0;
}