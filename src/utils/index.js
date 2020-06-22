'use strict';

const BEMA = require('bema-utils');
module.exports = {
	Map: BEMA.Map,
	Set: BEMA.Set,
	Queue: require('./queue'),
	toId(text) {
		if (text && text.id) {
			text = text.id;
		}
		if (typeof text !== 'string' && typeof text !== 'number') return '';
		return ('' + text).toLowerCase().replace(/[^a-z0-9]+/g, '');
	},
};
