"use strict";

const Extensions = require('./extensions');

module.exports = {
    Map: Extensions.Map,
    Set: Extensions.Set,
    toId(text) {
        if (text && text.id) {
			text = text.id;
		}
		if (typeof text !== 'string' && typeof text !== 'number') return '';
		return ('' + text).toLowerCase().replace(/[^a-z0-9]+/g, '');
    },
};