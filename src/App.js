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
		clicks: 0,
		showGameOver: false
	}

	//UI elements are not dependent on these
	//that is why they don't need to be inside the Component's state
	buttonList = [];
	timerId = undefined;
	delay = 1000;

	handleClick = (btnId) => {
		console.log("Click", btnId);

		if(!(btnId === this.buttonList[0])) {
			this.gameover();
			return;
		}

		this.buttonList = this.buttonList.slice(1);

		this.setState(prevState => { //given a function as a parameter
			return {
			clicks: prevState.clicks + 1
		};
	});
}

	//gameover and next are not methods, they are attributes
	gameover = () => {
		clearTimeout(this.timerId);
		this.setState({
			showGameOver: true
		});
	}

	//This function is bound because it's not a method
	next = () => {
		//check for game over
		if(this.buttonList.length >= 10) {
			this.gameover();
			return;
		}
		//pick next active Button
		let nextActive = undefined;
		do {
			nextActive = getRandomInt(1, 3);
		} while (nextActive === this.state.activeButton);

		let newList = this.buttonList;
		newList.push(nextActive);

		//update active button state
		this.setState({ //parameters in setState are Javascript objects
			activeButton: nextActive,
			buttonList: newList
		});

		console.log(this.buttonList);

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
