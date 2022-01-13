import React from "react";
import { useState, useContext, useEffect, useRef }  from "react";
import routerContext from "../typescript/context_router";
import logo from '../svg/BudgetLogo.svg';
import { useNavigate } from "react-router-dom";
import API from "../typescript/class_api";
import logger from "../config/logger";

export interface DefLoginSession {
    Header: string;
    Set1:   IloginState[];
}

export interface IloginState {
    LoginStatus: string;
    Name?:        string;
    id?:          number;
}

export interface ILogin {
    onlogin:()=>{} |void
}

export const Login: React.FC<ILogin> =(props) => {
    
    const routers = useContext(routerContext);
    const [username, usernameSet] = useState('');
    const [password, passwordSet] = useState('');

    const onUsername =(event:React.ChangeEvent<HTMLInputElement>) => usernameSet (event.target.value);
    const onPassword =(event:React.ChangeEvent<HTMLInputElement>) => passwordSet (event.target.value);
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const [loginstate, setLogin] = useState({
        "LoginStatus": "none",
        "Name": "",
        "id": 0
    });



    const spLogin=async(un:string | undefined, pd:string | undefined)=> {
        const api = new API();
        let url = api.factory() + '&procedurename=spLogin&un=' + un +  '&pd=' + pd;
        logger.info(url);
        const response=await fetch(url).then((res) => res.json()).then((data) => 
          {
            setLogin(data.Set1[0]);
            document.cookie= JSON.stringify(data.Set1[0])
            if (data.Set1[0].LoginStatus ==='Success') {
                // let navigate = useNavigate();
                // navigate("workbench", { replace: true });
                props.onlogin();
            }
          })
          .catch((err) => {
            alert(err);
          });
           
      }  

    const login =()=> {
        spLogin(usernameRef.current?.value ,  passwordRef.current?.value);
        // routers.login(username,password)
    }
    return (
    <div className="login">  
        <div className="wrapper">
            <div className="container">
                {/* <!-- Form element start here --> */}
                <div className="form-elements">
                    <h1>Welcome</h1>
                    <div className="logo">
                    <a href="#" title="">
                        <img src="images/logo-aam.svg" alt="" title=""/>
                    </a>
                    </div>
                    
                    <div className="form">
                        <label  htmlFor="username"  >Username</label>
                        <input ref={usernameRef} type="text" id="username" placeholder=""/>
                        <label  htmlFor="password">Password</label>
                        <input ref={passwordRef} type="password" id="password"placeholder=""/>
                        <button  id="login-button" onClick={login}>Login</button>
                    </div>
                </div>
                {/* <!-- Form element end here --> */}
            </div>
            {/* <!-- Bubble element start here --> */}
            <ul className="bg-bubbles">
                <li><img  src={logo} /></li>
                <li><img  src={logo} /></li>
                <li><img  src={logo} /></li>
                <li><img  src={logo} /></li>
                <li><img  src={logo} /></li>
                <li><img  src={logo} /></li>
                <li><img  src={logo} /></li>
                <li><img  src={logo} /></li>
                <li><img  src={logo} /></li>
                <li><img  src={logo} /></li>
            </ul>
            {/* <!-- Bubble element start here --> */}
        </div>
    </div>     
    )
}


export default Login;