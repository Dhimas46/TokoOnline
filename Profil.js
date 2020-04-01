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
      id: "",
      nama: "",
      alamat_lengkap: "",
      kodepos: "",
      kecamatan: "",
      kota: "",
      rt: "",
      rw: "",
      action: "",
      find: "",
      message: "",

      user: [],
      id_user: "",
      email: "",
      password: "",
      nama_user: "",
      role: "user",
      no_ktp: "",
      nama_lengkap: "",
      jenis_kelamin: "",
      tanggal_lahir: "",
      nohp: "",
      image: null,
      action: "",
      find: "",
      message: "",
    }
    if(!localStorage.getItem("Token")){
      // direct ke halaman login
      window.location = "/login";
    }
   }
    bind = (event) => {
      this.setState({[event.target.name] : event.target.value});
    }
    bindAlamat = (event) => {
      this.setState({[event.target.name] : event.target.value});
    }
    bindImage = (e) => {
      this.setState({image: e.target.files[0]})
    }

    Add = () => {
        // membuka modal
        $("#modal_alamat").modal("show");
        // mengosongkan data pada form
        this.setState({
            action: "insert",
            id: "",
            id_user: "",
            nama: "",
            alamat_lengkap: "",
            kodepos: "",
            kota: "",
            rt: "",
            rw: "",

        });
    }
    Edit = (item) => {
      // membuka modal
      $("#modal_user").modal("show");
      // mengisikan data pada form
      this.setState({
        action: "update",
        id_user: item.id_user,
        nama_user: item.nama_user,
        nama_lengkap: item.nama_lengkap,
        no_ktp: item.no_ktp,
        jenis_kelamin: item.jenis_kelamin,
        tanggal_lahir: item.tanggal_lahir,
        nohp: item.nohp,
        image: item.image,
      });
    }
        Edit_alamat = (echo) => {
        // membuka modal
        $("#modal_alamat").modal("show");
        // mengisikan data pada form
        this.setState({
          action: "update",
        id: echo.id,
        id_user: echo.id_user,
        nama: echo.nama,
        alamat_lengkap: echo.alamat_lengkap,
        kodepos: echo.kodepos,
        kecamatan: echo.kecamatan,
        kota: echo.kota,
        rt: echo.rt,
        rw: echo.rw,
      });
    }

    get_alamat = () => {
      // $("#loading").toast("show");
      let id = JSON.parse(localStorage.getItem('id_user'))
      // console.log(items)
      let url = "http://localhost/toko_online/public/alamat/"+id;
      axios.get(url)
      .then(response => {
          // $("#loading").toast("hide");
          this.setState({
            alamat: response.data.alamat,
          });
          // $("#message").toast("show");
      })
      .catch(error => {
          console.log(error);
      });
    }
    Drop = (id) => {
        if (window.confirm("Apakah anda yakin ingin menghapus data ini?")) {
            $("#loading").toast("show");
            let url = "http://localhost/toko_online/public/alamat/drop/"+id;
            axios.delete(url)
            .then(response => {
                $("#loading").toast("hide");
                this.setState({message: response.data.message});
                $("#message").toast("show");
                this.get_alamat();
            })
            .catch(error => {
                console.log(error);
            });
        }
    }

    Save_alamat = (event) => {
      let id = JSON.parse(localStorage.getItem('id_user'))
      event.preventDefault();
      // menampilkan proses loading
      // $("#loading").toast("show");
      // menutup form modal
      $("#modal_alamat").modal("hide");
      let url = "http://localhost/toko_online/public/alamat/save";
      let form = new FormData();
      form.append("action", this.state.action);
      form.append("id", this.state.id);
      form.append("id_user", id);
      form.append("nama", this.state.nama);
      form.append("alamat_lengkap", this.state.alamat_lengkap);
      form.append("kodepos", this.state.kodepos);
      form.append("kecamatan", this.state.kecamatan);
      form.append("kota", this.state.kota);
      form.append("rt", this.state.rt);
      form.append("rw", this.state.rw);
      axios.post(url, form)
      .then(response => {
        // $("#loading").toast("hide");
        this.setState({
          message: response.data.message});
        $("#message").toast("show");
        this.get_alamat();
      })
      .catch(error => {
        console.log(error);
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
      this.get_alamat();
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
      form.append("image", this.state.image, this.state.image.name);
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
   const { alamat, user } =  this.state;
   console.log(alamat)
   console.log(user)

  return (
        <div className="container">
        <div className="card mt-2">
            <div style={{ paddingTop: "5%", paddingLeft: "7%" }}>
              <div className="#" style={{ maxwidth: "200px" }}>
                <div className="row no-gutters">
  {user.map((item,index,) => {
    return (
            <div className="col-md-4">
              <img className="rounded float-left" src={'http://localhost/toko_online/public/images/' + item.image}
              alt={item.image} style={{ height: "300px", width: "260px" }} required />
            </div>
          );
        })}
                <div style={{ paddingTop: "0%", paddingLeft: "0%" }}>
                <div className="card-body" cols="">
                  <h4 className="card-title" style={{ fontWeight: "700" }}>Profile</h4>
                  <table className="table table-borderless">
                  {user.map((item,index) => {
                      return (
                        <ul class="list-group" key={index}>
                        <li cols="100" class="list-group-item">Username : {item.nama_user}</li>
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
                      </table>
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
                       Gambar
                        <input type="file" className="file-control" name="image"
                        onChange={this.bindImage} required />
                       <button type="submit" className="btn btn-info pull-right m-2">
                       <span className="fa fa-check"></span> Simpan
                       </button>
                       </form>
                       </Modal>
                       <h4 className="card-title" style={{ fontWeight: "700" }}>Data Alamat </h4>
                       {this.state.alamat.map((echo,index) => {
                           return (
                       <ul class="list-group" key={index}>
                       <li class="list-group-item">Nama Penerima : {echo.nama}</li>
                       <li class="list-group-item">Alamat Lengkap : {echo.alamat_lengkap}</li>
                       <li class="list-group-item">Kode POS : {echo.kodepos}</li>
                       <li class="list-group-item">Kecamatan : {echo.kecamatan}</li>
                       <li class="list-group-item">Kota : {echo.kota}</li>
                       <li class="list-group-item">Rt : {echo.rt}</li>
                       <li class="list-group-item">Rw : {echo.rw}</li>
                       <button  className="m-1 btn btn-sm btn-outline-dark" onClick={() => this.Edit_alamat(echo)}>
                         <span className="fa fa-edit"></span>Edit
                       </button>
                       <button className="m-1 btn btn-sm btn-danger"
                           onClick={() => this.Drop(echo.id)}>
                           <span className="fa fa-trash"></span>Hapus Alamat
                       </button>
                       </ul>
                       );
                       })}

                      <button className="btn btn-success my-2" onClick={this.Add}>
                          <span className="fa fa-plus"></span> Tambah Alamat
                        </button>
                           </div>
                  <div className="card-body">
                  </div>
                  <Modal id="modal_alamat" title="Form Alamat" bg_header="success"
                       text_header="white">
                       <form onSubmit={this.Save_alamat}>
                   Nama Penerima
                   <input type="text" className="form-control" name="nama"
                   value={this.state.nama} onChange={this.bindAlamat} required />
                   Alamat Lengkap
                   <input type="textarea" className="form-control" name="alamat_lengkap"
                   value={this.state.alamat_lengkap} onChange={this.bindAlamat} required />
                   Kode POS
                   <input type="text" className="form-control" name="kodepos"
                   value={this.state.kodepos} onChange={this.bindAlamat} required />
                   Kecamatan
                   <input type="text" className="form-control" name="kecamatan"
                   value={this.state.kecamatan} onChange={this.bindAlamat} required />
                   Kota
                   <input type="text" className="form-control" name="kota"
                   value={this.state.kota} onChange={this.bindAlamat} required />
                   Rt
                   <input type="text" className="form-control" name="rt"
                   value={this.state.rt} onChange={this.bindAlamat} required />
                   Rw
                   <input type="text" className="form-control" name="rw"
                   value={this.state.rw} onChange={this.bindAlamat} required />
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
