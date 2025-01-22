import React, {useEffect, useRef, useState} from 'react';
import {HeaderMenu, Menu} from "../../components/HeaderMenu.jsx";
import Form from "react-bootstrap/Form";
import "./all-tasks.css"
import DatePicker from "react-datepicker";
import Button from "react-bootstrap/Button";
import Fuse from "fuse.js";
import renderListTasks from "../../components/TaskListAll.jsx";
import {isWithinInterval} from "date-fns";
import convertDate from "../../utils/helpers.jsx";
import {fetchDataTasks} from "../../services/task.jsx";

const ListTasks=()=>{
    const [tasks, setTasks] = useState([]);
    const [dateStart, setDateStart] = useState(null);
    const [dateEnd, setDateEnd] = useState(null);
    const [importance, setImportance] = useState('');
    const [statusTask, setStatusTask] = useState(false);
    const [onFilter, setOnFilter] = useState(false);
    const [searchResults, setSearchResults] = useState(tasks);
    const [filtersResults, setFiltersResults] = useState(tasks);

    const options = {keys:['name_task', 'Task.name_task']};
    const fuse = new Fuse(tasks, options);
    const [onSearch, setOnSearch] = useState(false);


    useEffect(() => {
        const email = "user1@.ru";
        fetchDataTasks(email, setTasks)
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
        let importanceFilter, statusFilter, dateFilter;
        const filterData = tasks.filter((task)=>{
            if (dateStart && dateEnd) {
                if (task.Task.date_start) {
                    const itemDate = task.Task.date_start;
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
                    if (convertDate(itemDate) >= convertDate(dateStart)) dateFilter = itemDate;
                } else {
                    dateFilter = true;
                }
            }

            importanceFilter = importance ? (task.Task.importance === importance) : true;

            statusFilter = statusTask ? (task.Task.status === statusTask) : true;

            return dateFilter && statusFilter && importanceFilter;
        });
        setFiltersResults(filterData);
        setOnFilter(true);
    }

    return(
        <div className="f-container">
            <HeaderMenu></HeaderMenu>
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
                                    <DatePicker className="form-input"  locale={'ru'} placeholderText="Дата начала" dateFormat={'DD/MM/YYYY'}
                                        selected={dateStart} onChange={(date)=>setDateStart(date)}
                                    />
                                </div>
                                <div className="date">
                                    <i className="bi bi-calendar4-week"/>
                                    <DatePicker className="form-input"  locale={'ru'} placeholderText="Дата конца" dateFormat={'DD/MM/YYYY'}
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
                                        <Form.Check type={'checkbox'} checked={statusTask || false}
                                                    onChange={() => setStatusTask(!statusTask)}>
                                        </Form.Check>
                                        <p className="label-status">{statusTask ? "Выполненные задачи" : "Все задачи"}</p>
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
                                            setStatusTask(false);
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