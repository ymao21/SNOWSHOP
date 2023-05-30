
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import { useHistory } from "react-router-dom";
import Navigation from "./components/Navigation";
import LoginFormPage from "./components/LoginFormPage/index";
import SignupFormPage from "./components/SignupFormPage";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import ProductList from "./components/ProductList/ProductList";
import CreateProductForm from "./components/ProductForm/CreateProductForm";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  // const history = useHistory()
  // const redirectToSongs = () => {
  //   history.push('/products')
  // }

  return (
    <>
    <div>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>

          <Route exact path="/">
            <>HOME page</>
          </Route>

          <Route path="/login">
            <LoginFormPage />
          </Route>

          <Route path="/signup">
            <SignupFormPage />
          </Route>

          <Route exact path="/products">
            <ProductList />
          </Route>

          <Route exact path="/products/:productId">
            <ProductDetails />
            <CreateProductForm/>
          </Route>

        </Switch>
      )}
      </div>

    </>
  );
}

export default App;
