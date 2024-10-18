"use client";

import { useGlobalState } from "@/app/Context/globalProvider";
import { edit, trash } from "@/app/utils/Icons";
import React from "react";
import styled from "styled-components";
import formateDate from "@/app/utils/formateDate";

interface Props {
    title: string;
    description: string;
    date: string;
    isCompleted: boolean;
    id: string;
}

function TaskItem({ title, description, date, isCompleted, id }: Props) {
  const { theme, deleteTask, updateTask } = useGlobalState();

  return (
    <TaskItemStyled theme={theme}>
      <h1>{title}</h1>
      <p>{description}</p>
      <p>{formateDate( date )}</p>
      <div className="task-footer">
        { isCompleted ? ( 
          <button className="completed" 
              onClick={() => {
              const task = {
                id,
                isCompleted: !isCompleted,
              };
              updateTask(task);
            }}
          >
            Completed
          </button> 
          ) : ( 
          <button className="inCompleted"
            onClick={() => {
              const task = {
                id,
                isCompleted: !isCompleted,
              };
              updateTask(task);
            }}
          >
            In Progress
          </button>
        )}
        <button className="edit">{edit}</button>
        <button 
        className="delete" 
        onClick={() => {
          deleteTask(id);
        }}>{trash}</button>
      </div>
    </TaskItemStyled>
  );
}

const TaskItemStyled = styled.div`
padding: 1.2rem 1rem;
border-radius: 1rem;
background-color: rgba(249,249,249,0.08);
box-shadow: 1px 7px 12px rgba(8, 18, 69, 0.1);
border: 2px solid rgba(249,249,249,0.08);

height: 16rem;
display: flex;
flex-direction: column;
gap: 0.5rem;

.date{
  margin-top: auto;
}

> h1 {
  font-size: 1.5rem;
  font-weight: 600;
}

.task-footer {
  display: flex;
  align-item: center;
  gap: 1.2rem;

  button {
    border: none;
    outline: none;
    curser: pointer;

    i{
      font-size: 1.4rem;
      color: #b2becd;
    }
  }

  .edit{
    margin-left: auto;
  }

  .completed,
  .inCompleted {
    display: inline-block;
    padding: 0.4rem 1rem;
    background-color: #fe6854;
    border-radius: 30px;
  }

  .completed {
    background-color: #27AE60;
  }
}
`;

export default TaskItem;