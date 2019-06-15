import React from "react";
import { StripeProvider } from "react-stripe-elements";
import MyStoreCheckout from "./components/MyStoreCheckout";
import "./App.css";

function App() {
  return (
    <div className="App">
      <StripeProvider apiKey="pk_live_XZZtUY2XyXRUX5BeNRyu8UvC00OZiKgkGz">
        <MyStoreCheckout />
      </StripeProvider>
    </div>
  );
}

export default App;
