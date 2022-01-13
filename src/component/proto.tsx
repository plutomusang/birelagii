import React from "react";
// import "../sass/timeline.scss"
import "../css/proto.css"

export const Proto: React.FC =() => {
    return (
        <div className="timeline-container">
        <div className="timeline">
          
          <div className="tl-date"> 
            <a> 08-08 Tue 3PM</a>
          </div>
          <div className="tl-status">
            <div className ="circle"> </div> 
            <div className ="circliner"> </div> 
          </div>
          <div className="tl-info"> 
            <div className="person">Person Name </div>          
          </div>
          <div className="buttons">
            <div className="btnedit">
             <svg  viewBox="0 0 220 220" className="svgicon" >
              <polygon  points="0,220 59.34,213.86 6.143,160.661"  />
              <path  d="M132.018,34.787l53.197,53.197L69.568,203.631L16.37,150.434L132.018,34.787z M212.696,60.502
                  c9.738-9.738,9.742-25.527,0-35.268l-17.93-17.93c-9.738-9.74-25.529-9.738-35.268,0l-17.346,17.347l53.199,53.196L212.696,60.502z
                  " />          
            </svg>
            </div>
            <div className="btnedit">
              <svg className="svgicon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M3 6l3 18h12l3-18h-18zm19-4v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.316c0 .901.73 2 1.631 2h5.711z" /></svg>
            </div>        
          </div>
          
          <div className="tl-date-rel"> 
            <div>4PM</div>
            <div>10 min</div>
          </div>
          <div className="vliner-container"> <div className="vliner"></div> </div>
          <div className="infoclassName lastline">
            <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec lobortis scelerisque odio sit amet dictum. Etiam eget pharetra ligula. Vestibulum eget faucibus nisl. Sed in eros ornare, dapibus erat eu, commodo orci. Pellentesque sit amet mollis nisl, et rhoncus arcu. Lorem ipsum dolor sit amet, consectetur adipiscing elit. </div>        
          </div>
          <div className="lastline"></div>  
    
        </div>
        
        <div className="timeline">
          
          <div className="tl-date"> 
            <a> 08-09 Wed 8AM</a>        
          </div>
          <div className="tl-status">
            <div className ="circle"> </div> 
            <div className ="circliner"> </div> 
          </div>
          <div className="tl-info"> 
            <div className="person">Person Name </div>          
          </div>
          <div className="buttons">
            <div className="btnedit">
             <svg  viewBox="0 0 220 220" className="svgicon" >
              <polygon  points="0,220 59.34,213.86 6.143,160.661"  />
              <path  d="M132.018,34.787l53.197,53.197L69.568,203.631L16.37,150.434L132.018,34.787z M212.696,60.502
                  c9.738-9.738,9.742-25.527,0-35.268l-17.93-17.93c-9.738-9.74-25.529-9.738-35.268,0l-17.346,17.347l53.199,53.196L212.696,60.502z
                  " />          
            </svg>
            </div>
            <div className="btnedit">
              <svg className="svgicon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M3 6l3 18h12l3-18h-18zm19-4v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.316c0 .901.73 2 1.631 2h5.711z" /></svg>
            </div>       
          </div>
          
          <div className="tl-date-rel"> 
            <div>Thu 1PM</div>
            <div>10 min</div>
          </div>
          <div className="vliner-container"> <div className="vliner"></div> </div>
          <div className="infoclassName lastline"> 
          </div>
          <div className="lastline">
            <a></a>  
          </div>  
          
        </div>
        
        <div className="timeline">
          
           <div className="tl-date"> 
            <a> 08-10 Fri 10AM</a>
          </div>
           <div className="tl-status">
            <div className ="circle-alarm"> </div> 
            <div className ="circliner"> </div> 
           </div>
           <div className="tl-info"> 
            <div className="person">Person Name </div>          
          </div>
           <div className="optionbutton">
             <ul className="opt-ul">
              <li>
                <input type="radio" id="f-option" name="selector" checked/>
                <div className="check"></div>
                <label htmlFor="f-option"></label>
                <div className="label-caption"> <span>On Process</span> </div>
              </li>
              <li>
                <input type="radio" id="s-option" name="selector" />
                <div className="check"></div>
                <label htmlFor="s-option"></label>
                <div className="label-caption"> <span>Complied</span>  </div>
              </li>
            </ul>
             <div className="buttonsOpt">
             <div className="btnedit">
             <svg  viewBox="0 0 220 220" className="svgicon" >
              <polygon  points="0,220 59.34,213.86 6.143,160.661"  />
              <path  d="M132.018,34.787l53.197,53.197L69.568,203.631L16.37,150.434L132.018,34.787z M212.696,60.502
                  c9.738-9.738,9.742-25.527,0-35.268l-17.93-17.93c-9.738-9.74-25.529-9.738-35.268,0l-17.346,17.347l53.199,53.196L212.696,60.502z
                  " />          
            </svg>
            </div>
             <div className="btnedit">
              <svg className="svgicon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M3 6l3 18h12l3-18h-18zm19-4v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.316c0 .901.73 2 1.631 2h5.711z" /></svg>
            </div>         
          </div>         
           </div>
          
           <div className="tl-date-rel"> 
              <a>Pending</a>
            </div>
           <div className="vliner-container"> <div className="vliner"></div> </div>
           <div className="infoclassName">
             <div className="timerobj"> 	
              <div className="timernum"> 
                <time id="timer">0:00:00</time>	
              </div>		
              <div className="play-btn">
                  <svg id="toggle" viewBox="0 0 140 140">
                    <circle cx="70" cy="70" r="65" style={{"fill": "silver"}}/>
                    <polygon id="shape" points="50,40 100,70 100,70 50,100, 50,40" style={{"fill": "dimgray"}}>
                      <animate 
                        id="animate_to_stop" 
                        begin="indefinite" 
                        fill="freeze" 
                        attributeName="points" 
                        dur="500ms" 
                        to="45,45 95,45 95,95, 45,95 45,45"
                        keySplines="
                          0.1 0.8 0.2 1; 
                          0.1 0.8 0.2 1; 
                          0.1 0.8 0.2 1; 
                          0.1 0.8 0.2 1; 
                          0.1 0.8 0.2 1; 
                          0.1 0.8 0.2 1"
                        keyTimes="0;0.22;0.33;0.55;0.66;0.88;1" 
                        calcMode="spline"
    
                      />
    
                      <animate 
                        id="animate_to_play" 
                        begin="indefinite" 
                        fill="freeze" 
                        attributeName="points" 
                        dur="500ms" 
                        to="50,40 100,70 100,70 50,100, 50,40" 
                        keySplines="
                          0.1 0.8 0.2 1; 
                          0.1 0.8 0.2 1; 
                          0.1 0.8 0.2 1; 
                          0.1 0.8 0.2 1; 
                          0.1 0.8 0.2 1; 
                          0.1 0.8 0.2 1"
                        keyTimes="0;0.22;0.33;0.55;0.66;0.88;1" 
                        calcMode="spline"
                      />
                    </polygon>
                  </svg>
                  <div>
                     <button id="clear">clear</button>
                  </div>
              </div>		
            </div>
           </div>
           <div className="buttons">
              <a></a>  
           </div> 
          
        </div>
          
        <div className="timeline">
          
          <div className="tl-date"> 
            <a></a>
          </div>
          <div className="tl-status">
            <div className="circle-cross"></div>
            <div className ="circliner"> </div> 
          </div>
          <div className="tl-info"></div>
          <div className="buttons">
            <a></a>
          </div>
          
          <div></div>
          <button className="button-hidden">
            <span className="button-acted">
              Tag as Complete Acted
            </span>
          </button>
          <div></div>
          <div></div>
          
        </div>
      </div>
            

    )
}