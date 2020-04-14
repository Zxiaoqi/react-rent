import React, { Component,Fragment} from "react";
import { Carousel } from "antd-mobile";
import CitySelect from '../citySelect/index'
import axios from "axios";

axios.defaults.baseURL = "http://157.122.54.189:9060";

class Tabbar extends Component {
	state = {
		data: ["1", "2", "3"],
		imgHeight: 176,
	};
	componentDidMount() {
		axios.get("/home/swiper").then((res => { 
			console.log(res);
			const data = res.data.body
			this.setState({
				data
			})
		}))
	}
	render() {
		return (
			<Fragment>
				<Carousel autoplay infinite dots={false}>
					{this.state.data.map((val) => (
						<a
						key={val.id}
						style={{
								display: "inline-block",
								width: "100%",
								height: this.state.imgHeight,
							}}
							>
							<img
								src={axios.defaults.baseURL + val.imgSrc}
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
				<CitySelect></CitySelect>
			</Fragment>
		);
	}
}

export default Tabbar;
