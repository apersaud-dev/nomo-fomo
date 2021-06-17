import { BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import Home from './screens/Home';
import Login from './screens/Login';
import Profile from './screens/Profile';

function App() {
  return (
    <div className="App">
      <Router>
        {/* <Header /> */}
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/profile" component={Profile} />
          {/* <Route path="/map" component={} /> */}

          <Route render={() => <Redirect to={{ pathname: "/"}} />} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
