// version v1.1
// showing a complete tree for our rootStore, and this schema is for data only, not included actions

const rootStore =
{
	rootStore: {
		product: {
			isReady: true, // false mean the store created but not assigned any value
			productName: 'SD LAN',
			cart: {
				remark: 'The customer story will present here',
				maxItems: 10, // default value is 10
				profiles: [
					{
						primaryName: 'Retail Outlet',
						quantity: 1,
						questions: [
							{
								id: 1,
								sn: 1,
								question: 'What is your premise type?',
								dataType: 'Dropdown',
								sourceList: [
									{
										value: 'FS_4',
										label: '251 - 400m² (2691 - 4300 sqft)',
										tooltip: 'Movie theater',
									}
								],
								selectedValue: 'FS_4' // selectedValue is for current question
							}
						]
					}
				]
			},
			// a clone version of default configurator or from an existing profile
			draftProfile: {
				primaryName: '',
				quantity: 1,
				questions: [
					{
						id: 1,
						sn: 1,
						question: 'What is your premise type?',
						dataType: 'Dropdown',
						sourceList: [
							{
								value: 'FS_4',
								label: '251 - 400m² (2691 - 4300 sqft)',
								tooltip: 'Movie theater',
							}
						],
						selectedValue: 'FS_4' // selectedValue is for current question
					}
				]
			},
			// configurator STORE is used for create a default Questions and Answers. For using, we need to clone the content and create new profile
			configurator: {
				isReady: true,
				productName: 'SD LAN',
				questions: [ // list of questions and answers
					{
						id: 1,
						sn: 1,
						question: 'What is your premise type?',
						dataType: 'Dropdown',
						sourceList: [
							{
								value: 'FS_4',
								label: '251 - 400m² (2691 - 4300 sqft)',
								tooltip: 'Movie theater',
							}
						],
						selectedValue: ''
					}
				],
				maxProfileSize: 10 // default value is 10
			},
			// 
			packages: {
				uuid: '062d6bfe-c0b0-49b1-8a04-a25f59707f2e',
				profiles: [
					{
						pid: 'GZQISLRjqVwA6eh1Ys4Bmg==',
						sn: 2,
						name: 'Factory / Warehouse Site Profile',
						package: 'Small',
						qty: 2,
						selectedAddons: [//default value sample
							{ id: 'AP', value: '0', dataType: 'number' },
							{
								id: 'SW',
								value: 'MS120.8-FP',
								dataType: 'dropdown',
								options: [
									{ value: 'MS120.24-P', label: 'MS120.24-P' }
								]
							},
							{ id: 'RSW', value: 'false', dataType: 'checkbox' },
							{ id: 'CAM', value: '0', dataType: 'number' },
							{ id: 'CAB', value: '0', dataType: 'number' }
						],
						addresses: [
							{
								unitNo: '#01-28', // user input
								blockNo: '1',
								streetName: 'Kranji Loop',
								buildingName: 'Warehouse',
								postalCode: '739542', // request value
								country: 'SINGAPORE' // default by system
							},
							{
								unitNo: '#01-28', // user input
								blockNo: '1',
								streetName: 'Kranji Loop',
								buildingName: 'Warehouse',
								postalCode: '739542', // request value
								country: 'SINGAPORE' // default by system
							}
						]
					},
					// multiple profiles
				],
				misc: [
					{
						name: 'Maintenance',
						value: '24x7x4',
						options: [
							{
								value: '8x5xNBD',
								label: '8x5xNBD'
							},
							{
								value: '12x7x4',
								label: '12x7x4'
							},
							{
								value: '24x7x4',
								label: '24x7x4'
							}
						]
					},
					// multiple options
				],
				addonConfiguration: [ // list of available addons
					{
						id: 'AP',
						name: 'Additional Access Point',
						type: 'number'
					},
					{
						id: 'SW',
						name: 'Switch Upgrade',
						type: 'dropdown'
					},
					{
						id: 'RSW',
						name: 'Resilience Switch',
						type: 'checkbox'
					},
					{
						id: 'CAM',
						name: 'Security Camera',
						type: 'number'
					},
					{
						id: 'CAB',
						name: 'Extra Cabling',
						type: 'number'
					}
				],
				packageContent: [
					{
						title: "Singtel SD-LAN",
						content: "Singtel SD-LAN is a full managed service solution where we assist you to manage your network. Leave the heavy lifting work, from network configurations, active monitoring and firmware updates to us while you focus on your business operations."
					},
					{
						title: "Installation",
						content: "Singtel SD-LAN provides installation service, from network configurations to physical deployment of your network. Contact us for a quotation if consultation service to optimize wifi coverage, post installation wifi heatmap assessment, after office hours installation or installation of devices above 3.3m in height is required."
					},
					{
						title: "Change Management",
						content: "Allow Singtel to help you manage your network configurations while you focus on the operations needs of your business.  Change Management includes and not limited to change of firewall settings, traffic shapping, change of SSID name, reset of wireless LAN passwords. "
					}
				],
				addonContent: [
					{
						title: "Wireless Access Point",
						content: "Your current solution includes a total of #Product.NoOfAP# wireless access points for your site with #Answer.NoOfFloor# floors  Add on  up to #Addon.NoOfAP# wireless access points to increase your Wifi coverage.",
						more: "Each Wireless Access Point comes with onsite installation, 100m of cabling for connection between Access Point and POE Switch, 24x7 active monitoring and Change Management to adjust the configurations of your access points.\r\n\r\nWe recommend the following based on the best practices. \r\n<ul>\r\n<li>Meeting Rooms: one access point for each meeting room . </li> \r\n<li>Large Open Spaces: one access point per 100 square meter.</li>\r\n</ul>",
						pic_type: "PIC_WAP"
					},
					{
						title: "Switch",
						content: "Your configured solution #Product.Switch#. Add on a POE Switch if more LAN ports is required.  Each Switch is equipped with 8 additional POE LAN Ports where 1 LAN Port is used for connection to the network.  ",
						more: "Each Switch comes with onsite installation, 24x7 active monitoring and change management.",
						pic_type: "PIC_SWITCH"
					}
				],
			},
			pricePlan: [ // list of price plan based on Contract Term
				{ 
					duration: 36, 
					unit: 'month', 
					rc: 299, 
					currency: 'SGD', 
					default: true,
					planner: [ // list of Price stop for the Planner slider
						{ uc: 0, rc:299, currency: 'SGD', default: true},
						{ uc: 2150, rc:240, currency: 'SGD', default: false},
						{ uc: 4300, rc:180, currency: 'SGD', default: false},
						{ uc: 6450, rc:120, currency: 'SGD', default: false},
						{ uc: 8615, rc:60, currency: 'SGD', default: false},
					],
					priceSummary: { // price breakdown with label configuration 
						profiles: [ // list of breakdown for each profile
							{ 	pid: 'GZQISLRjqVwA6eh1Ys4Bmg==',
								sn: 1,
								name: 'Factory / Warehouse Site Profile',
								package: 'Small',
								summary:[
									{
										id: 'baserc',
										value: 129,
									},
									{
										id: 'addonrc',
										value: 0,
									},
									{
										id: 'subtotal',
										value: 129,
									},
									{
										id: 'noofsite',
										value: 'x 10',
									},
									{
										id: 'otc',
										name: 0,
									},
									{
										id: 'total',
										name: 1290,
									},
								]
							},
							{ 	pid: 'GZQISLRjqVwA6eh1Ys4Bmg==',
								sn: 1,
								name: 'Factory / Warehouse Site Profile',
								package: 'Small',
								summary:[
									{
										id: 'baserc',
										value: 129,
									},
									{
										id: 'addonrc',
										value: 0,
									},
									{
										id: 'subtotal',
										value: 129,
									},
									{
										id: 'noofsite',
										value: 'x 10',
									},
									{
										id: 'otc',
										name: 0,
									},
									{
										id: 'total',
										name: 1290,
									},
								]
							}
						],
						priceAttributes: [ // list of price label
							{
								id: 'baserc',
								name: 'Based Price (Monthly Charge)',
							},
							{
								id: 'addonrc',
								name: 'Addon (Monthly Charge)',
							},
							{
								id: 'subtotal',
								name: 'Sub Total',
								isLeading: true,
							},
							{
								id: 'noofsite',
								name: 'No. of Sites',
							},
							{
								id: 'otc',
								name: 'Grand Total (one time charge)',
							},
							{
								id: 'total',
								name: 'Grand Total (Monthly charge)',
								isLeading: true,
							},
						]
					}
				},
				{ duration: 24, unit: 'month', rc: 399, currency: 'SGD', default: false,
					planner: [
						{ uc: 0, rc:399, currency: 'SGD', default: true},
						{ uc: 2150, rc:240, currency: 'SGD', default: false},
						{ uc: 4300, rc:180, currency: 'SGD', default: false},
						{ uc: 6450, rc:120, currency: 'SGD', default: false},
						{ uc: 8615, rc:60, currency: 'SGD', default: false},
					]
				},
				{ duration: 12, unit: 'month', rc: 499, currency: 'SGD', default: false,
					planner: [
						{ uc: 0, rc:299, currency: 'SGD', default: true},
						{ uc: 2150, rc:240, currency: 'SGD', default: false},
						{ uc: 4300, rc:180, currency: 'SGD', default: false},
						{ uc: 6450, rc:120, currency: 'SGD', default: false},
						{ uc: 8615, rc:60, currency: 'SGD', default: false},
					]
				}
			],
		
		},
		customer: {
			uuid: 'abc123455',
			accountName: 'FRESH LOOK CONSTRUCTION PTE. LTD',
			accountBRN: 'BRN1234567',
			primaryAddress: {
				unitNo: '#01-28', // user input
				blockNo: '1',
				streetName: 'Kranji Loop',
				buildingName: 'Warehouse',
				postalCode: '739542', // request value
				country: 'SINGAPORE' // default by system
			},
			correspondenceAddress: {
				unitNo: '#01-28', // user input
				blockNo: '1',
				streetName: 'Kranji Loop',
				buildingName: 'Warehouse',
				postalCode: '739542', // request value
				country: 'SINGAPORE' // default by system
			},
			contactDetail: {
				firstName: 'John',
				lastName: 'White',
				contactNumber: '+65 1234 5678',
				contactEmail: 'john.white@fresh.sg'
			},
			authorizedContactDetail: {
				firstName: 'John',
				lastName: 'White',
				contactNumber: '+65 1234 5678',
				contactEmail: 'john.white@fresh.sg'
			},
			
		}
	}
}
export default rootStore
// Retrieving Address object from Postal code
