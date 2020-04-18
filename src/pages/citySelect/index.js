import React, { Component } from "react";
import { NavBar, Icon } from "antd-mobile";
import { connect } from 'react-redux'
import { request } from 'utils/request'
import "./index.scss"
import { List } from "react-virtualized";

class CitySelect extends Component {
	constructor(props) {
		super(props);
		this.state = {
			cityList: [],
			letterList: [],
			currentIndex: 0,
		};
	}
	componentDidMount() {
		this.getAreaHot();
	}
	async getAreaHot() {
		let letterList = ["#", "热"];
		const cityList = JSON.parse(JSON.stringify(this.state.cityList));
		cityList.push({
			title: "当前定位",
			children: [{ label: this.props.cityName }],
		});

		const hotData = (await request.get("/area/hot")).data.body;
		// console.log(hotData);
		cityList.push({ title: "热门城市", children: hotData });

		const cityData = (await request.get("/area/city?level=1")).data.body;
		// console.log(cityData);
		//设定遍历参考
		const zh = "abcdefghjklmnopqrstwxyz".split("");
		let cityArr = [],
			cityitem = {};
		//遍历
		zh.map((item, n) => {
			cityitem = {
				title: item.toLocaleUpperCase(),
				children: [],
			};
			cityData.map((v, i) => {
				if (!zh[n] || new RegExp("^" + zh[n]).test(v.short)) {
					cityitem.children.push(v);
				}
			});
			if (cityitem.children.length > 0) {
				cityArr.push(cityitem);
				letterList.push(cityitem.title);
			}
		});
		// console.log(cityArr);
		cityList.push(...cityArr);
		this.setState({ cityList, letterList });
		// console.log(letterList);
	}
	rowRenderer = ({ key, index, isScrolling, isVisible, style }) => {
		const cityitem = this.state.cityList[index];
		return (
			<div key={key} style={style} className="city">
				<div className="title">{cityitem.title}</div>
				{cityitem.children.length &&
					cityitem.children.map((v) => (
						<div className="name" key={v.label}>
							{v.label}
						</div>
					))}
			</div>
		);
	};
	rowHeight = ({ index }) => {
		return this.state.cityList[index].children.length * 50 + 40;
	};
	handleActiveIndex(currentIndex) {
		this.setState({
			currentIndex
		});
	};
	render() {
		const { cityList, letterList, currentIndex } = this.state;
		return (
			<div className="cityselect">
				<NavBar
					mode="light"
					icon={<Icon type="left" />}
					onLeftClick={() => console.log("onLeftClick")}
				>
					城市选择
				</NavBar>
				<div className="citylist">
					<List
						width={window.screen.width}
						height={window.screen.height - 45}
						rowCount={cityList.length}
						rowHeight={this.rowHeight}
						rowRenderer={this.rowRenderer}
						scrollToIndex={currentIndex}
						scrollToAlignment={"start"}
					/>
					<div className="letter">
						{letterList.map((v, i) => (
							<div
								className={[
									"letter-view",
									currentIndex === i ? "activeIndex" : "",
								].join(" ")}
								key={v}
								onClick={() => this.handleActiveIndex(i)}
							>
								<span>{v}</span>
							</div>
						))}
					</div>
				</div>
			</div>
		);
	}
}
const mapStateToProps = (state) => ({
	cityName: state.mapReducer.cityName,
});

export default connect(mapStateToProps)(CitySelect);
