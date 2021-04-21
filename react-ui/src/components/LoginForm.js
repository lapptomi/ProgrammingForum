/* eslint-disable no-alert */
import { useState } from 'react';
import {
  Form,
  Button,
  Grid,
  Header,
  Message,
} from 'semantic-ui-react';
import loginService from '../services/loginservice';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    loginService.login({ username, password })
      .then((user) => {
        window.localStorage.setItem('loggedUser', JSON.stringify(user));
        window.location.replace('/');
      })
      .catch((error) => window.alert(error));
  };

  return (
    <Grid
      textAlign='center'
      style={{ minHeight: '100vh', margin: 0 }}
      verticalAlign='middle'
    >
      <Grid.Row>
        <Grid.Column style={{ maxWidth: 450 }} width={16}>
          <Header as='h2' textAlign='center'>
            Sign in to your account
          </Header>
          <Form size='large' onSubmit={handleSubmit}>
            <Form.Input
              fluid icon='user'
              iconPosition='left'
              placeholder='Username'
              onChange={(({ target }) => setUsername(target.value))}
            />
            <Form.Input
              fluid
              icon='lock'
              iconPosition='left'
              placeholder='Password'
              type='password'
              onChange={(({ target }) => setPassword(target.value))}
            />
            <Button
              color='blue'
              fluid
              size='large'
              type='submit'
              disabled={!username || !password}
            >
              Sign in
            </Button>
          </Form>
          <Message>
            Don&apos;t have an account yet?
            <a href='/register'> Sign up here</a>
          </Message>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default LoginForm;
