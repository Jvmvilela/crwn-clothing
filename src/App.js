import React from 'react';
import {BrowserRouter, Route, Routes  } from 'react-router-dom';

import './App.css';


import HomePage from './pages/homepage/homepage.component.jsx';
import ShopPage from './pages/shop/shop.component.jsx'
import Header from './components/header/header.component';
import SignInAndSignOutUpPage from './pages/sign-in-and-sign-out/sign-in-and-sign-up.component';

import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import { onSnapshot } from "firebase/firestore";



class App extends React.Component {

  constructor(){
    super();

    this.state = {
      currentUser: null
    }
  }

  unsubscribeFromAuth = null;
  unsub = null;

  componentDidMount(){
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {

      if(userAuth){
        const userRef = await createUserProfileDocument(userAuth);

        this.unsub = onSnapshot(userRef, (snapShot) => {
          //console.log("Current data: ", snapShot.data());
          //console.log("ID: ", snapShot.id);
          
          this.setState({
            currentUser: {
              id: snapShot.id,
              ...snapShot.data()
            }
          }, () => {
            console.log("State: ", this.state);
          });
        });
        
      }

      this.setState({ currentUser: userAuth });
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
    this.unsub();
  }

  render() {
    return (
      <BrowserRouter>
        <Header currentUser={this.state.currentUser} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/signin" element={<SignInAndSignOutUpPage />} />
        </Routes>
      </BrowserRouter>
    );
  }
  
  
}

export default App;
