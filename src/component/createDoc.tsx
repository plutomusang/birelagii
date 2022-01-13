import React from "react";
import delivery from "../svg/delivery.svg"
import idea from "../svg/idea.svg"
import process from "../svg/process.svg"
import document from "../svg/document.svg"
import run from "../svg/run.svg"
import transmittal from "../svg/transmittal.svg"
import project from "../svg/project.svg"

import { useState, useContext, useEffect, useRef, useCallback }  from "react";
import NavigationContext from '../typescript/context_navigation';
import {DEF_ICONS, DEF_DOCTYPE} from '../typescript/class_icons';
import routerContext from "../typescript/context_router";
import Dynalist from "./dynalist";
import DynalistAB from "./dynalistAB";
import logger from "../config/logger";
import API from "../typescript/class_api";
export const CreateDoc: React.FC =() => {
    const [docType, docTypeSet] = useState(DEF_DOCTYPE);
    const [docImage, docImageSet] = useState(DEF_ICONS);
    const ctx = useContext(NavigationContext);
    const routers = useContext(routerContext);
    // const initCheck =  ctx.DocumentHeader.DocumentTrackID > 0 ? false: true;
    const initCheck =  false;
    const [chkValue, chkValueSet] = useState(initCheck);
    const [curIndex, curIndexSet] = useState(0);
    const[value, setValue] = useState('value');
    const[userID, setUserID] = useState(0);
    const api = new API();
    const onTextChanged =(id:number , data: string)=> {
        setValue(data);
        setUserID(id);
    } 
    const [typeId, setTypeId] = useState(ctx.DocumentHeader.DocTypeID);

    const oncheckDrop= () => { 
        logger.info('oncheckDrop' );
        chkValueSet(!chkValue);
    };        
    const dataClicked= (id:number) => { 
        logger.info('data clicked' + id);
        setTypeId(id);
        curIndexSet(id);
        chkValueSet(false);
    };    

    const editDocRouter= (ok:boolean, subject:string ,office:string ,projectcode:string , amount:number, remarks:string, recepient:string ) => { 
        var d = new Date(office);
        if (Object.prototype.toString.call(d) === "[object Date]") {
            if (isNaN(d.getTime())) {  // d.valueOf() could also work
                // date is not valid
                alert('ela Date not valid')
              } else {
                // date is valid
                if (ok) {
                    ctx.DocumentHeader.Subject = subject;
                    ctx.DocumentHeader.Office = office;
                    ctx.DocumentHeader.ProjectCode = projectcode;
                    ctx.DocumentHeader.Amount = amount;
                    ctx.DocumentHeader.Remarks = remarks;
                    ctx.DocumentHeader.DocTypeID = typeId;
        
                }
                
                routers.editDocRouter(false, ok, ctx.DocumentHeader);
              }            

          } else {
            ok = false;
            alert('ela Date not valid')
          }

    };

    const IfFormCardContainer= React.memo (() => { 
        const [subject, subjectSet] = useState(ctx.DocumentHeader.Subject);
        const [office, officeSet] = useState(ctx.DocumentHeader.Office);
        const [projectcode, projectcodeSet] = useState(ctx.DocumentHeader.ProjectCode);
        const [amount, amountSet] = useState(ctx.DocumentHeader.Amount);
        const [remarks, remarksSet] = useState(ctx.DocumentHeader.Remarks);
        const [recepient, recepientSet] = useState(ctx.DocumentHeader.Recepient);
        const [docID, setDocID] = useState(ctx.DocumentHeader.DocTypeID);
        const [docType, setDocType] = useState(ctx.DocumentHeader.DocType);
    
        const onSubjectSet =(event:React.ChangeEvent<HTMLTextAreaElement>) => {subjectSet (event.target.value);}
        const onOfficeSet =(event:React.ChangeEvent<HTMLInputElement>) => officeSet (event.target.value);
        const onProjectcodeSet =(event:React.ChangeEvent<HTMLInputElement>) => projectcodeSet (event.target.value);
        const onAmountSet =(event:React.ChangeEvent<HTMLInputElement>) => amountSet (parseInt(event.target.value));
        const onRemarksSet =(event:React.ChangeEvent<HTMLInputElement>) => remarksSet (event.target.value);

        const Recepienttsx =React.memo( () => {
            // const onRecepientSet = (event:React.ChangeEvent<HTMLInputElement>) => ctx.DocumentHeader.Recepient=event.target.value;
            const[value, setValue] = useState(ctx.DocumentHeader.Recepient);
            const[userID, setUserID] = useState(0);
            const onTextChanged =(id:number , data: string)=> {
                setValue(data);
                setUserID(id);
                ctx.DocumentHeader.Recepient=data;
            } 
            
            if (ctx.DocumentTrackID  === 0)
            return (
                    <div className="form-item r1">
                        <label>Revenue Officer</label>    
                        <Dynalist 
                        apiGet={api.factory() + "&procedurename=spGetUsers"}
                        apiSet={api.factory() + "&procedurename=spSetUsers&id="}
                        apiDelete={api.factory() + "&procedurename=spDeleteUsers&id="}
                        value={value}
                        id={userID}
                        header={'Reciever'}
                        onTextChanged={onTextChanged}
                        />
                    </div>
                    // <div  className="form-item r1">                    
                    //     <label htmlFor="">Reciever</label>                                       
                    //     <input type="text" className="form-input" placeholder="" defaultValue={ctx.DocumentHeader.Recepient}  onChange={onRecepientSet} />                        
                    // </div> 
                );
            else return <> </>
        });
        logger.info(chkValue);
        if (!chkValue)
        return (
            <div className="formCardContainer">
                <div className="formCard">                

                    <div  className="form-item k1">                                                
                        <label htmlFor="">Tax Payer</label>                                       
                        <input type="text" className="form-input" placeholder="" defaultValue={ctx.DocumentHeader.Remarks} onChange={onRemarksSet}/>
                    </div> 
                    <div  className="form-item s1">   

                        <label htmlFor="">Address</label>           
                        <textarea className="textarea" placeholder="Enter details here . . . " defaultValue={ctx.DocumentHeader.Subject } onChange={onSubjectSet} />
                    </div>
                    <Recepienttsx />
                    <div  className="form-item">                                                
                        <label htmlFor="">eLA Date</label>                                       
                        <input type="text" className="form-input c1" placeholder="" defaultValue={ctx.DocumentHeader.Office} onChange={onOfficeSet}/>                        
                    </div>
                    <div  className="form-item ">                                               
                        <label htmlFor="">TIN Number</label>                                        
                        <input type="text" className="form-input c2" placeholder="" defaultValue={ctx.DocumentHeader.ProjectCode} onChange={onProjectcodeSet} />                        
                    </div>
                    <div  className="form-item " >                                                
                        <label htmlFor="">ELA Number</label>                                       
                        <input type="text" className="form-input c3" placeholder="" defaultValue={ctx.DocumentHeader.Amount} onChange={onAmountSet} />
                    </div>       

                    <button className="cardbutton" onClick={()=> editDocRouter(true, subject, office,projectcode  , amount, remarks, recepient)}>
                        <span className="submit" >
                            Submit
                        </span>
                    </button>       
                    <button className="cardbutton" onClick={()=> editDocRouter(false, subject, office,projectcode  , amount, remarks, recepient)}>
                        <span className="submit">
                            Cancel
                        </span>
                    </button>                                                   
                </div>
            </div>
        )
        else return <></>
    });
    const getDocTypeCaption=() => {
        return ctx.DocumentHeader.DocTypeID === 0? "Track New Record" : ctx.DocumentHeader.DocType;
    }
    useEffect(() => {
        if (ctx.DocumentHeader.DocumentTrackID > 0 ) {
            dataClicked(ctx.DocumentHeader.DocTypeID);
        }
        
    }, []);
    
    return (
        <div className="createDoc">
            <div className="combocontainer">

                <DynalistAB
                apiGet={api.factory() + "&procedurename=spGetDoctype"}
                apiSet={api.factory() + "&procedurename=spSetDoctype&id="}
                apiDelete={api.factory() + "&procedurename=spDeleteDoctype&id="}
                value={getDocTypeCaption()}
                id={ctx.DocumentHeader.DocTypeID}
                picIndex={ctx.DocumentHeader.picIndex}
                header={"DocType"}
                openState={chkValue}
                onTextChanged={onTextChanged}
                dataClicked={dataClicked}
                oncheckDrop={oncheckDrop}
                />           

            </div>
            
            <IfFormCardContainer />
        </div>        
    )
}

export default CreateDoc;