import * as React from "react";
import * as ReactDOM from "react-dom"
import "reflect-metadata";
import { injectable } from "inversify";
import { HelloModel } from "../Stores/HelloStore";
import { IViewProps } from "./Base/IViewProps";
import { IView } from "./Base/IView";

@injectable()
export class WorldView implements IWorldView{
    createView = (model:HelloModel) => {
        ReactDOM.render(<HelloComponent model={model}/>,document.getElementById("react"));
    }
}
export interface IWorldView extends IView<HelloModel>{}
export const IWorldViewInjectSymbol = Symbol();

export class HelloComponent extends React.Component<IViewProps<HelloModel>>{
    render(){
        return (
            <div>
                <span>World</span>
                <input type="text" value={this.props.model.formString} onChange={(ele) => this.props.model.dispatcher.changeWorldString.next(ele.target.value)} />
                <input type="button" value="hello" onClick={() => this.props.model.dispatcher.pushHelloButton.next()} />
            </div>
        );
    }
}