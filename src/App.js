import {Route, Switch} from 'react-router-dom'
import Home from './Components/Home'
import Header from './Components/Header'
import NotFound from './Components/NotFound'
import CourseItemDetails from './Components/CourseItemDetails'
import './App.css'

const App = () => (
  <>
    <Header />
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/courses/:id/" component={CourseItemDetails} />
      <Route component={NotFound} />
    </Switch>
  </>
)

export default App
