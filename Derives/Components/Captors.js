import React, { Component } from "react";
import { StyleSheet, View, Image, Text } from "react-native";
import { accelerometer, setUpdateIntervalForType, gyroscope, SensorTypes } from "react-native-sensors";
import { map, filter } from "rxjs/operators";

class Captors extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      speed: 0,
      x: 0,
      y: 0,
      z: 0
    };
  }

  componentDidMount() {
    setUpdateIntervalForType(SensorTypes.accelerometer, 400);
    setUpdateIntervalForType(SensorTypes.gyroscope, 400);
    const subscription = accelerometer.subscribe(({ x, y, z }) => {
      this.setState(state => ({
        x: x + state.x,
        y: y + state.y,
        z: z + state.z
      }));
    });

    this.setState({ subscription });
  }

  componentWillUnmount() {
    this.state.subscription.unsubscribe();
  }

  _displaySpeed(){
    return(
      <Text> SPEED : {this.state.x} / {this.state.y} / {this.state.z}  </Text>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        {this._displaySpeed()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  }
});

export default Captors
