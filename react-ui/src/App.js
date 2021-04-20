import {
  Switch,
  Route,
  BrowserRouter as Router,
} from 'react-router-dom';
import LoginForm from './components/LoginForm';
import NavBar from './components/NavBar';
import RegisterForm from './components/RegisterForm';

const App = () => (
  <Router>
    <div className="App" style={{
      minWidth: '768px',
    }}>
      <NavBar />
      <Switch>
        <Route path="/posts/create">
          <h1>Create Post page</h1>
        </Route>
        <Route path="/login">
          <LoginForm />
        </Route>
        <Route path="/register">
          <RegisterForm />
        </Route>
        <Route path="/">
          <h1>Home page</h1>
        </Route>
      </Switch>
    </div>
  </Router>
);

export default App;
