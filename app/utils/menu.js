import { list, check, todo, home, inProgress } from "./Icons";

const menu = [
    {
        id: 1,
        title: " All Tasks",
        icon: home,
        link: "/",
    },
    {
        id: 2,
        title: " To Do",
        icon: todo,
        link: "/todo",
    },
    {
        id: 3,
        title: " In Progress",
        icon: inProgress,
        link: "/inProgress",
    },
    {
        id: 4,
        title: " Completed",
        icon: list,
        link: "/completed",
    },
];

export default menu;
