import React, {Component} from "react";
import {Switch, Route} from "react-router-dom";

//load navbar
import Navbar from "./component/Navbar";
import Modal from "./component/Modal";
import Toast from "./component/Toast";
//load halaman
import Profil from "./client/Profil";
import Register from "./page/Register";
import Login from "./page/Login";
import Products from "./page/Products";
import Produk from "./client/Produk";
import Cart from "./client/Cart";
import Checkout from "./client/Checkout";
import Order from "./page/Order";
import User from "./page/User";
import History from "./client/History";



class Main extends Component {
    render = () => {
        return(
           <Switch>
               {/* load component tiap halaman */}
            <Route path="/login" component={Login} />
            <Route exact path="/">
                 <Navbar />
                 <Produk />
                 </Route>

                 <Route path="/Products">
                 <Navbar />
                 <Products />
                 </Route>

                 <Route path="/user">
                 <Navbar />
                 <User />
                 </Route>

                 <Route path="/cart">
                 <Navbar />
                 <Cart />
                 </Route>

                 <Route path="/order">
                 <Navbar />
                 <Order />
                 </Route>

                 <Route path="/register">
                 <Navbar />
                 <Register />
                 </Route>

                 <Route path="/History">
                 <Navbar />
                 <History />
                 </Route>

                 <Route path="/profil">
                 <Navbar />
                 <Profil />
                 </Route>

                 <Route path="/checkout">
                 <Navbar />
                 <Checkout />
                 </Route>

               </Switch>
        );
    }
}
export default Main;
