import React, {useCallback} from "react";
import classes from '../../App.module.scss'

import Collapse from 'react-bootstrap/Collapse';
import {setOpenedIds} from "../../store/reducers/root-reducer";
import {useDispatch, useSelector} from "react-redux";

import {BsTrash3} from "react-icons/bs";
import {SlArrowUp} from "react-icons/sl";
import {BiPlusCircle} from "react-icons/bi";
import {MdOutlineEdit} from "react-icons/md";

export const RecursiveSelectItem = ({array, parentId, onEdit, onAdd, onDelete}) => {
    const dispatch = useDispatch()
    const openedIds = useSelector((state) => state.root.openedIds)

    const childesArr = array.filter(el => el.parent_id === parentId)

    const arrowIcon = useCallback((child) => {
        return (
            !!array.find((el) => +el.parent_id === +child.id) &&
            <SlArrowUp style={{transform: `rotate(${!!openedIds.includes(child.id) ? 0 : 180}deg)`}}/>
        )
    }, [array, openedIds])

    return (
        <>
            {childesArr.map((child) => {
                if (child.parent_id === parentId) {
                    return (
                        <Collapse key={child.id} in={openedIds.includes(child.parent_id)}>
                            <div style={{marginLeft: 60}}>
                                <div onClick={() => dispatch(setOpenedIds(child.id))} className={classes.item}>
                                    <div className={classes.left}>
                                        {arrowIcon(child)}
                                    </div>
                                    <div className={classes.center}>
                                        <span>{child.name}</span>
                                        <span>{child.id}</span>
                                    </div>
                                    <div className={classes.right}>
                                        <div>
                                            <MdOutlineEdit onClick={(e) => onEdit(e, child)}/>
                                            <BiPlusCircle onClick={(e) => onAdd(e, child)}/>
                                            <BsTrash3 onClick={(e) => onDelete(e, child)}/>
                                        </div>
                                    </div>
                                </div>
                                <RecursiveSelectItem
                                    onAdd={onAdd}
                                    array={array}
                                    onEdit={onEdit}
                                    parentId={child.id}
                                    onDelete={onDelete}
                                />
                            </div>
                        </Collapse>
                    )
                }
            })}
        </>
    )
}
