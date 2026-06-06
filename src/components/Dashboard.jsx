import "./Dashboard.css";

export default function Dashboard({tasks}) {
  return (
    <section id="dashboard">

      <div className="dashboard-card">
        <div className="card-icon">📋</div>
        <div className="card-content">
          <h2>{tasks.length}</h2>
          <p>Total Tasks</p>
        </div>
      </div>

      <div className="dashboard-card">
        <div className="card-icon">✅</div>
        <div className="card-content">
          <h2>{tasks.filter(task => {
            if(task.isCompleted ){
              return task
            }
          }).length}</h2>
          <p>Completed</p>
        </div>
      </div>

      <div className="dashboard-card">
        <div className="card-icon">⏳</div>
        <div className="card-content">
          <h2>{tasks.filter(task => {
            let today = new Date()
            let deadline = new Date(task.deadline_date+"T"+task.deadline_time)
            if(!task.isCompleted && (deadline >= today) ){
              return task
            }
          }).length}</h2>
          <p>Pending</p>
        </div>
      </div>

      <div className="dashboard-card">
        <div className="card-icon">⚠️</div>
        <div className="card-content">
          <h2>{tasks.filter(task => {
            let today = new Date()
            let deadline = new Date(task.deadline_date+"T"+task.deadline_time)
            if(!task.isCompleted && (deadline < today) ){
              return task
            }
          }).length}</h2>
          <p>Overdue</p>
        </div>
      </div>

    </section>
  );
}