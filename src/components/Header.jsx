import { useState } from 'react';
import './Header.css';



export default function Header({handleOpenModal}) {
  return (
    <header id="header">
      <div id="header-left">
        <div id="logo-container">
          <span id="logo-icon"></span>
          <h1 id="logo-text">FlowState</h1>
        </div>

        <p id="header-subtitle">
          Stay organized. Stay productive.
        </p>
      </div>

      <div id="header-right">
        <button id="add-task-btn"  onClick={handleOpenModal}>
          + Add Task
        </button>
      </div>
    </header>
  );
}