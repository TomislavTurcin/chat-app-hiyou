import React, { Component } from 'react';
import './App.css';
import Input from './components/Input';
import List from './components/List';




function randomName() {
  const authors = [
    "Tomislav", "Mario", "Iva", "Mirela", "Ivana", "Kruno", "Renato", "Matea",
    "Filip", "Mladen", "Ines", "Dora", "Domagoj", "Lorena", "Petar", "Ana",
    "Josipa", "Tatjana", "Branko", "Nada", "Zoran", "Rea", "Eva",
    "Noa", "Jakov", "Ivan", "Dino", "Kristijan", "Dario", "Goran", "Martina",
    "Vlatka", "Paula", "Martin"
  ];
  
  const author = authors[Math.floor(Math.random() * authors.length)];
  return author;
}

function randomColor() {
  const colors = [
    '#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF',
   '#FF1493', '#00FF7F', '#00008B', '#FFD700', '#8A2BE2',
    '#8B0000', '#8B008B', '#B22222', '#FF8C00', '#008000', '#000050',
    '#4B0082'
  ];

  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
}



class App extends Component {
  state = {
    messages: [],
    member: {
      name: randomName(),
      color: randomColor(),
    }
  }

  constructor() {
    super();
    this.drone = new window.Scaledrone("j3guEAtQjjtcWyYB", {
      data: this.state.member
    });
    this.drone.on('open', error => {
      if (error) {
        return console.error(error);
      }
      const member = {...this.state.member};
      member.id = this.drone.clientId;
      this.setState({member});
    });
    const room = this.drone.subscribe("observable-room");
    room.on('data', (data, member) => {
      const messages = [...this.state.messages];
      messages.push({member, text: data});
      this.setState({messages});
    });
  }

  render() {
    return (
      <div className="App">
        <div className="title">
          <h1>HiYou</h1>
        </div>
        <List
          messages={this.state.messages}
          currentMember={this.state.member}
        />
        <Input
          onSendMessage={this.onSendMessage}
        />
      </div>
    );
  }

  onSendMessage = (message) => {
    this.drone.publish({
      room: "observable-room",
      message
    });
  }

}

export default App;


