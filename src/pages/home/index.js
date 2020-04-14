import React, { Component } from "react";
import { TabBar } from "antd-mobile";

class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedTab: "redTab",
			hidden: false
		};
	}

	renderContent(pageText) {
		return (
			<div>{pageText}</div>
		);
	}

	render() {
		return (
			<div style={{ position: "fixed", height: "100%", width: "100%", top: 0 }}>
				<TabBar
					unselectedTintColor="#949494"
					tintColor="#33A3F4"
					barTintColor="white"
					hidden={this.state.hidden}
				>
					<TabBar.Item
						title="首页"
						key="首页"
						icon={
							<div
								style={{
									width: "22px",
									height: "22px",
									background:
										"url(https://zos.alipayobjects.com/rmsportal/sifuoDUQdAFKAVcFGROC.svg) center center /  21px 21px no-repeat",
								}}
							/>
						}
						selectedIcon={
							<div
								style={{
									width: "22px",
									height: "22px",
									background:
										"url(https://zos.alipayobjects.com/rmsportal/iSrlOTqrKddqbOmlvUfq.svg) center center /  21px 21px no-repeat",
								}}
							/>
						}
						selected={this.state.selectedTab === "blueTab"}
						onPress={() => {
							this.setState({
								selectedTab: "blueTab",
							});
						}}
						data-seed="logId"
					>
						{this.renderContent("首页")}
					</TabBar.Item>
					<TabBar.Item
						icon={
							<div
								style={{
									width: "22px",
									height: "22px",
									background:
										"url(https://gw.alipayobjects.com/zos/rmsportal/BTSsmHkPsQSPTktcXyTV.svg) center center /  21px 21px no-repeat",
								}}
							/>
						}
						selectedIcon={
							<div
								style={{
									width: "22px",
									height: "22px",
									background:
										"url(https://gw.alipayobjects.com/zos/rmsportal/ekLecvKBnRazVLXbWOnE.svg) center center /  21px 21px no-repeat",
								}}
							/>
						}
						title="租房"
						key="租房"
						selected={this.state.selectedTab === "redTab"}
						onPress={() => {
							this.setState({
								selectedTab: "redTab",
							});
						}}
						data-seed="logId1"
					>
						{this.renderContent("租房")}
					</TabBar.Item>
					<TabBar.Item
						icon={
							<div
								style={{
									width: "22px",
									height: "22px",
									background:
										"url(https://zos.alipayobjects.com/rmsportal/psUFoAMjkCcjqtUCNPxB.svg) center center /  21px 21px no-repeat",
								}}
							/>
						}
						selectedIcon={
							<div
								style={{
									width: "22px",
									height: "22px",
									background:
										"url(https://zos.alipayobjects.com/rmsportal/IIRLrXXrFAhXVdhMWgUI.svg) center center /  21px 21px no-repeat",
								}}
							/>
						}
						title="我的"
						key="我的"
						selected={this.state.selectedTab === "greenTab"}
						onPress={() => {
							this.setState({
								selectedTab: "greenTab",
							});
						}}
					>
						{this.renderContent("我的")}
					</TabBar.Item>
				</TabBar>
			</div>
		);
	}
}


export default Home;
