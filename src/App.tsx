import './App.css';
import React, { useState, useEffect } from 'react';
import TodoItem from './components/TodoItem';
import InputComponent from './components/InputComponent';
import { Priority, type Todo } from './utils/types';
import TextareaComponent from './components/TextareaComponent';
import ButtonComponent from './components/ButtonComponent';

function App() {
  const [newTodoName, setNewTodoName] = useState<Todo>({
    name: '',
    completed: false,
    id: '',
    description: '',
    priority: Priority.Medium,
  });

  const [todos, setTodos] = useState<Todo[]>(
    JSON.parse(localStorage.getItem('Todos') || '') || [],
  );

  const [searchItem, setSearchItem] = useState<string>('');
  const [filterTodos, setfilterTodos] = useState<Todo[]>();

  useEffect(() => {
    localStorage.setItem('Todos', JSON.stringify(todos));
  }, [todos]);

  function addNewTodo(e: React.FormEvent) {
    e.preventDefault();
    if (newTodoName.name === '') return;

    setTodos((currentTodos) => {
      return [
        ...currentTodos,
        {
          name: newTodoName.name,
          completed: false,
          id: crypto.randomUUID(),
          description: newTodoName.description,
          priority: newTodoName.priority,
        },
      ];
    });

    setNewTodoName({
      name: '',
      completed: false,
      id: '',
      description: '',
      priority: Priority.Medium,
    });
  }

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setNewTodoName((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

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

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchItem = e.target.value;
    setSearchItem(searchItem);

    const filteredTodos = todos.filter((todo) =>
      todo.name.toLowerCase().includes(searchItem.toLowerCase()),
    );

    setfilterTodos(filteredTodos);
  };

  return (
    <form
      onSubmit={addNewTodo}
      // className=" bg-slate-300 grid place-content-center min-h-screen "
      className="mt-4"
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
        <InputComponent
          type="text"
          name="name"
          placeholder="Enter a todo"
          value={newTodoName.name}
          onChange={handleChange}
          className="border-2 border-blue-500 focus:outline-none rounded-md p-2"
        />

        <TextareaComponent
          name="description"
          value={newTodoName.description}
          placeholder="Description"
          onChange={handleChange}
        />

        <span>
          <label htmlFor="priority">Priority Level :</label>
          <select className="p-2" name="priority" onChange={handleChange}>
            <option value={Priority.High}>High</option>
            <option value={Priority.Medium}>Medium</option>
            <option value={Priority.Low}>Low</option>
          </select>
        </span>

        <ButtonComponent
          className="outline-none rounded-lg p-2 bg-blue-400 text-white hover:bg-blue-500 mb-6"
          text="Add Todo"
        />
      </div>

      <div>
        <InputComponent
          onChange={handleSearchChange}
          type="text"
          value={searchItem}
          placeholder="Search Todo"
          className="border-2 border-blue-500 focus:outline-none rounded-md p-2 m-2"
        />
      </div>

      <ul className="bg-slate-300 p-4 mx-auto">
        {(filterTodos ? filterTodos : todos).map((todo) => {
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
