/* eslint-disable no-alert */
import { useState } from 'react';
import {
  Form, Grid, Header, Icon, Container, Segment,
} from 'semantic-ui-react';
import postService from '../services/postService';

const CreatePostPage = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = () => {
    postService.create({ title, description })
      .then(() => {
        window.alert('Post created!');
        window.location.replace('/posts');
      })
      .catch(({ response }) => {
        if (response.data === 'jwt expired') {
          window.alert('Error: session has expired, please sign in again');
          window.localStorage.clear();
          window.location.replace('/login');
        } else {
          window.alert(`Error creating post: ${response.data}`);
        }
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
        color='violet'
        textAlign='center'
        style={{ padding: '100px' }}
      >
        <Grid.Column width={16} textAlign='center'>
          <Header inverted style={{ fontSize: '48px' }}>
            <Icon name='code' /> Create A New Post
          </Header>
        </Grid.Column>
      </Grid.Row>

      <Grid.Row style={{ padding: '50px' }}>
        <Grid.Column width={16}>
          <Container>
            <Header as='h2' textAlign='left'>
              Create Post
            </Header>
            <Segment>
              <Form>
                <Form.Input
                  id='title'
                  fluid
                  label='Title'
                  placeholder='Title'
                  value={title}
                  onChange={((event) => setTitle(event.target.value))}
                />
                <Form.TextArea
                  id='description'
                  style={{ minHeight: '150px' }}
                  label='Description'
                  placeholder='Description...'
                  value={description}
                  onChange={((event) => setDescription(event.target.value))}
                />
                <Form.Group>
                  <Form.Button
                    id='createPostButton'
                    primary
                    disabled={title.length < 4 || description.length < 4}
                    onClick={handleSubmit}
                  >
                    Create
                  </Form.Button>
                  <Form.Button
                    id='cancelButton'
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
