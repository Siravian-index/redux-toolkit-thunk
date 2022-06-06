import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../app/store";


export type IdType = string | number

interface IUser {
    id: IdType
    name: string
    email: string
}


const initialState: IUser[] = [
    {
        id: 66,
        name: "david",
        email: "depch@gmail.com"
    },
    {
        id: 56,
        name: "juan",
        email: "juan@gmail.com"
    }
];


//async thunk
const ENDPOINT = "https://jsonplaceholder.typicode.com/users"

export const getAllUsersThunk = createAsyncThunk(
    "users/getAll",
    async () => {
        const response = await fetch(ENDPOINT)
        const data = await response.json();
        return data.map((user: { id: any; email: any; name: any; }) => {
            return {id: user.id, email: user.email, name: user.name}
        }) as IUser[]
    }

)

/*
*
*   async (userId: number) => {
    const response = await fetch(`https://reqres.in/api/users/${userId}`)
    // Inferred return type: Promise<MyData>
    return (await response.json()) as MyData
  }
* */


export const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        addUser: (state, action: PayloadAction<IUser>) => {
            // state.push(action.payload)
            return state.concat(action.payload)
        },
        removeUser: (state, action: PayloadAction<IdType>) => {
             return state.filter(user => user.id !== action.payload)
        }
    },
    //thunk
    extraReducers: (builder) => {
        builder.addCase(getAllUsersThunk.fulfilled, (state, action:PayloadAction<IUser[]>) => {
            state.push(...action.payload)
        })
        builder.addCase(getAllUsersThunk.pending,(state, action) => {

        })
        builder.addCase(getAllUsersThunk.rejected, (state, action) => {

        })
    }
})

//export actions from userSlice
export const {removeUser, addUser} = userSlice.actions


//export selector
export const selectAppState = () => (state: RootState) => state.user


//export reducer to be use in the store
const userReducer = userSlice.reducer
export default userReducer




