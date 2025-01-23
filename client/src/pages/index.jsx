import "./styles/color.css";
import {lazy} from "react";

export {default as ListBoards} from "./ListBoards/index.jsx";
export {default as MainPage} from "./MainPage/index.jsx";
export {default as Login} from "./Login/index";

export const KanbanBoard = lazy(()=> import('./KanbanBoard/index.jsx'));
export const ListTasks = lazy(()=> import('./ListTasks/index.jsx'));


