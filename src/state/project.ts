namespace App {
  // Project State Management

  type Listener<T> = (items: T[]) => void;

  class State<T> {
    protected listeners: Listener<T>[] = [];

    addLitener(listenerFn: Listener<T>) {
      this.listeners.push(listenerFn);
    }
  }

  export class ProjectState extends State<Project> {
    // private listeners: Listener[] = [];
    private projects: Project[] = [];
    private static instance: ProjectState;

    private constructor() {
      super();
    }

    static getInstance() {
      if (this.instance) {
        return this.instance;
      }
      this.instance = new ProjectState();
      return this.instance;
    }

    addProject(title: string, description: string, numOfPeople: number) {
      const newProject = {
        id: Math.random().toString(),
        title,
        description,
        people: numOfPeople,
        status: ProjectStatus.Active,
      };
      this.projects.push(newProject);
      this.updateListeners();
      for (const lisrtenFn of this.listeners) {
        lisrtenFn(this.projects.slice());
      }
    }

    moveProject(projectId: string, newStatus: ProjectStatus): void {
      const project = this.projects.find((prj) => prj.id === projectId);
      if (project && project.status !== newStatus) {
        project.status = newStatus;
        this.updateListeners();
      }
    }
    private updateListeners() {
      for (const lisrtenFn of this.listeners) {
        lisrtenFn(this.projects.slice());
      }
    }
  }

  export const projectState = ProjectState.getInstance();
}
