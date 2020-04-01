import React,{Component} from "react";
import axios from "axios";
import $ from "jquery";
import Modal from "../component/Modal";
import Toast from "../component/Toast";

class Checkout extends Component {
  constructor() {
    super();
    this.state = {
      order: [],
      id_order: "",
      id_alamat: "",
      id_user: "",
      total: "",
      bukti: "",
      alamat: [],
      kota:"",
      kecamatan:"",
      kodepos:"",
      alamat_lengkap:"",
      status: "",
      image: null,
      action: "",
      find: "",
      message: "",
      created_at:""
    }
  }

    bind = (event) => {
      this.setState({[event.target.name] : event.target.value});
    }

    bindImage = (event) => {
      this.setState({image: event.target.files[0]})
    }

get_order = async() => {
    // $("#loading").toast("show");
    const id = JSON.parse(localStorage.getItem('id_user'))
    let url = "http://localhost/toko_online/public/ordered/"+ id;
    axios.get(url)
    .then(response => {
      this.setState({order: response.data.order});
      // $("#loading").toast("hide");
    })
    .catch(error => {
      console.log(error);
    });
  }

    componentDidMount = () => {
      this.get_order();
    }

    Save = (e) => {
    if(window.confirm("Apakah bukti bayar yang anda upload telah benar?")){
    e.preventDefault()
    $("#modal_payment").modal("hide")
    let url = "http://localhost/toko_online/public/order/pay"
    let form = new FormData()
    form.append("id_order", this.state.id_order)
    form.append("bukti", this.state.image, this.state.image.name);

    axios.post(url, form)
         .then(res => {
            alert("Pembayaran Berhasil")
            this.setState({message: res.data.message})
            this.get_order()
          })
          .catch(error => {
                console.log(error);
          })
    }
  }

  Cancel = (id) => {
    if(window.confirm("Apakah anda yakin membatalkan order ini?")){
        let url = "http://localhost/toko_online/public/order/decline/" + id
        axios.post(url)
        .then(res => {
          alert("Pesanan anda telah dibatalkan")
          this.setState({message: res.data.message})
          this.get_order()
        })
        .catch(error => {
            console.log(error)
        })
    }
}

    Pay = (id_order) => {

      $("#modal_payment").modal("show")
      this.setState({id_order: id_order})
    }

    search = (event) => {
      if(event.keyCode === 13) {
        $("#loading").toast("show");
        let url = "http://localhost/toko_online/public/profil";
        let form = new FormData();
        form.append("find", this.state.find);
        axios.post(url, form)
        .then(response => {
          $("#loading").toast("hide");
          this.setState({profil: response.data.profil});
        })
        .catch(error => {
          console.log(error);
        });
      }
    }

    render(){
      const { order } =  this.state;
      return(
        <div className="container">
          <div>
          <div style={{ paddingTop: "1%" }}>
            <div className="#" style={{}}>

                <div className="">

                <div className="">
                    { this.state.order.map((item) => {
                    return(
                      <div className="card" style={{marginTop: "2%", marginBottom: "4%"}} key={item.id_order}>
                        <div>
                        <h4 className="card-header text-center text-dark" style={{ fontWeight: "700" }}>HISTORY</h4>
                        </div>
                      <div className="card-body ">
                  <p className="text-dark text-center ">Dipesan : {item.created_at} </p>
                  <p className="text-dark text-center "></p>
                    <td className="list-group-item text-center card-header" style={{ fontWeight: "700" }}>
                    Total Bayar: Rp. {item.total}
                    Status : {item.status}<br/>
                    {item.alamat_lengkap}<br/>{item.kecamatan},{item.kota}<br/>Kode Pos : {item.kodepos}</td>
<td className="list-group-item text-center card-header" style={{ fontWeight: "700" }}>

                       Pesanan
                    {item.detail.map((it) => {
                        return(
                          <li className="" key={it.id_order}>{it.nama_product} <span className="badge badge-light badge-pill">{it.quantity}</span></li>
                        )
                    })}

</td>
                      </div>
                      </div>
                      );
                    })}
                     </div>


              </div>
            </div>
          </div>
          </div>

          <Modal id="modal_payment" title="Upload Bukti Pembayaran" bg_header="info" text_header="white">
        <form onSubmit={this.Save}>
          Bukti Bayar <br/>
          <input type="file" className="form-control" name="image" onChange={this.bindImage} />
          <button type="submit" className="btn btn-info pull-right m-2">
            <span className="fa fa-check"></span> Konfirmasi
          </button>
        </form>
</Modal>

        </div>

      );

    }



}
export default Checkout;
