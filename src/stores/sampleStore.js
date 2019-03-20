const sampleRootStore = {
	"isReady": true,
	"productName": "SD LAN",
	"cart": {
		"remark": "",
		"maxItems": 5,
		"profiles": [
			{
				"quantity": 1,
				"questions": [
					{
						"id": 5,
						"sn": 1,
						"question": "What is your premise type?",
						"dataType": "Dropdown",
						"sourceList": [
							{
								"value": "VT_O",
								"label": "Office",
								"tooltip": ""
							},
							{
								"value": "VT_RO",
								"label": "Retail Outlet",
								"tooltip": ""
							},
							{
								"value": "VT_FW",
								"label": "Factory / Warehouse",
								"tooltip": ""
							}
						],
						"selectedValue": "VT_O"
					},
					{
						"id": 6,
						"sn": 2,
						"question": "How many users to be connected at the time?",
						"dataType": "Dropdown",
						"sourceList": [
							{
								"value": "NOU_1",
								"label": "<50 People",
								"tooltip": ""
							},
							{
								"value": "NOU_2",
								"label": "51-150 People",
								"tooltip": ""
							},
							{
								"value": "NOU_3",
								"label": "151-250 People",
								"tooltip": ""
							},
							{
								"value": "NOU_4",
								"label": "251-500 People",
								"tooltip": ""
							}
						],
						"selectedValue": "NOU_1"
					},
					{
						"id": 7,
						"sn": 3,
						"question": "How many floors does this premise have?",
						"dataType": "Dropdown",
						"sourceList": [
							{
								"value": "NOF_1",
								"label": "1 Floor",
								"tooltip": ""
							},
							{
								"value": "NOF_2",
								"label": "2 Floors",
								"tooltip": ""
							},
							{
								"value": "NOF_3",
								"label": "3 Floors",
								"tooltip": ""
							}
						],
						"selectedValue": "NOF_1"
					},
					{
						"id": 8,
						"sn": 4,
						"question": "What is the size per floor?",
						"dataType": "Dropdown",
						"sourceList": [
							{
								"value": "FS_1",
								"label": "<50m²\r\n(<540 sqft)",
								"tooltip": "Neighborhood shops/clinic"
							},
							{
								"value": "FS_2",
								"label": "50 - 100m²\r\n(540 - 1080 sqft)",
								"tooltip": "Typical fast food, coffee shop outlet, badminton court"
							},
							{
								"value": "FS_3",
								"label": "101 - 250m²\r\n(1081 - 2690 sqft)",
								"tooltip": "Yoga studio, gym room, tennis court, neighborhood playground"
							},
							{
								"value": "FS_4",
								"label": "251 - 400m²\r\n(2691 - 4300 sqft)",
								"tooltip": "Movie theater"
							},
							{
								"value": "FS_5",
								"label": "401 - 650m²\r\n(4301 - 7000 sqft)",
								"tooltip": "Football field"
							}
						],
						"selectedValue": "FS_1"
					}
				]
			},
			{
				"quantity": 15,
				"questions": [
					{
						"id": 5,
						"sn": 1,
						"question": "What is your premise type?",
						"dataType": "Dropdown",
						"sourceList": [
							{
								"value": "VT_O",
								"label": "Office",
								"tooltip": ""
							},
							{
								"value": "VT_RO",
								"label": "Retail Outlet",
								"tooltip": ""
							},
							{
								"value": "VT_FW",
								"label": "Factory / Warehouse",
								"tooltip": ""
							}
						],
						"selectedValue": "VT_RO"
					},
					{
						"id": 6,
						"sn": 2,
						"question": "How many users to be connected at the time?",
						"dataType": "Dropdown",
						"sourceList": [
							{
								"value": "NOU_1",
								"label": "<50 People",
								"tooltip": ""
							},
							{
								"value": "NOU_2",
								"label": "51-150 People",
								"tooltip": ""
							},
							{
								"value": "NOU_3",
								"label": "151-250 People",
								"tooltip": ""
							},
							{
								"value": "NOU_4",
								"label": "251-500 People",
								"tooltip": ""
							}
						],
						"selectedValue": "NOU_3"
					},
					{
						"id": 7,
						"sn": 3,
						"question": "How many floors does this premise have?",
						"dataType": "Dropdown",
						"sourceList": [
							{
								"value": "NOF_1",
								"label": "1 Floor",
								"tooltip": ""
							},
							{
								"value": "NOF_2",
								"label": "2 Floors",
								"tooltip": ""
							},
							{
								"value": "NOF_3",
								"label": "3 Floors",
								"tooltip": ""
							}
						],
						"selectedValue": "NOF_1"
					},
					{
						"id": 8,
						"sn": 4,
						"question": "What is the size per floor?",
						"dataType": "Dropdown",
						"sourceList": [
							{
								"value": "FS_1",
								"label": "<50m²\r\n(<540 sqft)",
								"tooltip": "Neighborhood shops/clinic"
							},
							{
								"value": "FS_2",
								"label": "50 - 100m²\r\n(540 - 1080 sqft)",
								"tooltip": "Typical fast food, coffee shop outlet, badminton court"
							},
							{
								"value": "FS_3",
								"label": "101 - 250m²\r\n(1081 - 2690 sqft)",
								"tooltip": "Yoga studio, gym room, tennis court, neighborhood playground"
							},
							{
								"value": "FS_4",
								"label": "251 - 400m²\r\n(2691 - 4300 sqft)",
								"tooltip": "Movie theater"
							},
							{
								"value": "FS_5",
								"label": "401 - 650m²\r\n(4301 - 7000 sqft)",
								"tooltip": "Football field"
							}
						],
						"selectedValue": "FS_2"
					}
				]
			},
			{
				"quantity": 1,
				"questions": [
					{
						"id": 5,
						"sn": 1,
						"question": "What is your premise type?",
						"dataType": "Dropdown",
						"sourceList": [
							{
								"value": "VT_O",
								"label": "Office",
								"tooltip": ""
							},
							{
								"value": "VT_RO",
								"label": "Retail Outlet",
								"tooltip": ""
							},
							{
								"value": "VT_FW",
								"label": "Factory / Warehouse",
								"tooltip": ""
							}
						],
						"selectedValue": "VT_FW"
					},
					{
						"id": 6,
						"sn": 2,
						"question": "How many users to be connected at the time?",
						"dataType": "Dropdown",
						"sourceList": [
							{
								"value": "NOU_1",
								"label": "<50 People",
								"tooltip": ""
							},
							{
								"value": "NOU_2",
								"label": "51-150 People",
								"tooltip": ""
							},
							{
								"value": "NOU_3",
								"label": "151-250 People",
								"tooltip": ""
							},
							{
								"value": "NOU_4",
								"label": "251-500 People",
								"tooltip": ""
							}
						],
						"selectedValue": "NOU_1"
					},
					{
						"id": 7,
						"sn": 3,
						"question": "How many floors does this premise have?",
						"dataType": "Dropdown",
						"sourceList": [
							{
								"value": "NOF_1",
								"label": "1 Floor",
								"tooltip": ""
							},
							{
								"value": "NOF_2",
								"label": "2 Floors",
								"tooltip": ""
							},
							{
								"value": "NOF_3",
								"label": "3 Floors",
								"tooltip": ""
							}
						],
						"selectedValue": "NOF_1"
					},
					{
						"id": 8,
						"sn": 4,
						"question": "What is the size per floor?",
						"dataType": "Dropdown",
						"sourceList": [
							{
								"value": "FS_1",
								"label": "<50m²\r\n(<540 sqft)",
								"tooltip": "Neighborhood shops/clinic"
							},
							{
								"value": "FS_2",
								"label": "50 - 100m²\r\n(540 - 1080 sqft)",
								"tooltip": "Typical fast food, coffee shop outlet, badminton court"
							},
							{
								"value": "FS_3",
								"label": "101 - 250m²\r\n(1081 - 2690 sqft)",
								"tooltip": "Yoga studio, gym room, tennis court, neighborhood playground"
							},
							{
								"value": "FS_4",
								"label": "251 - 400m²\r\n(2691 - 4300 sqft)",
								"tooltip": "Movie theater"
							},
							{
								"value": "FS_5",
								"label": "401 - 650m²\r\n(4301 - 7000 sqft)",
								"tooltip": "Football field"
							}
						],
						"selectedValue": "FS_5"
					}
				]
			}
		],
		"errorMessage": ""
	},
	"configurator": {
		"productName": "SD LAN",
		"questions": [
			{
				"id": 1,
				"sn": 1,
				"question": "What is your premise type?",
				"dataType": "Dropdown",
				"sourceList": [
					{
						"value": "VT_O",
						"label": "Office",
						"tooltip": ""
					},
					{
						"value": "VT_RO",
						"label": "Retail Outlet",
						"tooltip": ""
					},
					{
						"value": "VT_FW",
						"label": "Factory / Warehouse",
						"tooltip": ""
					}
				],
				"selectedValue": ""
			},
			{
				"id": 2,
				"sn": 2,
				"question": "How many users to be connected at the time?",
				"dataType": "Dropdown",
				"sourceList": [
					{
						"value": "NOU_1",
						"label": "<50 People",
						"tooltip": ""
					},
					{
						"value": "NOU_2",
						"label": "51-150 People",
						"tooltip": ""
					},
					{
						"value": "NOU_3",
						"label": "151-250 People",
						"tooltip": ""
					},
					{
						"value": "NOU_4",
						"label": "251-500 People",
						"tooltip": ""
					}
				],
				"selectedValue": ""
			},
			{
				"id": 3,
				"sn": 3,
				"question": "How many floors does this premise have?",
				"dataType": "Dropdown",
				"sourceList": [
					{
						"value": "NOF_1",
						"label": "1 Floor",
						"tooltip": ""
					},
					{
						"value": "NOF_2",
						"label": "2 Floors",
						"tooltip": ""
					},
					{
						"value": "NOF_3",
						"label": "3 Floors",
						"tooltip": ""
					}
				],
				"selectedValue": ""
			},
			{
				"id": 4,
				"sn": 4,
				"question": "What is the size per floor?",
				"dataType": "Dropdown",
				"sourceList": [
					{
						"value": "FS_1",
						"label": "<50m²\r\n(<540 sqft)",
						"tooltip": "Neighborhood shops/clinic"
					},
					{
						"value": "FS_2",
						"label": "50 - 100m²\r\n(540 - 1080 sqft)",
						"tooltip": "Typical fast food, coffee shop outlet, badminton court"
					},
					{
						"value": "FS_3",
						"label": "101 - 250m²\r\n(1081 - 2690 sqft)",
						"tooltip": "Yoga studio, gym room, tennis court, neighborhood playground"
					},
					{
						"value": "FS_4",
						"label": "251 - 400m²\r\n(2691 - 4300 sqft)",
						"tooltip": "Movie theater"
					},
					{
						"value": "FS_5",
						"label": "401 - 650m²\r\n(4301 - 7000 sqft)",
						"tooltip": "Football field"
					}
				],
				"selectedValue": ""
			}
		],
		"maxProfileSize": 5,
		"isReady": true
	},
	"packages": {
		"isReady": true,
		"uuid": "6c0b507f-99ed-43b2-a946-b5275e89b8d2",
		"profiles": [
			{
				"pid": "j/mwujOu6vOd7/NIBiULwQ==",
				"sn": 0,
				"qty": 1,
				"name": "Office",
				"package": "Small Package",
				"components": [
					"Solution includes Network and Security Services, WiFi and traffic shaping",
					"Managed services include 24x7 proactive device monitoring, onsite Office Hour installation, onsite maintenance 8x5xNBD and change management"
				],
				"selectedAddons": [
					{
						"id": "AP",
						"type": "number",
						"value": "0",
						"quantity": 2,
						"port": "1",
						"options": []
					},
					{
						"id": "SW",
						"type": "dropdown",
						"quantity": 0,
						"options": [
							{
								"label": "No",
								"port": "0"
							},
							{
								"value": "MS120.8-FP",
								"label": "MS120.8-FP",
								"port": "8"
							},
							{
								"value": "MS120.24-P",
								"label": "MS120.24-P",
								"port": "24"
							},
							{
								"value": "MS120-48LP",
								"label": "MS120-48LP",
								"port": "48"
							}
						]
					},
					{
						"id": "RSW",
						"type": "checkbox",
						"value": "false",
						"quantity": 0,
						"options": []
					},
					{
						"id": "CAM",
						"type": "number",
						"value": "0",
						"quantity": 0,
						"port": "1",
						"options": []
					},
					{
						"id": "CAB",
						"type": "number",
						"value": "0",
						"quantity": 0,
						"options": []
					},
					{
						"id": "MAINT",
						"type": "checkbox",
						"value": "false",
						"quantity": 0,
						"options": []
					},
					{
						"id": "INST",
						"type": "checkbox",
						"value": "false",
						"quantity": 0,
						"options": []
					},
					{
						"id": "LIC",
						"type": "checkbox",
						"value": "false",
						"quantity": 0,
						"options": []
					},
					{
						"id": "EUD",
						"type": "number",
						"value": "0",
						"quantity": 0,
						"options": []
					}
				],
				"validationFormula": "( (#SW - 1) * 1 - (#AP + 1 + #CAM) ) / 1",
				"addresses": [
					{
						"unitNo": "",
						"blockNo": "",
						"streetName": "",
						"buildingName": "",
						"postalCode": "",
						"country": "SINGAPORE",
						"isValid": false
					}
				]
			},
			{
				"pid": "z9+Ft+IkKJk44Q+uESAMKA==",
				"sn": 0,
				"qty": 1,
				"name": "Retail Outlet",
				"package": "Large Package",
				"components": [
					"Solution includes Network and Security Services, WiFi and traffic shaping, PoE switch",
					"Managed services include 24x7 proactive device monitoring, onsite Office Hour installation, onsite maintenance 12x7x4 and change management"
				],
				"selectedAddons": [
					{
						"id": "AP",
						"type": "number",
						"value": "0",
						"quantity": 0,
						"port": "1",
						"options": []
					},
					{
						"id": "SW",
						"type": "dropdown",
						"quantity": 0,
						"options": [
							{
								"label": "No",
								"port": "0"
							},
							{
								"value": "MS120.8-FP",
								"label": "MS120.8-FP",
								"port": "8"
							},
							{
								"value": "MS120.24-P",
								"label": "MS120.24-P",
								"port": "24"
							},
							{
								"value": "MS120-48LP",
								"label": "MS120-48LP",
								"port": "48"
							}
						]
					},
					{
						"id": "RSW",
						"type": "checkbox",
						"value": "false",
						"quantity": 0,
						"options": []
					},
					{
						"id": "CAM",
						"type": "number",
						"value": "0",
						"quantity": 0,
						"port": "1",
						"options": []
					},
					{
						"id": "CAB",
						"type": "number",
						"value": "0",
						"quantity": 0,
						"options": []
					},
					{
						"id": "MAINT",
						"type": "checkbox",
						"value": "false",
						"quantity": 0,
						"options": []
					},
					{
						"id": "INST",
						"type": "checkbox",
						"value": "false",
						"quantity": 0,
						"options": []
					},
					{
						"id": "LIC",
						"type": "checkbox",
						"value": "false",
						"quantity": 0,
						"options": []
					},
					{
						"id": "EUD",
						"type": "number",
						"value": "0",
						"quantity": 0,
						"options": []
					}
				],
				"validationFormula": "( (#SW - 1) * 1 - (#AP + 1 + #CAM) ) / 1",
				"addresses": [
					{
						"unitNo": "",
						"blockNo": "",
						"streetName": "",
						"buildingName": "",
						"postalCode": "",
						"country": "SINGAPORE",
						"isValid": false
					},
				]
			},
			{
				"pid": "xzL75O2AkUDoNd8D24vgXA==",
				"sn": 0,
				"qty": 1,
				"name": "Factory / Warehouse",
				"package": "Medium Package",
				"components": [
					"Solution includes Network and Security Services, WiFi and traffic shaping, PoE switch",
					"Managed services include 24x7 proactive device monitoring, onsite Office Hour installation, onsite maintenance 12x7x4 and change management"
				],
				"selectedAddons": [
					{
						"id": "AP",
						"type": "number",
						"value": "0",
						"quantity": 0,
						"port": "1",
						"options": []
					},
					{
						"id": "SW",
						"type": "dropdown",
						"quantity": 0,
						"options": [
							{
								"label": "No",
								"port": "0"
							},
							{
								"value": "MS120.8-FP",
								"label": "MS120.8-FP",
								"port": "8"
							},
							{
								"value": "MS120.24-P",
								"label": "MS120.24-P",
								"port": "24"
							},
							{
								"value": "MS120-48LP",
								"label": "MS120-48LP",
								"port": "48"
							}
						]
					},
					{
						"id": "RSW",
						"type": "checkbox",
						"value": "false",
						"quantity": 0,
						"options": []
					},
					{
						"id": "CAM",
						"type": "number",
						"value": "0",
						"quantity": 0,
						"port": "1",
						"options": []
					},
					{
						"id": "CAB",
						"type": "number",
						"value": "0",
						"quantity": 0,
						"options": []
					},
					{
						"id": "MAINT",
						"type": "checkbox",
						"value": "false",
						"quantity": 0,
						"options": []
					},
					{
						"id": "INST",
						"type": "checkbox",
						"value": "false",
						"quantity": 0,
						"options": []
					},
					{
						"id": "LIC",
						"type": "checkbox",
						"value": "false",
						"quantity": 0,
						"options": []
					},
					{
						"id": "EUD",
						"type": "number",
						"value": "0",
						"quantity": 0,
						"options": []
					}
				],
				"validationFormula": "( (#SW - 1) * 1 - (#AP + 1 + #CAM) ) / 1",
				"addresses": [
					{
						"unitNo": "",
						"blockNo": "",
						"streetName": "",
						"buildingName": "",
						"postalCode": "",
						"country": "SINGAPORE",
						"isValid": false
					}
				]
			}
		],
		"misc": [
			{
				"name": "Maintenance",
				"value": "24x7x4",
				"selectedValue": "",
				"options": [
					{
						"value": "8x5xNBD",
						"label": "8x5xNBD",
						"tooltip": ""
					},
					{
						"value": "12x7x4",
						"label": "12x7x4",
						"tooltip": ""
					},
					{
						"value": "24x7x4",
						"label": "24x7x4",
						"tooltip": ""
					}
				]
			},
			{
				"name": "Installation Time",
				"value": "Office Hour",
				"selectedValue": "",
				"options": [
					{
						"value": "Office Hour",
						"label": "Office Hour",
						"tooltip": ""
					},
					{
						"value": "After Off & PH",
						"label": "After Off & PH",
						"tooltip": ""
					}
				]
			},
			{
				"name": "License",
				"value": "Enterprise",
				"selectedValue": "",
				"options": [
					{
						"value": "Enterprise",
						"label": "Enterprise",
						"tooltip": ""
					},
					{
						"value": "Advanced",
						"label": "Advanced",
						"tooltip": ""
					}
				]
			}
		],
		"addonConfiguration": [
			{
				"id": "AP",
				"name": "Additional Access Point",
				"type": "number"
			},
			{
				"id": "SW",
				"name": "Switch Upgrade",
				"type": "dropdown"
			},
			{
				"id": "RSW",
				"name": "Resilience Switch",
				"type": "checkbox"
			},
			{
				"id": "CAM",
				"name": "Security Camera",
				"type": "number"
			},
			{
				"id": "CAB",
				"name": "Extra Cabling per 200m (Fiber)",
				"type": "number"
			},
			{
				"id": "MAINT",
				"name": "Maintenance upgrade to 24x7x4",
				"type": "checkbox"
			},
			{
				"id": "INST",
				"name": "Installation after office hour (incl. PH & weekends)",
				"type": "checkbox"
			},
			{
				"id": "LIC",
				"name": "Advanced License",
				"type": "checkbox"
			},
			{
				"id": "EUD",
				"name": "End user devices",
				"type": "number"
			},
		],
		"packageContent": [
			{
				"title": "Singtel SD-LAN",
				"content": "Singtel SD-LAN is a full managed service solution where we assist you to manage your network. Leave the heavy lifting work, from network configurations, active monitoring and firmware updates to us while you focus on your business operations.",
				"more": "",
				"pic_type": ""
			},
			{
				"title": "Installation",
				"content": "Singtel SD-LAN provides installation service, from network configurations to physical deployment of your network. Contact us for a quotation if consultation service to optimize wifi coverage, post installation wifi heatmap assessment, after office hours installation or installation of devices above 3.3m in height is required.",
				"more": "",
				"pic_type": ""
			},
			{
				"title": "Change Management",
				"content": "Allow Singtel to help you manage your network configurations while you focus on the operations needs of your business.  Change Management includes and not limited to change of firewall settings, traffic shapping, change of SSID name, reset of wireless LAN passwords. ",
				"more": "",
				"pic_type": ""
			}
		],
		"addonContent": [
			{
				"title": "Advance Security",
				"content": "Enhance you security with Anti-virus, Anti-Malware, Content Filtering, Intrusion Detection and Geograpy based firewall by upgrading your license to an Advanced Security License.",
				"more": "",
				"pic_type": "PIC_AS"
			},
			{
				"title": "Wireless Access Point",
				"content": "Wireless Access Point. Add on wireless access points to increase your WiFi coverage.",
				"more": "Each Wireless Access Point comes with onsite installation, 100m of cabling for connection between Access Point and POE Switch, 24x7 active monitoring and Change Management to adjust the configurations of your access points.\r\n\r\nWe recommend the following based on the best practices. \r\n- Meeting Rooms: one access point for each meeting room . \r\n- Large Open Spaces: one access point per 100 square meter.",
				"pic_type": "PIC_WAP"
			},
			{
				"title": "Switch Upgrade",
				"content": "Upgrade your Switch model if more LAN ports are required, where 1 LAN Port is used for 1 connection to the network.  ",
				"more": "<Options>\r\n- MS-120.8 contains 8 LAN Ports and 2x1G SFP\r\n- MS-120.24 contains 24 LAN Ports, 4x1G SPF\r\n- MS-120.48 contains 48 LAN Ports, 4x1G SPF",
				"pic_type": "PIC_SWITCH"
			},
			{
				"title": "Resilience Switch",
				"content": "Improve your network resiliency by adding Resilience Switch(s).  Our Switches can be deployed either via physical or virtual stacking.",
				"more": "Comes with onsite installation, 24x7 active monitoring and change management.\r\n\r\nResilience Switch must be deployed together with Internet Gateway.",
				"pic_type": "PIC_RSWITCH"
			},
			{
				"title": "Security Camera",
				"content": "Improve physical security and enjoy useful analytics by adding Security Camera with local storage to your SD-LAN network.",
				"more": "Each Security Camera comes with onsite installation with 100m of cabling for connection of Camera to your POE Switch, 24x7 active monitoring and change management to adjust the settings of your cameras.\r\n\r\nAll video footages are stored locally in the camera only, allowing the camera to be placed in your network without significant increase in bandwidth usage.  Our security camera comes with video analytics, from motion detection to heat maps.\r\n\r\nMinimize the number of Security Cameras required with our wide viewing angle (Horizontal 114 & Vertical 61 degrees) .\r\n\r\nNote: Video footage is non real time when end user access the video footage through wifi connection or external network. ",
				"pic_type": "PIC_CAM"
			},
			{
				"title": "Extra Cabling per 200m (Fibre)",
				"content": "6 Core Multi mode fiber. Your current solution comes with 200m of cabling if additional floor is selected.  Select this option if additional cabling is required between the floors.",
				"more": "All cabling consist of the supply and installation of 6 core Multi mode fiber with PVC conduit at height of less than 3.3m. Please contact us for evaluation if structure cabling or installation of cabling that is more than 3.3m in height.",
				"pic_type": "PIC_CAB"
			}
		]
	},
	"contracts": [
		{
			"duration": 36,
			"unit": "Month",
			"rc": 516,
			"currency": "SGD",
			"default": true,
			"planner": [],
			"priceSummary": {}
		},
		{
			"duration": 24,
			"unit": "Month",
			"rc": 741,
			"currency": "SGD",
			"default": false,
			"planner": [],
			"priceSummary": {}
		},
		{
			"duration": 12,
			"unit": "Month",
			"rc": 1008,
			"currency": "SGD",
			"default": false,
			"planner": [],
			"priceSummary": {}
		}
	],
	"selectedDuration": 36,
	"selectedPlanner": "GZQISLRjqVwA6eh1Ys4Bmg=="
};

export default sampleRootStore;

const sampleDraftList = [
	{
	   "uuid": "9a97cdb7-5496-4e3f-ae7b-b81235eb04ab",
	   "accountName": "Superhitechnology Apple Pte Ltd",
	   "amName": "Linzell Bowman",
	   "lastUpdatedOn": "11-12-2018 15:11:10",
	   "otc": "S$123",
	   "rc": "S$456"
	},
	{
	   "uuid": "9a97cdb7-5496-4e3f-ae7b-b81235eb04ab",
	   "accountName": "FLOWER A DIAMOND BOUTIQUE",
	   "amName": "Sebastian Bennett",
	   "lastUpdatedOn": "11-12-2018 15:11:10",
	   "otc": "S$123",
	   "rc": "S$456"
	},
	{
	   "uuid": "9a97cdb7-5496-4e3f-ae7b-b81235eb04ab",
	   "accountName": "FLOWER - CITY 2000",
	   "amName": "Shirai Subaru",
	   "lastUpdatedOn": "11-12-2018 15:11:10",
	   "otc": "S$123",
	   "rc": "S$456"
	},
	{
	   "uuid": "9a97cdb7-5496-4e3f-ae7b-b81235eb04ab",
	   "accountName": "FLOWER & GIFT",
	   "amName": "Amachea Jajah",
	   "lastUpdatedOn": "11-12-2018 15:11:10",
	   "otc": "S$123",
	   "rc": "S$456"
	},
	{
	   "uuid": "9a97cdb7-5496-4e3f-ae7b-b81235eb04ab",
	   "accountName": "BLOOMS",
	   "amName": "Pol Soria",
	   "lastUpdatedOn": "11-12-2018 15:11:10",
	   "otc": "S$123",
	   "rc": "S$456"
	},
	{
	   "uuid": "9a97cdb7-5496-4e3f-ae7b-b81235eb04ab",
	   "accountName": "TECHNOLOGY INTEGRATORS CORP PTE LTD",
	   "amName": "Harinder Mondi",
	   "lastUpdatedOn": "11-12-2018 15:11:10",
	   "otc": "S$123",
	   "rc": "S$456"
	},
	{
	   "uuid": "9a97cdb7-5496-4e3f-ae7b-b81235eb04ab",
	   "accountName": "INTEGRATE PTE LTD",
	   "amName": "Jana Strassmann",
	   "lastUpdatedOn": "11-12-2018 15:11:10",
	   "otc": "S$123",
	   "rc": "S$456"
	},
	{
	   "uuid": "9a97cdb7-5496-4e3f-ae7b-b81235eb04ab",
	   "accountName": "INTEGRATED ADVANCED CONTROLS",
	   "amName": "Niek Bove",
	   "lastUpdatedOn": "11-12-2018 15:11:10",
	   "otc": "S$123",
	   "rc": "S$456"
	}
]