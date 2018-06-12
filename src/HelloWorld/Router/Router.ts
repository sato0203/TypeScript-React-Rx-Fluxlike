import { inject,injectable } from "inversify";
import "reflect-metadata";
import * as Rx from "rxjs";
import { DispatcherInjectSymbol, Dispatcher } from "../Dispatchers/Dispatcher";
import { IView } from "../Views/Base/IView";
import { IStore } from "../Stores/Base/IStore";
import { IModel } from "../Stores/Base/IModel";

export class Route{
    constructor(public path:string,public view:IView<any>,public store:IStore<any>){}
}

@injectable()
export class Router implements IRouter{
    private model:IModel;
    private routes:Route[];
    private curStoreSubscriber:Rx.Subscription = null;
    private _currentRoute:Route = null;
    private get currentRoute(){
        return this._currentRoute;
    }
    private set currentRoute(value:Route){
        this._currentRoute = value;
        if(this.curStoreSubscriber !=null)
            this.curStoreSubscriber.unsubscribe();
        this.curStoreSubscriber = value.store.model.subscribe(model => {
            this.currentRoute.view.createView(model);
        })
    }

    constructor(@inject(DispatcherInjectSymbol)dispatcher:Dispatcher){
        dispatcher.pushWorldButton.subscribe(() => {
            console.log("pushWorld")
            const nextRoute = this.routes.filter(x => x.path == "/world")[0]; 
            this.currentRoute = nextRoute
        })
        dispatcher.pushHelloButton.subscribe(()=> {
            const nextRoute = this.routes.filter(x => x.path == "/hello")[0]; 
            this.currentRoute = nextRoute
        })
    }
    public setRoutes = (routes:Route[]) => {
        this.routes = routes;
        if(this.currentRoute == null){
            this.currentRoute = routes[0];
        }

        console.dir(this.routes)
    }
    
    
}

export interface IRouter{
    setRoutes:(routes:Route[]) => void
}
export const IRouterInjectSymbol = Symbol();