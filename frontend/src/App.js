
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import ProductList from "./components/ProductList/ProductList";
import Cart from "./components/Cart/Cart";
import Home from "./components/Home/Home"
import SubNavigation from "./components/SubNavigation/SubNavigation";
import CheckedOut from "./components/CheckedOut/CheckedOut";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);



  return (
    <>
    <div>
      <Navigation isLoaded={isLoaded} />

      <SubNavigation isLoaded={isLoaded} />

      {isLoaded && (
        <Switch>

          <Route exact path="/">
           <Home/>

          </Route>

          <Route exact path="/products">
            <ProductList />
          </Route>

          <Route exact path="/products/:productId">
            <ProductDetails />
          </Route>

          <Route path="/cart/:cartId">
            <Cart/>
          </Route>


          <Route path="/checkedOut">
            <CheckedOut/>
          </Route>

        </Switch>
      )}
      </div>

    </>
  );
}

export default App;
