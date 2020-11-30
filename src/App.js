import './App.css'
import DataFieldSelctor from './components/dataFieldSelector/dataFieldSelector'
import { useSelector } from 'react-redux'

function App() {
  const availableColumns = useSelector(state => state.app.availableColumns)
  const visibleColumns = useSelector(state => state.app.visibleColumns)
  const lockedColumnCount = useSelector(state => state.app.lockedColumnCount)

  return (
    <div className="App">
      <div className='component-container'>
        <DataFieldSelctor
          availableColumns={availableColumns} 
          visibleColumns={visibleColumns} 
          lockedColumnCount={lockedColumnCount}
        />
      </div>
    </div>
  )
}

export default App