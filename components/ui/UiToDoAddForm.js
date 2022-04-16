import { useState, useEffect } from "react";
import { Button, Loading, Text, Spacer } from "@nextui-org/react";

export const UiToDoAddForm = ({ addTodo, loadingSave }) => {
  const [todoTitle, setTodoTitle] = useState("");
  const [err, setError] = useState("");

  useEffect(() => {
    if (todoTitle) {
      setError("");
    }
  }, [todoTitle]);

  const saveTodo = async () => {
    if (todoTitle) {
      setError("");
      addTodo({
        title: todoTitle,
        description: "",
        isCompleted: false,
      });
      setTodoTitle("");
    } else {
      setError("Please enter a todo ");
    }
  };

  return (
    <div className="form">
      {err && (
        <div>
          <Text color="red">{err}</Text> <Spacer />
        </div>
      )}
      <div id="input">
        <input
          type="text"
          name="task"
          className="form-control"
          placeholder="Add a new Task..."
          value={todoTitle}
          autoComplete="off"
          onChange={(e) => {
            setTodoTitle(e.target.value);
          }}
        />
        <button
          className="submit-btn"
          onClick={saveTodo}
          disabled={loadingSave}
        >
          {loadingSave ? (
            <Loading type="points" color="currentColor" size="sm" />
          ) : (
            "Save"
          )}
        </button>
        {/* <Button disabled auto bordered color="primary" css={{ px: "$13" }}>
        <Loading color="currentColor" size="sm" />
      </Button> */}
      </div>
    </div>
  );
};
