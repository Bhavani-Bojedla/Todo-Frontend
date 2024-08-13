import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React, { useState, useEffect } from "react";
import { MdDelete } from "react-icons/md";
import axios from "axios";

const Todo = () => {
  const [inputs, setInputs] = useState({
    title: "",
    body: "",
  });
  const [tasks, setTasks] = useState([]);
  const [updatedTitle, setUpdatedTitle] = useState("");
  const [updatedBody, setUpdatedBody] = useState("");
  const [updateId, setUpdateId] = useState(null);
  const [showCompleted, setShowCompleted] = useState(false);
  const [loading, setLoading] = useState(false); 

  const id = localStorage.getItem("id");

  const change = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  const handleAddTask = async () => {
    if (inputs.title === "" || inputs.body === "") {
      toast.error("Title Or Body Can't Be Empty");
    } else {
      if (id) {
        setLoading(true); 
        await axios
          .post("https://todo-backend-3g62.onrender.com/lists/createlist", {
            title: inputs.title,
            body: inputs.body,
            id: id,
          })
          .then((response) => {
            setTasks([ response.data.list,...tasks]);
          }).finally(() => {
            setLoading(false); // Stop loading once the request is done
          });
        setInputs({ title: "", body: "" });
        toast.success("Your Task Is Added");
      } else {
        setTasks([, inputs,...tasks]);
        setInputs({ title: "", body: "" });
        toast.success("Your Task Is Added");
        toast.error("Your Task Is Not Saved! Please SignUp");
      }
    }
  };

  useEffect(() => {
    if (id) {
      const fetchTasks = async () => {
        await axios
          .get(`https://todo-backend-3g62.onrender.com/lists/getlist/${id}`)
          .then((response) => {
            setTasks(response.data.list || []);
          });
      };
      fetchTasks();
    }
  }, [id]);

  const handleDeleteTask = async (taskId) => {
    if (id) {
      await axios
        .delete(`https://todo-backend-3g62.onrender.com/lists/deletelist/${taskId}`, {
          data: { id: id },
        })
        .then(() => {
          setTasks(tasks.filter((task) => task._id !== taskId));
          toast.success("Your task is deleted");
        });
    } else {
      toast.error("Please signup!");
    }
  };

  const handleUpdateTask = (taskId) => {
    const taskToUpdate = tasks.find((task) => task._id === taskId);
    setUpdatedTitle(taskToUpdate.title);
    setUpdatedBody(taskToUpdate.body);
    setUpdateId(taskId);
  };

  const handleUpdateSubmit = async () => {
    if (updatedTitle && updatedBody && updateId) {
      try {
        await axios
          .put(`https://todo-backend-3g62.onrender.com/lists/updatelist/${updateId}`, {
            title: updatedTitle,
            body: updatedBody,
            id: id,
          })
          .then((response) => {
            setTasks(
              tasks.map((task) =>
                task._id === updateId ? response.data.list : task
              )
            );
            toast.success("Task updated successfully");
          });
        setUpdatedTitle("");
        setUpdatedBody("");
        setUpdateId(null);
      } catch (error) {
        console.error("Error updating task:", error);
      }
    } else {
      toast.error("Please fill out all fields");
    }
  };

  const handleToggleCompletion = async (taskId) => {
    const taskToToggle = tasks.find((task) => task._id === taskId);
    if (taskToToggle) {
      const updatedTask = { ...taskToToggle, completed: !taskToToggle.completed };
      try {
        await axios.put(`https://todo-backend-3g62.onrender.com/lists/updatelist/${taskId}`, {
          title: updatedTask.title,
          body: updatedTask.body,
          completed: updatedTask.completed,
          id: id,
        });
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task._id === taskId ? updatedTask : task
          )
        );
        toast.success("Task completion status updated");
      } catch (error) {
        console.error("Error updating task completion status:", error);
      }
    }
  };

  const filteredTasks = showCompleted
    ? tasks.filter((task) => task.completed)
    : tasks.filter((task) => !task.completed);

  return (
    <div className="h-screen lg:pt-28 md:pt-28 sm:pt-24 phone:pt-24">
    <ToastContainer 
      className=" sm:max-w-[300px] sm:min-h-[50px] sm:max-h-[80px] lg:max-w-[300px] lg:p-4 md:max-w-[300px] phone:max-w-[265px] phone:text-sm z-50" 
      style={{ top: '60px' }} 
    />

    <div className="bg-gray-900 lg:mt-6 md:mt-6 sm:mt-10 phone:mt-8 todo">
      <div className="flex flex-col p-6 mx-auto bg-orange-400 rounded-md place-items-center todo-main lg:w-90 md:w-90 sm:w-85 phone:w-72">
          <input
            className="p-2.5 border-gray-300 rounded-md outline-offset-0 outline-slate-100 lg:w-85 md:w-85 sm:w-80 phone:w-64"
            type="text"
            name="title"
            placeholder="Title"
            value={inputs.title}
            onChange={change}
          />
          <textarea
            type="text"
            placeholder="Body"
            value={inputs.body}
            name="body"
            onChange={change}
            className="p-2.5 mt-5 border-gray-300 rounded-md outline-slate-100 lg:w-85 md:w-85 sm:w-80 phone:w-64"
          />
        </div>
        <div className="flex flex-col pt-5 mx-auto place-items-end todo-main lg:w-90 md:w-90 sm:w-85 phone:w-72">
          <button
            onClick={handleAddTask}
            className="flex justify-center w-16 py-2.5 text-white bg-orange-600 rounded-md text-xs hover:bg-orange-700"
            disabled={loading} 
          >
           {loading ? "Loading..." : "Add"}
          </button>
        </div>
        <div className="flex items-center justify-between mx-auto w-52 lg:mt-10 phone:mt-6">
          <button
            onClick={() => setShowCompleted(false)}
            className="flex justify-center w-20 py-2.5 text-white bg-orange-600 rounded-md text-sm hover:bg-orange-700"
          >
            To-do
          </button>
          <button
            onClick={() => setShowCompleted(true)}
            className="flex items-center justify-center w-24 py-2.5 text-white border-2 border-orange-600 hover:bg-orange-600 rounded-md text-sm text-center transition duration-300 ease-in-out"
          >
            Completed
          </button>
        </div>

        {updateId && (
          <div className="">
            <div className="flex flex-col p-6 mx-auto mt-5 bg-orange-400 rounded-md place-items-center todo-main lg:w-90 md:w-90 sm:w-85 phone:w-72">
              <input
                className="p-2.5 border-gray-300 rounded-md outline-offset-0 outline-slate-100 lg:w-85 md:w-85 sm:w-80 phone:w-64"
                type="text"
                placeholder="Updated Title"
                value={updatedTitle}
                onChange={(e) => setUpdatedTitle(e.target.value)}
              />
              <textarea
                type="text"
                placeholder="Updated Body"
                value={updatedBody}
                className="p-2.5 mt-5 border-gray-300 rounded-md outline-slate-100 lg:w-85 md:w-85  sm:w-80 phone:w-64"
                onChange={(e) => setUpdatedBody(e.target.value)}
              />
            </div>
            <div className="flex flex-col pt-5 mx-auto place-items-end todo-main lg:w-90 md:w-90 sm:w-85 phone:w-72">
              <button
                onClick={handleUpdateSubmit}
                className="flex justify-center w-20 py-2.5 text-white bg-orange-600 rounded-md text-xs hover:bg-orange-700"
              >
                Update
              </button>
            </div>
          </div>
        )}

        <div className="pt-5 pb-5 mx-auto todo-main">
          <div className="mx-auto space-y-4 lg:mt-8 lg:w-100 md:w-100 sm:w-98 phone:w-72">
            {filteredTasks.map((task, index) => (
              <div
                key={index}
                className={`flex bg-gray-800 border border-gray-700 items-start justify-between p-4 rounded-sm shadow-md shadow-gray-700 ${
                  task.completed ? "border-none" : ""
                }`}
              >
                <div className="flex items-start w-10/12">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => handleToggleCompletion(task._id)}
                    className="mt-2 ml-1 mr-5 size-4"
                  />
                  <div>
                    <h3
                      className={`text-lg text-orange-500 font-semibold ${
                        task.completed ? "line-through " : ""
                      }`}
                    >
                      {task.title}
                    </h3>
                    <p
                      className={`text-gray-400 font-semibold break-words ${
                        task.completed ? "line-through text-gray-400" : "text-gray-400"
                      }`}
                    >
                      {task.body}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => handleUpdateTask(task._id)}
                  className="text-blue-500 hover:text-blue-800"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDeleteTask(task._id)}
                  className="text-red-500 hover:text-red-800"
                >
                  <MdDelete className="h-7 w-7" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Todo;