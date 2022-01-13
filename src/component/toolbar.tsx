import React from "react";
import addNew from '../svg/addnew.svg';
import InputBox from "./inputbox";
import { useState, useContext, useEffect, useRef }  from "react";
import NavigationContext from '../typescript/context_navigation';
import routerContext from "../typescript/context_router";
export const ToolBar: React.FC =() => {
    const routers = useContext(routerContext);

    function router () {
        routers.createDocRouter(true);
    }
    return (

        <div className="toolbar">
            <div className="tbContainer">
                {/* <div className="searchbar">
                    <InputBox />
                </div>                 */}

                <button className="btntoolbarhidden" onClick ={() => router()}>
                    <span className="btntoolbar">
                        <img src={addNew} /> 
                        <div>Create </div>
                    </span>
                </button>




            </div>

        </div>
    )
}

export default ToolBar;