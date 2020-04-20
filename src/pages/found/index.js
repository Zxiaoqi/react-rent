import React, { Component } from "react";
import { Icon, PickerView } from "antd-mobile";
import CityName from "components/citySearch/index";
import "./found.scss"
import { request } from "utils/request";
import { connect } from "react-redux";


class Found extends Component {
	constructor(props) {
		super(props);
		this.state = {
			areaCity: [],
			rentType: [],
			price: [],
			areaTitle: ["区域", "房型", "价格", "筛选"],
			value: null,
			activeIndex: null,
		};
	}
	componentDidMount() {
		this.getCityId().then((res) => {
			// console.log(res);
			this.getAreaCity(res);
		});
		// console.log(this.props);
	}
	async getCityId() {
		const cityId = (await request.get(`/area/info?name=${this.props.cityName}`))
			.data.body.value;
		// console.log(cityId);
		return cityId;
	}
	async getAreaCity(id) {
		let areaCity = [];
		const condition = (await request.get(`/houses/condition?id=${id}`)).data
			.body;
		console.log(condition);
		const {
			area, //区域
			subway, //地铁
			characteristic, //房屋亮点
			floor, //楼层
			rentType, //方式
			oriented, //朝向
			price, //价格
			roomType, //户型
		} = condition;
		areaCity.push(area, subway);

		// console.log(areaCity);
		this.setState({
			areaCity,
			rentType,
			price,
		});
	}
	onChange = (value) => {
		console.log(value);
		this.setState({
			value,
		});
	};
	onScrollChange = (value) => {
		console.log(value);
	};
	changeActive(activeIndex) {
		this.setState({
			activeIndex,
		});
		this.renderActivePicker();
	}
	//picker结构
	renderActivePicker() {
		const { areaCity, rentType, price, activeIndex } = this.state;
		if (activeIndex === 0) {
			return (
				<div className="filter-box">
					<PickerView
						onChange={this.onChange}
						onScrollChange={this.onScrollChange}
						value={this.state.value}
						data={areaCity}
					/>
					<div className="picker-select">
						<div className="cancel">取消</div>
						<div className="deter">确定</div>
					</div>
				</div>
			);
		} else if (activeIndex === 1) {
			return (
				<div className="filter-box">
					<PickerView
						onChange={this.onChange}
						onScrollChange={this.onScrollChange}
						value={this.state.value}
						data={rentType}
						cascade={false}
					/>
					<div className="picker-select">
						<div className="cancel">取消</div>
						<div className="deter">确定</div>
					</div>
				</div>
			);
		} else if (activeIndex === 2) {
			return (
				<div className="filter-box">
					<PickerView
						onChange={this.onChange}
						onScrollChange={this.onScrollChange}
						value={this.state.value}
						data={price}
						cascade={false}
					/>
					<div className="picker-select">
						<div className="cancel">取消</div>
						<div className="deter">确定</div>
					</div>
				</div>
			);
		} else if (activeIndex === 3) {
			return <div>aasds</div>;
		} else {
			return null;
		}
	}
	toBack() { 
		this.props.history.goBack();
	}
	render() {
		const { areaTitle, activeIndex } = this.state;
		return (
			<div className="founds">
				<div className="navbar">
					<div className="navbar-icon"
					onClick={() => this.toBack()}>
						<Icon type="left" />
					</div>
					<CityName iconColor="#00e064" />
				</div>
				<div className="area-filters">
					<div className="filter-picker">
						{areaTitle.map((v, i) => (
							<div
								className={[
									"filter-name",
									activeIndex === i ? "activeName" : "",
								].join(" ")}
								key={v}
								onClick={() => this.changeActive(i)}
							>
								<span>{v}</span>
								<i className="iconfont icon-bottom"></i>
							</div>
						))}
					</div>
					{this.renderActivePicker()}
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	cityName: state.mapReducer.cityName,
});

export default connect(mapStateToProps)(Found);
