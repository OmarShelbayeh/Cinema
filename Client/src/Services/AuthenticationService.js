import axios from "axios";
import URL from "./URL";

class AuthenticationService {
  registerSuccessfulLogin(email, password) {
    axios({
      url: URL + "/login",
      method: "POST",
      data: {
        email: email,
        password: password,
      },
    })
      .then((response) => {
        localStorage.setItem("token", response.data.token);
      })
      .then(() => {
        this.setUserInfo();
      })
      .catch((error) => console.log(error));
  }

  setUserInfo() {
    axios({
      url: URL + "/user/info",
      method: "GET",
      headers: {
        authorization: localStorage.getItem("token"),
      },
    })
      .then((response) => {
        localStorage.setItem("userObject", JSON.stringify(response.data));
        localStorage.setItem("role", response.data.role);
      })
      .then(() => {
        window.location.href = "/dashboard";
      });
  }

  getUserInfo() {
    let user = JSON.parse(localStorage.getItem("userObject"));
    return user;
  }

  getRole() {
    return localStorage.getItem("role");
  }

  isUserLoggedIn() {
    return this.getUserInfo() ? true : false;
  }

  register(email, name, surname, password, func) {
    axios({
      url: URL + "/register",
      method: "POST",
      data: {
        email: email,
        name: name,
        surname: surname,
        password: password,
      },
    })
      .then(() => {
        window.location.href = "/login";
      })
      .catch(() => func());
  }

  logout() {
    localStorage.clear();
    sessionStorage.clear();
  }
}

export default new AuthenticationService();
