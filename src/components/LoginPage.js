import React, { Component } from 'react';
import "../App.css"
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import { apiURL } from '../constant';

export default class LoginForm extends Component {
  
  constructor(props) {
    super(props)

    // this.onChange = this.onChange.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.changeFormMessage = this.changeFormMessage.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: '',
      password: '',

      formMessage: '',
    }

  }

  // onChange(e) {
  //   this.setState({[e.target.name]: e.target.value})
  // }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value,
      formMessage: '',
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value,
      formMessage: '',
    });
  }

  changeFormMessage(message) {
    this.setState({
      formMessage: message
    });
  }

  onSubmit(e) {
    e.preventDefault()
    // Authentication
    const user = {
      username: this.state.username,
      password: this.state.password
    }
    
    axios
      .post(apiURL+'/auth/login', {
          username: user.username,
          password: user.password
      })
      .then(res => {
          localStorage.setItem('usertoken', res.data.token)
          window.location = '/profile';

      })
      .catch(err => {
          this.changeFormMessage(err.response.data.msg)
          console.log(err.response.data.msg)
      });

}

  render() {
    return (
      <div className="bg-cover center">
        <Grid container style={{flexGrow: 1, marginTop: 40}} spacing={2}>
            <Grid item xs={12} sm={12}>
                <Grid container style={{marginBottom:10}} justify="center" spacing={3}>
                    <div className="card normal-card center" style={{marginTop: "4rem", paddingLeft: "40px", }}>
                        <div className="card-body">
                            <h3 className="big-text" style={{ paddingBottom: "1rem" }}>HousingHelper | Login</h3>
                            <form onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <TextField style={{width: "250px"}} label="Username" id="username" type="username" variant="outlined" value={this.state.username} onChange={this.onChangeUsername} required/>
                            </div>
                            <div className="form-group"> 
                                <TextField style={{width: "250px"}} label="Password" id="password" type="password" variant="outlined" value={this.state.password} onChange={this.onChangePassword} required/>
                            </div>

                            
                            <div className="form-group">
                            <br/>
                            <Button type="submit" variant="contained" color="primary" disabled={this.state.username === "" || this.state.password === ""}>Login</Button>
                            </div>
                            <label className="small-text error">{this.state.formMessage}</label>
                            <br/>
                            <label className="small-text">Don't have an account?</label> <a href="/signup" className="small-text" style={{ color: "#5a65ff" }}>Sign Up</a>
                            <br/>
                            <a href="/" className="small-text" style={{color: "#5a65ff" }}>Home</a>
                            </form>
                        </div>
                    </div>
                </Grid>
            </Grid>
        </Grid>
      </div>  
    )
  }
}