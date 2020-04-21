import React, { Component, Fragment } from "react";
import { NavBar, Icon } from "antd-mobile";
import Css from "./mapFound.module.scss"
import {connect } from 'react-redux'
import { request } from "utils/request";

const BMap = window.BMap;
let map = null;
class MapFound extends Component {
	getMapInfo=(function() { 
		let mapInfos = [
				{ times: 1, cls: "circle", zoom: 11 },
				{ times: 2, cls: "circle", zoom: 13 },
				{ times: 3, cls: "rect", zoom: 15 },
			];
		let index = -1;
		return function () { 
			return mapInfos[++index] 
		}
	})()
	componentDidMount() {
		this.mapFound();
	}
	async mapFound() {
		const cityName = this.props.cityMsg.name;
		map = new BMap.Map("allmap");
		//添加控件和比例尺
		map.addControl(new BMap.ScaleControl());
		map.addControl(new BMap.NavigationControl());

		const id = (await request.get("/area/info?name=广州" )).data.body
			.value;
		
		this.showOpts(id, cityName);
	}
	async showOpts(id, address) {
		const mapInfo = this.getMapInfo();
		
		map.centerAndZoom(address, mapInfo.zoom);

		const houseData = (await request.get("area/map?id=" + id)).data.body;
		houseData.forEach((v) => {
			const point = new BMap.Point(v.coord.longitude, v.coord.latitude);
			const opts = {
				position: point, // 指定文本标注所在的地理位置
				offset: new BMap.Size(0, 0), //设置文本偏移量
			};
			const label = new BMap.Label(
				`<div class=${Css[mapInfo.cls]}>
				<p>${v.label}</p>
				<p>${v.count + "套"}</p>
				</div>`,
				opts
			); // 创建文本标注对象

			label.setStyle({
				border: "none",
				backgroundColor: "transparent"
			});

			label.onclick = () => {
				if (mapInfo.times === 3) {
					console.log("aaa");
				} else {
					// map.zoomTo(map.getZoom() + 2);
					setTimeout(() => {
						map.clearOverlays();
					}, 0);
					const newId = v.value;
					const newPoint = point;
					this.showOpts(newId, newPoint);
				}
			};
			map.addOverlay(label);
		});
	}
	toBack() {
		this.props.history.goBack();
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
				<div className={Css.map_allmap}>
					<div id="allmap" className={Css.allmap}></div>
				</div>
			</Fragment>
		);
	}
}
const mapStateToProps = (state) => { 
	// console.log(state);
	return {
		cityMsg:state.mapReducer.cityName
	}
}

export default connect(mapStateToProps)(MapFound);
