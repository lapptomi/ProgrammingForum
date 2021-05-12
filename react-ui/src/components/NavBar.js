import { Link } from 'react-router-dom';
import {
  Menu,
  Icon,
  Container,
  Grid,
} from 'semantic-ui-react';
import loginService from '../services/loginService';
import { useGlobalState } from '../state/state';

const LoggedOutNavBar = () => {
  const path = window.location.pathname;
  return (
    <Container>
      <Menu.Item active={path === '/'}>
        <Link to='/'>
          <Icon name='home' /> Home
        </Link>
      </Menu.Item>
      <Menu.Item
        id='navbarSignInButton'
        active={path === '/login'}
        position='right'
      >
        <Link to='/login'>
          <Icon name='sign in' /> Sign in
        </Link>
      </Menu.Item>
      <Menu.Item
        id='navbarSignUpButton'
        active={path === '/register'}
        style={{ marginLeft: '0.5em' }}
      >
        <Link to='/register'>
          <Icon name='signup' /> Sign up
        </Link>
      </Menu.Item>
    </Container>
  );
};

const LoggedInNavBar = () => {
  const path = window.location.pathname;
  return (
    <Container>
      <Menu.Item active={path === '/'}>
        <Link to='/'>
          <Icon name='home' /> Home
        </Link>
      </Menu.Item>
      <Menu.Item active={path === '/posts/create'}>
        <Link to='/posts/create'>
          <Icon name={'edit outline'} /> Create New Post
        </Link>
      </Menu.Item>
      <Menu.Item
        active={path === '/profile'}
        position='right'
      >
        <Link to='/profile'>
          <Icon name='user' /> Profile
        </Link>
      </Menu.Item>
      <Menu.Item
        id='navbarSignOutButton'
        onClick={() => loginService.logout()}
        style={{ marginLeft: '0.5em' }}
      >
        <Icon name='log out' /> Sign Out
      </Menu.Item>
    </Container>
  );
};

const NavBar = () => {
  const [state] = useGlobalState();

  return (
    <Grid>
      <Grid.Row>
        <Menu
          inverted
          size='large'
          style={{ borderRadius: '0px', minWidth: '100%' }}
        >
          {state.isLoggedIn
            ? <LoggedInNavBar />
            : <LoggedOutNavBar />
          }
        </Menu>
      </Grid.Row>
    </Grid>
  );
};

export default NavBar;
