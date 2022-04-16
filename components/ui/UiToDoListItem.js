import { TrashIcon } from "@heroicons/react/solid";
import { Checkbox } from "@nextui-org/react";

export const UiToDoListItem = ({todo,deleteTodo,completeTodo}) => {
  return (
    
      <div className="cards">
        <Checkbox
          line
          color="success"
          initialChecked={todo.isCompleted}
          onChange={(e) => completeTodo(todo.id, e)}
        >
          <div className="cards-info">
            <h3 className="task"> {todo.title} </h3>
            <p className="time"> </p>
          </div>
        </Checkbox>
        <button
          className="fas fa-times btn delete-btn"
          onClick={() => deleteTodo(todo.id)}
        >
          <TrashIcon />
        </button>
      </div>
   
  );
};
