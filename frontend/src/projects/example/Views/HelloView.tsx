import * as React from "react";
import * as ReactDOM from "react-dom"
import "reflect-metadata";
import { injectable } from "inversify";
import { HelloModel } from "../Stores/HelloStore";
import { IViewProps } from "./Base/IViewProps";
import { IView } from "./Base/IView";

@injectable()
export class HelloView implements IHelloView{
    createView = (model:HelloModel) => {
        ReactDOM.render(<HelloComponent model={model}/>,document.getElementById("react"));
    }
}
export interface IHelloView extends IView<HelloModel>{}
export const IHelloViewInjectSymbol = Symbol();

export class HelloComponent extends React.Component<IViewProps<HelloModel>>{
    render(){
        return (
            <div>
                <span>Hello</span>
                <input type="text" value={this.props.model.formString} onChange={(ele) => this.props.model.dispatcher.changeHelloString.next(ele.target.value)}  />
                <input type="button" value="world" onClick={() => this.props.model.dispatcher.pushWorldButton.next()} />
            </div>
        );
    }
}