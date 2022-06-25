declare namespace Express {
  export interface Request {
    user: { id: string; email: string; isActivated: boolean };
  }
  export interface Response {
    user: { id: string; email: string; isActivated: boolean };
  }
}
