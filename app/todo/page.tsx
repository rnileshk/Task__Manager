"use client"

import React from "react";
import Tasks from "../Components/Tasks/Tasks";
import { useGlobalState } from "../Context/globalProvider";

function page() {
  const {inProgressTasks} = useGlobalState();

  return <Tasks title="To Do Tasks" tasks={inProgressTasks} />;
}

export default page;