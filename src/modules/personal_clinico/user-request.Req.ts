import { Request } from "express";

export interface UserRequestReq extends Request {
  user: {
    id_personal: number;
    nombres: string;
    rol: string;
  };
}
