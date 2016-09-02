'use strict';

let dispatcher = require("../dispatcher/dispatcher");
let productConstrants = require("../constants/productConstants");
let _products = [];
let assign = require("object-assign");
let EventEmiter = require("events").EventEmitter;
let CHANGE_EVENT = "change";

let productsStore = assign({}, EventEmiter.prototype, {
	getAll: function() {
		return _products;
	},

	addChangeListener: function(callback) {
		this.on(CHANGE_EVENT, callback);
	},

	emitChange: function() {
		this.emit(CHANGE_EVENT);
	},

	removeChangeListener: function(callback) {
		this.removeListener(CHANGE_EVENT, callback);
	},

	deleteProductById: function(id) {
		let index = this.getProductIndexBaseOnProductId(id);

		if (index === false) {
			return false;
		}

		_products.splice(index, 1);
	},

	getProductIndexBaseOnProductId: function(id) {
		for(let index in _products) {
			let product = _products[index];

			if (product.id === id) {
				return parseInt(index);
			}
		}

		return false;
	},

	setProducts: function(products) {
		_products = products;
	},

	addProduct: function(product) {
		_products.push(product);
	},

	dispatchIndex: dispatcher.register((payLoad) => {
		switch(payLoad.action) {
			case productConstrants.ADD_PRODUCT:
				productsStore.addProduct(payLoad.data);
				productsStore.emitChange();
				break;
			case productConstrants.DELETE_PRODUCT:
				productsStore.deleteProductById(payLoad.data.id);
				productsStore.emitChange();
			default:
				break;	
		}
	}),
});

module.exports = productsStore;