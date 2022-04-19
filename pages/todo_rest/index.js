import { useContext, useEffect, useState } from "react";
import { Card } from "@nextui-org/react";
import { API } from "aws-amplify";
import { v4 as uuid } from "uuid";

import { UiToDoListItem } from "../../components/ui/UiToDoListItem";
import { UiToDoAddForm } from "../../components/ui/UiToDoAddForm";
import { AuthContext } from "../../contexts/AuthContext";

function Todos({}) {
  const { user } = useContext(AuthContext);
  const [toDoList, setToDoList] = useState([]);
  const [loadingSave, setLoadingSave] = useState(false);

  useEffect(() => {
    fetchTodos();
  }, []);

  /**
   * Fetch data from server
   */
  async function fetchTodos() {
    /**
     * fetch data based on user
     */
    try {
      const myInit = {
        queryStringParameters: {
          createdBy: user.username,
        },
      };
      const todoData = await API.get("todosApi", "/todos", myInit);
      const todos = todoData?.data || []; // ?.filter((todo) => !todo._deleted);
      setToDoList(todos);
    } catch (err) {
      setToDoList([]);
    }
  }

  const deleteTodo = async (id) => {
    try {
      API.del("todosApi", `/todos/object/${id}`, {})
        .then((result) => {
          fetchTodos();
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  };
  const completeTodo = async (id, event) => {
    const newToDoList = [...toDoList];
    const index = newToDoList.findIndex((item) => item.id == id);
    const data = newToDoList[index] || {};
    const todo = {
      id: data.id,
      isCompleted: event,
      title: data.title,
      description: data.description,
      createdBy: data.createdBy,
      _version: data._version,
    };
    const updateData = { body: { ...todo } };
    try {
      const savedData = await API.put("todosApi", "/todos", updateData);
      newToDoList[index].isCompleted = !newToDoList[index].isCompleted;
      setToDoList(newToDoList);
    } catch (err) {
      console.log("error updating todo", err);
    }
  };

  const addTodo = async ({
    title,
    description,
    isCompleted = false,
    createdBy = user.username || "",
  }) => {
    const newToDoList = [...toDoList];

    try {
      setLoadingSave(true);
      const todo = {
        id: uuid(),
        title,
        description,
        isCompleted,
        createdBy,
      };

      const data = { body: { ...todo } };

      const savedData = await API.post("todosApi", "/todos", data);

      newToDoList.push(todo);
      setToDoList(newToDoList);
      setLoadingSave(false);
    } catch (err) {
      setLoadingSave(false);
      console.log("error creating todo:", err);
    }
  };

  return (
    <Card shadow={false} hoverable css={{ mw: "400px" }} className="todoMain">
      <main>
        <div id="wrapper">
          <button onClick={fetchTodos}>fetchTodos</button>
          <header>
            <h2 id="date"></h2>
            <p id="task-count"></p>
            <UiToDoAddForm
              addTodo={addTodo}
              loadingSave={loadingSave}
              setLoadingSave={setLoadingSave}
            />
          </header>

          <section id="list">
            {toDoList?.map((todo) => {
              return (
                <UiToDoListItem
                  todo={todo}
                  key={todo.id}
                  deleteTodo={deleteTodo}
                  completeTodo={completeTodo}
                />
              );
            })}
          </section>
        </div>
      </main>
    </Card>
  );
}

export async function getStaticProps() {
  return {
    props: {
      protected: true,
    },
  };
}
export default Todos;
