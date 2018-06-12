import * as Rx from "rxjs";
import { IModel } from "./IModel";

export interface IStore<T extends IModel>{
    model:Rx.BehaviorSubject<T>;
}