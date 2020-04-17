import React, { Component } from "react";
import "./citysearch.scss";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

class CitySelect extends Component {
	
	render() {
		const { history } = this.props;
		return (
			<div className="citysearch">
				<div className="search" onClick={() => history.push("/cityselect")}>
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
				<i
					onClick={() => history.push("/mapfound")}
					className="iconfont icon-ditu1"
					style={{ color: this.props.iconColor }}
				></i>
			</div>
		);
	}
}
//映射全局属性
const mapStateToProps = (state) => ({
	cityName: state.mapReducer.cityName,
});

export default connect(mapStateToProps)(withRouter(CitySelect));
