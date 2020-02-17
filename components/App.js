import React, { Component } from "react";
import Swiper from "rn-deck-swiper";
import { StyleSheet, Text, View } from "react-native";

import * as data from "../assets/questions.json";

export default class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			cards: JSON.parse(JSON.stringify(data)).Questions,
			swipedAllCards: false,
			swipeDirection: "",
			isSwipingBack: false,
			cardIndex: 0
		};

		this.state.cards = this.shuffleStack();
	}

	renderCard = (card) => {
		return (
			<View style={styles.card}>
				<Text style={styles.text}>{card}</Text>
			</View>
		);
	};

	onSwipedAllCards = () => {
		this.setState({
			swipedAllCards: true
		});

		this.setState({ cards: this.shuffleStack() });
	};

	shuffleStack = () => {
		console.log(this.state.cards);
		let newStackOrder = this.state.cards;
		for (let i = newStackOrder.length - 1; i > 0; i--) {
			let j = Math.floor(Math.random() * (i + 1));
			[newStackOrder[i], newStackOrder[j]] = [
				newStackOrder[j],
				newStackOrder[i]
			];
		}
		console.log(this.state.cards);
		return newStackOrder;
	};

	swipeBack = () => {
		if (!this.state.isSwipingBack) {
			this.setIsSwipingBack(true, () => {
				this.swiper.swipeBack(() => {
					this.setIsSwipingBack(false);
				});
			});
		}
	};

	setIsSwipingBack = (isSwipingBack, cb) => {
		this.setState(
			{
				isSwipingBack: isSwipingBack
			},
			cb
		);
	};

	swipeLeft = () => {
		this.swiper.swipeLeft();
	};

	render() {
		return (
			<View style={styles.container}>
				<Swiper
					ref={(swiper) => {
						this.swiper = swiper;
					}}
					onSwiped={this.onSwiped}
					onTapCard={this.swipeLeft}
					cards={this.state.cards}
					infinite={true}
					cardIndex={this.state.cardIndex}
					cardVerticalMargin={80}
					renderCard={this.renderCard}
					onSwipedAll={this.onSwipedAllCards}
					animateOverlayLabelsOpacity
					animateCardOpacity
				></Swiper>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#F5FCFF"
	},
	card: {
		flex: 1,
		borderRadius: 4,
		borderWidth: 2,
		borderColor: "#E8E8E8",
		justifyContent: "center",
		backgroundColor: "white"
	},
	text: {
		textAlign: "center",
		fontSize: 50,
		backgroundColor: "transparent"
	},
	done: {
		textAlign: "center",
		fontSize: 30,
		color: "white",
		backgroundColor: "transparent"
	}
});
