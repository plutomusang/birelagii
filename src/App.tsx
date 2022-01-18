
import HeaderAB ,{IHeaderProps}from './component/header';

import { Outlet  } from "react-router-dom";
import { useNavigate, Navigate } from "react-router-dom";
import "./sass/main.scss";
import {timeparser} from  "./typescript/class_timeUtil";

import API from "./typescript/class_api";
import React, { useEffect, useState }   from "react";
import {jsDateToSQL} from './typescript/class_timeUtil';
import WorkBench from './page/workbench';
import Login, {IloginState} from './page/login';
import logger from './config/logger';



function App() {
  const [session, setSession] = useState(false);
  const [hp, setHP] = useState<IHeaderProps>({
    logout: onLogout,
    onWorkBench: onWorkbenchOpen,
    onSession: false
  })


  interface IisLogin {
    onlogin:()=>{} |void
}
  const IsLogin: React.FC<IisLogin> =(isprops)=>{



    let o = document.cookie + '';  
    logger.info(document.cookie);
    o = o===''? 'none': o;
    // const o = 'none';  
    // o = 'none';
    let ok = false;
    if (o!='none') {
      let ls: IloginState = JSON.parse(o);
      ok = ls.LoginStatus === 'Success'? true: false;    
    }


    setSession(ok)
    if (ok) {
      return (
        <WorkBench />
      )
    }else {
      return (
        <Login onlogin={isprops.onlogin} />
      )
    }
    

  }
  function onWorkbenchOpen() {
    // alert('wb');
  }
  function onLogout (){
    setSession(false);
  }
  function onLogIn (){
    setSession(true);
  }
  // const DisplayNotificaiton=()=>{

  //     if (Notification.permission == 'granted') {
  //       navigator.serviceWorker.getRegistration().then(function(reg: any) {
  //         reg.showNotification('Hello world!');
  //       });
  //     }
  // }
  useEffect(()=>{    
    // let navigate = useNavigate();
    // navigate("login");
    // OneSignal.init({
    //   appId: "72dd7198-a72b-408f-a59f-3c9ee91c5e84"
    // });    
  },[]);
  return (    
    <div className="App">
        {/* <button onClick={DisplayNotificaiton}>Test PushNotification 22</button> */}
        <HeaderAB logout={onLogout} onSession={session} onWorkBench={onWorkbenchOpen}/>
        <IsLogin onlogin={onLogIn}/>
        {/* <Outlet/> */}

    </div>
  );
}

export default App;

