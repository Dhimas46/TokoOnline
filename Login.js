import React, {Component} from "react";
import axios from "axios";
import Toast from "../component/Toast";
import $ from "jquery";
import { Link } from 'react-router-dom';

class Login extends Component {
    constructor() {
       super();
       this.state = {
           email: "",
           password: "",
           message: "",
       }
    }

    bind = (event) => {
        this.setState({[event.target.name]: event.target.value});
    }

    Login = (event) => {
        event.preventDefault();
        let url = "http://localhost/toko_online/public/user/auth";
        let form = new FormData();
        form.append("email", this.state.email);
        form.append("password", this.state.password);
        axios.post(url, form)
        .then(response => {
            let logged = response.data.status;
            let role = response.data.role;
            if (logged) {

              if(role === "admin"){
                window.location = "/Products";
              }else{
                window.location = "/";
              }
                this.setState({message: "Login Berhasil"});
                //menyimpan data token pada local storage
                localStorage.setItem("Token", response.data.token);
                //menyimpan data login user ke local storage
                localStorage.setItem("id_user", JSON.stringify(response.data.user.id_user));
                //direct ke halaman data siswa
                localStorage.setItem("role", response.data.role)
            } else {
                this.setState({message: "Login Gagal"});
            }
            $("#message").toast("show");
        })
        .catch(error => {
            console.log(error);
        })
    }

    render(){
        return (
            <div className="container" style={{width: "30%"}}>
                <div className="card my-2">
                    <div className="card-header bg-light">
                        <h5 className="text-dark">Login</h5>
                        </div>
                        <div className="card-body">
                            <Toast id="message" autohide="false" title="informasi">
                                {this.state.message}
                                </Toast>
                                <form onSubmit={this.Login}>
                                    <input type="text" className="form-control m-1" name="email"
                                    value={this.state.email} onChange={this.bind}
                                    required placeholder="Masukkan email" />
                                    <input type="password" className="form-control m-1" name="password"
                                    value={this.state.password} onChange={this.bind}
                                    required placeholder="Masukkan Password" />
                                    <p> Belum Punya Akun?
                                  <Link to="/Register">
                                  Register
                                  </Link>
                                  </p>

                                    <button className="mt-2 btn btn-block btn-success" type="submit">
                                        <span className="fa fa-sign-in"></span> Login
                                        </button>
                                        </form>
                                        </div>
                                        </div>
                                        </div>
        );
    }
}
export default Login;
