import React from 'react';
import {BrowserRouter, Route, Routes  } from 'react-router-dom';
import { connect } from "react-redux";

import './App.css';


import HomePage from './pages/homepage/homepage.component.jsx';
import ShopPage from './pages/shop/shop.component.jsx'
import Header from './components/header/header.component';
import SignInAndSignOutUpPage from './pages/sign-in-and-sign-out/sign-in-and-sign-up.component';

import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import { setCurrentUser } from './redux/user/user.actions';
import { onSnapshot } from "firebase/firestore";



class App extends React.Component {


  unsubscribeFromAuth = null;
  unsub = null;

  componentDidMount(){
    const {setCurrentUser} = this.props;

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {

      if(userAuth){
        const userRef = await createUserProfileDocument(userAuth);

        this.unsub = onSnapshot(userRef, (snapShot) => {
          //console.log("Current data: ", snapShot.data());
          //console.log("ID: ", snapShot.id);
          

          
          setCurrentUser({
            currentUser: {
              id: snapShot.id,
              ...snapShot.data()
            }
          }, () => {
            console.log("State: ", this.state);
          });
        });
        
      }

      setCurrentUser(userAuth);
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
    this.unsub();
  }

  render() {
    return (
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/signin" element={<SignInAndSignOutUpPage />} />
        </Routes>
      </BrowserRouter>
    );
  }
  
  
}

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(null, mapDispatchToProps)(App);
