/* eslint-disable no-alert */
import React, { useState } from 'react';
import {
  Form,
  Button,
  Grid,
  Header,
  Message,
  Icon,
} from 'semantic-ui-react';
import { useMutation } from '@apollo/client';
import img from '../style/header.jpg';
import { CREATE_NEW_USER } from '../queries/user';
import { LOG_IN } from '../queries/login';

const RegisterPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [createNewUser] = useMutation(CREATE_NEW_USER);
  const [login] = useMutation(LOG_IN);

  // eslint-disable-next-line arrow-body-style
  const validCredentials = () => {
    return email.length > 3
      && username.length > 3
      && password.length > 3
      && password === confirmPassword;
  };

  const handleSubmit = () => {
    createNewUser({ variables: { email, username, password } })
      .then(() => {
        login({ variables: { username, password } })
          .then((result) => {
            console.log('result = ', result);
            const token = JSON.stringify(result.data.login);
            window.localStorage.setItem('loggedUser', token);
            window.location.reload();
          })
          .catch((error) => {
            console.log('error = ', error);
            window.alert(error.message);
          });
      })
      .catch(() => window.alert('Error creating user'));
  };

  return (
    <Grid
      textAlign="center"
      verticalAlign="middle"
    >
      <Grid.Row
        color="black"
        textAlign="center"
        style={{
          padding: '100px',
          backgroundImage: `url(${img})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: '100% 200%',
        }}
      >
        <Grid.Column width={16} textAlign="center">
          <Header inverted style={{ fontSize: '40px' }}>
            <p>
              <Icon name="dollar" color="yellow" />
              <span>CREATE NEW ACCOUNT</span>
              <span className="blinking">_</span>
            </p>
          </Header>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column style={{ maxWidth: '500px', marginTop: '200px' }} width={16}>
          <Header as="h2" textAlign="left">
            Sign up
          </Header>
          <Form size="large" onSubmit={handleSubmit}>
            <Form.Input
              id="email"
              fluid
              icon="at"
              iconPosition="left"
              placeholder="Email"
              onChange={((event) => setEmail(event.target.value))}
            />
            <Form.Input
              id="username"
              fluid
              icon="user"
              iconPosition="left"
              placeholder="Username"
              onChange={((event) => setUsername(event.target.value))}
            />
            <Form.Input
              id="password"
              fluid
              icon="lock"
              iconPosition="left"
              placeholder="Password"
              type="password"
              onChange={((event) => setPassword(event.target.value))}
            />
            <Form.Input
              id="confirmPassword"
              fluid
              icon="lock"
              iconPosition="left"
              placeholder="Confirm Password"
              type="password"
              onChange={((event) => setConfirmPassword(event.target.value))}
            />
            <Button
              id="registerButton"
              color="blue"
              fluid
              size="large"
              type="submit"
              disabled={!validCredentials()}
            >
              Create Account
            </Button>
          </Form>
          <Message>
            Already have an account?
            <a href="/login"> Sign in here</a>
          </Message>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default RegisterPage;
