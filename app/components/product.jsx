'uset strict';

import React from 'react';
import productActions from '../actions/productAction';
import productsStore from '../stores/productsStore';

class Product extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		
	}

	render() {
		let items = this.props.config.products.map((v) => {
			return (<li key={v.id}>id: {v.id}&nbsp;&nbsp;{v.title}</li>);
		})

		return (<div>
			<ul>
				{items}
			</ul>
		</div>);
	}
}

Product.propTypes = {
	config: React.PropTypes.object
};

Product.defaultProps = {
	config: {
		products: []
	}
};

export default Product;