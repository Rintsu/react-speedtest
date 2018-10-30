import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import Button from './Button';
import Score from './Score';
import Gameover from './Gameover';

function getRandomInt(min, max){
	   return Math.floor(Math.random() * (max - min + 1)) + min;
}

class App extends Component {
	state = { //state includes all the parts you want to update at some point
		activeButton: 0,
		buttonList: [],
		clicks: 0,
		showGameOver: false
	}

	timerId = undefined;
	delay = 1000;

	handleClick = (btnId) => {
		console.log("Click", btnId);

		if(!(btnId === this.state.buttonList[0])) {
			this.gameover();
			return;
		}

		this.setState({
			buttonList: this.state.buttonList.slice(1),
			clicks: this.state.clicks + 1
		});
	}

	gameover = () => {
		clearTimeout(this.timerId);
		this.setState({
			showGameOver: true
		});
	}

	//This and gameove = () is not a method, it is an attribute
	//This function is bound because it's not a method
	next = () => {
		//check for game over
		if(this.state.buttonList.length >= 10) {
			this.gameover();
			return;
		}
		//pick next active Button
		// let nextActive = 1 + (this.state.activeButton + 1) % 3;
		let nextActive = undefined;
		do {
			nextActive = getRandomInt(1, 3);
		} while (nextActive === this.state.activeButton);

		let newList = this.state.buttonList;
		newList.push(nextActive);

		//update active button state
		this.setState({ //parameter in setState is Javascript object
			activeButton: nextActive,
			buttonList: newList
		});

		console.log(this.state.buttonList);

		//set timer for next activation
		this.delay *= 0.95;
		this.timerId = setTimeout(this.next, this.delay);
	}

	componentDidMount() { //When the component is rendered for the first time, then it calls the next() and starts the machine
		setTimeout(this.next, 2500);
	}

  render() {
    return (
			<div className="App">
				<main>
					<Score score={this.state.clicks} />
					<Button label="&#8576;" active={ this.state.activeButton === 1 } clickHandler={ () => this.handleClick(1) }/>
					<Button label="&#8584;" active={ this.state.activeButton === 2 } clickHandler={ () => this.handleClick(2) }/>
					<Button label="&#8578;" active={ this.state.activeButton === 3 } clickHandler={ () => this.handleClick(3) }/>
					{ this.state.showGameOver && <Gameover /> }
				</main>
			 </div>
    );
  }
}

export default App;
