const contentfulRenderer = require('@contentful/rich-text-plain-text-renderer')

function calculateReadingTime(content) {
	if (!content || !content.raw) return ''

	const richObject = JSON.parse(content.raw)
	const plainText = contentfulRenderer.documentToPlainTextString(richObject)

	const wordsPerMinute = 270
	const words = plainText.split(' ').filter(word => word.trim().length > 0).length
	const minutes = words / wordsPerMinute
	const time = Math.floor(minutes) || 1

	return `${time} min read`
}

function isRichText(field) {
	try {
		const parsed = JSON.parse(field.raw)
		return parsed && parsed.nodeType === 'document'
	} catch (e) {
		return false
	}
}

const createReadingTimeNode = async ({ node, actions }, pluginOptions) => {
	if (!node.internal.type.startsWith('Contentful')) return;

	const { contentTypes } = pluginOptions

	// Skip nodes that are not part of the specified content types
	if (contentTypes && !contentTypes.includes(node.internal.type)) return;

	const { createNodeField } = actions
	// Iterate over all fields in the node to find Rich Text fields
	Object.keys(node).forEach(fieldKey => {
		const fieldValue = node[fieldKey]

		// Check if the field is a Rich Text field (has a 'raw' property)
		if (fieldValue && fieldValue.raw && isRichText(fieldValue)) {
			const timeToReadMins = calculateReadingTime(fieldValue)

			createNodeField({
				node,
				name: `${fieldKey}TimeToRead`,
				value: timeToReadMins,
			})
		}
	})
}

module.exports = createReadingTimeNode

