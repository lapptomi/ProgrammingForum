import React from 'react';
import {
  Container,
  Grid, Header, Icon, Message,
} from 'semantic-ui-react';
import { useGlobalState } from '../state/state';
import '../style/ProfilePage.css';

const ProfilePage: React.FC = () => {
  const [state] = useGlobalState();

  return (
    <Grid textAlign="center" verticalAlign="middle">
      <Grid.Row id="profilepage-row-1">
        <Grid.Column width={16} textAlign="center">
          <Header id="profilepage-row-1-header">
            <p>
              <span id="profilepage-row-1-span">
                {state.loggedUser.username}
              </span>
              <span>@ProgrammingForum/users</span>
              <Icon name="dollar" color="yellow" />
              <span className="blinking">_</span>
            </p>
          </Header>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Container textAlign="center">
          <Message
            color="yellow"
            header="This page is still under construction..."
            size="massive"
            icon="wrench"
          />
        </Container>
      </Grid.Row>
    </Grid>
  );
};

export default ProfilePage;
