import {
  Switch,
  Route,
  BrowserRouter as Router,
} from 'react-router-dom';
import NavBar from './components/NavBar';

const App = () => (
  <Router>
    <div className="App">
      <NavBar />
      <Switch>
        <Route path="/posts/create">
          <h1>Create Post page</h1>
        </Route>
        <Route path="/login">
          <h1>Login page</h1>
        </Route>
        <Route path="/register">
          <h1>Register page</h1>
        </Route>
        <Route path="/">
          <h1>Home page</h1>
        </Route>
      </Switch>
    </div>
  </Router>
);

export default App;
