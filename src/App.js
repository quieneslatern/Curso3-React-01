import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {NavBar} from './views/NavBar';
import Page from './views/Page';  
import {Cities} from './views/Cities';  
import {Countries} from './views/Countries';
import {Companies} from './views/Companies';
import {NotFoundView} from './views/NotFoundView';

function App() {
  return (
    <div>
      <div className="container">
        <BrowserRouter>
          <NavBar/>
          <Switch>
            <Route path="/" exact component={Page} />
            <Route path="/cities" exact component={Cities} />
            <Route path="/countries" exact component={Countries} />
            <Route path="/companies" exact component={Companies} />
            <Route component={NotFoundView} />
          </Switch>
        </BrowserRouter>  
      </div>
    </div>
  );
} 

export default App;
