"use client"

import React, { useEffect, useState } from "react";

interface Props {
    onAddTask: (params: any) => void;
    selectedRow?: any | null;
}

export default function AddTask({ onAddTask, selectedRow = null }: Props) {
  const [taskValue, setTaskValue] = useState("");
  const [priorityValue, setPriorityValue] = useState(0);
  const [deadlineValue, setDeadLineValue] = useState("");

  useEffect(() => {
    if(selectedRow) {
        setTaskValue(selectedRow.taskName);
        setPriorityValue(selectedRow.priority);
        setDeadLineValue(selectedRow.deadline);
    }
  }, [selectedRow]);

  const handleTaskName = (event: any) => {
    setTaskValue(event.target.value);
  };
  const handlePriority = (event: any) => {
    setPriorityValue(event.target.value);
  };
  const handleDeadline = (event: any) => {
    setDeadLineValue(event.target.value);
  };

  const handleAddTask = () => {
    setTaskValue("");
    setPriorityValue(0);
    setDeadLineValue("");
      onAddTask({
        taskName: taskValue,
        priority: priorityValue,
        deadline: deadlineValue,
        id: `${taskValue.trim()}__${priorityValue}`
      });
  };



  return (
    <section className="task__container">
      <div>
        <label>Task Name</label>
        <input type="text" onChange={handleTaskName} value={taskValue} />
      </div>
      <div>
        <label>Priority</label>
        <input type="number" onChange={handlePriority} max={10} value={priorityValue} />
      </div>
      <div>
        <label>Deadline</label>
        <input type="date" onChange={handleDeadline} value={deadlineValue} />
      </div>
      <button onClick={handleAddTask}>Add Task</button>
    </section>
  );
}
