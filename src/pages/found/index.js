import React, { Component } from "react";
import { Icon, Picker } from "antd-mobile";
import CityName from "components/citySearch/index";
import "./found.scss"
import { request } from "utils/request";
import { connect } from "react-redux";

import { createForm } from "rc-form";
// import arrayTreeFilter from "array-tree-filter";
import { district, provinceLite } from "antd-mobile-demo-data";



class Found extends Component {
	constructor(props) {
		super(props);
		this.state = {
			areaCity: []
		};
	}
	componentDidMount() {
		this.getCityId().then(res => { 
			// console.log(res);
			this.getAreaCity(res);
		})
		
		// console.log(this.props);
		// console.log(district);
	}
	async getCityId() { 
		const cityId = (await request.get(`/area/info?name=${this.props.cityName}`)).data.body.value
		// console.log(cityId);
		return cityId; 
	}
	async getAreaCity(id) { 
		let areaCity = [];
		const condition = (
			await request.get(`/houses/condition?id=${id}`)
		).data.body;
		const { area,subway} = condition
		areaCity.push(area, subway);
		// console.log(areaCity);
		this.setState({
			areaCity
		});
	}
	render() {
		const { getFieldProps } = this.props.form;
		const { areaCity } = this.state;
		return (
			<div className="founds">
				<div className="navbar">
					<div className="navbar-icon">
						<Icon type="left" />
					</div>
					<CityName iconColor="#00e064" />
				</div>
				<div className="area-filters">
					{areaCity.length && (
						<Picker
							title="area"
							extra="请选择(可选)"
							data={areaCity}
							{...getFieldProps("areaCity")}
							onChange={(v) => console.log(v)}
							onOk={(v) => console.log(v)}
						>
							<div className="area-name">
								<span>区域</span>
								<i></i>
							</div>
						</Picker>
					)}
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	cityName: state.mapReducer.cityName,
});

export default connect(mapStateToProps)(createForm()(Found));
