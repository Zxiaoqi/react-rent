import React, { Component } from "react";
import { Icon, Picker } from "antd-mobile";
import CityName from "../citySelect/index";
import "./found.scss"
import axios from "axios";

axios.defaults.baseURL = "http://157.122.54.189:9060";

const seasons = [
  [
    {
      label: '2013',
      value: '2013',
    },
    {
      label: '2014',
      value: '2014',
    },
  ],
  [
    {
      label: '春',
      value: '春',
    },
    {
      label: '夏',
      value: '夏',
    },
  ],
];

class Found extends Component {
	constructor(props) {
		super(props);
		this.state = {
			sValue: ["2013", "春"],
		};
	}
	componentDidMount() {
		// axios.get("/area/map?id=").then(res => { 
		// 	console.log(res);
			
		// })
	}
	render() {
		const { district} = this.state
		return (
			<div className="founds">
				<div className="navbar">
					<div className="navbar-icon">
						<Icon type="left" />
					</div>
					<CityName iconColor="#00e064" cityName="啊哈哈" />
				</div>
				<Picker
					data={seasons}
					title="选择季节"
					cascade={false}
					extra="请选择(可选)"
					value={this.state.sValue}
					onChange={(v) => this.setState({ sValue: v })}
					onOk={(v) => this.setState({ sValue: v })}
				>
					<div>ppasdjao</div>
				</Picker>
			</div>
		);
	}
}

export default Found;
