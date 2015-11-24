import {Injectable} from 'angular2/core';
import {Http, HTTP_PROVIDERS} from 'angular2/http';
import {Task} from '../task/task';
import {TaskTemplate} from '../task/task';
// import {Enumerable} from 'typescript-dotnet/source/System.Linq/Linq'

@Injectable()
export class TasksService {
  private tasks: Task[];
  private tasksTemplates: TaskTemplate[];
  public loading: boolean;

  constructor(public http: Http) {
    this.tasksTemplates = [
      new TaskTemplate("Schools getting known", "Trying to figurate out what schools are about"),
      new TaskTemplate("TC build plans", "Configurating TC builds")
    ];
    this.tasks = [
      new Task(new Date(2015, 10, 2), this.tasksTemplates[0]),
      new Task(new Date(2015, 10, 3), this.tasksTemplates[0]),
      new Task(new Date(2015, 10, 3), this.tasksTemplates[1]),
      new Task(new Date(2015, 11, 2), this.tasksTemplates[0]),
      new Task(new Date(2015, 11, 3), this.tasksTemplates[0]),
      new Task(new Date(2015, 11, 3), this.tasksTemplates[1])
    ];
  }

  public readTasks = (subscriber: (value: Task[]) => void, filter?: TaskFilter) => {
    // var returnTasks = filter == null ? this.tasks : Enumerable.fromArray(this.tasks).where(filter.filter).toArray();
    var returnTasks = this.tasks;
    subscriber(returnTasks);
  }

  public readTasksTemplates = (subscriber: (value: TaskTemplate[]) => void) => {

  }

  // public load() {
  //   this.loading = true;
  //   // http.get("http://localhost:7777/wwwroot/api/values")
  //   this.http.get("http://pagelist.britishcouncil.org/wwwroot/api/values")
  //     .map(res => res.json())
  //     .subscribe(results => {
  //       for (var i = 0; i < results.length; i++) {
  //         var s = results[i];
  //         console.log(s);
  //         this.sites.push(new WebSite(s.Id, s.Name, s.State, s.Bindings, s.SiteAddresses));
  //       }
  //       this.loading = false;
  //     }
  //     ); +
  // }
}

export class TaskFilter {
  constructor(public year?: number, public month?: number, public day?: number) {
  }

  public filter = (task: Task): boolean => {
    return
    (this.year == null || task.date.getFullYear() === this.year)
    && (this.month == null || task.date.getMonth() == this.month)
    && (this.day == null || task.date.getDay() == this.day);
  }
}
