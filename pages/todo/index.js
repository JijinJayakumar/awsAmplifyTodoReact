import { useContext, useEffect, useState } from "react";
import { Card } from "@nextui-org/react";
import { API, graphqlOperation } from "aws-amplify";

import { UiToDoListItem } from "../../components/ui/UiToDoListItem";
import { UiToDoAddForm } from "../../components/ui/UiToDoAddForm";
import { AuthContext } from "../../contexts/AuthContext";

import {
  createTodo,
  updateTodo,
  deleteTodo as deleteTodoMutation,
} from "../../src/graphql/mutations";
import { listTodos } from "../../src/graphql/queries";

function Todos({}) {
  const { user } = useContext(AuthContext);
  // if (!user) {
  //   return <h1>Not authenticated</h1>;
  // }
  const [toDoList, setToDoList] = useState([]);
  const [loadingSave, setLoadingSave] = useState(false);

  useEffect(() => {
    fetchTodos(); //get list from amplify
  }, []);
  //fetch todos from amplify

  /**
   * Fetch data from server
   */
  async function fetchTodos() {
    try {
      const filter = {
        createdBy: { eq: user.username },
        // _deleted: { eq: false },
      };
      const todoData = await API.graphql({
        query: listTodos,
        variables: { filter: filter },
      });
      const todos = todoData.data.listTodos.items?.filter(
        (todo) => !todo._deleted
      );
      console.log({ todos });
      setToDoList(todos);
    } catch (err) {
      console.log("error fetching todos", err);
    }
  }

  const deleteTodo = async (id) => {
    try {
      const todoDetails = {
        id: id,
        _version: toDoList.find((item) => item.id == id)._version,
      };

      const deletedTodo = await API.graphql({
        query: deleteTodoMutation,
        variables: { input: todoDetails },
      });
      console.log({ deletedTodo });

      fetchTodos();
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
      title: event.title,
      description: data.description,
      createdBy: data.createdBy,
      _version: data._version,
    };

    try {
      console.log("Completeing todo", { todo });
      const savedData = await API.graphql({
        query: updateTodo,
        variables: { input: todo },
      });

      newToDoList[index].isCompleted = !newToDoList[index].isCompleted; //update locally
      console.log({ savedData });
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
        title,
        description,
        isCompleted,
        createdBy,
      };
      const savedData = await API.graphql(
        graphqlOperation(createTodo, { input: todo })
      );

      todo.id = savedData.data.createTodo.id || new Date().getTime();
      newToDoList.push(todo); //apend tocal data
      setToDoList(newToDoList); // set local data
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
            {toDoList.map((todo) => {
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
      protected: true, //set a protected page/router
    },
  };
}
export default Todos;
