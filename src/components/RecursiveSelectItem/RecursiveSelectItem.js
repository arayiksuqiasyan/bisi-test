import React from "react";
import {SlArrowUp} from "react-icons/sl";
import {MdOutlineEdit} from "react-icons/md";
import {BiPlusCircle} from "react-icons/bi";
import {BsTrash3} from "react-icons/bs";
import {Ri4KFill} from "react-icons/ri";
import Collapse from 'react-bootstrap/Collapse';
import {useDispatch, useSelector} from "react-redux";
import {onAddHandler, onDeleteHandler, onEditHandler, setOpenedIds} from "../../store/reducers/root-reducer";
import classes from '../../App.module.scss'

export const RecursiveSelectItem = ({array, parentId, lastParentId}) => {
    const dispatch = useDispatch()
    const openedIds = useSelector((state) => state.root.openedIds)

    const childesArr = array.filter(el => el.parent_id === parentId)

    const onEdit = (e, child) => {
        e.stopPropagation()
        let name = prompt('Edit Name')
        dispatch(onEditHandler({...child,name}))
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
    return (
        <div>
            {childesArr.map((child) => {
                if (child.parent_id === parentId) {
                    return (
                        <Collapse key={child.id} in={openedIds.includes(child.parent_id)}>
                            <div>
                                <div onClick={() => dispatch(setOpenedIds(child.id))} className={classes.item}>
                                    <div className={classes.left}>
                                        {!!array.find((el) => +el.parent_id === +child.id) && <SlArrowUp/>}
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
                                <RecursiveSelectItem parentId={child.id} array={array}/>
                            </div>
                        </Collapse>
                    )
                }
            })}
        </div>
    )
}
