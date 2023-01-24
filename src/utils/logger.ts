
interface LoggerDto {
    level?: string;
    message?: string;
}


export class Logger {

    private readonly now: Date= new Date();

    private user:string|null = null;

    public static setConfig({
        userId
    }:{
        userId: string
    }): void {
       // this.user = userId;
    }

    public static log(logDTO: LoggerDto): void {
        console.log(logDTO);
    }


    public static debug(logDTO: LoggerDto): void {
        console.info(logDTO);
    }


    public static error(logDTO: LoggerDto): void {
        console.error(logDTO);
    }



    public static warn(logDTO: LoggerDto): void {
        console.warn(logDTO);
    }


    public static logError(logDTO: LoggerDto): void {
        console.error(logDTO);
    }


    public static logWarn(logDTO: LoggerDto): void {
        console.warn(logDTO);
    }

}


export  const logger = new Logger();