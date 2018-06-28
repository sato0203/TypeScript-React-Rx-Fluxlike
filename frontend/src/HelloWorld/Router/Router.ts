import { inject,injectable } from "inversify";
import "reflect-metadata";
import * as Rx from "rxjs";
import { DispatcherInjectSymbol, Dispatcher } from "../Dispatchers/Dispatcher";
import { IView } from "../Views/Base/IView";
import { IStore } from "../Stores/Base/IStore";
import { IModel } from "../Stores/Base/IModel";
import { List } from "linqts";
import createHistory from 'history/createBrowserHistory';

const hist = createHistory();

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
    public initialize = (routes: Route[]) => {
        this.routes = routes;
        var possibleViews = new List(routes).Where(x => location.pathname.startsWith(x.path)).OrderByDescending(x => x.path.length).ToArray();
        console.dir(possibleViews);
        if(possibleViews.length > 0){
            this.set(possibleViews[0].path)
        }
        else{
            this.set(routes[0].path)
        }

        hist.listen((loc,action) => {
            this.set(loc.pathname);
        })
    }
    public set = (path:string) => {
        console.log(path)
        if(this.routes.filter(x => x.path == path).length == 0){
            path = this.routes[0].path;
        }
        const nextRoute= this.routes.filter(x => x.path == path)[0];
        this.currentRoute = nextRoute;
    }
    public push = (path:string) => {
        hist.push(path,path);
    }
}

export interface IRouter{
    set:(path:string) => void;
    push:(path:string) => void;
    initialize:(routes:Route[]) => void;
}
export const IRouterInjectSymbol = Symbol();