import React from "react";
import { useState, useContext, useEffect, useRef }  from "react";
import routerContext from "../typescript/context_router";
export const Test: React.FC =() => {
    const routers = useContext(routerContext);
    const [username, usernameSet] = useState('');
    const [password, passwordSet] = useState('');

    const onUsername =(event:React.ChangeEvent<HTMLInputElement>) => usernameSet (event.target.value);
    const onPassword =(event:React.ChangeEvent<HTMLInputElement>) => passwordSet (event.target.value);
    const login =()=> {
        routers.login(username,password)
    }
    return (
 <div className="test">  
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
			
			<form className="form">
				<input type="text" placeholder="Username"/>
				<input type="password" placeholder="Password"/>
				<button  id="login-button" onClick={login}>Login</button>
			</form>
			</div>
			{/* <!-- Form element end here --> */}
		</div>
		{/* <!-- Bubble element start here --> */}
		<ul className="bg-bubbles">
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
		</ul>
		{/* <!-- Bubble element start here --> */}
	</div>
    </div>     
    )
}


export default Test;