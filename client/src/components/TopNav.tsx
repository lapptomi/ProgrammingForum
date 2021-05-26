import {
  Menu, Button, Container, Grid, Header,
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import React from 'react';
import { useGlobalState } from '../state/state';
import loginService from '../services/loginService';

const LoggedOutTopNav: React.FC = () => (
  <Grid.Column width={16}>
    <Menu secondary>
      <Container>
        <Menu.Item
          id="navbarHomeButton"
          position="left"
        >
          <Link to="/">
            <Button color="black">
              <Header inverted as="h3" content="<HOME />" />
            </Button>
          </Link>
        </Menu.Item>
        <Menu.Item
          id="navbarSignInButton"
          position="right"
        >
          <Link to="/login">
            <Button color="black">
              <Header inverted as="h3" content="LOG IN" />
            </Button>
          </Link>
        </Menu.Item>
        <Menu.Item id="navbarSignUpButton">
          <Link to="/register">
            <Button color="black">
              <Header inverted as="h3" content="SIGN UP" />
            </Button>
          </Link>
        </Menu.Item>
      </Container>
    </Menu>
  </Grid.Column>
);

const LoggedInTopNav = () => (
  <Grid.Column width={16}>
    <Menu secondary>
      <Container>
        <Menu.Item id="navbarHomeButton">
          <Link to="/">
            <Button color="black" active={false}>
              <Header inverted as="h3" content="<HOME />" />
            </Button>
          </Link>
        </Menu.Item>
        <Menu.Item id="navbarNewPostButton">
          <Link to="/posts/create">
            <Button color="black">
              <Header inverted as="h3" content="CREATE NEW POST " />
            </Button>
          </Link>
        </Menu.Item>
        <Menu.Item
          id="navbarProfileButton"
          position="right"
        >
          <Link to="/profile">
            <Button color="black">
              <Header inverted as="h3" content="PROFILE" />
            </Button>
          </Link>
        </Menu.Item>
        <Menu.Item>
          <Button
            id="navbarSignOutButton"
            color="black"
            onClick={() => loginService.logout()}
          >
            <Header inverted as="h3" content="LOG OUT" />
          </Button>
        </Menu.Item>
      </Container>
    </Menu>
  </Grid.Column>
);

const TopNav: React.FC = () => {
  const [state] = useGlobalState();

  return (
    <Grid>
      <Grid.Row color="black" style={{ padding: '15px' }}>
        {state.isLoggedIn
          ? <LoggedInTopNav />
          : <LoggedOutTopNav />}
      </Grid.Row>
    </Grid>
  );
};
export default TopNav;
