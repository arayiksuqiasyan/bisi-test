import React, {useCallback, useMemo, useState} from "react";
import classes from './App.module.scss';
import {useDispatch, useSelector} from "react-redux";

import {RecursiveSelectItem} from "./components/RecursiveSelectItem/RecursiveSelectItem";
import {onAddDefault, onAddHandler, onDeleteHandler, onEditHandler, setOpenedIds} from "./store/reducers/root-reducer";

import {BsTrash3} from "react-icons/bs";
import {SlArrowUp} from "react-icons/sl";
import {BiPlusCircle} from "react-icons/bi";
import {MdOutlineEdit} from "react-icons/md";


function App() {
    const {defaultRepresentation, openedIds} = useSelector((state) => state.root)
    const dispatch = useDispatch()

    const onEdit = (e, child) => {
        e.stopPropagation()
        let name = prompt('Edit Name')
        dispatch(onEditHandler({...child, name}))
    }

    const onAdd = (e, child) => {
        e.stopPropagation()
        let name = prompt('select Name')
        dispatch(onAddHandler({...child, name}))
    }

    const onDelete = (e, child) => {
        e.stopPropagation()
        dispatch(onDeleteHandler(child))
    }

    const onAddDefaultHandler = (e) => {
        e.stopPropagation()
        let name = prompt('select Name')
        dispatch(onAddDefault(name))
    }

    const arrowIcon = useCallback((child) => {
        return (
            !!defaultRepresentation.find((el) => +el.parent_id === +child.id) &&
            <SlArrowUp style={{transform: `rotate(${!!openedIds.includes(child.id) ? 0 : 180}deg)`}}/>
        )
    }, [defaultRepresentation, openedIds])

    const filteredArr = useMemo(() => {
        return defaultRepresentation.filter((el) => el.parent_id !== null)
    }, [defaultRepresentation])

    return (
        <div className={classes.app}>
            <div className={classes.header}>
                <BiPlusCircle onClick={onAddDefaultHandler}/>
            </div>
            <div>
                {defaultRepresentation.map((el, index) => {
                    if (el.parent_id === null) {
                        return (
                            <div key={index}>
                                <div id={el.id}
                                     key={index}
                                     onClick={() => dispatch(setOpenedIds(el.id))}
                                     className={classes.item}>
                                    <div className={classes.left}>
                                        {arrowIcon(el)}
                                    </div>
                                    <div className={classes.center}>
                                        <span>{el.name}</span>
                                        <span>{el.id}</span>
                                    </div>
                                    <div className={classes.right}>
                                        <div>
                                            <MdOutlineEdit onClick={(e) => onEdit(e, el)}/>
                                            <BiPlusCircle onClick={(e) => onAdd(e, el)}/>
                                            <BsTrash3 onClick={(e) => onDelete(e, el)}/>
                                        </div>
                                    </div>
                                </div>
                                <RecursiveSelectItem
                                    onAdd={onAdd}
                                    onEdit={onEdit}
                                    parentId={el.id}
                                    onDelete={onDelete}
                                    array={filteredArr}
                                />
                            </div>
                        )
                    }
                })}
            </div>

        </div>
    );
}

export default App;
