import { IModel } from "../../Stores/Base/IModel";

export interface IView<T extends IModel>{
    createView:(model:T) => void;
}