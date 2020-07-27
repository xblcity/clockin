import React, { Component } from "react";
import { View, Text, Button } from "@tarojs/components";
import { AtButton } from "taro-ui";
import "./index.less";

export default class Index extends Component {
  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  render() {
    return (
      <View className='index'>
        <Text>mine</Text>
        <Button>按钮文案</Button>
      </View>
    );
  }
}
