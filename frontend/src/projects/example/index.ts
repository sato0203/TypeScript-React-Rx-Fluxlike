import * as React from "react";
import * as ReactDOM from "react-dom";
import {Container, injectable, inject} from "inversify";
import "reflect-metadata";
import {Dispatcher, DispatcherInjectSymbol} from "./Dispatchers/Dispatcher";
import { Router,IRouter, IRouterInjectSymbol, Route } from "./Router/Router";
import { IHelloStore, IHelloStoreInjectSymbol, HelloStore } from "./Stores/HelloStore";
import { IWorldStoreInjectSymbol, WorldStore, IWorldStore } from "./Stores/WorldStore";
import { IHelloViewInjectSymbol, IHelloView, HelloView } from "./Views/HelloView";
import { IWorldViewInjectSymbol, IWorldView, WorldView } from "./Views/WorldView";


const container = new Container();

//StoresBind
container.bind<IHelloStore>(IHelloStoreInjectSymbol).to(HelloStore).inSingletonScope();
container.bind<IWorldStore>(IWorldStoreInjectSymbol).to(WorldStore).inSingletonScope();
//ViewsBind
container.bind<IHelloView>(IHelloViewInjectSymbol).to(HelloView).inSingletonScope();
container.bind<IWorldView>(IWorldViewInjectSymbol).to(WorldView).inSingletonScope();
//RouterBind
container.bind<IRouter>(IRouterInjectSymbol).to(Router).inSingletonScope();
//DispatcherBind
container.bind<Dispatcher>(DispatcherInjectSymbol).to(Dispatcher).inSingletonScope();

//Inject Stores and Views and Routes(RouteSettings)
var route:Route[] = [
    new Route("/hello",container.get<IHelloView>(IHelloViewInjectSymbol),container.get<IHelloStore>(IHelloStoreInjectSymbol)),
    new Route("/world",container.get<IWorldView>(IWorldViewInjectSymbol),container.get<IWorldStore>(IWorldStoreInjectSymbol)),
]

const router = container.get<IRouter>(IRouterInjectSymbol);
router.initialize(route);

//Inject Dispatcher
var server = container.get<Dispatcher>(DispatcherInjectSymbol);