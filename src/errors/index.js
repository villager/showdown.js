'use strict';

const Utils = require('../utils');

class ErrorManager extends Utils.Map {
	constructor() {
		super();
	}
	capture() {}
	has(id, args) {
		if (typeof id !== 'string') throw Error('Error ID does not exist');
		if (!super.has(id)) throw Error('Error Id was not registered');
		if (args === undefined) return super.get(id);
	}
}
exports.Error = ErrorManager;
const Messages = {
	UN_EXIST_USER: 'The user does not exist',
	EXIST_USER: 'The user already exist',
	EMPTY_MESSAGE: '',
};

module.exports = Messages;
