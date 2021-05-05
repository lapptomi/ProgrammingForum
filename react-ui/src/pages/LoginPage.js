/* eslint-disable no-alert */
import { useState } from 'react';
import {
  Form,
  Button,
  Grid,
  Header,
  Message,
  Icon,
} from 'semantic-ui-react';
import loginService from '../services/loginService';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    loginService.login({ username, password })
      .then((result) => {
        window.localStorage.setItem('loggedUser', JSON.stringify(result.data));
        window.location.replace('/');
      })
      .catch(({ response }) => {
        window.alert(JSON.stringify(response.data.error));
      });
  };

  return (
    <Grid
      textAlign='center'
      verticalAlign='middle'
    >

      <Grid.Row
        color='violet'
        textAlign='center'
        style={{ padding: '100px' }}
      >
        <Grid.Column width={16} textAlign='center'>
          <Header inverted style={{ fontSize: '48px' }}>
            <Icon name='code' /> Sign in to your account
          </Header>
        </Grid.Column>
      </Grid.Row>

      <Grid.Row>
        <Grid.Column style={{ maxWidth: '500px', marginTop: '100px' }} width={16}>
          <Header as='h2' textAlign='left'>
            Sign in
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

export default LoginPage;
