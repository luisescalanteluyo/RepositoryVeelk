export interface fileModel {
    _id: string,
    name: string,
    type: string,
    user: string,
    key: string,
    createdAt: string,
    updatedAt: string,
    __v?: number
};


export class EmptyFile implements fileModel {
    _id: string = '';
    name: string = '';
    type: string = '';
    user: string = '';
    key: string = '';
    createdAt: string = '';
    updatedAt: string = '';
    __v?: number = 0;
}