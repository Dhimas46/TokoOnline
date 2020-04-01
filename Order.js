import React, {Component} from "react";
import axios from "axios";
import $ from "jquery";
import Modal from "../component/Modal";
import Toast from "../component/Toast";


class Order extends Component {
    constructor() {
        super();
        this.state = {
            order: [],
            id: "",
            id_alamat: "",
            id_user: 0,
            total: "",
            bukti: null,
            status: "",
            action:"",
            find:"",
            message:""
        }
        //jika tidak terdapat data token pada lokal storage
         if(!localStorage.getItem("Token")){
            // direct ke halaman login
           window.location = "/login";
       }
    }
    bind = (event) => {
        this.setState({[event.target.name] : event.target.value});
    }

    bindImage = (e) => {
      this.setState({image: e.target.files[0]})
    }
    // fungsi untuk membuka form tambah data

    get_order= () => {
        // $("#loading").toast("show");
        let url = "http://localhost/toko_online/public/order";
        axios.get(url)
        .then(response => {
            this.setState({order: response.data.order});
            // $("#loading").toast("hide");
        })
        .catch(error => {
            console.log(error);
        });
    }
    Accept = (id_order) => {
        if (window.confirm("Apakah anda yakin ingin Accept data ini?")) {
            $("#loading").toast("show");
            let url = "http://localhost/toko_online/public/order/accept/"+id_order;
            axios.post(url)
            .then(response => {
                $("#loading").toast("hide");
                this.setState({message: response.data.message});
                $("#message").toast("show");
                this.get_order();
            })
            .catch(error => {
                console.log(error);
            });
        }
    }
    Decline = (id_order) => {
        if (window.confirm("Apakah anda yakin ingin Decline data ini?")) {
            $("#loading").toast("show");
            let url = "http://localhost/toko_online/public/order/decline/"+id_order;
            axios.post(url)
            .then(response => {
                $("#loading").toast("hide");
                this.setState({message: response.data.message});
                $("#message").toast("show");
                this.get_order();
            })
            .catch(error => {
                console.log(error);
            });
        }
    }
    componentDidMount = () => {
      this.get_order();

    }
    Save = (event) => {
        event.preventDefault();
        // menampilkan proses loading
        // $("#loading").toast("show");
        // menutup form modal
        $("#modal_products").modal("hide");
        let url = "http://localhost/toko_online/public/products/save";
        let form = new FormData();
        form.append("action",this.state.action);
        form.append("id", this.state.id);
        form.append("name", this.state.name);
        form.append("stock", this.state.stock);
        form.append("price",this.state.price);
        form.append("description", this.state.description);
        form.append("image", this.state.image, this.state.image.name);
        axios.post(url, form)
        .then(response => {
            $("#loading").toast("hide");
            this.setState({message: response.data.message});
            $("#message").toast("show");
            this.get_products();
        })
        .catch(error => {
            console.log(error);
        });
    }
    search = (event) => {
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
        return (
          <div className="container">
              <div className="card mt-2">
                  {/* header card */}
                  <div className="card-header bg-danger">
                      <div className="row">
                          <div className="col-sm-8">
                              <h4 className="text-white">Data Order</h4>
                          </div>

                      </div>

                  </div>
                  {/* content card */}
                  <div className="card-body">
                      <Toast id="message" autohide="true" title="Informasi">
                          {this.state.message}
                      </Toast>
                      <Toast id="loading" autohide="false" title="Informasi">
                          <span className="fa fa-spin faspinner"></span> Sedang Memuat
      </Toast>
                      <table className="table">
                          <thead>
                              <tr>
                                  <th>ID Alamat</th>
                                  <th>ID User</th>
                                  <th>Total</th>
                                  <th>Bukti</th>
                                  <th>Status</th>
                                  <th>Detail Order</th>
                                  <th>Opsi</th>
                              </tr>
                          </thead>
                          <tbody>

                              {this.state.order.map((item,index) => {
                                  return (
                                      <tr key={index}>
                                          <td>{item.id_alamat}</td>
                                          <td>{item.id_user}</td>
                                          <td>{item.total}</td>
                                          <td>{item.bukti}</td>
                                          <td>{item.status}</td>
                                          <td>
                                                {item.detail.map((it) => {
                                                    return(
                                                        <ul key={it.id_order}>
                                                            <li>
                                                            {it.nama_product}
                                                            ({it.quantity})
                                                            </li>
                                                        </ul>
                                                    )
                                                })}
                                            </td>

                                          <button className="m-1 btn btn-sm btn-primary"
                                              onClick={() => this.Decline(item.id_order)}>
                                              <span>Tolak</span>
                                          </button>
                                          <button className="m-1 btn btn-sm btn-danger"
                                              onClick={() => this.Accept(item.id_order)}>
                                              <span>Terima</span>
                                          </button>

                                      </tr>
                                  );
                              })}
                          </tbody>
                      </table>

                      {/* tombol tambah */}



                      {/* form modal siswa*/}

                  </div>
              </div>


          </div>


   );
 }
}
export default Order
