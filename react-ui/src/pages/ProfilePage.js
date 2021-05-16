import {
  Grid, Header, Icon,
} from 'semantic-ui-react';
import { useGlobalState } from '../state/state';

const ProfilePage = () => {
  const [state] = useGlobalState();

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
            <Icon name='code' /> Profile of {state.loggedUser.username}
          </Header>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default ProfilePage;
