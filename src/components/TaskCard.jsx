import { useContext, useState } from "react";
import DeleteLineIcon from "@iconify-react/mingcute/delete-line";
import EditDuotoneIcon from "@iconify-react/lets-icons/edit-duotone";
import "./TaskCard.css";
import { TaskContext } from "../contexts/TaskContext";
import iziToast from "izitoast";

export default function TaskCard({ task, taskDone, deleteTask }) {
  const [isCompleted, setIsCompleted] = useState(false);
  const { setIsTaskModalOpen } = useContext(TaskContext);
  function handleCompletion() {
    task.isCompleted = !task.isCompleted;
    setIsCompleted(task.isCompleted);
    taskDone(task);
  }

  function handleDeleteTask() {
    iziToast.question({
      title: "Delete Task",
      overlay: true,
      message: "Are you sure you want to delete this task?",
      position: "center",
      backgroundColor: "#0f172a",
      progressBarColor: "#5b21b6",
      theme: "dark",
      buttons: [
        [
          "<button ><b>No</b></button>",
          function (instance, toast) {
            instance.hide({ transitionOut: "fadeOut" }, toast, "button");
          },
        ],
        [
          '<button  "><b>Yes</b></button>',
          function (instance, toast) {
            instance.hide({ transitionOut: "fadeOut" }, toast, "button");

            // PLACE YOUR DELETE LOGIC HERE (e.g., API call or function)
            deleteTask();
          },
          true,
        ],
      ],
    });
  }

  return (
    <div className="task-row">
      {/* Left side: checkbox + text */}
      <div className="task-main">
        <input
          type="checkbox"
          className="done-checkbox"
          onChange={handleCompletion}
        />

        <div className="task-text">
          <div className="task-title">{task.task_title}</div>

          <div className="task-subtext">
            {task.deadline_date} • {task.deadline_time}
          </div>
        </div>
      </div>

      <div
        className={`task-status ${task.isCompleted ? "completed" : "pending"}`}
      >
        {task.isCompleted ? "Completed" : "Pending"}
      </div>

      {/* Actions */}
      <div className="task-actions">
        <button
          className="edit-btn"
          onClick={() =>
            setIsTaskModalOpen({
              actionTitle: "Update",
              toOpen: true,
              payload: task,
            })
          }
        >
          <EditDuotoneIcon height="2em" />
        </button>
        <button className="delete-btn" onClick={handleDeleteTask}>
          <DeleteLineIcon height="1em" />
        </button>
      </div>
    </div>
  );
}
