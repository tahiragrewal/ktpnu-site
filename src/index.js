import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MemberPage from "./Components/Portal/MemberPage2";
import MemberLogin from "./Components/Portal/GoogleRedirect";
import SignUp from "./Components/Portal/SignUp";
import NewUser from "./Components/Portal/NewUser";
import NewUserCont from "./Components/Portal/NewUserCont";

import Hero from "./Components/Landing/Hero";
import Header from "./Components/Landing/Header";
import Team from "./Components/Landing/Team";
import FAQs from "./Components/Landing/FAQs";
import Footer from "./Components/Landing/Footer";
import PortalAdvertisement from "./Components/Landing/PortalAdvertisement";
import Pillars from "./Components/Landing/Pillars";
import Greeting from './Components/Landing/Greeting';

import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/functions";
import { getDatabase } from "firebase/database";
import RushEvents from "./Components/Landing/RushEvents";
import { getStorage } from "firebase/storage";

import portalimg from "./Components/Landing/images/portal.png";

const firebaseConfig = {
  apiKey: "AIzaSyBY_olTq-IJkQs1-VXTCgxIUzlD7_-3MXQ",
  authDomain: "ktp-site.firebaseapp.com",
  projectId: "ktp-site",
  storageBucket: "ktp-site.appspot.com",
  messagingSenderId: "239929865580",
  appId: "1:239929865580:web:8871c4295a78dc93076f49",
  measurementId: "G-K67BS563H9",
  databaseURL: "https://ktp-site-default-rtdb.firebaseio.com/",
};

const app = firebase.initializeApp(firebaseConfig);
var provider = new firebase.auth.GoogleAuthProvider();
provider.addScope("https://www.googleapis.com/auth/userinfo.profile");
//firebase.functions().useEmulator("localhost", 5001);
const database = getDatabase(app);
var storage = getStorage(app);

class Full extends React.Component {
  render() {
    return (
      <Router>
        <Routes>
          <Route
            exact
            path="/"
            element={
              <div>
                <Header firebase={firebase} />
                <Hero />
                <Greeting /> {/**/}
                <Pillars />
                <RushEvents />
                <PortalAdvertisement ig={portalimg} />
                <Team />
                <FAQs />
                <Footer />
              </div>
            }
          ></Route>
          <Route
            path="/member"
            element={<MemberPage firebase={firebase} database={database} storage={storage}/>}
          ></Route>
          <Route
            path="/login"
            element={
              <MemberLogin
                firebase={firebase}
                provider={provider}
                database={database}
                storage={storage}
              />
            }
          ></Route>
          <Route
            path="/signup"
            element={<SignUp firebase={firebase} database={database} provider={provider} />}
          ></Route>

          <Route
            path="/newuser"
            element={
              <NewUserCont
                firebase={firebase}
                provider={provider}
                database={database}
                storage={storage}
              />
            }
          ></Route>
        </Routes>
      </Router>
    );
  }
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Full />);
