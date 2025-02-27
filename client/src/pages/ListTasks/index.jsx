import React, {useEffect, useState} from 'react';
import {HeaderMenu, Menu} from "../../components/HeaderMenu.jsx";
import Form from "react-bootstrap/Form";
import DatePicker, {registerLocale} from "react-datepicker";
import Button from "react-bootstrap/Button";
import Fuse from "fuse.js";
import renderListTasks from "../../components/TaskListAll.jsx";
import {isWithinInterval} from "date-fns";
import convertDate from "../../utils/helpers.jsx";
import {fetchDataTasks} from "../../services/task.jsx";
import {ru} from 'date-fns/locale/ru';
registerLocale('ru', ru)
import "react-datepicker/dist/react-datepicker.css";
import "./all-tasks.css"

const ListTasks=({token, email})=>{
    const [tasks, setTasks] = useState([]);
    const [dateStart, setDateStart] = useState(null);
    const [dateEnd, setDateEnd] = useState(null);
    const [importance, setImportance] = useState('');
    const [statusTaskDone, setStatusTaskDone] = useState(false);
    const [statusTaskNotDone, setStatusTaskNotDone] = useState(false);
    const [onFilter, setOnFilter] = useState(false);
    const [searchResults, setSearchResults] = useState(tasks);
    const [filtersResults, setFiltersResults] = useState(tasks);
    const [user, setUser] = useState([])
    const options = {keys:['name_task', 'Task.name_task']};
    const fuse = new Fuse(tasks, options);
    const [onSearch, setOnSearch] = useState(false);


    useEffect(() => {
        fetchDataTasks(email, setTasks, token, setUser)
            .then(res => console.log(res))
            .catch(err => console.log(err));
    }, [])


    const onChangeTaskSearch= (event) =>{
        const {value} = event.target;
        if (value.length === 0){
            setSearchResults(tasks);
            setOnSearch(false);
            return;
        }
        const results = fuse.search(value);
        const items = results.map((result) => result.item);
        setSearchResults(items);
        setOnSearch(true)
    }

    const onTaskFilter= () =>{
        let importanceFilter, statusFilter1, statusFilter2, dateFilter;
        const filterData = tasks.filter((task)=>{
            if (dateStart && dateEnd) {
                if (task.Task?.date_start) {
                    const itemDate = task.Task?.date_start;
                    dateFilter = isWithinInterval(itemDate,
                        {
                        start: dateStart,
                        end: dateEnd,
                    });
                } else {
                    dateFilter = true;
                }
            }

            if (!dateStart && !dateEnd) dateFilter = true;

            if (!dateStart && dateEnd) {
                if (task.Task.date_end) {
                    const itemDate = task.Task.date_end;
                    dateFilter = isWithinInterval(itemDate,
                        {
                            start: new Date(),
                            end: dateEnd,
                        });
                } else {
                    dateFilter = true;
                }
            }

            if (dateStart && !dateEnd) {
                if (task.Task.date_start) {
                    const itemDate = task.Task.date_start;
                    dateFilter = isWithinInterval(itemDate,
                        {
                            start: dateStart,
                            end: new Date(),
                        });
                } else {
                    dateFilter = true;
                }
            }

            importanceFilter = importance ? (task.Task?.importance === importance) : true;

            statusFilter1 = statusTaskDone ? (task.Task?.status === true) : true;

            statusFilter2 = statusTaskNotDone ? (task.Task?.status === false) : true;

            return dateFilter && statusFilter1 && statusFilter2 && importanceFilter;
        });
        setFiltersResults(filterData);
        setOnFilter(true);
    }

    return(
        <div className="f-container">
            <HeaderMenu userInfo={user}></HeaderMenu>
            <div className="main">
                <div className="main-menu-content">
                    <Menu></Menu>
                </div>
                <div className="content">
                    <div className="action-page">
                        <div className="name-page">Список задач
                        </div>
                        <Form className="d-flex">
                            <Form.Control
                                type="search"
                                placeholder="Поиск"
                                className="me-2"
                                aria-label="Search"
                                onChange={onChangeTaskSearch}
                            />
                        </Form>
                    </div>
                    <div className="tasks-content">
                        <div className="filters">
                            <Form.Group className="filter">
                                <div className="date">
                                    <i className="bi bi-calendar4-week"/>
                                    <DatePicker className="form-input"  locale={'ru'} placeholderText="Дата начала" dateFormat={'d/MM/YYYY'}
                                        selected={dateStart} onChange={(date)=>setDateStart(date)}
                                    />
                                </div>
                                <div className="date">
                                    <i className="bi bi-calendar4-week"/>
                                    <DatePicker className="form-input"  locale={'ru'} placeholderText="Дата конца" dateFormat={'d/MM/YYYY'}
                                                selected={dateEnd} onChange={(date)=>setDateEnd(date)}
                                    />
                                </div>
                                <div className="importance">
                                    <Form.Select className="form-input" value={importance}
                                                 onChange={(e)=>setImportance(e.target.value)}>
                                        <option value=""></option>
                                        <option value="Низкая">Низкая</option>
                                        <option value="Средняя">Средняя</option>
                                        <option value="Высокая">Высокая</option>
                                    </Form.Select>
                                </div>

                                <div className="filter-status">
                                    {/*<p>Статус задачи</p>*/}
                                    <div className="status">
                                        <Form.Check type={'checkbox'} checked={statusTaskDone || false}
                                                    onChange={() => setStatusTaskDone(!statusTaskDone)}>
                                        </Form.Check>
                                        <p className="label-status">Выполненные задачи</p>
                                    </div>
                                    <div className="status">
                                        <Form.Check type={'checkbox'} checked={statusTaskNotDone || false}
                                                    onChange={() => setStatusTaskNotDone(!statusTaskNotDone)}>
                                        </Form.Check>
                                        <p className="label-status">Невыполненные задачи</p>
                                    </div>
                                </div>
                                <div className="action-filter">
                                    <Button  className="button-filter" onClick={()=>onTaskFilter()}>
                                        Показать
                                    </Button>
                                    <Button  className="button-filter-no" hidden={!onFilter}
                                        onClick={()=>{
                                            setOnFilter(false);
                                            setImportance('');
                                            setStatusTaskDone(false);
                                            setStatusTaskNotDone(false);
                                            setDateStart(null);
                                            setDateEnd(null);
                                        }
                                        }
                                    >
                                        Сбросить
                                    </Button>
                                </div>

                            </Form.Group>

                        </div>
                        <div className="tasks-list-header">
                            <div className="task-header">
                                <p className="name-task-header">Название задачи</p>
                                <div className="info-header">
                                    <p className="status">Важность</p>
                                    <p className="date-start">Дата начала</p>
                                    <p className="date-last">Дата конца</p>
                                    <p className="status">Статус</p>
                                </div>
                            </div>
                            {console.log(tasks)}
                            <div className="tasks-list">
                                {
                                    onSearch ? (
                                        searchResults.map((task)=>(
                                            renderListTasks(task)
                                        ))
                                    ): (onFilter ? (filtersResults.map((task)=>(
                                            renderListTasks(task)
                                        ))):
                                        (tasks.map((task)=>(
                                            renderListTasks(task)
                                        ))))
                                }
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default ListTasks