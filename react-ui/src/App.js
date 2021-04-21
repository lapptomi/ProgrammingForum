/* eslint-disable arrow-body-style */
import { useEffect, useState } from 'react';
import {
  Switch,
  Route,
  BrowserRouter as Router,
} from 'react-router-dom';
import CreatePostForm from './components/CreatePostForm';
import LoginForm from './components/LoginForm';
import NavBar from './components/NavBar';
import RegisterForm from './components/RegisterForm';

const LoggedInRoutes = () => {
  return (
    <Switch>
      <Route path="/posts/create">
        <CreatePostForm />
      </Route>
      <Route path="/profile">
        <h1>Profile page</h1>
      </Route>
      <Route path="/">
        <h1>Logged In Home page</h1>
      </Route>
    </Switch>
  );
};

const LoggedOutRoutes = () => {
  return (
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
        <h1>Logged Out Home page</h1>
      </Route>
    </Switch>
  );
};

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedUser');
    if (loggedUser) {
      setUser(loggedUser);
    }
  }, []);

  return (
    <Router>
      <div className="App" style={{
        minWidth: '768px',
      }}>
        <NavBar />
        {user === null
          // Use different routes if user is logged in
          ? <LoggedOutRoutes />
          : <LoggedInRoutes />
        }
      </div>
    </Router>
  );
};

export default App;
