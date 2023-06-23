import { chileautosModel } from "./chileautos/chileautosModel";
import { meliModel } from "./meli/meliModel";
import { yapoModel } from "./yapo/yapoModel";

export interface externalModel {
    yapo: yapoModel,
    chileautos: chileautosModel
    meli: meliModel
}