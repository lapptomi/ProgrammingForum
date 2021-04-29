/* eslint-disable no-console */
import { useEffect, useState } from 'react';
import {
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import CreatePostForm from './components/CreatePostForm';
import LoginForm from './components/LoginForm';
import NavBar from './components/NavBar';
import PostsList from './components/PostsList';
import RegisterForm from './components/RegisterForm';
import Post from './components/Post';
import postService from './services/postService';

const App = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    postService.getAll()
      .then((result) => setPosts(result))
      .catch((e) => console.log(e));
  }, []);

  const loggedUser = window.localStorage.getItem('loggedUser');

  return (
    <div className="App" style={{
      minWidth: '768px',
    }}>
      <NavBar />
      <Switch>
        <Route path="/posts/create">
          { loggedUser !== null ? <CreatePostForm /> : <Redirect to="/login" />}
        </Route>

        <Route path='/posts/:id'>
          <Post posts={posts} />
        </Route>

        <Route exact path="/login">
          { loggedUser !== null ? <Redirect to="/" /> : <LoginForm /> }
        </Route>

        <Route path="/register">
          { loggedUser !== null ? <Redirect to="/" /> : <RegisterForm /> }
        </Route>

        <Route path='/profile'>
          <h1>Profile page</h1>
        </Route>

        <Route path={['/', '/posts']}>
          <PostsList posts={posts} />
        </Route>
      </Switch>
    </div>
  );
};

export default App;
