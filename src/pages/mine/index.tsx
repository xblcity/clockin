import React, { Component } from "react";
import { View, Text } from "@tarojs/components";
import { AtButton, AtAvatar  } from "taro-ui";
import { connect } from "@tarojs/redux";
import "./index.less";

const mapStateToProps = (state) => ({
  isLogin: state.userInfo,
});

interface IProps {
  isLogin: boolean
}
class Clockin extends Component<IProps> {
  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  render() {
    const { isLogin } = this.props;
    console.log(isLogin)
    return (
      <View className='mineContainer'>
        {isLogin ? (
          <View className='noLogin'>
            <AtButton>点击登录</AtButton>
          </View>
        ) : (
          <View className='user'>
            <AtAvatar circle image='https://jdc.jd.com/img/200'></AtAvatar>
            <AtButton>昵称</AtButton>
          </View>
        )}
      </View>
    );
  }
}

export default connect(mapStateToProps)(Clockin);
