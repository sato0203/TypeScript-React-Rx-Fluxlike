import { inject,injectable } from "inversify";
import "reflect-metadata";
import * as Rx from "rxjs"

export const DispatcherInjectSymbol = Symbol();
@injectable()
export class Dispatcher{
}