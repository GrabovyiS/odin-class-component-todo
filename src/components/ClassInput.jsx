import React, { Component } from "react";

class ClassInput extends Component {
  idCounter = 0;

  constructor(props) {
    super(props);

    this.state = {
      todos: [
        { text: "Just some demo tasks", id: this.idCounter++ },
        { text: "As an example", id: this.idCounter++ },
      ],
      inputVal: "",
      idToEdit: null,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(e) {
    this.setState((state) => ({
      ...state,
      inputVal: e.target.value,
    }));
  }

  handleDelete(e) {
    const idToDelete = e.target.closest("li").id;

    const todosCopy = structuredClone(this.state.todos);
    const filteredTodos = todosCopy.filter(
      (todo) => String(todo.id) !== idToDelete
    );

    this.setState((state) => ({ ...state, todos: filteredTodos }));
  }

  handleEdit(e) {
    const idToEdit = e.target.closest("li").id;
    const textToEdit = this.state.todos.find(
      (todo) => String(todo.id) === idToEdit
    ).text;

    this.setState((state) => ({
      ...state,
      inputVal: textToEdit,
      idToEdit,
    }));
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.state.idToEdit) {
      const todosCopy = structuredClone(this.state.todos);
      const indexToEdit = todosCopy.findIndex(
        (todo) => String(todo.id) === this.state.idToEdit
      );
      todosCopy[indexToEdit].text = this.state.inputVal;

      this.setState((state) => ({
        ...state,
        todos: todosCopy,
        inputVal: "",
        idToEdit: null,
      }));
    } else {
      this.setState((state) => ({
        ...state,
        todos: state.todos.concat({
          text: state.inputVal,
          id: this.idCounter++,
        }),
        inputVal: "",
      }));
    }
  }

  render() {
    return (
      <section>
        {/* eslint-disable-next-line react/prop-types */}
        <h3>{this.props.name}</h3>
        {/* The input field to enter To-Do's */}
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="task-entry">Enter a task: </label>
          <input
            type="text"
            name="task-entry"
            value={this.state.inputVal}
            onChange={this.handleInputChange}
          />
          <button type="submit">
            {this.state.idToEdit ? "Resubmit" : "Submit"}
          </button>
        </form>
        <h4>All the tasks!</h4>
        {/* The list of all the To-Do's, displayed */}
        <ul>
          {this.state.todos.map((todo) => (
            <li id={todo.id} key={todo.id}>
              {todo.text}
              <button className="edit-button" onClick={this.handleEdit}>
                Edit
              </button>
              <button onClick={this.handleDelete}>Delete</button>
            </li>
          ))}
        </ul>
      </section>
    );
  }
}

export default ClassInput;
