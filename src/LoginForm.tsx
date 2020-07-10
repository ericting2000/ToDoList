import React from "react";

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
      <div style={{ position: "absolute", left: "50%", top: 50 }}>
        <p>Username</p>
        <input
          onChange={(e) => this.setState({ username: e.target.value })}
          value={this.state.username}
        />
        <p>Password</p>
        <input
          onChange={(e) => this.setState({ password: e.target.value })}
          value={this.state.password}
        />
        <div>
          <button
            onClick={() =>
              this.props.login(this.state.username, this.state.password)
            }
          >
            {" "}
            Login!
          </button>
        </div>
      </div>
    );
  }
}
