import React, { useState, useEffect } from 'react';
import './App.css';
import TodoItem from './components/TodoItem';
import { type Todo } from './utils/types';

function App() {
  const [newTodoName, setNewTodoName] = useState<string>('');
  const [todos, setTodos] = useState<Todo[]>(
    // eslint-disable-next-line
    JSON.parse(localStorage.getItem('Todos') || '') || [],
  );

  useEffect(() => {
    // eslint-disable-next-line
    localStorage.setItem('Todos', JSON.stringify(todos));
  }, [todos]);

  function addNewTodo(e: React.FormEvent) {
    e.preventDefault();
    if (newTodoName === '') return;

    setTodos((currentTodos) => {
      return [
        ...currentTodos,
        { name: newTodoName, completed: false, id: crypto.randomUUID() },
      ];
    });

    setNewTodoName('');
  }

  function toggleTodo(todoId: string, completed: boolean) {
    setTodos((currentTodos) => {
      return currentTodos.map((todo) => {
        if (todo.id === todoId) return { ...todo, completed };
        return todo;
      });
    });
  }

  function deleteTodo(todoId: string) {
    setTodos((currentTodos) => {
      return currentTodos.filter((todo) => todo.id !== todoId);
    });
  }

  return (
    <form
      onSubmit={addNewTodo}
      className=" bg-slate-300 mx-auto my-auto grid place-content-center min-h-screen "
    >
      <div
        id="new-todo-form"
        className="flex flex-col justify-center items-center gap-4"
      >
        <label
          className="text-xl font-semibold text-blue-500"
          htmlFor="todo-input"
        >
          Todo list
        </label>
        <input
          className="border-2 border-blue-500 focus:outline-none rounded-md p-2"
          type="text"
          id="todo-input"
          value={newTodoName}
          onChange={(e) => {
            setNewTodoName(e.target.value);
          }}
        />
        <button className="outline-none rounded-lg p-2 bg-blue-400 text-white hover:bg-blue-500 mb-6">
          Add Todo
        </button>
      </div>

      <ul>
        {todos.map((todo) => {
          return (
            <TodoItem
              key={todo.id}
              {...todo}
              toggleTodo={toggleTodo}
              deleteTodo={deleteTodo}
            />
          );
        })}
      </ul>
    </form>
  );
}

export default App;
