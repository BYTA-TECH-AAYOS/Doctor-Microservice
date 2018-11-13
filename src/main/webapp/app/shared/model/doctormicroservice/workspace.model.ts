export interface IWorkspace {
  id?: number;
  workspaceId?: string;
}

export class Workspace implements IWorkspace {
  constructor(public id?: number, public workspaceId?: string) {}
}
