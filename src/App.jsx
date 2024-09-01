import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import { v4 as uuidv4 } from "uuid";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [showFinished, setshowFinished] = useState(false);

  useEffect(() => {
    let tString = localStorage.getItem("todos");
    if (tString) {
      let todos = JSON.parse(localStorage.getItem("todos"));
      setTodos(todos);
    }
  }, []);

  const toggleFinish = (e) => {
    setshowFinished(!showFinished);
  };

  const saveTOLs = (param) => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  const handleEdit = (e, id) => {
    const selectedTodo = todos.find((i) => i.id === id);
    if (selectedTodo) {
      setTodo(selectedTodo.todo);
    }
    let newTodos = todos.filter((item) => {
      return item.id !== id;
    });
    setTodos(newTodos);
    saveTOLs();
  };

  const handleDelete = (e, id) => {
    let newTodos = todos.filter((item) => {
      return item.id !== id;
    });
    setTodos(newTodos);
    saveTOLs();
  };

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
    setTodo("");
    saveTOLs();
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex((item) => {
      return item.id === id;
    });
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
    saveTOLs();
  };

  return (
    <>
      <div className="main w-full flex flex-col text-blue-100">
        <Navbar />

        <div className="head bg-blue-300 w-3/4 p-5 rounded-lg mt-4 text-blue-600 font-bold mx-auto flex flex-col gap-4 max-w-4xl outline-none">
          <h1 className="font-bold text-2xl text-center text-blue-800">
            DoPlanner - All in one app to make TO - DO lists.
          </h1>
          <h2>Add a To Do</h2>
          <div className="toodInp flex gap-5 justify-center">
            <input
              onChange={handleChange}
              type="text"
              placeholder="To Do"
              className="p-2 rounded-lg w-full"
              value={todo}
              name=""
            />
            <button
              className="bg-blue-800 text-white px-8 py-2 rounded-2xl hover:cursor-pointer"
              onClick={handleAdd}
              disabled={todo.length <= 5}
            >
              Submit
            </button>
          </div>
        </div>

        <div className="todos mx-auto mt-4 min-h-[70vh] bg-blue-300 w-3/4 max-w-4xl p-5 rounded-lg flex flex-col gap-8">
          <div className="flex gap-4">
            <input
              type="checkbox"
              checked={showFinished}
              onChange={toggleFinish}
            />
            Show Finished To-Do's
          </div>
          <div className="font-bold text-blue-600">
            <h2>Your To-Do List</h2>
          </div>
          <div className="flex flex-col gap-2">
            {todos.length === 0 && <div>No to dos to display</div>}
            {todos.map((item) => {
              return (
                (showFinished || !item.isCompleted) && (
                  <div
                    key={item.id}
                    className="todo flex w-full justify-between items-center"
                  >
                    <div className="flex gap-6">
                      <input
                        onChange={handleCheckbox}
                        type="checkbox"
                        checked={item.isCompleted}
                        name={item.id}
                        id=""
                      />
                      <div className="text-blue-900">

                      <h2 className={item.isCompleted ? "line-through" : ""}>
                        {item.todo}
                      </h2>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <button
                        className="bg-blue-800 text-white px-4 py-2 rounded-lg"
                        onClick={(e) => handleEdit(e, item.id)}
                      >
                        <FaEdit />
                      </button>
                      <button
                        className="bg-blue-800 text-white px-4 py-2 rounded-lg"
                        onClick={(e) => {
                          handleDelete(e, item.id);
                        }}
                      >
                        <MdDelete />
                      </button>
                    </div>
                  </div>
                )
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
