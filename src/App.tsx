import React, { useState, useEffect } from "react";
import "./App.css";
import InputFeild from "./components/InputFeild";
import TodoList from "./components/TodoList";
import { Todo } from "./model";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { getTodoList } from "./api/list";

const App: React.FC = () => {
  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [completedTodos, setCompletedTodos] = useState<Todo[]>([]);

  useEffect(() => {
    (async () => {
      let res = await getTodoList({});
      setTodos(res.data);
      console.log(res.data);
    })();
  }, []);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (todo) {
      setTodos([
        ...todos,
        {
          id: Date.now(),
          todo,
          isDone: false,
        },
      ]);

      setTodo("");
    }
  };

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;
    if (destination.droppableId == source.droppableId && destination.index == source.index) return;

    let add,
      active = todos,
      completed = completedTodos;
    if (source.droppableId === "TodosList") {
      add = active[source.index];
      active.splice(source.index, 1);
    } else {
      add = completed[source.index];
      completed.splice(source.index, 1);
    }

    if (destination.droppableId === "TodosList") {
      active.splice(destination.index, 0, add);
    } else {
      completed.splice(destination.index, 0, add);
    }

    setCompletedTodos(completed);
    setTodos(active);
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="App">
        <span className="heading">TASKIFY</span>
        <InputFeild todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
        <TodoList
          completedTodos={completedTodos}
          setCompletedTodos={setCompletedTodos}
          todos={todos}
          setTodos={setTodos}
        />
      </div>
    </DragDropContext>
  );
};

export default App;
