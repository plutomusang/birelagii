import logger from "../config/logger"
export const timedisplay= (elapsed: number) => {
    
    let time: string[] = timeparser(elapsed); 
    let d: number = parseInt(time[0]);
    let totalDays = Math.floor(d/24);
    if (totalDays > 0) {
        let th = totalDays * 24;
        let remainingHr = d - th;
        let dy = totalDays> 1? 'days': 'day';
        time[0] = totalDays + ' ' + dy + ' and ' + remainingHr;

    }
    let s = time[0] + ':' + time[1] + ':' + time[2] ;
    return s;
};
export const timeparser= (elapsed: number): string[] => {
    
    let units: number[] = [3600000,60000,1000];
    let time: string[] = [];
    let index: number = 0;
    while (index < units.length) {
        let t: number = Math.floor(elapsed/units[index]);
        // logger.info({unit: units[index],
        //             elapsed: elapsed,
        //             diff: t,
        //             mul: t*units[index]
        //             });

        
        
        let st:string = (index > 0 && t < 10) ?  '0' + t : t.toString();
        time.push(st);

        elapsed -= t*units[index];
        index++;
    }    
    return time;
};

export const jsDateToSQL = (dt:number) =>  new Date(dt).toLocaleString().replace(',', '');
export const sqlToJSDateNumber = (sqlDate: string) => new Date(sqlDate).getTime();

export default timeparser;

//const t = "2021-11-13 15:35:04";