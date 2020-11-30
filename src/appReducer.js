import { createSlice } from '@reduxjs/toolkit'

export const appReducer = createSlice({
  name: 'app',
  initialState: {
    availableColumns: [
        { id:"startTime", name:"Start Time" },
        { id:"stopTime", name:"Stop Time" },
        { id:"perPoint", name:"Per Point" },
        { id:"initialMargin", name:"Initial Margin" }
    ],
    visibleColumns: [
        { id:"changePercent", name:"Change %" },
        { id:"change", name:"Change" },
        { id:"last", name:"Last" },
        { id:"lastVolume", name:"Last Volume" },
        { id:"bid", name:"Bid" },
        { id:"bidSize", name:"Bid Size" },
        { id:"ask", name:"Ask" },
        { id:"askSize", name:"Ask Size" },
        { id:"totalVolume", name:"Total Volume" },
        { id:"high", name:"High" },
        { id:"low", name:"Low" }

    ],
    lockedColumnCount:0
  },
  reducers: {
    setAvailableColumns: (state, action) => {
        state.availableColumns = action.payload
    },
    setVisibleColumns: (state, action) => {
        state.visibleColumns = action.payload
    },
    setLockedColumnCount: (state, action) => {
        state.lockedColumnCount = action.payload
    }
  }
})
export const { setAvailableColumns, setVisibleColumns, setLockedColumnCount } = appReducer.actions

export default appReducer.reducer
