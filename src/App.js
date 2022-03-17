import React from 'react';
import {BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { connect } from "react-redux";
import { createStructuredSelector } from 'reselect';

import './App.css';


import HomePage from './pages/homepage/homepage.component.jsx';
import ShopPage from './pages/shop/shop.component.jsx'
import Header from './components/header/header.component';
import SignInAndSignOutUpPage from './pages/sign-in-and-sign-out/sign-in-and-sign-up.component';
import CheckoutPage from './pages/checkout/checkout.component';

import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import { setCurrentUser } from './redux/user/user.actions';
import { selectCurrentUser } from './redux/user/user.selectors';

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
          <Route exact path="/checkout" element={<CheckoutPage />} />
          <Route path="/signin" element={
          <RequireAuth redirectTo="/" user={this.props.currentUser}>
            <SignInAndSignOutUpPage />
          </RequireAuth>
        } />
        </Routes>
      </BrowserRouter>
    );
  }
  
  
}

function RequireAuth({ children, redirectTo , user}) {
  return user ? <Navigate to={redirectTo}/> : children;
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(App);
