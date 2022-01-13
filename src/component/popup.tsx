import React, { useState , useEffect} from 'react'
import logger from '../config/logger'
import IpopUp from "../typescript/interface_popup"

const Popup:React.FC<IpopUp>=(props)=> {
    const [pop, setPop] = useState(props.classname)
    const popupclick =()=> {
        setPop('pop-up open');
    }
    const popClose =(ok:boolean, )=> {
        setPop('pop-up');
        props.returnFuntion(ok, props.id);
    }

    useEffect(() => {
        setPop(props.classname);
    }, [props]);    
    return(
        <div>
            {/* 
            <div className="popbutton" >
                <button onClick={popupclick}><span>Click Me</span></button>
            </div> */}

            <div className={pop}>
                {/* <button className='close' onClick={()=>popClose(false)}>Close</button> */}
                <div className="content">
                    <div className="title"> <h1>Delete</h1></div>
                    <div className="message"> <h1>{props.message}</h1></div>
                    <div >
                        <button className="popbut" onClick={()=>popClose(true)}>Yes</button>
                        <button className="popbut" onClick={()=>popClose(false)}>No</button>
                    </div>                    
                </div>
            </div>
        </div>

    )

}

export default Popup;