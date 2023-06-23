import { generalNumberModel, generalStringModel } from "./generalMEModel";


export interface meliModel {
    attributes: generalNumberModel,
    category: generalStringModel,
    city: generalStringModel,
    listingType: generalStringModel,
    state: generalStringModel,
    validatedAt: string,
    publishedBy: string,

}
