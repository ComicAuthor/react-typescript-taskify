import { AxiosResponse } from "axios";

export interface Todo {
  id: number;
  todo: string;
  isDone: boolean;
}

export interface Result {
  code: number;
  msg: string;
  data: Todo[];
}

export declare namespace Request {
  type Ajax<T> = (config: T) => Promise<Result>;
  type FC<T> = (data: T) => Promise<Result>;
}

type Actions =
  | {
      type: "add";
      payload: string;
    }
  | {
      type: "remove";
      payload: number;
    }
  | {
      type: "done";
      payload: number;
    };

const TodoReducer = (state: Todo[], action: Actions) => {
  switch (action.type) {
    case "add":
      return [...state, { id: Date.now(), todo: action.payload, isDone: false }];
    case "remove":
      return state.filter((todo) => todo.id !== action.payload);
    case "done":
      return state.map((todo) =>
        todo.id !== action.payload ? { ...todo, isDone: !todo.isDone } : todo
      );
    default:
      return state;
  }
};

import { useReducer } from "react";
const ReducerExample = () => {
  const [stata, dispatch] = useReducer(TodoReducer, []);
};
