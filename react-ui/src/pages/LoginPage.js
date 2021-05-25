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
import { useMutation } from '@apollo/client';
import img from '../style/header.jpg';
import { LOG_IN } from '../queries/login';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [login] = useMutation(LOG_IN);

  const handleSubmit = () => {
    login({ variables: { username, password } })
      .then((result) => {
        const token = JSON.stringify(result.data.login);
        window.localStorage.setItem('loggedUser', token);
        window.location.reload();
      })
      .catch((error) => {
        window.alert(error.message);
      });
  };

  return (
    <Grid
      textAlign='center'
      verticalAlign='middle'
    >
      <Grid.Row
        color='black'
        textAlign='center'
        style={{
          padding: '100px',
          backgroundImage: `url(${img})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: '100% 200%',
        }}
      >
        <Grid.Column width={16} textAlign='center'>
          <Header inverted style={{ fontSize: '40px' }}>
            <p>
              <Icon name='dollar sign' color='yellow' />
              <span>SIGN IN TO YOUR ACCOUNT</span>
              <span className="blinking">_</span>
            </p>
          </Header>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column
          width={16}
          style={{ maxWidth: '500px', marginTop: '200px' }}
        >
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
