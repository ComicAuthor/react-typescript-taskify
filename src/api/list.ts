import { Request, Result } from "../model";
import request from "./request";

export const getTodoList: Request.FC<any> = (data) => {
  return request({
    url: "/getTodoList",
    method: "GET",
    params: data,
  });
};
