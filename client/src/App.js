import { BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import Home from './screens/Home';
import Login from './screens/Login';
import Profile from './screens/Profile';
import EditProfile from './screens/EditProfile';

function App() {
  return (
    <div className="App">
      <Router>
        {/* <Header /> */}
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/profile" component={Profile} />
          <Route path="/profile-edit" component={EditProfile} />
          {/* <Route path="/edit-event" component={EditEvent} /> */}
          {/*<Route path="create-event" component={CreateEvent} /> */}
          {/* <Route path="/map" component={Map} /> */}

          <Route render={() => <Redirect to={{ pathname: "/"}} />} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
