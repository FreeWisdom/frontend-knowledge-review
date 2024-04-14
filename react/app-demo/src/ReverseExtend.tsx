import React, { Component } from 'react';

/**
 * 比如，我们要非常优雅地实现，组件曝光
 * 有个按钮，我想知道这个按钮线上的曝光情况，以及组件的曝光情况
 * 
 * logProps({
 *  my_text: "my-text-show",
 *  my_btn: "my-btn-show"
 * })(Index);
 */
const logInfo = {
    my_text: "my-text-show",
    my_btn: "my-btn-show"
}

class TargetCom extends Component {
    render() {
        return (
            <div>
                <div id='my_text'>这是一个文字信息</div>
                <button id='my_btn'>这是一个重要的按钮</button>
            </div>
        )
    }
}


const intermediateLayer = (logInfoProps: any) => (TarCom: any) => {
    const TarComDidMount = TarCom.prototype.componentDidMount;

    class A extends TarCom {
        if (TarComDidMount) {
            TarComDidMount.apply(this);
        }

        componentDidMount() {
            if (TarComDidMount) {
                TarComDidMount.apply(this);
            }

            console.log("dddiiiiiddddiii", Object.entries(logInfoProps))
            Object.entries(logInfoProps).forEach(([key, value]) => {
                if(document.getElementById((key))) {
                    console.log("曝光：", value)
                }
            })
        }


        render() {
            console.log("supp", super.render())

            return super.render()
        }
    }

    return A
}

const LogPage = intermediateLayer(logInfo)(TargetCom);

const ReverseExtend = () => {
    return <div>
        <LogPage />
    </div>;
}

export default ReverseExtend;