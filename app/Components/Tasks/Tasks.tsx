"use client"

import { useGlobalState } from "@/app/Context/globalProvider";
import React from "react";
import styled from "styled-components";
import CreateContent from "../modal/CreateContent";
import TaskItem from "../TaskItem/TaskItem";
import { plus } from "@/app/utils/Icons";
import Modal from "../modal/Modal";

interface Props {
    title: string;
    tasks: any[];
}

function Tasks({ title, tasks }: Props) {
    const { theme, isLoading, openModal, modal } = useGlobalState();

  return (
    <TaskStyled theme={theme}>
        {modal && <Modal content={<CreateContent />} />}
        <h1>{title}</h1>
        {!isLoading ? (
        <div className="tasks grid">
            {tasks.map((task) => (
                <TaskItem
                    key={task.id}
                    title={task.title}
                    description={task.description}
                    date={task.date}
                    isCompleted={task.isCompleted}
                    id={task.id}
                />
            ))}
            <button className="create-task" onClick={openModal}>
                {plus}
                Add New Task
            </button>
        </div>
        ) : (
            <div className="tasks-loader w-full h-full flex items-center justify-center">
                <span className="loader"></span>
            </div>
        )}
    </TaskStyled>
  );
}

const TaskStyled = styled.main`
padding: 2rem;
width: 100%;
height: 100vh;
background-color: #212121;
border: 2px solid aqua;
border-radius: 1rem;

overflow-y: auto;

&::-webkit-scrollbar {
    width: 0.5rem;
}

.tasks{
    margin: 2rem 0;
}

>h1 {
    font-Size: clamp(1.5rem 2vw, 2rem);
    font-weight: 800;
    position: relative;

    &::after{
        content: "";
        position: absolute;
        bottom: -0.5rem;
        left: 0;
        width: 3rem;
        height: 0.2rem;
        background-color: #6FCF97;
        border-radius: 0.5rem;
    }
}

.create-task{
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;

    height: 16rem;
    color: #b2becd;
    font-weight: 600;
    curser: pointer;
    border-radius: 1rem;
    border: 3px dashed #2a2e35;
    transition: all 0.3s ease;

    &:hover{
        background-color: #b2becd;
        color: #f8f8f8;

    }
}
`;

export default Tasks;