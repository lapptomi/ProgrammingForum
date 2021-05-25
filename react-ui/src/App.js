/* eslint-disable no-console */
import { useEffect } from 'react';
import {
  Switch,
  Route,
  Redirect,
  useRouteMatch,
} from 'react-router-dom';
import { Container, Loader } from 'semantic-ui-react';
import { useQuery } from '@apollo/client';
import LoginPage from './pages/LoginPage';
import PostPage from './pages/PostPage';
import postService from './services/postService';
import Footer from './components/Footer';
import { useGlobalState } from './state/state';
import { setLoading, setPostsList } from './state/reducer';
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import CreatePostPage from './pages/CreatePostPage';
import ProfilePage from './pages/ProfilePage';
import TopNav from './components/TopNav';
import { GET_ALL_POSTS } from './queries/post';

const App = () => {
  const [state, dispatch] = useGlobalState();
  const { loading, data } = useQuery(GET_ALL_POSTS);

  useEffect(() => {
    dispatch(setLoading(true));
    postService.getAll()
      .then((posts) => {
        dispatch(setPostsList(posts));
        dispatch(setLoading(false));
      })
      .catch((e) => {
        dispatch(setLoading(false));
        console.log(e);
      });
  }, [dispatch]);

  const match = useRouteMatch('/posts/:id');
  const post = match
    ? state.posts.find((p) => p.id === Number(match.params.id))
    : null;

  if (state.isLoading || loading) {
    return (
      <div>
        <TopNav />
        <Loader active />
      </div>
    );
  }

  const posts = data;
  console.log('POSTS = ', posts);

  return (
    <div style={{ minWidth: '768px' }}>
      <TopNav />
      <div style={{
        minHeight: '1000px',
      }}>
        <Switch>
          <Route path="/posts/create">
            {state.isLoggedIn ? <CreatePostPage /> : <Redirect to="/login" />}
          </Route>

          <Route path='/posts/:id'>
            {post
              ? <PostPage post={post} />
              : <Container textAlign='center'><h1>404 - Not Found</h1></Container>
            }
          </Route>

          <Route exact path="/login">
            {state.isLoggedIn ? <Redirect to="/" /> : <LoginPage />}
          </Route>

          <Route path="/register">
            {state.isLoggedIn ? <Redirect to="/" /> : <RegisterPage />}
          </Route>

          <Route path='/profile'>
            {state.isLoggedIn ? <ProfilePage /> : <LoginPage />}
          </Route>

          <Route path={['/', '/posts']}>
            <HomePage />
          </Route>
        </Switch>
      </div>
      <Footer />
    </div>
  );
};

export default App;
