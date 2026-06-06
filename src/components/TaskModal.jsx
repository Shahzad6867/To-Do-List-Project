import { useEffect, useState } from "react";
import "./TaskModal.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

export default function TaskModal({
  isTaskModalOpen,
  handleCloseModal,
  handleAddTask,
  handleUpdateTask,
}) {
  const [task, setTask] = useState({});

  const today = new Date();

  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  const hours = String(today.getHours()).padStart(2, "0");
  const minutes = String(today.getMinutes()).padStart(2, "0");

  const formattedDate = `${year}-${month}-${day}`;
  const formattedTime = `${hours}:${minutes}`;

  useEffect(() => {
    if (isTaskModalOpen.payload !== null) {
      setTask(isTaskModalOpen.payload);
    } else {
      setTask({
        task_title: null,
        deadline_date: formattedDate,
        deadline_time: formattedTime,
      });
    }
  }, [isTaskModalOpen]);

  function validateModal(task) {
    if (task.task_title === null || task.task_title.trim() === "") {
      iziToast.error({
        title: "Error",
        message: "Please provide a valid task title",
        position: "topRight",
      });
      return false;
    }
    if (task.deadline_date === "") {
      task.deadline_date = formattedDate;
    }
    return true;
  }

  function onTaskCreation(e) {
    if (!validateModal(task)) {
      e.preventDefault();
      return;
    }
    handleAddTask(task);
    setTask({});
    handleCloseModal();
  }

  function onTaskUpdation(e) {
    if (!validateModal(task)) {
      e.preventDefault();
      return;
    }
    task.isOverdueNotified = false;
    handleUpdateTask(task);
    setTask({});
    handleCloseModal();
  }

  if (!isTaskModalOpen.toOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <div className="modal-header">
          <h2>{isTaskModalOpen.actionTitle} Task</h2>
          <button className="close-btn" onClick={handleCloseModal}>
            ✕
          </button>
        </div>

        <div className="modal-body">
          <div className="input-group">
            <label>Task Title</label>
            <input
              type="text"
              placeholder="e.g. Finish React project"
              value={task.task_title || ""}
              onChange={(e) => setTask({ ...task, task_title: e.target.value })}
            />
          </div>

          <div className="input-row">
            <div className="input-group">
              <label>Date</label>
              <input
                type="date"
                min={formattedDate}
                value={task.deadline_date || formattedDate}
                onChange={(e) =>
                  setTask({ ...task, deadline_date: e.target.value })
                }
              />
            </div>

            <div className="input-group">
              <label>Time</label>
              <input
                type="time"
                min={formattedTime}
                value={task?.deadline_time || formattedTime}
                onChange={(e) =>
                  setTask({ ...task, deadline_time: e.target.value })
                }
              />
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button className="cancel-btn" onClick={handleCloseModal}>
            Cancel
          </button>

          <button
            className="create-btn"
            onClick={
              isTaskModalOpen.payload !== null
                ? (e) => onTaskUpdation(e)
                : (e) => onTaskCreation(e)
            }
          >
            {isTaskModalOpen.actionTitle} Task
          </button>
        </div>
      </div>
    </div>
  );
}
