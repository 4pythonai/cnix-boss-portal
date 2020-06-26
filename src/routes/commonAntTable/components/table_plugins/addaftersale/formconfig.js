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
					"idc_id": {
						"type": "string",
						"title": "af1",
						"required": true,
						"x-visible": true,
				
					},
					"building_id": {
						"type": "string",
						"title": "af2",
						"required": true,
						"x-visible": true
					}
				}
			}
		}
	},
	
}
module.exports = serve