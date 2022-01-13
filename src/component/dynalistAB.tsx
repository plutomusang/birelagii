import React, { useEffect, useState, useRef } from 'react';
import Popupers , {IPopupers} from './popupers';
import {DEF_ICONS, DEF_DOCTYPE} from '../typescript/class_icons';
import logger from '../config/logger';

export interface ISPGet {
  Header: string;
  Set1: IcomboData[];
}
export interface IcomboData {
  id: number;
  name: string;
  active: string;
  picIndex: number;
}
export interface IDynalistAB {
  apiGet: string;
  apiSet: string;
  apiDelete: string;
  value:string;
  id: number;
  picIndex:number;
  header: string;
  openState: boolean;
  onTextChanged: (id:number, data:string)=>{} | void;
  dataClicked: (id:number) => {} | void ; 
  oncheckDrop: () => {} | void | undefined;
}

const DynalistAB: React.FC<IDynalistAB>=(props)=>{

    const [chkValue, chkValueSet] = useState(props.openState);
    const [chkAdd, chkAddSet] = useState(false);
    const [inputValue, inputValueSet] = useState(props.value);
    const [userID, setUserID]  = useState(props.id);
    const [docImage, docImageSet] = useState(DEF_ICONS);
    const [picIndex, setPicIndex] = useState(props.picIndex);
    const inputref = useRef<HTMLInputElement>(null);

    const onShadow = ()=> {
        return chkValue ? 'onShadow' : '';
    }
    const [comboData, setComboData] = useState<ISPGet> ({
      "Header" : '',
      "Set1" : []
    })
    const [cacheData, setCacheData] = useState<ISPGet> ({
      "Header" : '',
      "Set1" : []
    })
    
    const [count, setCount] = useState<IcomboData>({
      id:-1,
      name:'',
      active: '',
      picIndex: 8
    });

    const[popUpClass, setPop] = useState<IPopupers>({
      classname:"pop-upers",
      header: "Edit",
      message:"Continue deleting this record?",
      type: "Input",
      cap1: "Update",
      cap2: "Cancel",
      id:0,
      returnFuntion: update,
    });

    function update(ok:boolean, id:number, value:string ){
      setPop({
        classname:"pop-upers",
        header: "Edit",
        message:"",
        type: "Input",
        cap1: "Update",
        cap2: "Cancel",
        id:0,
        returnFuntion: update,
      });       
      if (ok)
      {
        spSetUsers(id, value);
       
      }
  
    }
    
    const onEdit =(id:number, value:string)=> {
      //logger.info(value);
      chkValueSet(false);
      setPop({
        classname:"pop-upers open",
        header: "Edit",
        message:value,
        type: "Input",
        cap1: "Update",
        cap2: "Cancel",
        id:id,
        returnFuntion: update,
      });
    }
    const onDelete =(id:number, value:string)=> {
      //logger.info(value);
      chkValueSet(false);
      setPop({
        classname:"pop-upers open",
        header: "Delete",
        message:  value + "?",
        type: "Header",
        cap1: "Yes",
        cap2: "No",
        id:id,
        returnFuntion: remove,
      });
    }    
    const remove =(ok:boolean, id:number, value:string)=> {
      chkValueSet(false);
      setPop({
        classname:"pop-upers",
        header: "Delete",
        message:"",
        type: "Header",
        cap1: "Yes",
        cap2: "No",
        id:id,
        returnFuntion: remove,
      });
      if (ok) {
        spDeleteUsers(id);
      }
    }
    //https://localhost:44331/api/ProcessRequest?key=Mercury3356Lorreignmay29&procedurename=spDeleteUsers&id=0
    const spDeleteUsers=async(id:number)=> {
      let url = props.apiDelete + id;
      const response=await fetch(url).then((res) => res.json()).then((data) => 
        {
          setComboData(data);
          setCacheData(JSON.parse(JSON.stringify(data)));
        })
        .catch((err) => {
          alert(err);
        })
    }    
    const spGetUsers=async()=> {
        let url = props.apiGet;
        const response=await fetch(url).then((res) => res.json()).then((data) => 
          {
            setComboData(data);
            setCacheData(JSON.parse(JSON.stringify(data)));
          })
          .catch((err) => {
            alert(err);
          })
    }
    const spSetUsers=async(id:number, name: string)=> {
        let url = props.apiSet + id + "&name=" + name;
        const response=await fetch(url).then((res) => res.json()).then((data) => 
        {
            setComboData(data);
            setCacheData(JSON.parse(JSON.stringify(data)));
            chkAddSet(false);
        })
        .catch((err) => {
            alert(err);
        })
    }      
    const inputClick =()=> {
      cacheData.Set1 = JSON.parse(JSON.stringify(comboData.Set1));
      if (!chkValue) props.oncheckDrop();
      chkValueSet(true);
      
    }
    const upDownClick =()=> {
      cacheData.Set1 = JSON.parse(JSON.stringify(comboData.Set1));
      
      chkValueSet(!chkValue);
      props.oncheckDrop()

    }
    const itemClick =(id: number, data: string, pIndex:number)=> {
      logger.info ('itemClick');
      chkValueSet(!chkValue);
      inputValueSet(data);
      setUserID(id);
      setPicIndex(pIndex);
      props.onTextChanged(id, data); 
      props.dataClicked(id);

    }
    const keyPress = (event:React.KeyboardEvent<HTMLInputElement> | undefined)=> {
      if (!chkValue) return;
      let d = count.id;
      if (event?.key === 'ArrowDown') {
        d = d + 1;
        d = d >= cacheData.Set1.length? cacheData.Set1.length -1: d;
        count.id = d;
        inputValueSet(cacheData.Set1[count.id].name);   
        setUserID(cacheData.Set1[count.id].id)    
        props.onTextChanged(cacheData.Set1[count.id].id, cacheData.Set1[count.id].name);  
      }
      if (event?.key === 'ArrowUp') {
        d = d - 1;
        d = d < 0? 0: d;
        count.id = d;
        inputValueSet(cacheData.Set1[count.id].name);
        setUserID(cacheData.Set1[count.id].id)  ;
        props.onTextChanged(cacheData.Set1[count.id].id, cacheData.Set1[count.id].name);  
      }
      
      // logger.info('cur:' + count.id + ', new' + d)

      

      let i = 0;
      cacheData.Set1.map(o=> {
        let s = i === count.id? 'active': '';
        i++;
        o.active = s;
      })
      setCacheData(cacheData);
     
      if (cacheData.Set1.length === 1) count.id = 0;
      if (cacheData.Set1.length === 0) chkValueSet(false);
      if (event?.key === 'Enter' && cacheData.Set1.length > 0 && count.id > -1) { 
        
        
        inputValueSet(cacheData.Set1[count.id].name);
        setUserID(cacheData.Set1[count.id].id)  ;
        props.onTextChanged(cacheData.Set1[count.id].id, cacheData.Set1[count.id].name); 
        props.dataClicked(cacheData.Set1[count.id].id);
        chkValueSet(false);
        inputref.current?.blur();
      }
    //   logger.info(count.id);
    }
    const onTextChange =(event:React.ChangeEvent<HTMLInputElement>)=>{
      inputValueSet(event.target.value);
      props.onTextChanged(0, event.target.value);

      let d = comboData.Set1.filter( o => o.name.toLocaleLowerCase().indexOf(event.target.value.toLocaleLowerCase().trim())!= -1 );
      d = JSON.parse(JSON.stringify(d));
      let i = 0;
      
      d.map(o=> {
        let s = i++ === count.id? 'active': '';
        o.active = s;
      })
      if (d.length === 0) {
        chkValueSet(false);
        chkAddSet(true);
      }
      else {
        chkValueSet(true);
        chkAddSet(false);
      }

      cacheData.Set1 = d;
      // logger.info (d);
    }
    const onAdd =()=> {
      spSetUsers(0, inputValue)      
    }
    const oncheckDrop =() => {

    }
    useEffect(()=>{
      spGetUsers();
    },[])

    return (
      <React.Fragment >
        
        <div className = "dynalistAB" >
            <Popupers 
            header={popUpClass.header}
            classname={popUpClass.classname}
            id={popUpClass.id}
            cap1={popUpClass.cap1}
            cap2={popUpClass.cap2}
            message={popUpClass.message}
            type={popUpClass.type}
            returnFuntion= {popUpClass.returnFuntion}
            />
            <input type="checkbox" className="toggleradd" checked={chkAdd}  />        
            <div className={"dynalink " + onShadow()}>
                <img className="headerIcon" src={docImage[picIndex]} alt="" onClick={upDownClick}/>
                <input type="checkbox" className="toggler" id={"toggler" + props.header + props.id} checked={chkValue} />        
                <label htmlFor={"toggler" + props.header + props.id} className="dynalink-label">                
                    {/* <input className="dyna-input" type="text" onClick={inputClick} value={inputValue} onChange={onTextChange} onKeyDown={keyPress}/> */}                    
                    <input ref={inputref} className="dyna-input" type="text" onClick={inputClick} value={inputValue} onChange={onTextChange} onKeyDown={keyPress}/>
                    <div className="updown" onClick={upDownClick}>                          
                        <svg className="dynasvgIcon" viewBox="0 0 529.16 529.16">
                            <circle  className="dc1" cx="264.58" cy="264.58" r="221.59"/>
                            <circle  className="dc2"  cx="264.58" cy="264.58" r="184.42"/>
                            <rect  className="dc1" transform="matrix(0.707107 0.707107 -0.707107 0.707107 264.58 162.259)" width="144.69" height="144.69"/>
                            <rect  className="dc2" transform="matrix(0.707107 0.707107 -0.707107 0.707107 264.58 119.269)" width="144.69" height="144.69"/>
                        </svg>
                    </div>

                </label>
                
                <div className="cross" onClick={onAdd}>
                    <svg className="svgCross"  
                    viewBox="0 0 264.58 264.58">


                    <rect className="fil0" x="2.39" y="2.39" width="264.58" height="264.58"/>
                    <rect className="fil1" x="121.07" y="27.77" width="27.22" height="213.81" rx="13.61" ry="26.73"/>
                    <rect className="fil1" transform="matrix(1.08983E-14 -0.411497 0.8081 2.14022E-14 27.7824 148.282)" width="66.15" height="264.58" rx="33.08" ry="33.08"/>

                    </svg>



                </div>

                <ul className='list'>
                { cacheData.Set1.filter(o => o.id !== 0).map((values, index) => {
                    return (
                
                        <li className={'options ' + values.active} key={index}>
                                                        
                            <div className="item"   onClick={()=>itemClick(values.id, values.name, values.picIndex)}>
                                <img src={docImage[values.picIndex]} alt=""/>
                                <a> {values.name } </a>
                            </div>
                            <div className="dbuttons">
                                <div className="dbtnedit" onClick={()=>onEdit(values.id, values.name)} >
                                    <svg  viewBox="0 0 220 220" className="dsvgcrud" >
                                        <polygon  points="0,220 59.34,213.86 6.143,160.661"  />
                                        <path  d="M132.018,34.787l53.197,53.197L69.568,203.631L16.37,150.434L132.018,34.787z M212.696,60.502
                                            c9.738-9.738,9.742-25.527,0-35.268l-17.93-17.93c-9.738-9.74-25.529-9.738-35.268,0l-17.346,17.347l53.199,53.196L212.696,60.502z
                                            " />          
                                    </svg>
                                </div>
                                <div className="dbtnedit" onClick={()=>onDelete(values.id, values.name)}>
                                    <svg className="dsvgcrud" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24"><path d="M3 6l3 18h12l3-18h-18zm19-4v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.316c0 .901.73 2 1.631 2h5.711z" /></svg>
                                </div>        
                            </div>                        
                        </li> 
                    )                       
                    }          
                )}

                </ul>
            </div>
        </div>
      </React.Fragment>
    )
}

export default DynalistAB;