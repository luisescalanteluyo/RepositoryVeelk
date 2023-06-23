import { generalNumberModel, generalStringModel } from "./generalCAModel";

export interface chileautosModel {
    category: generalNumberModel,
    chassis: generalStringModel,
    doors: number,
    engine: string,
    model: string,
    power: number,
    roof: generalStringModel,
    steering: generalStringModel,
    type: generalStringModel,
    displacement: generalNumberModel,
    validatedAt: string,
    make: generalNumberModel,
    trim: string,
    soldAt: string,
    soldBy: string,
    publishedBy: string,
    adId: string,
}