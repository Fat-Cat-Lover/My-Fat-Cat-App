import React, { Component } from 'react';
import { Button, Image, Text, View } from 'react-native';

export class Home extends Component {
  render() {
    return (
      <View>
        <View>
          <Image source={{ uri: '' }} />
          <Image source={{ uri: '' }} />
        </View>
        <View>
          <Text>Kiwi</Text>
          <Text>體重(kg): 8.2</Text>
          <View>
            <>
              <View>
                <Text>16/32</Text>
              </View>
              <Button title="運動" onPress={() => { }} />
            </>
            <>
              <View>
                <Text>1600/3200</Text>
              </View>
              <Button title="餵食" onPress={() => { }} />
            </>
          </View>
        </View>
      </View>
    );
  }
}
