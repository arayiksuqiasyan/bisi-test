import {createSlice} from '@reduxjs/toolkit'

export const initialState = {
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
    name: 'root',
    initialState,
    reducers: {
        setOpenedIds: (state, action) => {
            const foundedIndex = state.openedIds.findIndex((id) => +id === +action.payload)
            if (foundedIndex === -1) {
                state.openedIds = [...state.openedIds, action.payload]
            } else {
                state.openedIds = state.openedIds.filter((id) => !id.toString().includes(action.payload.toString()))
            }
        },

        onAddDefault: (state, action) => {
            const arr = [...state.defaultRepresentation]
            let foundedIndex = -1

            for (let i = 0; i < arr.length; i++) {
                let next = arr[i + 1]
                if (arr[i].parent_id === null) {
                    foundedIndex = i
                    if (next.parent_id !== null) {
                        break
                    }
                }
            }

            if (foundedIndex !== -1) {
                const newObj = {
                    id: +arr[foundedIndex].id + 1,
                    name: action.payload,
                    parent_id: null
                }

                arr.splice(foundedIndex + 1, 0, newObj)
                state.defaultRepresentation = arr
            }
        },

        onEditHandler: (state, action) => {
            let arr = [...state.defaultRepresentation]
            const foundedIndex = arr.findIndex((el) => +el.id === +action.payload.id)

            if (foundedIndex !== -1) {
                arr.splice(foundedIndex, 1, action.payload)
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
                    id: +arr[foundedIndex].id + 1,
                    name: action.payload.name,
                    parent_id: arr[foundedIndex].parent_id
                }
                arr.splice(foundedIndex + 1, 0, newItem)
                state.defaultRepresentation = arr
            } else {
                const arr = [...state.defaultRepresentation]
                let index = arr.findIndex((el) => +el.id === +action.payload.id)
                const newItem = {
                    id: +(action.payload.id + '1'),
                    name: action.payload.name,
                    parent_id: action.payload.id
                }
                arr.splice(index + 1, 0, newItem)

                state.defaultRepresentation = arr
            }

        },

        onDeleteHandler: (state, action) => {
            let newArr = [...state.defaultRepresentation]

            function recursive(currentItem) {
                const childElements = newArr.filter((el) => +el.parent_id === +currentItem.id)

                if (childElements.length > 0) {
                    childElements.forEach((element) => recursive(element))
                }

                const foundedIndex = newArr.findIndex((el) => +el.id === +currentItem.id)
                if (foundedIndex !== -1) {
                    newArr.splice(foundedIndex, 1)
                }

            }

            recursive(action.payload)
            state.defaultRepresentation = newArr
        },
    },
})

export const {
    setOpenedIds, onEditHandler, onAddHandler, onDeleteHandler, onAddDefault
}
    = rootReducer.actions

export default rootReducer.reducer
