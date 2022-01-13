import config from './config';

const DEFAULT_NAMESPACE = config.defaults.namespace;
export interface lprop { message: any, namespace?: any}

const t:any[] = ['[INFO]', '[WARN]', '[ERROR]'];

const msg     = (o:lprop): string => `[${getDate()}] [${o.namespace || DEFAULT_NAMESPACE}] `;

const header  = (o:lprop, i:number) => 
                typeof o.message === 'string'?  
                console.log(msg(o) + t[i] + ` ${o.message}`): 
                console.log(msg(o)  + t[i],  o.message);

const info    = ( m: any, np?: any)  =>  header({message:m, namespace:np}, 0);
const warn    = ( m: any, np?: any)  =>  header({message:m, namespace:np}, 1);
const error   = ( m: any, np?: any)  =>  header({message:m, namespace:np}, 2);

const getDate = (): string =>  new Date().toISOString();

const logger ={
    info,
    warn,
    error
};

export default logger;