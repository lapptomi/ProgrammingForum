import {
  Menu,
  Icon,
  Container,
  Button,
} from 'semantic-ui-react';

const NavBar = () => {
  const path = window.location.pathname;

  return (
    <Menu
      inverted
      size='large'
      style={{
        borderRadius: '0px',
      }}
    >
      <Container>
        <Menu.Item
          as='a'
          href='/'
          active={path === '/'}
        >
          <Icon name={'home'} /> Home
        </Menu.Item>

        <Menu.Item
          as='a'
          href={'/posts/create'}
          active={path === '/posts/create'}
        >
          <Icon name={'edit outline'} /> Create New Post
        </Menu.Item>

        <Menu.Item position='right'>
          <Button
            color='black'
            as='a'
            href={'/login'}
          >
            Sign in
          </Button>
          <Button
            color='black'
            as='a'
            href={'/register'}
            style={{ marginLeft: '0.5em' }}
          >
            Sign Up
          </Button>
        </Menu.Item>
      </Container>
    </Menu>
  );
};

export default NavBar;
