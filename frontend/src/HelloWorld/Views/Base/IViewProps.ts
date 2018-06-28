import { IModel } from "../../Stores/Base/IModel";

export interface IViewProps<T extends IModel> {
    model:T
}