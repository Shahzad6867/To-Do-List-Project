import "./FilterBar.css";

export default function FilterBar() {
  return (
    <section id="filter-bar">
      <div id="filter-buttons">
        <button className="filter-btn active">All</button>

        <button className="filter-btn">Pending</button>

        <button className="filter-btn">Completed</button>

        <button className="filter-btn">Overdue</button>
      </div>

      <div id="search-container">
        <input type="text" placeholder="Search tasks..." />
      </div>
    </section>
  );
}
