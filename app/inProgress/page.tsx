"use client"

import React from "react";
import { useGlobalState } from "../Context/globalProvider";
import Tasks from "../Components/Tasks/Tasks";

function page() {
  const {inProgressTasks} = useGlobalState();

  return <Tasks title="In Progress Tasks" tasks={inProgressTasks} />;
}

export default page;