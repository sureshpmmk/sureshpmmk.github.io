export class User {
  
  constructor(public employeeid: string, 
  			  public firstname: string,
  			  public lastname: string,
  			  public email: string,
          public designation: string,
  			  public phonenumber: string,
  			  public password: string,
  			  public usertype: string,
  			  public shift: string,
  			  public status: string
  			) {    
  }
}