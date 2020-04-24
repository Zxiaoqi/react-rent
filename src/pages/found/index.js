import React, { Component } from "react";
import { Icon, PickerView } from "antd-mobile";
import CityName from "components/citySearch/index";
import Css from "./found.module.scss"
import { request,baseURL } from "utils/request";
import { connect } from "react-redux";
import { List } from "react-virtualized";

console.log(Css);

class Found extends Component {
	constructor(props) {
		super(props);
		this.state = {
			filterlist: [],
			areaTitle: ["区域", "房型", "价格", "筛选"],
			value: null,
			activeIndex: null, //null
			selectFilter: [[], [], [], []],
			houseList: [],
			houseCount: 0,
		};
	}
	componentDidMount() {
		this.getCityId().then((res) => {
			// console.log(res);
			this.getAreaCity(res);
			this.getHouseList(res);
		});
	}
	async getCityId() {
		const cityId = (await request.get(`/area/info?name=${this.props.cityName}`))
			.data.body.value;
		// console.log(cityId);
		return cityId;
	}
	async getAreaCity(id) {
		let filterlist = [];
		const condition = (await request.get(`/houses/condition?id=${id}`)).data
			.body;
		// console.log(condition);
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
		filterlist.push([area, subway]);
		filterlist.push(rentType);
		filterlist.push(price);
		filterlist.push([
			{ label: "户型", children: roomType },
			{ label: "房屋亮点", children: characteristic },
			{ label: "楼层", children: floor },
			{ label: "朝向", children: oriented },
		]);
		this.setState({
			filterlist,
		});
	}
	async getHouseList(id) {
		const { list, count } = (
			await request.get("/houses?cityId=" + id)
		).data.body;
		// console.log(res);
		this.setState({
			houseList: list,
			houseCount: count,
		});
	}
	//activerIndex改变
	changeActive(activeIndex) {
		this.setState({
			activeIndex,
		});
	}
	//Picker选中
	onChange = (value) => {
		// console.log(value);
		const { selectFilter, activeIndex } = this.state;
		selectFilter[activeIndex] = value;
		this.setState({
			selectFilter,
		});
	};
	//选中
	handleSelectFilter(val) {
		const { selectFilter, activeIndex } = this.state;
		let index = selectFilter[activeIndex].findIndex((v) => v === val);
		if (index === -1) {
			selectFilter[activeIndex].push(val);
		} else {
			selectFilter[activeIndex].splice(index, 1);
		}
		this.setState({
			selectFilter,
		});
	}

	//确定选择
	handleSubmit = () => {
		const { selectFilter } = this.state;
		const areaOrSubway = selectFilter[0][0],
			rentType = selectFilter[1][0],
			price = selectFilter[2][0],
			more = selectFilter[3].join(',');
		//判断区域属性值
		let areaOrSubway_val = ["null", undefined].includes(selectFilter[0][2])
			? selectFilter[0][1]
			: selectFilter[0][2];
		//构建对象数据
		let obj = {
			[areaOrSubway]: areaOrSubway_val,
			rentType,
			price,
			more,
		};
		//过滤不合理的属性
		for (const key in obj) {
			if (["null","",undefined].includes(obj[key])) {
				delete obj[key]
			}
		}
		console.log(obj);
		

	};
	//picker结构
	renderActivePicker() {
		const { filterlist, activeIndex, selectFilter } = this.state;
		if (filterlist.length == 0) {
			return null;
		} else if (activeIndex >= 0 && activeIndex <= 2) {
			return (
				<div className={Css.filter_box}>
					<PickerView
						onChange={this.onChange}
						value={selectFilter[activeIndex]}
						data={filterlist[activeIndex]}
						cascade={activeIndex == 0 ? true : false}
					/>
					<div className={Css.picker_select}>
						<div className={Css.cancel} onClick={this.hideMask}>
							取消
						</div>
						<div className={Css.deter} onClick={this.handleSubmit}>
							确定
						</div>
					</div>
				</div>
			);
		} else if (activeIndex === 3) {
			return (
				<div className={Css.filter_content}>
					<div className={Css.filter_list}>
						{filterlist[activeIndex].map((v) => (
							<div className={Css.filter_item} key={v.label}>
								<div className={Css.item_title}>{v.label}</div>
								<div className={Css.item_tags}>
									{v.children.map((item) => (
										<div
											className={[
												Css.tag,
												selectFilter[activeIndex].findIndex(
													(v) => v === item.value
												) !== -1
													? Css.tag_active
													: "",
											].join(" ")}
											key={item.value}
											onClick={() => this.handleSelectFilter(item.value)}
										>
											{item.label}
										</div>
									))}
								</div>
							</div>
						))}
					</div>
					<div className={Css.picker_select}>
						<div className={Css.cancel} onClick={this.hideMask}>
							清除
						</div>
						<div className={Css.deter} onClick={this.handleSubmit}>
							确定
						</div>
					</div>
				</div>
			);
		} else {
			return null;
		}
	}
	//hide遮罩层
	hideMask = () => {
		this.setState({
			activeIndex: null,
		});
	};
	toBack() {
		this.props.history.goBack();
	}
	//list-item结构
	rowRenderer = ({ key, index, isScrolling, isVisible, style }) => {
		const { houseList } = this.state;
		return houseList.map((v) => (
			<div key={v.houseCode} className={Css.item_content}>
				<div className={Css.list_img}>
					<img src={baseURL + v.houseImg} />
				</div>
				<div className={Css.item_house}>
					<div className={Css.house_name}>{v.title}</div>
					<div className={Css.house_desc}>{v.desc}</div>
					{v.tags.map((tag) => (
						<span key={tag} className={Css.tags}>
							{tag}
						</span>
					))}
					<div className={Css.price}>
						<span>{v.price}</span>
						元/月
					</div>
				</div>
			</div>
		));
	};
	render() {
		const { areaTitle, activeIndex, houseList } = this.state;
		return (
			<div className={Css.founds}>
				<div className={Css.navbar}>
					<div className={Css.navbar_icon} onClick={() => this.toBack()}>
						<Icon type="left" />
					</div>
					<CityName iconColor="#00e064" />
				</div>
				<div
					className={Css.area_filters}
					style={{ zIndex: activeIndex == 3 ? "auto" : 999 }}
				>
					<div className={Css.filter_picker}>
						{areaTitle.map((v, i) => (
							<div
								className={[
									Css.filter_name,
									activeIndex === i ? Css.activeName : "",
								].join(" ")}
								key={v}
								onClick={() => this.changeActive(i)}
							>
								<span>{v}</span>
								<i
									className={[Css.bottom_icon, "iconfont icon-bottom"].join(
										" "
									)}
								></i>
							</div>
						))}
					</div>
					{activeIndex !== null && this.renderActivePicker()}
				</div>
				{activeIndex !== null && (
					<div className={Css.mask} onClick={this.hideMask}></div>
				)}
				{/* <div>asdasdasda</div> */}
				<List
					className={Css.house_list}
					width={window.screen.width}
					height={window.screen.height - 90}
					rowCount={houseList.length}
					rowHeight={90}
					rowRenderer={this.rowRenderer}
				/>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	cityName: state.mapReducer.cityName,
});

export default connect(mapStateToProps)(Found);
