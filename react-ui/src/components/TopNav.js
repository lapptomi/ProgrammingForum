import {
  Menu, Button, Container, Grid, Header,
} from 'semantic-ui-react';

import { Link } from 'react-router-dom';
import { useGlobalState } from '../state/state';
import loginService from '../services/loginService';

const LoggedOutTopNav = () => (
  <Grid.Column width={16}>
    <Menu secondary>
      <Container>
        <Menu.Item position="left" active={false}>
          <Link to="/">
            <Button color="black">
              <Header inverted as="h3" content="<HOME />" />
            </Button>
          </Link>
        </Menu.Item>
        <Menu.Item position="right">
          <Link to="/login">
            <Button color="black">
              <Header inverted as="h3" content="LOG IN" />
            </Button>
          </Link>
        </Menu.Item>
        <Menu.Item>
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
        <Menu.Item>
          <Link to="/">
            <Button color="black" active={false}>
              <Header inverted as="h3" content="<HOME />" />
            </Button>
          </Link>
        </Menu.Item>
        <Menu.Item>
          <Link to="/posts/create">
            <Button color="black">
              <Header inverted as="h3" content="NEW POST " />
            </Button>
          </Link>
        </Menu.Item>
        <Menu.Item position="right">
          <Link to="/profile">
            <Button color="black">
              <Header inverted as="h3" content="PROFILE" />
            </Button>
          </Link>
        </Menu.Item>
        <Menu.Item>
          <Button
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

const TopNav = () => {
  const [state] = useGlobalState();

  return (
    <Grid>
      <Grid.Row color="black" style={{ padding: '15px' }}>
        {state.isLoggedIn
          ? <LoggedInTopNav />
          : <LoggedOutTopNav />
        }
      </Grid.Row>
    </Grid>
  );
};
export default TopNav;
