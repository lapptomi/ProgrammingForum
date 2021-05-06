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
import axios from 'axios';
import loginService from '../services/loginService';

const RegisterPage = () => {
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
    axios.post('/api/users', { email, username, password })
      .then(() => {
        loginService.login({ username, password })
          .then((result) => {
            window.localStorage.setItem('loggedUser', JSON.stringify(result.data));
            window.location.replace('/');
          })
          .catch(() => window.alert('Error logging in'));
      })
      .catch(() => window.alert('Error creating user'));
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
            <Icon name='code' /> Create a new account
          </Header>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column style={{ maxWidth: '500px', marginTop: '100px' }} width={16}>
          <Header as='h2' textAlign='left'>
            Sign up
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

export default RegisterPage;
