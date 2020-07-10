import React from "react";

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
      <div>
        Insert your to-do-list
        <input
          onChange={(e) => this.setState({ temp: e.target.value })}
          value={this.state.temp}
        />
        <button
          onClick={() => {
            this.push(this.state.temp);
          }}
        >
          Insert
        </button>
        <br></br>
        <h1>
          {this.state.todolist.map((item, index) => (
            <p>
              {item}
              <button
                onClick={() => {
                  this.delete(index);
                }}
              >
                Delete
              </button>
            </p>
          ))}
        </h1>
      </div>
    );
  }
}
