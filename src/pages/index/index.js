import React, { Component,Fragment} from "react";
import { Carousel } from "antd-mobile";
import "styles/pages/index.scss"
import CitySelect from 'components/citySearch/index'
import { request,baseURL } from "utils/request";

class Tabbar extends Component {
	state = {
		swiperlist: [],
		imgHeight: 176,
		navs: [
			{
				id: 0,
				text: "整租",
				icon: "icon-zhengzu",
			},
			{
				id: 1,
				text: "合租",
				icon: "icon-hezu1",
			},
			{
				id: 2,
				text: "地图找房",
				icon: "icon-dingweidituzhaofangxianxing",
			},
			{
				id: 3,
				text: "出租",
				icon: "icon-chuzu",
			},
		],
		groupslist: [],
		newslist: []
	};
	componentDidMount() {
		this.getSwiper();
		this.getGroups();
		this.getNews();
	}
	getSwiper() {
		request.get("/home/swiper").then((res) => {
			// console.log(res);
			const swiperlist = res.data.body;
			this.setState({
				swiperlist,
			});
		});
	}
	getGroups() {
		request.get("/home/groups").then((res) => {
			// console.table(res.data.body);
			this.setState({
				groupslist: res.data.body,
			});
		});
	}
	getNews() {
		request.get("/home/news").then((res) => {
			// console.table(res.data.body);
			this.setState({
				newslist: res.data.body,
			});
		});
	}
	render() {
		const { swiperlist, navs, groupslist, newslist } = this.state;
		return (
			<Fragment>
				<div className="swiper-box">
					{swiperlist.length && (
						<Carousel autoplay infinite>
							{swiperlist.map((val) => (
								<a
									key={val.id}
									style={{
										display: "inline-block",
										width: "100%",
										height: this.state.imgHeight,
									}}
								>
									<img
										src={baseURL + val.imgSrc}
										alt=""
										style={{ width: "100%", verticalAlign: "top" }}
										onLoad={() => {
											// fire window resize event to change height
											window.dispatchEvent(new Event("resize"));
											this.setState({ imgHeight: "auto" });
										}}
									/>
								</a>
							))}
						</Carousel>
					)}
					<CitySelect
						className="citysearch"
						iconColor="#fff"
					></CitySelect>
				</div>
				<div className="navs">
					{navs.map((item) => (
						<div className="navs-item" key={item.id}>
							<i className={"navs-icon iconfont " + item.icon}></i>
							<span className="navs-item-text">{item.text}</span>
						</div>
					))}
				</div>
				<div className="groups">
					<div className="groups-title">
						<h3 className="groups-h2">租房小组</h3>
						<span>更多</span>
					</div>
					<div className="groups-box">
						{groupslist.map((item) => (
							<div className="groups-item" key={item.id}>
								<div className="groups-item-left">
									<h3>{item.title}</h3>
									<p>{item.desc}</p>
								</div>
								<img
									className="groups-item-right"
									src={baseURL + item.imgSrc}
								></img>
							</div>
						))}
					</div>
				</div>
				<div className="index_news">
					<div className="news_title">最新资讯</div>
					<div className="news_content">
						{newslist.map((v) => (
							<div key={v.id} className="news_item">
								<div className="news_item_img">
									<img src={baseURL + v.imgSrc} alt="" />
								</div>
								<div className="news_item_info">
									<div className="news_item_title">{v.title}</div>
									<div className="news_item_desc">
										<span className="from">{v.from}</span>
										<span className="date">{v.date}</span>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</Fragment>
		);
	}
}


export default Tabbar;
