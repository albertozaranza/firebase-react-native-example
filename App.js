import React, {Component} from 'react';
import {Text, View, YellowBox} from 'react-native';
import firebase from '@firebase/app'
require('firebase/database')

YellowBox.ignoreWarnings(['Setting a timer'])

export default class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      carros: null
    }
  }
  componentWillMount() {
    var config = {
      apiKey: "-----------------------",
      authDomain: "-----------------------",
      databaseURL: "-----------------------",
      projectId: "-----------------------",
      storageBucket: "-----------------------",
      messagingSenderId: "-----------------------"
    }
    firebase.initializeApp(config)
    firebase.database().ref(`/carros`).on('value', snapshot => {
        let carros = []
        snapshot.forEach(ids => {
            carros.push(ids.val())
        })
        this.setState({carros})
    })
  }
  renderItems = () => {
      return this.state.carros.map((item, index) => (
          <Text key={index}>
            {item.fabricante}
          </Text>
      ))
  }
  render() {
    if(this.state.carros != null)
      return (
        <View>
          {this.renderItems()}
        </View>
      );
    else
      return <Text>Carregando</Text>
  }
}
