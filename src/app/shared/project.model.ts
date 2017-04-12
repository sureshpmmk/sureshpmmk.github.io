import { User } from './user.model';

export class Project {

  constructor(public projectcode: string, 
  			  public projecttitle: string, 
  			  public hoursrequired: string,
  			  public teammembers: User[],
  			  public email: string,
  			  public status: string,
  			  public hourstaken: string,
              public startdate: Date,
              public finishdate: Date
      			) {}
}