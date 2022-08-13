interface Storage {
  findSession(id: string): any;
  findAllSessions(): any;
  saveSession(id: string, session: any): void;
}

export class SessionStorage implements Storage {

  private sessions: Map<any, any>;

  constructor() {
    this.sessions = new Map();
  }

  findSession(id: string) {
    return this.sessions.get(id);
  }

  findAllSessions() {
    return [...this.sessions.values()];
  }

  saveSession(id: string, session: any): void {
    this.sessions.set(id, session);
  }
}