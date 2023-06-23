import { fileModel } from '../file/fileModel';
import {
    attachmentsModel,
    bodyModel,
    documentsModel,
    engineModel,
    expensesModel,
    externalModel,
    incomesModel,
    maintenanceModel,
    picturesModel,
    priceModel,
    promoModel
} from './index';

export interface vehiclesModel {
    _id: string,
    pictures?: picturesModel,
    odometer: number,
    owners: number,
    keys: number,
    appraisal: number,
    model: string,
    plate: string,
    year: number,
    state: string,
    comments: string,
    documents: documentsModel,
    maintenance: maintenanceModel,
    organization: string,
    profile: string,
    incomes: Array<incomesModel>,
    expenses: Array<expensesModel>,
    createdAt: string,
    updatedAt: string,
    __v?: number,
    body?: bodyModel,
    engine?: engineModel,
    features: Array<string>,
    archivedAt: string,
    archivedBy: string,
    attachments?: Array<attachmentsModel>,
    file: string,
    name: string,
    type: string,
    branch: string,
    brand: string,
    characteristics: Array<string>,
    chassisId: string,
    chassisType: string,
    color: string,
    engineId: string,
    external?: externalModel,
    fuel: string,
    gearbox: string,
    make: string,
    price: string,
    promo?: promoModel,
    starredAt: string,
    publishedAt: string,
    publishedBy: string,
    reservation: string,
    reservedAt: string,
    soldAt: string,
    soldBy: string,
    suggestedPrice: string,
    transmission: string,
    trim: string,
    version: string,
    vin: string,
    publicsFiles: Array<fileModel>,
    registryFiles: Array<fileModel>,
    attachmentsFiles: Array<fileModel>,
    _uuid: string
};

export const inputsNotRequiredEvent = [
    "_id",    
    "name",
    "publicsFiles",
    "registryFiles",
    "attachmentsFiles",
    "archivedAt",
    "archivedBy",
    "publishedAt",
    "publishedBy",
    "reservation",
    "reservedAt",
    "soldAt",
    "soldBy",
    "starredAt",
    "createdAt",
    "updatedAt",
    "pictures",
    "external",
    "transmission",
    "trim",
    "vin",
    "make",
    "file",
    "attachments",
    "features",
    "body",
    "expenses",
    "incomes",
    "engine",
    "promo",
    "maintenance",
    "_uuid",
    "__v"
];

export class EmptyVehicles implements vehiclesModel {
    _id: string = '';
    pictures: any  = {};
    body: any  = {};
    engine: any  = {};
    external: any  = {};
    promo: any  = {};
    attachments: any = [];
    odometer: number = 0;
    owners: number = 0;
    keys: number = 0;
    appraisal: number = 0;
    model: string = '';
    plate: string = '';
    year: number = 0;
    state: string = '';
    comments: string = '';
    documents: documentsModel = {
        insurance: '',
        permit: '',
        checkup: '',
    };
    maintenance: maintenanceModel = {
        comments: '',
        status: ''
    };
    organization: string = '';
    profile: string = '';
    incomes: any = [];
    expenses: any = [];
    createdAt: string = '';
    updatedAt: string = '';
    __v: number = 0;
    features = [];
    archivedAt: any = null;
    archivedBy: any = null;
    file: string = '';
    name: string = '';
    type: string = '';
    branch: string = '';
    brand: string = '';
    characteristics = [];
    chassisId: string = '';
    chassisType: string = '';
    color: string = '';
    engineId: string = '';
    fuel: string = '';
    gearbox: string = '';
    make: string = '';
    price: string = '';
    starredAt: any = null;
    publishedAt: any = null;
    publishedBy: any = null;
    reservation: any = null;
    reservedAt: any = null;
    soldAt: any = null;
    soldBy: any = null;
    suggestedPrice: string = '';
    transmission: string = '';
    trim: string = '';
    version: string = '';
    vin: string = '';
    _uuid: string = '';
    registryFiles: any= [];
    publicsFiles: any= [];
    attachmentsFiles: any= [];
}