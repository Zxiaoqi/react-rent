import React, { Component, Fragment } from "react";
import { NavBar, Icon } from "antd-mobile";
import "./mapFound.scss"
import {connect } from 'react-redux'
import { request } from "utils/request";

class MapFound extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	componentDidMount() {
		this.mapFound();
	}
	async mapFound() {
		const BMap = window.BMap;
		const { lng,lat} =this.props.cityCenter
		// 百度地图API功能
		let map = new BMap.Map("allmap");
		map.centerAndZoom(new BMap.Point(lng, lat), 11);
		//添加控件和比例尺
		map.addControl(new BMap.ScaleControl());
		map.addControl(new BMap.NavigationControl());

		const infoName = (await request.get("/area/info?name=广州")).data.body.value
		// console.log(infoName);
		const houseData = (await request.get("area/map?id=" + infoName)).data.body
		console.log(houseData);

		houseData.forEach(v => { 
			const point = new BMap.Point(v.coord.longitude, v.coord.latitude);
			map.centerAndZoom(point, 11);
			const opts = {
				position: point, // 指定文本标注所在的地理位置
				offset: new BMap.Size(), //设置文本偏移量
			};
			const label = new BMap.Label(
				`<div class='map-opts'>
				<p>${v.label}</p>
				<p>${v.count +"套"}</p>
				</div>`, opts); // 创建文本标注对象
			// label.setContent(
			// 	'<div className="map-opts>'+
			// 	'<span>'+v.label+'</span>'+
			// 	'<span>'+v.count + '套</span>'+
			// 	'</div>'
			// );
			
			label.setStyle({
				border: "1px solid #eee",
				borderRadius: "50%",
				backgroundColor: "#00e064",
				fontSize: "12px",
				fontFamily: "微软雅黑",
			});
			map.addOverlay(label);   
		})
		
	}
	toBack() { 
		this.props.history.goBack()
	}
	render() {
		return (
			<Fragment>
				<NavBar
					mode="light"
					icon={<Icon type="left" />}
					onLeftClick={() => this.toBack()}
				>
					城市地图
				</NavBar>
				<div className="map_allmap">
					<div id="allmap"></div>
				</div>
			</Fragment>
		);
	}
}
const mapStateToProps = (state) => { 
	// console.log(state);
	return {
		cityCenter:state.mapReducer.cityName.center
	}
}

export default connect(mapStateToProps)(MapFound);
