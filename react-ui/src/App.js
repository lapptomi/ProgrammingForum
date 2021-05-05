/* eslint-disable no-console */
import { useEffect } from 'react';
import {
  Switch,
  Route,
  Redirect,
  useRouteMatch,
} from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import LoginPage from './pages/LoginPage';
import NavBar from './components/NavBar';
import Post from './pages/PostPage';
import postService from './services/postService';
import Footer from './components/Footer';
import { useGlobalState } from './state/state';
import { setLoading, setPostsList } from './state/reducer';
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import CreatePostPage from './pages/CreatePostPage';
import LoadingScreen from './components/LoadingScreen';

const App = () => {
  const [state, dispatch] = useGlobalState();

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

  if (state.isLoading) {
    return (
      <LoadingScreen />
    );
  }

  return (
    <div style={{ minWidth: '768px' }}>
      <NavBar />
      <div style={{
        minHeight: '1000px',
      }}>
        <Switch>
          <Route path="/posts/create">
            {state.isLoggedIn ? <CreatePostPage /> : <Redirect to="/login" />}
          </Route>

          <Route path='/posts/:id'>
            {post
              ? <Post post={post} />
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
            <h1>Profile page</h1>
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
