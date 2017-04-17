export class Project {
  constructor(public projectcode: string, 
      			  public projecttitle: string,
      			  public hoursrequired: string,
      			  public teammembers: Array<string>,
      			  public status: string,
      			  public hourstaken: string,
              public startdate: Date,
              public finishdate: Date
      			) {
  	}
}