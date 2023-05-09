import React, { useEffect, useState } from "react";
import { addTodo, getTodoById, updateTodo } from "../sevices/todoService";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

const UpdateTodo = () => {

  const {id} = useParams();
  const navigator = useNavigate();

  const [data, setData] = useState({});
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    getTodoById(id).then((res)=>{
      setData(res);
    }).catch((err)=>{
      console.log(err);
    })
  }, [])
  

  const handleUpdateTodo = () => {
    updateTodo(id,data)
      .then((res) => {
        toast.success("todo updated");
        navigator("/");
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
    console.log(data)
  };



  return (
    <>
      <div className="login">
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              name="title"
              onChange={handleChange}
              value={data?.title}
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              name="description"
              onChange={handleChange}
              value={data?.description}
            />
          </div>
          <div className="form-group">
            <label htmlFor="dueDate">Due Date</label>
            <input
              type="date"
              name="dueDate"
              onChange={handleChange}
              value={data?.dueDate}
            />
          </div>
          <div className="form-btn-group-signup">
            <button
              style={{ width: "100%", cursor: "pointer" }}
              onClick={handleUpdateTodo}
            >
              Update Todo
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default UpdateTodo;
