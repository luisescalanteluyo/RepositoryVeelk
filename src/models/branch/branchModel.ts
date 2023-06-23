
export interface branchModel {
    _id: string,
    name: string,
    organization: string,
    profile: string,
    external: object,
    whatsapp: string,
    address: string,
    addressComponents: string,
    email: string,
    phone: string,
    streetNumber: number,
    createdAt: string,
    disabledAt: string,
    updatedAt: string,
    __v: number
};



export class EmptyBranch implements branchModel {
    _id: string = '';
    name: string = '';
    organization: string = '';
    profile: string = '';
    external: object =  {};
    whatsapp: string = '';
    address: string = '';
    addressComponents: string = '';
    email: string = '';
    phone: string = '';
    streetNumber: number = 0;
    createdAt: string = '';
    disabledAt: string = '';
    updatedAt: string = '';
    __v: number = 0;
}