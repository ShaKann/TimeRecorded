import {Injectable} from 'angular2/core';

@Injectable()
export class Task{
	public constructor(public date: Date, public template : TaskTemplate) {
	}
}

@Injectable()
export class TaskTemplate {
	public constructor(public name: string, public description: string) {
	}
}


