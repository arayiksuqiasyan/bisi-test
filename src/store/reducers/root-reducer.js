import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    openedIds: [],
    defaultRepresentation: [
        {
            id: 101,
            name: "Shirts",
            parent_id: null
        },
        {
            id: 102,
            name: "Scarves",
            parent_id: null
        },
        {
            id: 103,
            name: "Jeans",
            parent_id: null
        },
        {
            id: 1011,
            name: "Long Sleeve",
            parent_id: 101
        },
        {
            id: 1012,
            name: "Short Sleeve",
            parent_id: 101
        },
        {
            id: 1031,
            name: "Wide leg",
            parent_id: 103
        },
        {
            id: 10121,
            name: "Graphic tee",
            parent_id: 1012
        },
        {
            id: 10122,
            name: "Button down",
            parent_id: 1012
        }
    ]


}

export const rootReducer = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        setOpenedIds: (state, action) => {
            const foundedIndex = state.openedIds.findIndex((id) => +id === +action.payload)
            if (foundedIndex === -1) {
                state.openedIds = [...state.openedIds, action.payload]
            } else {
                state.openedIds = state.openedIds.filter((id) => +id !== +action.payload)
            }
        },

        onEditHandler: (state, action) => {
            let arr = [...state.defaultRepresentation]
            console.log(action.payload)
            const foundedIndex = arr.findIndex((el)=>+el.id === +action.payload.id)
            console.log(foundedIndex)

            if(foundedIndex !== -1){
                arr.splice(foundedIndex,1,action.payload)
                state.defaultRepresentation = arr
            }
        },

        onAddHandler: (state, action) => {
            let foundedIndex = -1
            state.defaultRepresentation.forEach((el, i) => {
                if (+el.parent_id === +action.payload.id) {
                    foundedIndex = i
                }
            })

            if (foundedIndex !== -1) {
                const arr = [...state.defaultRepresentation]

                const newItem = {
                    id: +arr[foundedIndex].id + 12391 + 1,
                    name: action.payload.name + "added",
                    parent_id: arr[foundedIndex].parent_id
                }
                arr.splice(foundedIndex + 1, 0, newItem)
                state.defaultRepresentation = arr
            } else {
                const arr = [...state.defaultRepresentation]
                let index = arr.findIndex((el) => +el.id === +action.payload.id)
                const newItem = {
                    id: action.payload.parent_id + 12398 + 1,
                    name: action.payload.name + "added",
                    parent_id: action.payload.id
                }
                arr.splice(index + 1, 0, newItem)

                state.defaultRepresentation = arr
            }

        },

        onDeleteHandler: (state, action) => {
            state.defaultRepresentation = [...state.defaultRepresentation.filter((el) => +el.id !== +action.payload.id && +el.parent_id !== +action.payload.id)]
        },
    },
})

export const {
    setOpenedIds, onEditHandler, onAddHandler, onDeleteHandler
}
    = rootReducer.actions

export default rootReducer.reducer
