export class Project {
  constructor(
	        public projectCode: string, 
			public projectTitle: string,
			public hoursRequired: string,
			public teamMembers: Array<string>,
			public status: string,
			public hoursSpent: string,
			public startDate: Date,
			public estimatedDate: Date,
			public actualDate: Date					
			) {
  	}
}