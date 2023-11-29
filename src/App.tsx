import './App.css'
import Chat from './components/Chat/Chat'
import Content from './components/Content/Content'

import { TutorProvider } from './TutorContext'

function App() {

  return (
      <TutorProvider>
        <Content/>
        <Chat/>
      </TutorProvider>
  )
}

export default App
