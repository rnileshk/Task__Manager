"use client"

import Tasks from "./Components/Tasks/Tasks";
import { useGlobalState } from "./Context/globalProvider";

export default function Home() {

  const {tasks} = useGlobalState()

  return <Tasks title="All Tasks" tasks={tasks} />;
}
