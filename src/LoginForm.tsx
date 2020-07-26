import React from "react";
import { Input, Button } from "rsuite";
import "rsuite/dist/styles/rsuite-default.css";

interface State {
  username: string;
  password: string;
}

interface Props {
  login: (username: string, password: string) => void;
}
export default class LoginForm extends React.Component<Props, State> {
  constructor(props: Readonly<Props>) {
    super(props);
    this.state = {
      username: "",
      password: "",
    };
  }

  render() {
    return (
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div>
          <h1 style={{ margin: "20px 0" }}> Todolist.com</h1>
          <p style={{ margin: "5px 0px" }}>Username</p>
          <Input
            size="md"
            placeholder="Username"
            onChange={(e) => this.setState({ username: e })}
            value={this.state.username}
            mar
          />
          <p style={{ margin: "5px 0px" }}>Password</p>
          <Input
            size="md"
            placeholder="Password"
            onChange={(e) => this.setState({ password: e })}
            value={this.state.password}
          />
          <div style={{ margin: "15px 0px" }}>
            <Button
              style={{ float: "right" }}
              appearance="primary"
              onClick={() =>
                this.props.login(this.state.username, this.state.password)
              }
            >
              Login!
            </Button>
          </div>
        </div>
      </div>
    );
  }
}
