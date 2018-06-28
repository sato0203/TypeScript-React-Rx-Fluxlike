import { inject,injectable } from "inversify";
import "reflect-metadata";
import * as Rx from "rxjs"

export const DispatcherInjectSymbol = Symbol();
@injectable()
export class Dispatcher{
    public pushHelloButton:Rx.Subject<void> = new Rx.Subject<void>();
    public pushWorldButton:Rx.Subject<void> = new Rx.Subject<void>();
    public changeHelloString:Rx.Subject<string> = new Rx.Subject<string>();
    public changeWorldString:Rx.Subject<string> = new Rx.Subject<string>();
}