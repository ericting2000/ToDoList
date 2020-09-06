import React from "react";
import { Input, Button } from "rsuite";
import "rsuite/dist/styles/rsuite-default.css";
import { Todo } from "./type";

interface State {
  todolist: Todo[];
  temptitle: string;
  tempdescrip: string;
  tempddl: string;
  searchtitle: string;
}

export default class Todolist extends React.Component<{}, State> {
  constructor(props: Readonly<{}>) {
    super(props);
    this.state = {
      todolist: [],
      temptitle: "",
      tempdescrip: "",
      tempddl: "",
      searchtitle: "",
    };
  }

  Fetch_All_Todo_Data = () => {
    fetch("https://tmd.linyuanlin.com/api/todos/")
      .then((res) => res.json())
      .then((resdata) => this.setState({ todolist: resdata }));
  };

  Search_Todo = (ttl: string) => {
    var a: Todo[];
    if (ttl === "") {
      this.setState({ searchtitle: "" });
      alert("Please insert the title!");
      return;
    }
    fetch("https://tmd.linyuanlin.com/api/todos/")
      .then((res) => res.json())
      .then(
        (resdata: Todo[]) => (a = resdata.filter((item) => item.title === ttl))
      )
      .then(() => this.setState({ todolist: a, searchtitle: "" }));
  };

  Insert_New_Todo = (title: string, descrip: string, ddl: string) => {
    if (title === "" || descrip === "" || ddl === "") {
      this.setState({ temptitle: "", tempdescrip: "", tempddl: "" });
      alert("Please fill all the blanks!");
      return;
    }
    fetch("https://tmd.linyuanlin.com/api/todos/", {
      method: "POST",
      body: JSON.stringify({
        title: title,
        description: descrip,
        deadline: ddl,
      }),
    });
    this.setState({ temptitle: "", tempdescrip: "", tempddl: "" });
  };

  Update_Todo_Data = (title: string, descrip: string, ddl: string) => {
    var id: string;
    if (title === "" || descrip === "" || ddl === "") {
      this.setState({ temptitle: "", tempdescrip: "", tempddl: "" });
      alert("Please fill all the blanks!");
      return;
    }
    fetch("https://tmd.linyuanlin.com/api/todos/")
      .then((res) => res.json())
      .then((resdata: Todo[]) =>
        resdata.filter((item) => {
          if (item.title === title) {
            id = item.id;
          }
          return Boolean;
        })
      )
      .then(() =>
        fetch("https://tmd.linyuanlin.com/api/todo/" + id, {
          method: "PUT",
          body: JSON.stringify({
            title: title,
            description: descrip,
            deadline: ddl,
          }),
        })
      );
    this.setState({ temptitle: "", tempdescrip: "", tempddl: "" });
  };

  Delete_All_Todo_Data = () => {
    fetch("https://tmd.linyuanlin.com/api/todos/", {
      method: "DELETE",
    });
  };

  //Function needs to be fixed//
  Delete_Todo_Data = (idx: number) => {
    var id: string;
    fetch("https://tmd.linyuanlin.com/api/todos/")
      .then((res) => res.json())
      .then((resdata: Todo[]) =>
        resdata.filter((item, index) => {
          if (index === idx) {
            id = item.id;
          }
          return Boolean;
        })
      )
      .then(() =>
        fetch("https://tmd.linyuanlin.com/api/todo/" + id, {
          method: "DELETE",
        })
      );
    this.Fetch_All_Todo_Data();
  };
  //Function needs to be fixed//

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
          placeholder="Insert Your Description"
          onChange={(e) => this.setState({ tempdescrip: e })}
          value={this.state.tempdescrip}
        />
        <Input
          size="md"
          placeholder="Insert Your Deadline in YYYY-MM-DDThh:mm:ss+08:00"
          onChange={(e) => this.setState({ tempddl: e })}
          value={this.state.tempddl}
        />
        <Button
          appearance="primary"
          onClick={() => {
            this.Insert_New_Todo(
              this.state.temptitle,
              this.state.tempdescrip,
              this.state.tempddl
            );
          }}
        >
          Insert
        </Button>
        <Button
          appearance="primary"
          onClick={() => {
            this.Update_Todo_Data(
              this.state.temptitle,
              this.state.tempdescrip,
              this.state.tempddl
            );
          }}
        >
          Update
        </Button>
        <Button
          appearance="primary"
          onClick={() => {
            this.Fetch_All_Todo_Data();
          }}
        >
          Get All Todo Data
        </Button>
        <Button
          appearance="primary"
          onClick={() => {
            this.Delete_All_Todo_Data();
          }}
        >
          Delete All Todo Data
        </Button>
        <Input
          size="md"
          placeholder="Insert Your Title To search for Todo"
          onChange={(e) => this.setState({ searchtitle: e })}
          value={this.state.searchtitle}
        />
        <Button
          appearance="primary"
          onClick={() => {
            this.Search_Todo(this.state.searchtitle);
          }}
        >
          Search!
        </Button>
        <br></br>
        <h1>
          {this.state.todolist.map((item, index) => (
            <p key={index}>
              <h2>{item.title}</h2>
              <h4>DEADLINE:{item.ddl}</h4>
              <h4>ID:{item.id}</h4>
              <h4>
                STATUS:{item.status}
                <Button
                  appearance="primary"
                  onClick={() => {
                    this.Delete_Todo_Data(index);
                  }}
                >
                  Delete
                </Button>
              </h4>
            </p>
          ))}
        </h1>
      </div>
    );
  }
}
