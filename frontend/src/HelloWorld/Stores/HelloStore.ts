import * as Rx from "rxjs"
import "reflect-metadata";
import { injectable, inject } from "inversify";
import { DispatcherInjectSymbol, Dispatcher } from "../Dispatchers/Dispatcher";
import { IModel } from "./Base/IModel";
import { IStore } from "./Base/IStore";
import { IRouterInjectSymbol, Router } from "../Router/Router";
import { Common } from "../../Common/Common";

@injectable()
export class HelloStore implements IHelloStore{
    constructor(@inject(DispatcherInjectSymbol)dispatcher:Dispatcher,
                @inject(IRouterInjectSymbol)router:Router){
        this.model = new Rx.BehaviorSubject<HelloModel>(new HelloModel(dispatcher));
        dispatcher.changeHelloString.subscribe(x => {
            let newModel = this.model.getValue();
            newModel.formString = x;
            this.model.next(newModel);
        })
        dispatcher.pushWorldButton.subscribe(() => {
            router.push("/world")
        })
    }
    public model:Rx.BehaviorSubject<HelloModel>;
}

export const IHelloStoreInjectSymbol = Symbol();
export interface IHelloStore extends IStore<HelloModel>{}

export class HelloModel implements IModel{
    constructor(dispatcher:Dispatcher){
        this.dispatcher = dispatcher;
    }
    dispatcher:Dispatcher;
    formString:string = "";
}