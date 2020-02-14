import React, { Component } from "react";
import TodoItems from "./TodoItems";
import "./TodoList.css";

var xhr;

class TodoList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            items: []
        };

        this.addItem = this.addItem.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
        this.processRequest = this.processRequest.bind(this);
    }

    addItem(e) {
        if(this._inputElement.value !== "") {
            let newItem = {
                text: this._inputElement.value,
                key: Date.now()
            };

            this.setState((prevState) => {
                return {
                    items: prevState.items.concat(newItem)
                };
            });

            this._inputElement.value = "";
        }

        e.preventDefault();
    }

    deleteItem(key) {
        let filteredItems = this.state.items.filter(function(item){
            return (item.key !== key);
        });

        this.setState({
            items: filteredItems
        });
    }

    render() {
        return (
            <div className="todoListMain">
                <div className="header">
                    <form onSubmit={this.addItem}>
                        <input ref={ (a) => this._inputElement = a}
                            placeholder="enter task"></input>
                        <button type="submit">add</button>
                    </form>
                </div>
                <TodoItems entries={this.state.items}
                    delete={this.deleteItem} />
            </div>
        );
    }

    componentDidMount() {
        xhr = new XMLHttpRequest();
        xhr.open("GET", "http://localhost:4333/list", true);
        xhr.send();

        xhr.addEventListener("readystatechange", this.processRequest, false);
    }

    processRequest() {
        if(xhr.readyState === 4 && xhr.status === 200) {
            var response = JSON.parse(xhr.responseText);

            this.setState({
                items: response
            });
        }
    }
}

export default TodoList;