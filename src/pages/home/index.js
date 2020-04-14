import React, { Component } from "react";
import { TabBar } from "antd-mobile";
import {Route,Redirect} from 'react-router-dom'
import Index from "../index/index";
import Found from "../found/";
import My from "../my/";

class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
		};
	}
	render() {
		return (
			<div style={{ position: "fixed", height: "100%", width: "100%", top: 0 }}>
				<TabBar
					unselectedTintColor="#949494"
					tintColor="#00e064"
					barTintColor="white"
				>
					<TabBar.Item
						title="首页"
						key="首页"
						icon={<i className="iconfont icon-index"></i>}
						selectedIcon={<i className="iconfont icon-index"></i>}
						selected={this.props.location.pathname === "/home/index"}
						onPress={() => {
							this.props.history.push("/home/index");
						}}
						data-seed="logId"
					>
						<Route exact path="/home">
							<Redirect to="/home/index"></Redirect>
						</Route>
						<Route path="/home/index" component={Index}></Route>
					</TabBar.Item>
					<TabBar.Item
						icon={<i className="iconfont icon-zhaofang"></i>}
						selectedIcon={<i className="iconfont icon-zhaofang"></i>}
						title="租房"
						key="租房"
						selected={this.props.location.pathname === "/home/found"}
						onPress={() => {
							this.props.history.push("/home/found");
						}}
						data-seed="logId1"
					>
						<Route path="/home/found" component={Found}></Route>
					</TabBar.Item>
					<TabBar.Item
						icon={<i className="iconfont icon-wodedangxuan"></i>}
						selectedIcon={<i className="iconfont icon-wodedangxuan"></i>}
						title="我的"
						key="我的"
						selected={this.props.location.pathname === "/home/my"}
						onPress={() => {
							this.props.history.push("/home/my");
						}}
					>
						<Route path="/home/my" component={My}></Route>
					</TabBar.Item>
				</TabBar>
			</div>
		);
	}
}


export default Home;
