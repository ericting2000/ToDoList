import React from "react";
import "./App.css";
import Topbar from "./Topbar";
import LoginForm from "./LoginForm";
import Todolist from "./Todolist";

interface State {
  username: string;
}

class App extends React.Component<{}, State> {
  login = (username: string, password: string) => {
    if (username === "" || password === "") {
      alert("Please fill all the blank!");
      return;
    }

    if (username !== "eric" || password !== "123") {
      alert("Wrong username or password!");
      return;
    }

    alert("Hi!");
    this.setState({ username: username });
  };

  constructor(props: Readonly<{}>) {
    super(props);
    this.state = {
      username: "",
    };
  }

  render() {
    return (
      <div>
        {this.state.username === "" ? (
          <LoginForm login={this.login}></LoginForm>
        ) : (
          <></>
        )}
        {this.state.username === "" ? (
          <></>
        ) : (
          <Topbar username={this.state.username}></Topbar>
        )}
        <br></br>
        {this.state.username === "" ? <></> : <Todolist></Todolist>}
      </div>
    );
  }
}

export default App;
