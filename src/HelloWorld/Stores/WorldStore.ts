import * as Rx from "rxjs"
import "reflect-metadata";
import { injectable, inject } from "inversify";
import { IModel } from "./Base/IModel";
import { Dispatcher, DispatcherInjectSymbol } from "../Dispatchers/Dispatcher";
import { IStore } from "./Base/IStore";

@injectable()
export class WorldStore implements IWorldStore{
    constructor(@inject(DispatcherInjectSymbol)dispatcher:Dispatcher){
        this.model = new Rx.BehaviorSubject<WorldModel>(new WorldModel(dispatcher));

        dispatcher.changeWorldString.subscribe(x => {
            let newModel = this.model.getValue();
            newModel.formString = x;
            this.model.next(newModel);
        })
    }
    
    public model:Rx.BehaviorSubject<WorldModel>;
}

export const IWorldStoreInjectSymbol = Symbol();
export interface IWorldStore extends IStore<WorldModel>{}

export class WorldModel implements IModel{
    constructor(dispatcher:Dispatcher){
        this.dispatcher = dispatcher;
    }
    dispatcher:Dispatcher;
    formString:string = "";
}