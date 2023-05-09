import React, { useEffect, useState } from "react";
import { deleteTodo, getTodos, updateTodoStatus } from "../sevices/todoService";
import "./viewTodos.css";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

export const ViewTodos = () => {
  
  const [todos, setTodos] = useState(null);
  const navigate = useNavigate();

  function fetchTodos() {
    getTodos()
      .then((response) => {
        setTodos(response);
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleStatus = (id, e) => {
    updateTodoStatus(id, e.target.value)
      .then((response) => {
        fetchTodos();
        toast.success("status updated");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDeleteTodo= (id)=>{
    deleteTodo(id).then((res)=>{
      fetchTodos();
      toast.success("todo deleted")
    }).catch((err)=>{
      console.log(err)
    })
  }

  
  const handleEdit= (id)=>{
    navigate(`/update-todo/${id}`)
  }



  return (
    <>
      <div className="view-todos">
        <table border="2px">
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Due Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {todos?.map((todo, index) => {
              return (
                <tr key={todo?.id}>
                  <td>{todo?.title}</td>
                  <td>{todo?.description}</td>
                  <td>{todo?.dueDate}</td>
                  <td>
                    <select
                      name="status"
                      id="status"
                      value={todo?.status}
                      onChange={(e) => handleStatus(todo.id, e)}
                    >
                      <option value="PENDING">Pending</option>
                      <option value="COMPLETED">Completed</option>
                      <option value="CANCELLED">Cancelled</option>
                      <option value="OVER_DUE">Over Due</option>
                    </select>
                  </td>
                  <td className="action-icons">
                    <FontAwesomeIcon
                      icon={faPenToSquare}
                      style={{ marginInline: "5px", cursor: "pointer" }}
                      onClick={() => handleEdit(todo.id)}
                    />
                    <FontAwesomeIcon
                      icon={faTrash}
                      style={{ marginInline: "5px", cursor: "pointer" }}
                      onClick={()=>handleDeleteTodo(todo.id)}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};
