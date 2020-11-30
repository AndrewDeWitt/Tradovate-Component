import React, { useState } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import './dataFieldSelector.css'
import Lock from '../../assets/lock.png'
import { useDispatch } from 'react-redux'
import { setAvailableColumns, setVisibleColumns, setLockedColumnCount } from '../../appReducer'

export default function DataFieldSelector({availableColumns,visibleColumns, lockedColumnCount}) {
  const dispatch = useDispatch()
  const [disableDrop, setDisableDrop] = useState(false)
  const grid = 8

  const checkLockedItem = (event) => {
    if(event.source.droppableId === 'droppable2' && event.source.index+1 <= lockedColumnCount){
      setDisableDrop(true)
    }else{
      setDisableDrop(false)
    }
    return false
  }

  const move = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source)
    const destClone = Array.from(destination)
    const [removed] = sourceClone.splice(droppableSource.index, 1)
    const result = {}

    if(droppableSource.droppableId === droppableDestination.droppableId){
      destClone.splice(droppableSource.index, 1)
      destClone.splice(droppableDestination.index, 0, removed)
      result.destination = destClone
    }else{
      destClone.splice(droppableDestination.index, 0, removed)
      result.source = sourceClone
      result.destination = destClone
    }

    return result
  }

  const getItemStyle = (isDragging, draggableStyle) => ({
      userSelect: 'none',
      padding: grid * 2,
      margin: `0 0 ${grid}px 0`,
      background: isDragging ? '#252a30' : '#101116',
      ...draggableStyle
  })
  
  const getListStyle = isDraggingOver => ({
      background: isDraggingOver ? '#101116' : '#101116',
      padding: grid,
      color: '#bcbfc6',
      overflowY: 'hidden',
      height:'100%'
  })

  const getList = id => {
    if(id === 'droppable'){
      return availableColumns
    }else{
      return visibleColumns
    }
  }

  const onDragEnd = result => {
      const { source, destination } = result

      // dropped outside the list
      if (!destination) {
        return
      }

      if (source.droppableId === destination.droppableId) {
          const result = move(
              getList(source.droppableId),
              getList(destination.droppableId),
              source,
              destination
          )
          if(destination.droppableId === 'droppable'){
            dispatch(setAvailableColumns(result.destination))
          }else{
            dispatch(setVisibleColumns(result.destination))
          }
      } else {
        const result = move(
          getList(source.droppableId),
          getList(destination.droppableId),
          source,
          destination
        )

        if(source.droppableId === "droppable"){
          dispatch(setAvailableColumns(result.source))
          dispatch(setVisibleColumns(result.destination))
        }else{
          dispatch(setVisibleColumns(result.source))
          dispatch(setAvailableColumns(result.destination))
        }
      }
  }

  const toggleLock = index => {
    if(lockedColumnCount === index+1){
      dispatch(setLockedColumnCount(index))
    }else if(index < lockedColumnCount){
      dispatch(setLockedColumnCount(index))
    }else if(lockedColumnCount > 0 && index === 0){
      dispatch(setLockedColumnCount(0))
    }else{
      dispatch(setLockedColumnCount(index+1))
    }
  }

  const saveEvent = (e) =>{
    let visibleColumnIds = []
    visibleColumns.forEach(column => {
      visibleColumnIds.push(column.id)
    })
    console.log(visibleColumnIds)
    console.log(lockedColumnCount)
  }

  return (
    <div className='data-field-selector-container'>
      <div className='title-container'>
        <div className='title'>Configure Data Fields</div>
        <div className='description'>Drag {'&'} drop between columns to configure visible data</div>
        <div className='close-icon'>X</div>
      </div>
      <div className='draggable-container'>
        <DragDropContext onDragStart={checkLockedItem} onDragEnd={onDragEnd}>
          <div className='column'>
            <div className='column-header'>Available</div>
            <Droppable droppableId="droppable" isDropDisabled={disableDrop}>
            {(provided, snapshot) => (
                <div
                    ref={provided.innerRef}
                    style={getListStyle(snapshot.isDraggingOver)}>
                    {availableColumns.map((item, index) => (
                        <Draggable
                            key={item.id}
                            draggableId={item.id}
                            index={index}>
                            {(provided, snapshot) => (
                                <div 
                                  className='drag-item'
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  style={getItemStyle(
                                      snapshot.isDragging,
                                      provided.draggableProps.style
                                  )}>
                                    {item.name}
                                </div>
                            )}
                        </Draggable>
                    ))}
                    {provided.placeholder}
                </div>
            )}
          </Droppable>
          </div>
          <div className='border-div'></div>
          <div className='column'>
            <div className='column-header'>Visible</div>
            <Droppable droppableId="droppable2" isDropDisabled={disableDrop}>
              {(provided, snapshot) => (
                  <div
                      ref={provided.innerRef}
                      style={getListStyle(snapshot.isDraggingOver)}>
                      {
                        visibleColumns.map((item, index) => 
                          (
                            <Draggable
                                key={item.id}
                                draggableId={item.id}
                                index={index}>
                                {(provided, snapshot) => (
                                    <div
                                      className={`drag-item${index+1 <= lockedColumnCount ? " lock":''}`}
                                      onDoubleClick={() => toggleLock(index)}
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      style={getItemStyle(
                                          snapshot.isDragging,
                                          provided.draggableProps.style
                                      )}>
                                        {index+1 <= lockedColumnCount && <img className='icon-lock' src={Lock} alt="lock"/>}
                                        {item.name}
                                    </div>
                                )}
                            </Draggable>
                          )
                        )
                      }
                      {provided.placeholder}
                  </div>
              )}
            </Droppable>
          </div>
        </DragDropContext>
      </div>

      <div className='button-container'>
        <button className='button' onClick={saveEvent}>Save</button>
        <button className='button cancel'>Cancel</button>
      </div>
    </div>
  )
}