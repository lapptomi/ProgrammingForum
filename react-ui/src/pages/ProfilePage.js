import {
  Grid, Header, Icon,
} from 'semantic-ui-react';
import { useGlobalState } from '../state/state';
import img from '../style/header.jpg';

const ProfilePage = () => {
  const [state] = useGlobalState();

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
          <Header inverted style={{ fontSize: '36px' }}>
            <p>
              <span style={{
                color: 'yellowgreen',
                fontSize: '50px',
              }}>
                {state.loggedUser.username}
              </span>
              <span>@ProgrammingForum/users</span>
              <Icon name='dollar' color='yellow' />
              <span className="blinking">_</span>
            </p>
          </Header>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default ProfilePage;
