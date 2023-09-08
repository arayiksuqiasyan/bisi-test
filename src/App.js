import React  from "react";
import classes from './App.module.scss';
import {useDispatch, useSelector} from "react-redux";
import {onAddHandler, onDeleteHandler, onEditHandler, setOpenedIds} from "./store/reducers/root-reducer";
import {SlArrowUp} from "react-icons/sl";
import {MdOutlineEdit} from "react-icons/md";
import {BiPlusCircle} from "react-icons/bi";
import {BsTrash3} from "react-icons/bs";
import {RecursiveSelectItem} from "./components/RecursiveSelectItem/RecursiveSelectItem";


function App() {

    const onEdit = (e, child) => {
        e.stopPropagation()
        let name = prompt('Edit Name')
        dispatch(onEditHandler({...child,name}))
    }
    const onAdd = (e, child) => {
        e.stopPropagation()
       let name =  prompt('select Name')
        dispatch(onAddHandler({...child,name}))
    }
    const onDelete = (e, child) => {
        e.stopPropagation()
        dispatch(onDeleteHandler(child))
    }

    const {defaultRepresentation} = useSelector((state) => state.root)
    const dispatch = useDispatch()
    console.log(defaultRepresentation)
    return (
        <div className={classes.app}>

            <div className={classes.header}>
                <div className={classes.representation}>
                    {defaultRepresentation.map((el, index) => {
                        if (el.parent_id === null) {
                            return (
                                <div key={index}>
                                    <div id={el.id}
                                         key={index}
                                         onClick={() => dispatch(setOpenedIds(el.id))}
                                         className={classes.item}>
                                        <div className={classes.left}>
                                            {!!defaultRepresentation.find((item) => !!item?.parent_id?.toString().includes(el.id.toString())) && <SlArrowUp/>}
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
                                        parentId={el.id}
                                        array={defaultRepresentation.filter((el) => el.parent_id !== null)}
                                    />
                                </div>
                            )
                        }
                    })}
                </div>
            </div>

        </div>
    );
}

export default App;
