
export interface documentsModel {
    insurance: string,
    permit: string,
    checkup: string
}

export class EmptyDocuments implements documentsModel {
    insurance: string = '';
    permit: string = '';
    checkup: string = '';
}

