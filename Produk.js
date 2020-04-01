import React, {Component} from "react";
import axios from "axios";
import $ from "jquery";
import Modal from "../component/Modal";
import Toast from "../component/Toast";
import { Link } from 'react-router-dom';
import Slide1 from '../image/Slide1.jpg';
import Slide2 from '../image/Slide2.png';
import ProductsItem from "./ProductsItem";

class Produk extends Component {
  constructor(props){
      super(props);
      this.state = {
          products: [],
          find: "",
          filter:""
      }

        //jika tidak terdapat data token pada lokal storage
        // if(!localStorage.getItem("Token")){
        //     // direct ke halaman login
        //     window.location = "/login";
        // }
    }
    bind = (event) => {
        this.setState({[event.target.name] : event.target.value});
    }

    GetProducts = () => {
            let url = "http://localhost/toko_online/public/products"
            axios.get(url)
            .then(res => {
                this.setState({products: res.data.products})
            })
            .catch(error => {
                console.log(error)
            })
        }


    componentDidMount = () => {
      this.GetProducts();

    }
    Search = (event) => {
        if (event.keyCode === 13 ){
            // $("#loading").toast("show");
            let url = "http://localhost/toko_online/public/products";
            let form = new FormData();
            form.append("find",this.state.find);
            axios.post(url,form)
            .then(response => {
                $("#loading").toast("hide");
                this.setState({products: response.data.products});
            })
            .catch(error => {
                console.log(error);
            });
        }
    }
    render() {
      const renderData = this.state.products.map((item, id)=>{
            return (
                <ProductsItem item={item} key={id}/>
            )
        })
return (
<div className=" container">

<div className="row">
                <div className="col-lg-3">
                    <h1 className="my-4">MeMart</h1>
                        <input type="text" className="form-control" name="find" value={this.state.find} onChange={this.bind} onKeyUp={this.Search} required placeholder="Pencarian.." />
                        <hr></hr>
                        {/*<h4>Kategori</h4>
                        <form onSubmit={this.Filter}>
                          <div className="form-group">
                                <select className="form-control" name="filter" value={this.state.value} onChange={this.bind} >
                                    <option value="">Choose...</option>
                                    <option value="sepatu">Elektronik</option>
                                    <option value="topi">Fashion</option>
                                    <option value="kaos">Accesories</option>
                                </select>
                            </div>
                            <button type="submit" className="btn btn-info pull-right m-2">
                                Filter
                            </button>
                        </form>*/}
                        <Link to="/Checkout">
                            <button className="btn btn-success float-right">
                                <span className="fa fa-check"></span> Checkout
                            </button>
                        </Link>
                        <Link to="/Cart">
                            <button className="btn btn-primary float-right" style={{  marginRight: "10px" }}>
                                <span className="fa fa-cart-plus"></span> View Cart
                            </button>
                        </Link><br/><br/><br/>
                </div>
                <div className="col-lg-9">
                    <div id="slideshow" className="carousel slide my-4" data-ride="carousel">
                        <ol className="carousel-indicators">
                            <li data-target="#slideshow" data-slide-to="0" className="active"></li>
                            <li data-target="#slideshow" data-slide-to="1"></li>
                        </ol>
                        <div className="carousel-inner" role="listbox">
                                 <div className="carousel-item active">
                                     <img className="d-block img-fluid" src={Slide1} alt="First slide" />
                                 </div>
                                 <div className="carousel-item">
                                     <img className="d-block img-fluid" src={Slide2} alt="Second slide" />
                                 </div>
                             </div>
                        <a className="carousel-control-prev" href="#slideshow" role="button" data-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="sr-only">Previous</span>
                        </a>
                        <a className="carousel-control-next" href="#slideshow" role="button" data-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="sr-only">Next</span>
                        </a>
                    </div>

                    <div className="row">
                        {renderData}

                    </div>
                </div>
            </div>

</div>
      );
  }
}

export default Produk
