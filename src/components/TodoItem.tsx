import { Priority } from '../utils/types';
import ButtonComponent from './ButtonComponent';
import InputComponent from './InputComponent';

function TodoItem({
  id,
  name,
  completed,
  priority,
  description,
  toggleTodo,
  deleteTodo,
}: {
  id: string;
  name: string;
  completed: boolean;
  priority: string;
  description: string;
  toggleTodo: (id: string, completed: boolean) => void;
  deleteTodo: (id: string) => void;
}) {
  let priorityClass = '';
  switch (priority) {
    case Priority.High:
      priorityClass = 'text-red-700';
      break;
    case Priority.Medium:
      priorityClass = 'text-purple-700';
      break;

    case Priority.Low:
      priorityClass = 'text-green-700';
      break;

    default:
      priorityClass = 'text-black';
      break;
  }

  return (
    <li className="mb-3 flex justify-between">
      <label>
        <InputComponent
          checked={completed}
          type="checkbox"
          className="checkbox"
          onChange={(e) => {
            toggleTodo(id, e.target.checked);
          }}
        />
        <span className="m-4">{name}</span>
        <p>
          <strong className="text-blue-700">Description : </strong>
          {description}
        </p>
      </label>
      <div>
        <span className={`mr-20 ${priorityClass}`}>{priority}</span>

        <ButtonComponent
          text="Delete"
          className="text-sm bg-red-500 text-white p-1 rounded-md"
          onClick={() => {
            deleteTodo(id);
          }}
        />
      </div>
    </li>
  );
}

export default TodoItem;
