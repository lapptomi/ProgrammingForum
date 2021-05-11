import {
  Menu,
  Icon,
  Container,
  Button,
  Grid,
} from 'semantic-ui-react';
import loginService from '../services/loginService';
import { useGlobalState } from '../state/state';

const LoggedOutNavBar = () => {
  const path = window.location.pathname;
  return (
    <Container>
      <Menu.Item
        as='a'
        href='/'
        active={path === '/'}
      >
        <Icon name={'home'} /> Home
      </Menu.Item>
      <Menu.Item position='right'>
        <Button
          id='navbarSignInButton'
          color='black'
          as='a'
          href={'/login'}
        >
          Sign in
        </Button>
        <Button
          id='navbarSignUpButton'
          color='black'
          as='a'
          href={'/register'}
          style={{ marginLeft: '0.5em' }}
        >
          Sign up
        </Button>
      </Menu.Item>
    </Container>
  );
};

const LoggedInNavBar = () => {
  const path = window.location.pathname;
  return (
    <Container>
      <Menu.Item
        as='a'
        href='/'
        active={path === '/'}
      >
        <Icon name='home' /> Home
      </Menu.Item>
      <Menu.Item
        as='a'
        href='/posts/create'
        active={path === '/posts/create'}
      >
        <Icon name={'edit outline'} /> Create New Post
      </Menu.Item>
      <Menu.Item position='right'>
        <Button
          color='black'
          as='a'
          href='/profile'
        >
          Profile
        </Button>
        <Button
          id='navbarSignOutButton'
          color='black'
          as='a'
          onClick={() => loginService.logout()}
          style={{ marginLeft: '0.5em' }}
        >
          Sign Out
        </Button>
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
          style={{ borderRadius: '0px', minWidth: '100%' }}>
          { state.isLoggedIn ? <LoggedInNavBar /> : <LoggedOutNavBar /> }
        </Menu>
      </Grid.Row>
    </Grid>
  );
};

export default NavBar;
