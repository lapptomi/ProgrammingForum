import {
  Grid,
  Container,
  List,
  Header,
  Divider,
} from 'semantic-ui-react';

const Footer = () => (
  <Grid style={{ minWidth: '100%' }}>
    <Grid.Row
      color='black'
      style={{
        padding: '80px', marginTop: '200px',
      }}
    >
      <Grid.Column width={16}>

        <Container textAlign='center'>
          <Grid divided inverted>
            <Grid.Column width={16}>
              <Header inverted as='h2' content='Programming Forum' />
              <p>© 2021 All Rights Reserved</p>
            </Grid.Column>
          </Grid>

          <Divider inverted section />
          <List horizontal inverted link size='small'>
            <List.Item as='a' href='#'>
              Site Map
            </List.Item>
            <List.Item as='a' href='#'>
              Contact Us
            </List.Item>
            <List.Item as='a' href='#'>
              Terms and Conditions
            </List.Item>
            <List.Item as='a' href='#'>
              Privacy Policy
            </List.Item>
          </List>
        </Container>
      </Grid.Column>
    </Grid.Row>
  </Grid>

);

export default Footer;
