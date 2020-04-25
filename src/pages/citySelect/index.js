import React, { Component } from "react";
import { NavBar, Icon } from "antd-mobile";
import { connect } from 'react-redux'
import { request } from 'utils/request'
import "./index.scss"
import { List } from "react-virtualized";
import { actionUpdateCity, actionClearCity } from "store/actionCreator";

class CitySelect extends Component {
	constructor(props) {
		super(props);
		this.state = {
			cityList: [],
			letterList: [],
			currentIndex: 0,
		};
		this.listRef = React.createRef();
	}
	componentDidMount() {
		this.getAreaHot();
		// console.log(this.props);
	}
	async getAreaHot() {
		let letterList = ["#", "热"];
		const cityList = JSON.parse(JSON.stringify(this.state.cityList));
		cityList.push({
			title: "当前定位",
			children: [{ label: this.props.cityName }],
		});
		const res = await Promise.all([
			request.get("/area/hot"),
			request.get("/area/city?level=1"),
		]);
		const hotData = res[0].data.body;
		// console.log(hotData);
		cityList.push({ title: "热门城市", children: hotData });

		const cityData = res[1].data.body;
		// console.log(cityData);
		//设定遍历参考
		const zh = "abcdefghjklmnopqrstwxyz".split("");
		let cityArr = [],
			cityitem = {};
		//遍历
		zh.forEach((item, n) => {
			cityitem = {
				title: item.toLocaleUpperCase(),
				children: [],
			};
			cityData.forEach((v, i) => {
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
		this.listRef.measureAllRows();
	}
	//列表结构
	rowRenderer = ({ key, index, isScrolling, isVisible, style }) => {
		const cityitem = this.state.cityList[index];
		return (
			<div key={key} style={style} className="city">
				<div className="title">{cityitem.title}</div>
				{cityitem.children.length &&
					cityitem.children.map((v) => (
						<div
							className="name"
							key={v.label}
							onClick={() => this.handleCityName(v.label)}
						>
							{v.label}
						</div>
					))}
			</div>
		);
	};
	//city点击事件
	handleCityName(cityName) {
		// console.log(cityName);
		this.props.actionClearCity()
		this.props.actionUpdateCity(cityName);
		this.props.history.goBack()
	 }
	//大行高
	rowHeight = ({ index }) => {
		return this.state.cityList[index].children.length * 50 + 40;
	};
	//activeIndex
	handleActiveIndex(currentIndex) {
		// this.setState({
		// 	currentIndex,
		// });
		this.listRef.scrollToRow(currentIndex);
	}
	//滚动activeIndex
	RowsRendered = ({ startIndex }) => {
		if (this.state.currentIndex !== startIndex) {
			this.setState({
				currentIndex: startIndex,
			});
		}
	};
	toBack() {
		this.props.history.goBack();
	}
	render() {
		const { cityList, letterList, currentIndex } = this.state;
		return (
			<div className="cityselect">
				<NavBar
					mode="light"
					icon={<Icon type="left" />}
					onLeftClick={() => this.toBack()}
				>
					城市选择
				</NavBar>
				<div className="citylist">
					<List
						ref={(ref) => (this.listRef = ref)}
						width={window.screen.width}
						height={window.screen.height - 45}
						rowCount={cityList.length}
						rowHeight={this.rowHeight}
						rowRenderer={this.rowRenderer}
						// scrollToIndex={currentIndex}
						scrollToAlignment={"start"}
						onRowsRendered={this.RowsRendered}
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
	cityName: state.mapReducer.cityName.name,
});

const mapActionToProps = (dispatch) => { 
	return {
		actionUpdateCity(cityName) { 
			dispatch(actionUpdateCity(cityName));
		},
		actionClearCity() { 
			dispatch(actionClearCity())
		}
	};
}


export default connect(mapStateToProps, mapActionToProps)(CitySelect);
