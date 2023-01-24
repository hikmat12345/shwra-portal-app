import * as Sentry from "@sentry/react";

export interface IAccountService {
  completeProfile({ userId, firstName, lastName, phone, address, company } : { userId: string;  firstName: string;   lastName: string;    phone: string;   address: string;   company: string; }):Promise<void>
}


export default class AccountService implements IAccountService {

    private http : any;
 
    constructor(http: any ){
      this.http =  http
    }
 
    /**
    * @name
    */
    public async completeProfile({ 
      userId,
      firstName,
      lastName,
      phone,
      address, 
      company
    } : {
      userId: string;  
      firstName: string;  
      lastName: string;  
      phone: string;  
      address: string;  
      company: string;  
    }):Promise<void> {
        try {

            await  this.http.put(`/Clients/${userId}`, {
                firstName,
                lastName,
                phone,
                address, 
                company
            });

        } catch (e){
            Sentry.captureException(e);
            throw e
        }
    }



    /**
    * @name
    */
    public async manageAccount({ 
      statusId, 
      userId 
    } : {
      statusId: string;
      userId: string;
    }):Promise<void> {
        try {
          
          await  this.http.put(`Account/UserStatus/${statusId}/${userId}`);

        } catch (e){
          Sentry.captureException(e);
          throw e
        }
    }


    /**
    * @name
    */
    public async accountStatus():Promise<any> {
        try {
          
          const response =  await  this.http.get('/UserStatus');
 
          return response.data
        } catch (e){
          Sentry.captureException(e);
          throw e
        }
    }


}