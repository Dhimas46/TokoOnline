import React,{Component} from "react";
import axios from "axios";
import $ from "jquery";
import Image from '../image/Slide1.jpg';
import Modal from "../component/Modal";
import Toast from "../component/Toast";

class Profil extends Component {
  constructor() {
    super();
    this.state = {
      alamat: [],
      id:"",
      nama: "",
      kodepos: "",
      kecamatan: "",
      kota: "",
      jalan: "",
      rt: "",
      rw: "",
      action: "",
      find: "",
      message: ""
    }
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
    Add = () => {
      // membuka modal
      $("#modal_user").modal("show");
      // mengosongkan data pada form
      this.setState({
        action: "insert",
        id: "",
        nama: "",
        alamat_lengkap: "",
        kodepos: "",
        kecamatan: "",
        kota: "",
        jalan: "",
        rt: "",
        rw: ""
      });
    }
    Edit = (item) => {
      // membuka modal
      $("#modal_user").modal("show");
      // mengisikan data pada form
      this.setState({
        action: "update",
        id: item.id,
        nama: item.nama,
        alamat_lengkap: item.alamat_lengkap,
        kodepos: item.kodepos,
        kecamatan: item.kecamatan,
        kota: item.kota,
        jalan: item.jalan,
        rt: item.rt,
        rw:item.rw
      });
    }

    get_user = () => {
      // $("#loading").toast("show");
      let id = JSON.parse(localStorage.getItem('id_user'))
      // console.log(items)
      let url = "http://localhost/toko_online/public/user/"+id;
      axios.get(url)
      .then(response => {
          // $("#loading").toast("hide");
          this.setState({
            user: response.data.user,
          });
          // $("#message").toast("show");
      })
      .catch(error => {
          console.log(error);
      });
      // this.setState({
      //   user: items,
      //   id_user: items.id_user
      // });
    }
    componentDidMount = () => {
      this.get_user();
    }

    Save = (event) => {
      console.log(this.state.id_user)
      event.preventDefault();
      // menampilkan proses loading
      // $("#loading").toast("show");
      // menutup form modal
      $("#modal_user").modal("hide");
      let url = "http://localhost/toko_online/public/user/save_profil";
      let form = new FormData();
      form.append("action", this.state.action);
      form.append("id_user", this.state.id_user);
      form.append("email", this.state.email);
      form.append("password", this.state.password);
      form.append("role", this.state.role);
      form.append("nama_user", this.state.nama_user);
      form.append("nama_lengkap", this.state.nama_lengkap);
      form.append("no_ktp", this.state.no_ktp);
      form.append("jenis_kelamin", this.state.jenis_kelamin);
      form.append("tanggal_lahir", this.state.tanggal_lahir);
      form.append("nohp", this.state.nohp);
      axios.post(url, form)
      .then(response => {
        // $("#loading").toast("hide");
        this.setState({
          message: response.data.message});
        $("#message").toast("show");
        this.get_user();
      })
      .catch(error => {
        console.log(error);
      });
    }
    render(){
   const { user, email } =  this.state;
   console.log(user)
   console.log(email);
  return (
        <div className="container">
        <div className="card mt-2">
            <div style={{ paddingTop: "5%", paddingLeft: "7%" }}>
              <div className="#" style={{ maxwidth: "200px" }}>
                <div className="row no-gutters">
            <div className="col-md-4">
              <img className="rounded float-left" src={Image} style={{ height: "240px", width: "200px" }} />
                <input aria-hidden="true" type="file" className=" fa fa-upload"  name="image"
                  onChange={this.bindImage} required />
            </div>

                <div style={{ paddingTop: "2%", paddingLeft: "0%" }}>
                <div className="card-body">
                  <h4 className="card-title" style={{ fontWeight: "700" }}>Profile</h4>
                  <table className="table table-borderless">
                  {user.map((item,index) => {
                      return (
                        <ul class="list-group" key={index}>
                        <li class="list-group-item">Username : {item.nama_user}</li>
                        <li class="list-group-item">Email : {item.email}</li>
                        <li class="list-group-item">Nama Lengkap : {item.nama_lengkap}</li>
                        <li class="list-group-item">No Ktp : {item.no_ktp}</li>
                        <li class="list-group-item">Jenis Kelamin : {item.jenis_kelamin}</li>
                        <li class="list-group-item">Tanggal Lahir : {item.tanggal_lahir}</li>
                        <li class="list-group-item">No Hp : +62{item.nohp}</li>
                      <button  className="m-1 btn btn-sm btn-outline-dark" onClick={() => this.Edit(item)}>
                        <span className="fa fa-edit"></span>Edit
                      </button>
                      </ul>
                      );
                  })}
                <h4 className="card-title" style={{ fontWeight: "700" }}>Data Alamat </h4>
                <li className="list-group-item"> <textarea className="text-secondary"cols="50" rows="5">Isi Alamat </textarea> </li>
                <button type="submit" className="btn btn-info pull-right m-2">
                <span className="fa fa-check"></span> Simpan
                </button>
                  </table>
                  </div>
                  </div>




          <Modal id="modal_user" title="Form User" bg_header="success"
          text_header="white">
              <form onSubmit={this.Save}>
          Username
          <input type="text" className="form-control" name="nama_user"
          value={this.state.nama_user} onChange={this.bind} required />
          Nama Lengkap
          <input type="text" className="form-control" name="nama_lengkap"
          value={this.state.nama_lengkap} onChange={this.bind} required />
          No KTP
          <input type="text" className="form-control" name="no_ktp"
          value={this.state.no_ktp} onChange={this.bind} required />
          Jenis Kelamin
          <input type="enum" className="form-control" name="jenis_kelamin"
          value={this.state.jenis_kelamin} onChange={this.bind} required />
          Tanggal Lahir
          <input type="date" className="form-control" name="tanggal_lahir"
          value={this.state.tanggal_lahir} onChange={this.bind} required />
          No HP
          <input type="text" className="form-control" name="nohp"
          value={this.state.nohp} onChange={this.bind} required />

          <button type="submit" className="btn btn-info pull-right m-2">
          <span className="fa fa-check"></span> Simpan
          </button>
          </form>
          </Modal>
              </div>
              </div>
            </div>
          </div>


        </div>
      );
    }



}
export default Profil;
