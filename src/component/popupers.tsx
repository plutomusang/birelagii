import React, { useState , useEffect, useCallback} from 'react'


export interface IPopupers {
    classname: string;
    message:  string;
    header: string;
    type: string;
    cap1: string;
    cap2: string;
    id: number;
    returnFuntion: (ok:boolean, id:number, value: string) => {}| void | undefined;
}

const Popupers:React.FC<IPopupers>=(props)=> {
    const [pop, setPop] = useState(props.classname);
    //logger.info(props);

    const popClose =(classname:string)=> {
        setPop(classname);
    }
    useEffect(() => {       
        setPop(props.classname);
    }, [props]); 
    
    return(
        <div>
            <div className={pop}>

                {/* <button className='close' onClick={()=>popClose(false)}>Close</button> */}
                <div className="content">
                    {/* <div className="title"> <h1>Delete</h1></div>
                    <div className="message"> <h1>{props.message}</h1></div> */}

                    <OnType message={props.message} props={props} setPop={popClose}/>
                 
                </div>
            </div>
        </div>

    )

}

interface IOnType {
    props: IPopupers,
    message:string,
    setPop:(value:string)=>void,
}
const OnType:React.FC<IOnType> =(o)=> {
    
    const [inputValue, SetInputValue] = useState(o.props.message);
    const onChange=(events:React.ChangeEvent<HTMLInputElement>) => {
        SetInputValue(events.target.value)
    }

    const popClose =(ok:boolean )=> {
        o.setPop('pop-upers');
        o.props.returnFuntion(ok, o.props.id, inputValue);
    }

    const onkeyDown =(events:React.KeyboardEvent<HTMLInputElement>) => {
        if (events?.key === 'Enter') { 
            popClose(true);
          }
        
    }
    useEffect(()=>{
        SetInputValue(o.props.message)
      },[o.props])
    if (o.props.type === 'Input'){
        //logger.info(o.props);
    return (
        <React.Fragment>
        <div className="title"><h1>{o.props.header}</h1></div>
        <input className="dyna-input" type="text" value={inputValue} onChange={onChange} onKeyDown={onkeyDown}/>
        <div >
            <button className="popbut" onClick={()=>popClose(true)}>{o.props.cap1}</button>
            <button className="popbut" onClick={()=>popClose(false)}>{o.props.cap2}</button>
        </div>   
        </React.Fragment>
    )}
    else {
        return (
            <React.Fragment>
                <div className="title"><h1>{o.props.header}</h1></div>
                <div className="message"> <h2>{o.message}</h2></div>
                <div >
                    <button className="popbut" onClick={()=>popClose(true)}>{o.props.cap1}</button>
                    <button className="popbut" onClick={()=>popClose(false)}>{o.props.cap2}</button>
                </div> 
            </React.Fragment>
        
        )
    }
}

export default Popupers;