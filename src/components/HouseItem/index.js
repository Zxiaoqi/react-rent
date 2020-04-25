import React, { Component } from "react";
import { baseURL } from "utils/request";
import Css from "./index.module.scss";
class HouseItem extends Component {
    render() { 
        const item = this.props.HouseItem;
        return (
					<div className={Css.item_content}>
						<div className={Css.list_img}>
							<img src={baseURL + item.houseImg} alt=""/>
						</div>
						<div className={Css.item_house}>
							<div className={Css.house_name}>{item.title}</div>
							<div className={Css.house_desc}>{item.desc}</div>
							{item.tags.map((tag) => (
								<span key={tag} className={Css.tags}>
									{tag}
								</span>
							))}
							<div className={Css.price}>
								<span>{item.price}</span>
								元/月
							</div>
						</div>
					</div>
				);
    }
}
 
export default HouseItem;