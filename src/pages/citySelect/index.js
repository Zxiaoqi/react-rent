import React, { Component } from "react";
import "./citysearch.scss"

class CitySelect extends Component {
	state = {
		value: "",
	};
	render() {
		return (
			<div className="citysearch">
				<div className="search">
					<div className="search-drop">
						<button className="search-drop-btn">{this.props.cityName}</button>
						<i className="iconfont icon-bottom"></i>
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
