var serve = {
	formcfg: {
		"type": "object",
		"properties": {
			"group_all": {
				"type": "object",
				"x-component": "card",
				"x-props": {
					"title": ''
				},
				"properties": {
					"bb": {
						"type": "string",
						"title": "b1",
						"required": true,
						"x-visible": true,
					},
					"aa": {
						"type": "string",
						"title": "b2",
						"required": true,
						"x-visible": true,
					}
				}
			}
		}
	},
	
}
module.exports = serve