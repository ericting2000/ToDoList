import React from "react";
import { Input, Button } from "rsuite";
import "rsuite/dist/styles/rsuite-default.css";
import { Todo } from "./type";

interface State {
  todolist: Todo[];
  temptitle: string;
  tempddl: string;
  tempstat: string;
}

export default class Todolist extends React.Component<{}, State> {
  constructor(props: Readonly<{}>) {
    super(props);
    this.state = {
      todolist: [],
      temptitle: "",
      tempddl: "",
      tempstat: "",
    };
  }

  push = (title: string, ddl: string, stat: string) => {
    var a: Todo[];
    var new_todo: Todo;
    if (title === "" || ddl === "" || stat === "") {
      this.setState({ temptitle: "", tempddl: "", tempstat: "" });
      alert("Please fill all the blanks!");
      return;
    }
    a = [...this.state.todolist];
    new_todo = {
      title: "",
      ddl:  "",
      status: ""
    };
    new_todo.title = title;
    new_todo.ddl = ddl;
    new_todo.status = stat;
    a.push(new_todo);
    this.setState({ todolist: a, temptitle: "", tempddl: "", tempstat: "" });
  };

  delete = (idx: number) => {
    var a = this.state.todolist.filter((item, index) => (index !== idx)
    )
    this.setState({ todolist: a});
  };

  fetchTodoData = () => {
    fetch("http://tmd.linyuanlin.com/api/todos/")
      .then((res) => res.json())
      .then((resdata) => this.setState({ todolist: resdata }));
  };

  uploadNewTodo = () => {};

  render() {
    return (
      <div
        style={{
          maxWidth: "600px",
        }}
      >
        <Input
          size="md"
          placeholder="Insert Your Title"
          onChange={(e) => this.setState({ temptitle: e })}
          value={this.state.temptitle}
        />
        <Input
          size="md"
          placeholder="Insert Your Deadline"
          onChange={(e) => this.setState({ tempddl: e })}
          value={this.state.tempddl}
        />
        <Input
          size="md"
          placeholder="Insert Your Status"
          onChange={(e) => this.setState({ tempstat: e })}
          value={this.state.tempstat}
        />
        <Button
          appearance="primary"
          onClick={() => {
            this.push(
              this.state.temptitle,
              this.state.tempddl,
              this.state.tempstat
            );
          }}
        >
          Insert
        </Button>
        <br></br>
        <h1>
          {this.state.todolist.map((item, index) => (
            <p>
              <h2>{item.title}</h2>
              <h4>{item.ddl}</h4>
              <h4>{item.status}
              <Button
                appearance="primary"
                onClick={() => {
                  this.delete(index);
                }}
              >
                Delete
              </Button></h4>
            </p>
          ))}
        </h1>
      </div>
    );
  }
}
