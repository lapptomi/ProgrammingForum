/* eslint-disable no-console */
import { useEffect, useState } from 'react';
import {
  Switch,
  Route,
  Redirect,
  useRouteMatch,
} from 'react-router-dom';
import {
  Container,
  Grid, Header, Icon, Loader,
} from 'semantic-ui-react';
import CreatePostForm from './components/CreatePostForm';
import LoginForm from './components/LoginForm';
import NavBar from './components/NavBar';
import PostsList from './components/PostsList';
import RegisterForm from './components/RegisterForm';
import Post from './components/Post';
import postService from './services/postService';
import Footer from './components/Footer';
import { useStateValue } from './state/state';

const App = () => {
  const [state, dispatch] = useStateValue();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    postService.getAll()
      .then((result) => {
        dispatch({ type: 'SET_POSTS_LIST', posts: result });
        setLoading(false);
      })
      .catch((e) => {
        setLoading(false);
        console.log(e);
      });
  }, [dispatch]);

  const match = useRouteMatch('/posts/:id');
  const post = match
    ? state.posts.find((p) => p.id === Number(match.params.id))
    : null;

  const loggedUser = window.localStorage.getItem('loggedUser');

  if (loading) {
    return (
      <div className="App">
        <NavBar />
        <Loader active size='big'>Loading</Loader>
      </div>
    );
  }

  return (
    <div className="App">
      <NavBar />
      <div style={{
        minWidth: '768px',
        minHeight: '100vh',
      }}>
        <Switch>
          <Route path="/posts/create">
            {loggedUser ? <CreatePostForm /> : <Redirect to="/login" />}
          </Route>

          <Route path='/posts/:id'>
            {post
              ? <Post post={post} />
              : <Container textAlign='center'><h1>404 - Not Found</h1></Container>
            }
          </Route>

          <Route exact path="/login">
            {loggedUser ? <Redirect to="/" /> : <LoginForm />}
          </Route>

          <Route path="/register">
            {loggedUser ? <Redirect to="/" /> : <RegisterForm />}
          </Route>

          <Route path='/profile'>
            <h1>Profile page</h1>
          </Route>

          <Route path={['/', '/posts']}>
            <Grid divided inverted stackable>
              <Grid.Row
                color='violet'
                textAlign='center'
                style={{ padding: '150px' }}
              >
                <Grid.Column width={16} textAlign='center'>
                  <Header
                    style={{ fontSize: '48px' }}
                    inverted
                  >
                    <Icon name='code' /> Programming Forum
                  </Header>
                  <Header
                    style={{ fontSize: '18px' }}
                    inverted
                    content='Your number #1 place for talking about coding related stuff!'
                  />
                </Grid.Column>
              </Grid.Row>
            </Grid>
            <PostsList />
          </Route>
        </Switch>
      </div>
      <Footer />
    </div>
  );
};

export default App;
