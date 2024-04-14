import React, { useEffect } from 'react';


const ExposureCom = () => {
    return <div>
        <h1 id='exposure_title'>曝光标题</h1>
        <button id='exposure_button'>曝光按钮</button>
    </div>
}

const IntermediateLayer = ({Com, logInfo}) => {
    useEffect(() => {
        Object.entries(logInfo).forEach(([key, value]) => {
            const element = document.getElementById(key);
            console.log("element", element)
            if (element) {
                console.log("曝光fun：", value);
            }
        })
    }, [logInfo])

    return (
        <div>
            <Com/>
        </div>
    )
}

const logInfo = {
    exposure_title: "标题曝光",
    exposure_button: "按钮曝光"
}

const ReverseExtendFun = () => {
    return <IntermediateLayer Com={ExposureCom} logInfo={logInfo} />;
}

export default ReverseExtendFun;