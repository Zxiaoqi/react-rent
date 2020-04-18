import React, { Component} from "react";
import { List } from "react-virtualized";

// List data as an array of strings
const list = Object.keys(String(new Array(101)))

function rowRenderer({key, index, isScrolling, isVisible, style}) {
	return (
		<div key={key} style={style}>
			{list[index]}
		</div>
	);
}

class Demolist extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return (
        <List
		width={300}
		height={300}
		rowCount={list.length}
		rowHeight={20}
		rowRenderer={rowRenderer}
	/> );
    }
}
 
export default Demolist;
