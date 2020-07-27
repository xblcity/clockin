import { Component } from "react";
import "taro-ui/dist/style/index.scss";
import { Provider } from "react-redux";
import "./app.less";
import configStore from "./store";

const store = configStore();

class App extends Component {
  componentDidMount() {}

  componentDidShow() {}

  componentDidHide() {}

  componentDidCatchError() {}

  // this.props.children 是将要会渲染的页面
  render() {
    return <Provider store={}>{this.props.children}</Provider>;
  }
}

export default App;
