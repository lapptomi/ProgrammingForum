// eslint-disable-next-line no-use-before-define
import React from 'react';
import {
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import PostPage from './pages/PostPage';
import Footer from './components/Footer';
import { useGlobalState } from './state/state';
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import CreatePostPage from './pages/CreatePostPage';
import ProfilePage from './pages/ProfilePage';
import TopNav from './components/TopNav';
import Loading from './components/Loading';

const App: React.FC = () => {
  const [state] = useGlobalState();

  if (state.isLoading) {
    return <Loading />;
  }

  return (
    <div style={{ minWidth: '768px' }}>
      <TopNav />
      <div style={{ minHeight: '1000px' }}>
        <Switch>
          <Route path="/posts/create">
            {state.isLoggedIn ? <CreatePostPage /> : <Redirect to="/login" />}
          </Route>

          <Route path="/posts/:id">
            <PostPage />
          </Route>

          <Route path="/login">
            {state.isLoggedIn ? <Redirect to="/" /> : <LoginPage />}
          </Route>

          <Route path="/register">
            {state.isLoggedIn ? <Redirect to="/" /> : <RegisterPage />}
          </Route>

          <Route path="/profile">
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
