import React from "react";
import { Input, Button } from "rsuite";
import "rsuite/dist/styles/rsuite-default.css";

interface State {
  todolist: string[];
  temp: string;
}

export default class Todolist extends React.Component<{}, State> {
  constructor(props: Readonly<{}>) {
    super(props);
    this.state = {
      todolist: [],
      temp: "",
    };
  }

  push = (insert: string) => {
    var a: string[];
    if (insert === "") {
      this.setState({ temp: "" });
      return;
    }
    a = this.state.todolist;
    a.push(insert);
    this.setState({ todolist: a, temp: "" });
  };

  delete = (index: number) => {
    var a: string[];
    a = this.state.todolist;
    a.splice(index, 1);
    this.setState({ todolist: a });
  };

  render() {
    return (
      <div
        style={{
          maxWidth: "600px",
        }}
      >
        <h3>Insert your to-do-list</h3>
        <Input
          size="md"
          placeholder="Todolist"
          onChange={(e) => this.setState({ temp: e })}
          value={this.state.temp}
        />
        <Button
          appearance="primary"
          onClick={() => {
            this.push(this.state.temp);
          }}
        >
          Insert
        </Button>
        <br></br>
        <h1>
          {this.state.todolist.map((item, index) => (
            <p>
              {item}
              <Button
                appearance="primary"
                onClick={() => {
                  this.delete(index);
                }}
              >
                Delete
              </Button>
            </p>
          ))}
        </h1>
      </div>
    );
  }
}
