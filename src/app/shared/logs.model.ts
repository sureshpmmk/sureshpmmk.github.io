export class Logs
{
	constructor(public logId :string,
				public employeeId :string,
				public employeeName :string,
				public projectCode :string,
				public projectTitle :string,
				public startDatetime: string,
				public finishDatetime : string,
				public timeSpent : string,
				public logNote : string 
				){

	}
}