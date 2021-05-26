/* eslint-disable no-alert */
import React, { useState } from 'react';
import {
  Form, Grid, Header, Container, Segment,
} from 'semantic-ui-react';
import { useMutation } from '@apollo/client';
import img from '../style/header.jpg';
import { CREATE_NEW_POST } from '../queries/post';

const CreatePostPage: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const [createNewPost] = useMutation(CREATE_NEW_POST);

  const handleSubmit = () => {
    createNewPost({ variables: { title, description } })
      .then(() => {
        setTitle('');
        setDescription('');
        window.alert('Post created!');
        window.location.replace('/');
      })
      .catch((error) => {
        window.alert(error);
      });
  };

  const confirmCancel = () => {
    if (window.confirm('Are you sure you want to discard changes?')) {
      setTitle('');
      setDescription('');
    }
  };

  return (
    <Grid centered>
      <Grid.Row
        color="violet"
        textAlign="center"
        style={{
          padding: '100px',
          backgroundImage: `url(${img})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: '100% 200%',
        }}
      >
        <Grid.Column width={16} textAlign="center">
          <Header inverted style={{ fontSize: '46px' }}>
            <p>
              <span>CREATE NEW POST</span>
              <span className="blinking">_</span>
            </p>
          </Header>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row style={{ padding: '50px' }}>
        <Grid.Column width={16}>
          <Container>
            <Header as="h2" textAlign="left">
              Create Post
            </Header>
            <Segment>
              <Form>
                <Form.Input
                  id="title"
                  fluid
                  label="Title"
                  placeholder="Title"
                  value={title}
                  onChange={((event) => setTitle(event.target.value))}
                />
                <Form.TextArea
                  id="description"
                  style={{ minHeight: '150px' }}
                  label="Description"
                  placeholder="Description..."
                  value={description}
                  onChange={((event) => setDescription(event.target.value))}
                />
                <Form.Group>
                  <Form.Button
                    id="createPostButton"
                    primary
                    disabled={title.length < 4 || description.length < 4}
                    onClick={handleSubmit}
                  >
                    Create
                  </Form.Button>
                  <Form.Button
                    id="cancelButton"
                    disabled={!title || !description}
                    onClick={confirmCancel}
                  >
                    Cancel
                  </Form.Button>
                </Form.Group>
              </Form>
            </Segment>
          </Container>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default CreatePostPage;
