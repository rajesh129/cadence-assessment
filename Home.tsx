"use client"
import React, { useState } from "react";
import AddTask from "../components/AddTask";
import { Poppins } from "next/font/google";
import withErrorBoundary from "@/components/withErrorBoundary";

const poppins = Poppins({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-poppins',
    weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900']
  });

function App() {
  const [taskList, setTaskList] = useState<any>([]);
  const [getRowId, setRowId] = useState<string>('');
  const [selectedRow, setSelectedRow] = useState<any>(null);

  const onAddTask = (task: any) => {
    const taskIndex = taskList.findIndex((item: any) => item.taskName === task.taskName)
    let newArr = [...taskList];
    console.log(taskIndex);
    
    if(taskIndex >= 0) {
        newArr.splice(taskIndex, 1, task)
    }
    else {
        newArr = [...newArr, task]
    }
    console.log(taskList);
    console.log(task);
    
    
    console.log(newArr)
    const arr = [...newArr, task];
    console.log(arr);
    
    newArr.sort((a: { deadline: string; }, b: { deadline: string; }) => {
      const aDate: Date = new Date(a.deadline);
      const bDate: Date = new Date(b.deadline);
      return aDate - bDate;
      });
    setTaskList(newArr);
  };

  const handleRowClick = (event: any) => {
    
    setRowId( event.target.value)
  }

  const handleEdit = () => {
    const obj = taskList.find((item: any) => item.id === getRowId);
    setSelectedRow(obj)
  }

  const handleDelete = () => {
    const objIndex = taskList.findIndex((item: any) => item.id === getRowId);
    const arr = [...taskList];
    arr.splice(objIndex, 1);
    setTaskList(arr)
  }
  
  return (
    <div className={`${poppins.variable} App`}>
      <div>
        <AddTask onAddTask={onAddTask} selectedRow={selectedRow} />
      </div>
      <div className="dashboard__container">
        <table>
          <thead>
            <tr>
              <th />
              <th>Task Name</th>
              <th>Priority</th>
              <th>Deadline</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {taskList.map((item: any) => {
              return (
                <tr key={item.id}>
                <td>
                    <input type="radio" onChange={handleRowClick} value={item.id} name="task-row" />
                </td>
                  <td>{item.taskName}</td>
                  <td>{item.priority}</td>
                  <td>{item.deadline}</td>
                  <td>
                    <div className="button__container">
                        <button className="edit__button" onClick={handleEdit}>Edit</button>
                        <button className="delete__button" onClick={handleDelete}>Delete</button>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
        <sub>* click the radio button to select the row</sub>
      </div>
    </div>
  );
}

export default withErrorBoundary(App);