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
import PostsList from './components/PostsList';
import RegisterForm from './components/RegisterForm';

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedUser');
    if (loggedUser) {
      setUser(loggedUser);
    }
  }, []);

  if (!user) {
    return (
      <Router>
        <div className="App" style={{
          minWidth: '768px',
        }}>
          <NavBar />
          <Switch>
            <Route path="/login">
              <LoginForm />
            </Route>
            <Route path="/register">
              <RegisterForm />
            </Route>
            <Route path="/">
              <h1>Logged Out Home page</h1>
              <PostsList />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }

  return (
    <Router>
      <div className="App" style={{
        minWidth: '768px',
      }}>
        <NavBar />
        <Switch>
          <Route path="/posts/create">
            <CreatePostForm />
          </Route>
          <Route path="/profile">
            <h1>Profile page</h1>
          </Route>
          <Route path="/">
            <h1>Logged In Home page</h1>
            <PostsList />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
