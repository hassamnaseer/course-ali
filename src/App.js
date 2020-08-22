import './index.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';

// import ReactGa from "react-ga";
import React, { useEffect } from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import HomePage from './components/Homepage/Homepage';
import Footer from "./components/Footer/Footer";
import ErrorPage from "./components/ErrorPage/ErrorPage";
import ContactPage from "./components/ContactPage/ContactPage";
import CourseDetails from "./components/CourseDetails/CourseDetails"
import { pageview } from "./analytics/analytics";

export default function App() {
  useEffect(() => {
    pageview()
  }, []);

    return (
        <div className="main-container">
            <Router>
                <React.Fragment>
                    <Switch>
                        <Route path="/contactus" exact={true} component={ContactPage}/>
                        <Route path="/landing/:pageId" exact={true} component={HomePage}/>
                        <Route path="/home" exact={true} component={HomePage}/>
                        <Route path="/" exact={true} component={HomePage}/>
                        <Route path="/course-details/:courseId" exact={true} component={CourseDetails}/>
                        <Route path="/course/:courseName/id/:courseId" exact={true} component={CourseDetails}/>
                        <Route path="/error" exact={true} component={ErrorPage}/>
                        <Route component={ErrorPage}/>
                    </Switch>
                </React.Fragment>
            </Router>
            <Footer/>
        </div>
    );
}
