/* eslint-disable no-alert */
import { useState } from 'react';
import {
  Form,
  Button,
  Grid,
  Header,
  Message,
} from 'semantic-ui-react';
import axios from 'axios';
import loginService from '../services/loginService';

const RegisterForm = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // eslint-disable-next-line arrow-body-style
  const validCredentials = () => {
    return email.length > 3
      && username.length > 3
      && password.length > 3
      && password === confirmPassword;
  };

  const handleSubmit = () => {
    const newUser = { email, username, password };

    axios.post('/api/users', newUser)
      .then(() => {
        loginService.login({ username, password })
          .then((user) => {
            window.localStorage.setItem('loggedUser', JSON.stringify(user));
            window.location.replace('/');
          })
          .catch(() => window.alert('Error logging in'));
      })
      .catch(() => window.alert('Error creating user'));
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
            Create new account
          </Header>
          <Form size='large' onSubmit={handleSubmit}>
            <Form.Input
              id='email'
              fluid
              icon='at'
              iconPosition='left'
              placeholder='Email'
              onChange={((event) => setEmail(event.target.value))}
            />
            <Form.Input
              id='username'
              fluid
              icon='user'
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
            <Form.Input
              id='confirmPassword'
              fluid
              icon='lock'
              iconPosition='left'
              placeholder='Confirm Password'
              type='password'
              onChange={((event) => setConfirmPassword(event.target.value))}
            />
            <Button
              id='registerButton'
              color='blue'
              fluid
              size='large'
              type='submit'
              disabled={!validCredentials()}
            >
              Create Account
            </Button>
          </Form>
          <Message>
            Already have an account?
            <a href='/login'> Sign in here</a>
          </Message>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default RegisterForm;
