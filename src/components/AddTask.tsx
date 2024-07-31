"use client"

import React, { useEffect, useState } from "react";
import withErrorBoundary from "./withErrorBoundary";

interface Props {
    onAddTask: (params: any) => void;
    selectedRow?: any | null;
}

function AddTask({ onAddTask, selectedRow = null }: Props) {
  const [taskValue, setTaskValue] = useState("");
  const [priorityValue, setPriorityValue] = useState<number | string>(0);
  const [deadlineValue, setDeadLineValue] = useState("");
  const [taskError, setTaskError] = useState("");
  const [priorityError, setPriorityError] = useState("");
  const [deadlineError, setDeadlineError] = useState("");

  useEffect(() => {
    if (selectedRow) {
        setTaskValue(selectedRow.taskName);
        setPriorityValue(selectedRow.priority);
        setDeadLineValue(selectedRow.deadline);
    }
  }, [selectedRow]);

  const handleTaskName = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (!/^[A-Za-z\s]+$/.test(value)) {
        setTaskError("Task name must contain only alphabets");
    } else {
        setTaskError("");
    }
    setTaskValue(value);
  };

  const handlePriority = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (isNaN(Number(value))) {
        setPriorityError("Priority must be a number");
    } else {
        setPriorityError("");
    }
    setPriorityValue(Number(value));
  };

  const handleDeadline = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (isNaN(Date.parse(value))) {
        setDeadlineError("Deadline must be a valid date");
    } else {
        setDeadlineError("");
    }
    setDeadLineValue(value);
  };

  const handleAddTask = () => {
    if (!taskValue || !/^[A-Za-z\s]+$/.test(taskValue)) {
        setTaskError("Task name must contain only alphabets");
        return;
    }
    if (isNaN(Number(priorityValue))) {
        setPriorityError("Priority must be a number");
        return;
    }
    if (Number(priorityValue) < 1) {
        setPriorityError("Priority must be a greater than or equal to 1");
        return;
    }
    if (isNaN(Date.parse(deadlineValue))) {
        setDeadlineError("Deadline must be a valid date");
        return;
    }

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
        {taskError && <p className="error">{taskError}</p>}
      </div>
      <div>
        <label>Priority</label>
        <input type="text" onChange={handlePriority} value={priorityValue} />
        {priorityError && <p className="error">{priorityError}</p>}
      </div>
      <div>
        <label>Deadline</label>
        <input type="date" onChange={handleDeadline} value={deadlineValue} />
        {deadlineError && <p className="error">{deadlineError}</p>}
      </div>
      <button onClick={handleAddTask}>Add Task</button>
    </section>
  );
}

export default withErrorBoundary(AddTask);
