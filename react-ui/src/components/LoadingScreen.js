import { Loader } from 'semantic-ui-react';
import NavBar from './NavBar';

const LoadingScreen = () => (
  <div className="App">
    <NavBar />
    <Loader active size='big'>Loading</Loader>
  </div>
);

export default LoadingScreen;
