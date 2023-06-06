
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import { useHistory } from "react-router-dom";
import Navigation from "./components/Navigation";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import ProductList from "./components/ProductList/ProductList";
import Cart from "./components/Cart/Cart";


function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  const history = useHistory()
  const redirectToProduct = () => {
    history.push('/products')
  }

  return (
    <>
    <div>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>

          <Route exact path="/">
          <div className="imageContainer">
      <img className = "homeimage" src="https://images.unsplash.com/photo-1529669851596-ba9a5549af95?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1932&q=80"
     alt = "homepage"  />

     <div className="imageTextContainer">
     <div className="imageText" > Buy, sell, and discover  </div>
     <div className="imageText2" >Snowboards Skis Accessories & More </div>
      <button className="getstartedbtn"onClick={redirectToProduct} > Buy Now</button>
      </div>

      </div>

          </Route>

          <Route exact path="/products">
            <ProductList />
          </Route>

          <Route exact path="/products/:productId">
            <ProductDetails />
          </Route>

          <Route path="/cart">
            <Cart/>
          </Route>

        </Switch>
      )}
      </div>

    </>
  );
}

export default App;
