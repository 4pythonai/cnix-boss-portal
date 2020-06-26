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
						"type": "assocselect",
						"title": "所属IDC",
						"x-visible": true,
						"enum": [],
						"x-component": "assocselect",
						"x-props": {
							"level": "1",
							"api": "curd\/getTableData",
							"basetable": "boss_idc",
							"filter_field": null,
							"associate_field": "building_id",
							"trigger_group_uuid": "qJcuYtCPXAxCTanktRRfMWVL46XR7G",
							"codetable_category_value": null,
							"label_field": "idc_name",
							"value_field": "id",
							"query_cfg": {
								"level": "1",
								"api": "curd\/getTableData",
								"basetable": "boss_idc",
								"filter_field": null,
								"associate_field": "building_id",
								"trigger_group_uuid": "qJcuYtCPXAxCTanktRRfMWVL46XR7G",
								"codetable_category_value": null,
								"label_field": "idc_name",
								"value_field": "id"
							},
							"ass_select_field_id": "idc_id"
						}
					},
					"building_id": {
						"type": "assocselect",
						"title": "所属楼宇",
						"x-visible": true,
						"enum": [],
						"x-component": "assocselect",
						"x-props": {
							"level": "2",
							"api": "curd\/getTableData",
							"basetable": "boss_idc_building",
							"associate_field": "floor_id",
							"trigger_group_uuid": "qJcuYtCPXAxCTanktRRfMWVL46XR7G",
							"codetable_category_value": null,
							"label_field": "build_name",
							"value_field": "id",
							"query_cfg": {
								"level": "2",
								"api": "curd\/getTableData",
								"basetable": "boss_idc_building",
								"filter_field": "idc_id",
								"associate_field": "floor_id",
								"trigger_group_uuid": "qJcuYtCPXAxCTanktRRfMWVL46XR7G",
								"codetable_category_value": null,
								"label_field": "build_name",
								"value_field": "id"
							},
							"ass_select_field_id": "building_id"
						}
					},
					"floor_id": {
						"type": "assocselect",
						"title": "所属楼层",
						"x-visible": true,
						"enum": [],
						"x-component": "assocselect",
						"x-props": {
							"level": "3",
							"api": "curd\/getTableData",
							"basetable": "boss_idc_building_floor",
							"filter_field": "build_id",
							"associate_field": "room_id",
							"trigger_group_uuid": "qJcuYtCPXAxCTanktRRfMWVL46XR7G",
							"codetable_category_value": null,
							"label_field": "floor_name",
							"value_field": "id",
							"query_cfg": {
								"level": "3",
								"api": "curd\/getTableData",
								"basetable": "boss_idc_building_floor",
								"filter_field": "build_id",
								"associate_field": "room_id",
								"trigger_group_uuid": "qJcuYtCPXAxCTanktRRfMWVL46XR7G",
								"codetable_category_value": null,
								"label_field": "floor_name",
								"value_field": "id"
							},
							"ass_select_field_id": "floor_id"
						}
					},
					"room_id": {
						"type": "assocselect",
						"title": "所属区域",
						"x-visible": true,
						"enum": [],
						"x-component": "assocselect",
						"x-props": {
							"level": "4",
							"api": "curd\/getTableData",
							"basetable": "boss_idc_room",
							"filter_field": "floor_id",
							"associate_field": null,
							"trigger_group_uuid": "qJcuYtCPXAxCTanktRRfMWVL46XR7G",
							"codetable_category_value": null,
							"label_field": "room_name",
							"value_field": "id",
							"query_cfg": {
								"level": "4",
								"api": "curd\/getTableData",
								"basetable": "boss_idc_room",
								"filter_field": "floor_id",
								"associate_field": null,
								"trigger_group_uuid": "qJcuYtCPXAxCTanktRRfMWVL46XR7G",
								"codetable_category_value": null,
								"label_field": "room_name",
								"value_field": "id"
							},
							"ass_select_field_id": "room_id"
						}
					},
				}
			}
		}
	},
	
}
module.exports = serve