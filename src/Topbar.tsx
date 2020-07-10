import React from "react";

interface Props {
  username: string;
}

export default class Topbar extends React.Component<Props> {
  render() {
    return (
      <div>
        <h1>{this.props.username}</h1>
      </div>
    );
  }
}
