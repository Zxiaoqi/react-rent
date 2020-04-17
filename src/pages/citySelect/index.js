import React, { Component, Fragment } from "react";
import { NavBar, Icon } from "antd-mobile";
import { connect } from 'react-redux'
import { request, baseURL } from 'utils/request'
import "./index.scss"

class CitySelect extends Component {
	constructor(props) {
		super(props);
		this.state = { cityList: [] };
	}
	componentDidMount() {
		this.getAreaHot();
	}
	getAreaHot() {
		let cityList = JSON.parse(JSON.stringify(this.state.cityList));
		cityList.push({
			title: "当前定位",
			children: [
				{
					label: this.props.cityName,
				},
			],
		});
		let city1 = request.get("/area/hot").then((res) => {
			// console.log(res.data.body);
			const hotData = res.data.body;
			cityList = cityList.concat(
				[{
					title: "热门城市",
					children: hotData,
				}]
			);
		});
		let city2 = request.get("/area/city?level=1").then((res) => {
			// console.log(res.data.body);
			const cityData = res.data.body;
			//设定遍历参考
			let letters = "ABCDEFGHJKLMNOPQRSTWXYZ".split("");
			let zh = "abcdefghjklmnopqrstwxyz".split("");
			
			let cityArr = [], cityitem = {};
			//遍历
			letters.map((item, n) => {
				cityitem = {
					title: item,
					children:[]
				}
				cityData.map((v, i) => { 
					if (!zh[n] || new RegExp("^" + zh[n]).test(v.short)) {
						cityitem.children.push(v);
					}
				})
				if (cityitem.children.length>0) { 
					cityArr.push(cityitem)
				}
			});
			// console.log(cityArr);
			cityList = cityList.concat(cityArr);
			
		});
		Promise.all([city1, city2]).then(res => { 
			// console.log(res);
			this.setState({
				cityList,
			});
		})
	}
	render() {
		const { cityList} = this.state
		return (
			<Fragment>
				<NavBar
					mode="light"
					icon={<Icon type="left" />}
					onLeftClick={() => console.log("onLeftClick")}
				>
					城市选择
				</NavBar>
				<div className="citylist">
					{cityList.map((v,i) => (
						<div className="city" key={i}>
							<div className="title">{v.title}</div>
							{v.children.length &&
								v.children.map((city) => <div className="name" key={city.label}>{city.label}</div>)}
						</div>
					))}
				</div>
			</Fragment>
		);
	}
}
const mapStateToProps = (state) => ({
	cityName: state.mapReducer.cityName,
});

export default connect(mapStateToProps)(CitySelect);
