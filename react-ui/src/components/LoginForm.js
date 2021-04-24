/* eslint-disable no-alert */
import { useState } from 'react';
import {
  Form,
  Button,
  Grid,
  Header,
  Message,
} from 'semantic-ui-react';
import loginService from '../services/loginService';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    loginService.login({ username, password })
      .then((user) => {
        window.localStorage.setItem('loggedUser', JSON.stringify(user));
        window.location.replace('/');
      })
      .catch(() => window.alert('Error logging in'));
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
              id='username'
              fluid icon='user'
              iconPosition='left'
              placeholder='Username'
              onChange={((event) => setUsername(event.target.value))}
            />
            <Form.Input
              id='password'
              fluid
              icon='lock'
              iconPosition='left'
              placeholder='Password'
              type='password'
              onChange={((event) => setPassword(event.target.value))}
            />
            <Button
              id='loginButton'
              color='blue'
              fluid
              size='large'
              type='submit'
              disabled={!(username && password)}
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
