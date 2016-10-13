'use strict';

import {apiPath} from '../configs/apiConfig';
import menuStore from '../stores/menuStore';
import 'whatwg-fetch';

module.exports = {
	getApiPath: function(path) {
		return apiPath + path;
	},

	getCategories: function() {
		return new Promise((resolve, reject) => {
			fetch(this.getApiPath("categories")).then((res) => {
				return res.json();
			}).then((response) => {
				let categories = [{
					title: "HOME",
					href: "/",
					active: "false"
				}];

				jQuery.each(response, (k, v) => {
					let item = {
						id: v.id,
						title: v.name.toUpperCase(),
						href: "/products/" + v.name,
						active: false
					};

					categories.push(item);
				});

				resolve(categories);
			}).catch((e) => {
				reject(e);
			});;
		}); 
	},

	getProducts: function(category) {
		return new Promise((resolve, reject) => {
			let path = this.getApiPath("products");	

			if (category) {
				let menu = menuStore.getMenuByName(category.toUpperCase());
				
				if (menu) {
					path += "/" + menu.id;
				}
			}

			fetch(path).then((res) => {
				return res.json();
			}).then((response) => {
				resolve(response);
			}).catch((e) => {
				reject(e);
			});
		});
	},

	regiserNewUser: function(userInfo) {
		return new Promise((resolve, reject) => {
			let path = this.getApiPath("customer/register");

			fetch(path, {method: "POST", body: JSON.stringify(userInfo)}).then((res) => {
				return res.json();
			}).then((response) => {
				resolve(response);
			}).catch((e) => {
				reject(e);
			});
		});
	},

	loginUser: function(username, password) {
		return new Promise((resolve, reject) => {
			let path = this.getApiPath("customer/login");
			let loginInfo = {
				username: username,
				password: password
			}
			fetch(path, {
				method: "POST",
				body: JSON.stringify(loginInfo)
			}).then((res) => {
				return res.json();
			}).then((response) => {
				resolve(response);
			}).catch((e) => {
				reject(e);
			});
		});
	}
}

