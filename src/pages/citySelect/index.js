import React, { Component } from "react";
import "../../styles/components/citysearch.scss"
import {  Button } from "antd-mobile";

class CitySelect extends Component {
	state = {
		value: "美食",
	};
	render() {
		return (
			<div className="citysearch">
				<div className="search">
					<div className="search-drop">
						<button className="search-drop-btn">下拉</button>
					</div>
					<div className="search-box">
						<i className="iconfont icon-susong-search"></i>
						<input
							className="search-box-input"
							placeholder="请输入小区或地址"
						></input>
					</div>
				</div>
				<i className="iconfont icon-ditu1"></i>
			</div>
		);
	}
}

export default CitySelect;
