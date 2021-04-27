/* eslint-disable no-console */
import { useEffect, useState } from 'react';
import {
  Switch,
  Route,
} from 'react-router-dom';
import CreatePostForm from './components/CreatePostForm';
import LoginForm from './components/LoginForm';
import NavBar from './components/NavBar';
import PostsList from './components/PostsList';
import RegisterForm from './components/RegisterForm';
import Post from './components/Post';
import postService from './services/postService';

const App = () => {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    postService.getAll()
      .then((result) => setPosts(result))
      .catch((e) => console.log(e));
  }, []);

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedUser');
    if (loggedUser) {
      setUser(loggedUser);
    }
  }, []);

  if (!user) {
    return (
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
          <Route path='/posts/:id'>
            <Post posts={posts} />
          </Route>
          <Route path={['/', '/posts']}>
            <h1>Posts</h1>
            <PostsList posts={posts} />
          </Route>
        </Switch>
      </div>
    );
  }

  return (
    <div className="App" style={{
      minWidth: '768px',
    }}>
      <NavBar />
      <Switch>
        <Route path="/posts/create">
          <CreatePostForm />
        </Route>
        <Route path='/profile'>
          <h1>Profile page</h1>
        </Route>
        <Route path='/posts/:id'>
          <Post posts={posts} />
        </Route>
        <Route path={['/', '/posts']}>
          <h1>Posts</h1>
          <PostsList posts={posts} />
        </Route>
      </Switch>
    </div>
  );
};

export default App;
