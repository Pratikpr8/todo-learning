import './App.css';
import React, { useState, useEffect } from 'react';
import TodoItem from './components/TodoItem';
import InputComponent from './components/InputComponent';
import { Priority, type Todo } from './utils/types';
import TextareaComponent from './components/TextareaComponent';
import ButtonComponent from './components/ButtonComponent';
import { useForm, SubmitHandler } from 'react-hook-form';

function App() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<Todo>();

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

  useEffect(() => {
    localStorage.setItem('Todos', JSON.stringify(todos));
  }, [todos]);

  const addNewTodo: SubmitHandler<Todo> = (data) => {
    // e.preventDefault();
    console.log(data);
    if (data.name === '') return;

    setTodos((currentTodos) => {
      return [
        ...currentTodos,
        {
          name: data.name,
          completed: false,
          id: crypto.randomUUID(),
          description: data.description,
          priority: data.priority,
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
  };

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

  return (
    <form
      onSubmit={handleSubmit(addNewTodo)}
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
          // name="name"
          placeholder="Enter a todo"
          value={newTodoName.name}
          // onChange={handleChange}
          className="border-2 border-blue-500 focus:outline-none rounded-md p-2"
          {...register('name', { required: 'Name is required' })}
        />
        {errors.name && (
          <span className="text-red-500">{errors.name.message}</span>
        )}

        <TextareaComponent
          // name="description"
          value={newTodoName.description}
          placeholder="Description"
          // onChange={handleChange}
          {...register('description', { required: 'Description is required' })}
        />
        {errors.description && (
          <span className="text-red-500">{errors.description.message}</span>
        )}

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

      <ul className="bg-slate-200 p-4 mx-auto">
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
