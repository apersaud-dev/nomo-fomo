import { BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import Home from './screens/Home';
import Profile from './screens/Profile';
import EditProfile from './screens/EditProfile';
import EditEvent from './screens/EditEvent';
import CreateEvent from './screens/CreateEvent';
import Map from './screens/Map';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact component={Home} />
          {/* <Route path="/login" component={Login} /> */}
          <Route path="/profile" component={Profile} />
          <Route path="/profile-edit" component={EditProfile} />
          <Route path="/edit/:eventId" component={EditEvent} />
          <Route path="/create-event" component={CreateEvent} />
          <Route path="/map" component={Map} />

          <Route render={() => <Redirect to={{ pathname: "/"}} />} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;

// Below post is about using .env variables in index.html
// https://github.com/facebook/create-react-app/issues/6152