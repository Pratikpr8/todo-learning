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
    <li>
      <label>
        <input
          checked={completed}
          type="checkbox"
          onChange={(e) => toggleTodo(id, e.target.checked)}
          className="checkbox"
        />
        <span>{name}</span>
      </label>
      <button onClick={() => deleteTodo(id)} data-button-delete>
        Delete
      </button>
    </li>
  );
}

export default TodoItem;
