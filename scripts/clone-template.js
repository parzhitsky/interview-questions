const camel = require("camelcase");
const { existsSync: exists, readFileSync: read } = require("fs");
const { resolve } = require("path");

class TemplateNotFoundError extends global.Error {
	/**
	 * @param {string} templateType
	 * @param {string} entityType
	 */
	constructor(templateType, entityType) {
		super(`No "${templateType}" template found for "${entityType}" files!`);
	}
}

const patterns = {
	entityType: /__ETYPE__/g,
	entityName: /__ENAME__/g,
	entityNameCamelCase: /__CAMEL__/g,
	description: /__DESCR__/g,
};

/**
 * @typedef Substitutions
 * @property {string} entityType
 * @property {string} entityName
 * @property {string} description
 */
/**
 * @param {string} entityType
 * @param {string} dir
 * @param {Substitutions} substitutions
 * @returns {string}
 */
function cloneTemplate(entityType, dir, substitutions) {
	const templatePath = resolve(__dirname, "assets", `${entityType}.${dir}.template`);

	if (!exists(templatePath))
		throw new TemplateNotFoundError(dir, entityType);

	return read(templatePath, "utf8")
		.replace(patterns.entityType, substitutions.entityType)
		.replace(patterns.entityName, substitutions.entityName)
		.replace(patterns.entityNameCamelCase, camel(substitutions.entityName))
		.replace(patterns.description, substitutions.description);
}

module.exports = {
	default: cloneTemplate,
	TemplateNotFoundError,
};
