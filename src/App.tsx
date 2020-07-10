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
    if (username === "eric" && password === "123") {
      alert("hi!");
      this.setState({ username: username });
    } else if (username === "" || password === "") {
      alert("please fill all the blank!");
    } else {
      alert("wrong username or password, get out!");
    }
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
        <Topbar username={this.state.username}></Topbar>
        <br></br>
        {this.state.username === "" ? <></> : <Todolist></Todolist>}
      </div>
    );
  }
}

export default App;
