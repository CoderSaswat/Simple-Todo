import React, { useEffect, useState } from "react";
import { deleteTodo, getTodos, updateTodoStatus } from "../sevices/todoService";
import "./viewTodos.css";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

export const ViewTodos = () => {
  const [todos, setTodos] = useState(null);
  const [deleteConfimation, setDeleteConfimation] = useState(false);
  const [idToBeDeleted, setIdToBeDeleted] = useState(null)
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

  const handleDeleteTodo = (id) => {
    deleteTodo(id)
      .then((res) => {
        fetchTodos();
        toast.success("todo deleted");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleEdit = (id) => {
    navigate(`/update-todo/${id}`);
  };

  function renderDeleteConfirmation(){
    return (
      <>
        <div className="dialog">
          <div className="box">
            <h5>Are you sure want to delete</h5>
            <p>Cannot be reverted</p>
            <div className="btns">
              <button onClick={()=>{
                setDeleteConfimation(false);
                handleDeleteTodo(idToBeDeleted);
                setIdToBeDeleted(null);
              }}>Confirm</button>
              <button onClick={()=>{
                setDeleteConfimation(false)
                setIdToBeDeleted(null)
              }}>Cancel</button>
            </div>
          </div>
        </div>
      </>
    )
  }
  return (
    <>
      {deleteConfimation ? renderDeleteConfirmation() : ''}
      <div className="view-todos">
        <table>
          <thead style={{ backgroundColor: "black", color: "white" }}>
            <tr>
              <th style={{ width: "30%" }}>Title</th>
              <th style={{ width: "40%" }}>Description</th>
              <th style={{ width: "18%" }}>Due Date</th>
              <th style={{ width: "20%" }}>Status</th>
              <th style={{ width: "20%" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {todos?.map((todo, index) => {
              const statusCompleted = {
                color: "green",
              };
              const statusCancel = {
                color: "red",
                textDecoration: "line-through",
              };
              const statusOverDue = {
                color: "orange",
              };

              let style = {};
              if (todo?.status === "COMPLETED") {
                style = statusCompleted;
              } else if (todo?.status === "CANCELLED") {
                style = statusCancel;
              } else if (todo?.status === "OVER_DUE") {
                style = statusOverDue;
              }

              return (
                <tr key={todo?.id} style={style}>
                  <td>{todo?.title}</td>
                  <td>{todo?.description}</td>
                  <td>{todo?.dueDate}</td>
                  <td>
                    <select
                      name="status"
                      id="status"
                      value={todo?.status}
                      onChange={(e) => handleStatus(todo.id, e)}
                      style={style}
                    >
                      <option value="PENDING" style={{ color: "black" }}>
                        Pending
                      </option>
                      <option value="COMPLETED" style={{ color: "black" }}>
                        Completed
                      </option>
                      <option value="CANCELLED" style={{ color: "black" }}>
                        Cancelled
                      </option>
                      <option value="OVER_DUE" style={{ color: "black" }}>
                        Over Due
                      </option>
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
                      onClick={() => {
                        setDeleteConfimation(true);
                        setIdToBeDeleted(todo?.id)
                      }}
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
