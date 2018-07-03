import * as React from "react";
import * as ReactDOM from "react-dom";
import {Container, injectable, inject} from "inversify";
import "reflect-metadata";
import {Dispatcher, DispatcherInjectSymbol} from "./Dispatchers/Dispatcher";
import { Router,IRouter, IRouterInjectSymbol, Route } from "./Router/Router";


const container = new Container();

//StoresBind
//RouterBind
container.bind<IRouter>(IRouterInjectSymbol).to(Router).inSingletonScope();
//DispatcherBind
container.bind<Dispatcher>(DispatcherInjectSymbol).to(Dispatcher).inSingletonScope();

//Inject Stores and Views and Routes(RouteSettings)
var route:Route[] = [
]

const router = container.get<IRouter>(IRouterInjectSymbol);
router.initialize(route);

//Inject Dispatcher
var server = container.get<Dispatcher>(DispatcherInjectSymbol);