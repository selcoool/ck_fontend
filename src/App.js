import logo from './logo.svg';
import './App.css';

import config_router from './routes/config_router';

function App() {
   const routes=config_router();
  return (

    routes
  );
}

export default App;
