function TodoItem({
  id,
  name,
  completed,
  toggleTodo,
  deleteTodo,
}: {
  id: string;
  name: string;
  completed: boolean;
  toggleTodo: (id: string, completed: boolean) => void;
  deleteTodo: (id: string) => void;
}) {
  return (
    <li className="mb-3 flex justify-between">
      <label>
        <input
          checked={completed}
          type="checkbox"
          onChange={(e) => {
            toggleTodo(id, e.target.checked);
          }}
          className="checkbox"
        />
        <span className="m-4">{name}</span>
      </label>
      <button
        className="text-sm bg-red-500 text-white p-1 rounded-md "
        onClick={() => {
          deleteTodo(id);
        }}
      >
        Delete
      </button>
    </li>
  );
}

export default TodoItem;
