"use client"

import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import styled from "styled-components";
import Button from "../Button/Button";
import { plus } from "@/app/utils/Icons";
import themes from "@/app/Context/themes";
import { useGlobalState } from "@/app/Context/globalProvider";

function CreateContent() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState("");
    const [inProgress, setInProgress] = useState(false);
    const [completed, setCompleted] = useState(false);

    const { theme, allTasks, closeModal } = useGlobalState();

    const handleChange = (name: string) => (e: any) => {
        switch (name) {
            case "title":
                setTitle(e.target.value);
                break;
            case "description":
                setDescription(e.target.value);
                break;
            case "date":
                setDate(e.target.value);
                break;
            case "inProgress":
                setInProgress(e.target.checked);
                break;
            case "completed":
                setCompleted(e.target.checked);
                break;
            default:
                break;
        }
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        const task = {
            title,
            description,
            date,
            inProgress,
            completed,
        };

        try {
            const res = await axios.post("/api/tasks", task);

            if(res.data.error){
                toast.error(res.data.error);
            }
            if (!res.data.error) {
                toast.success("Task Created Successfully.");
                allTasks();
                closeModal();
            }
        } catch (error) {
            toast.error("Something went wrong.");
            console.log(error);
        }

    };

  return (
    <CreateContentStyled onSubmit={handleSubmit}>
        <h1>Create a Task</h1>
        <div className="input-control">
            <label htmlFor="title">Title</label>
            <input
                type="text"
                id="title"
                value={title}
                name="title"
                onChange={handleChange("title")}
                placeholder="Title....."
            />
        </div>

        <div className="input-control">
            <label htmlFor="description">Description</label>
            <textarea 
                value={description}
                name="description"
                id="description"
                rows={3}
                onChange={handleChange("description")}
                placeholder="Description......."
            />
        </div>

        <div className="input-control">
            <label htmlFor="date">Date</label>
            <input
                type="date"
                value={date}
                name="date"
                id="date"
                onChange={handleChange("date")}
            />
        </div>

        <div className="input-control toggler">
            <label htmlFor="inProgress">Toggle In Progress</label>
            <input
                type="checkbox"
                value={inProgress.toString()}
                name="inProgress"
                id="inProgress"
                onChange={handleChange("inProgress")}
            />
        </div>

        <div className="input-control toggler">
            <label htmlFor="completed">Toggle Completed</label>
            <input
                type="checkbox"
                value={completed.toString()}
                name="completed"
                id="completed"
                onChange={handleChange("completed")}
            />
        </div>

        <div className="submit-btn flex justify-end">
            <Button type="submit"
            name="Create Task"
            icon={plus}
            padding={"0.8rem 2rem"}
            borderRad={"0.8rem"}
            fw={"500"}
            fs={"1.2rem"}
            background={"rgb(0, 163, 255)"}
            />
        </div>

    </CreateContentStyled>
  );
}

const CreateContentStyled = styled.form`
> h1{
    font-size: clamp(1.2rem, 5vw, 1.6rem);
    font-weight: 600;
}

color: #dbe1e8;

.input-control{
    position: relative;
    margin: 0.6rem 0;
    font-weight:  500;

    input, 
    textarea {
        width: 100%;
        border: none;
        padding: 0.5rem;

        resize: none;
        background-color: #131313;
        color: #b2becd;
        border-radius: 0.5rem;
    }

    lable{
        margin-bottom: 0.5rem;
        display: inline-block;
        font-size: clamp(1.2rem, 5vw, 1.6rem);

        span{
            color: #6c7983;
        }
    }
}

.submit-btn button{
    transition: all 0.5s ease-in-out;
    i{
        color: #f8f8f8;
    }
    &:hover{
        background-color: #6FCF97;
        color: white;
    }
}

.toggler{
    display: flex;
    align-items: center;
    justify-content: space-between;

    cursor: pointer;

    lable {
        flex: 1;
    }

    input {
        width: initial;
    }
}
`;

export default CreateContent;