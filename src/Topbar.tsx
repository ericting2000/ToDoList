import React from "react";

interface Props {
  username: string;
}

export default class Topbar extends React.Component<Props> {
  render() {
    return (
      <div style={{ backgroundColor: "#A8DADC", padding: "20px 20px" }}>
        <h1>{"Hello " + this.props.username}</h1>
      </div>
    );
  }
}
