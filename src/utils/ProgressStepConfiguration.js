import React from 'react'
import * as Global from "../stores/global";

const ProgressStepConfiguration = [
    {
        product: Global.ROUTER_SD_BASE,
        pages: [
            {
                title: 'Select Package',
                pathname: Global.ROUTER_SD_PACKAGES
            },

            {
                title: 'Add-ons',
                pathname: Global.ROUTER_SD_ADDON
            },
            {
                title: 'Contract Duration',
                pathname: Global.ROUTER_SD_TERMS
            },
            {
                title: 'Customer Information',
                pathname: Global.ROUTER_SD_CUSTOMER
            },
        ]
    },
    {
        product: Global.ROUTER_MS_CLOUD_BASE,
        pages: [
            {
                title: 'Overview',
                pathname: Global.ROUTER_MS_OVERVIEW
            },
            {
                title: 'Add-ons',
                pathname: Global.ROUTER_MS_ADDONS
            },
            {
                title: 'Contract Terms',
                pathname: Global.ROUTER_MS_CONTRACT_TERMS
            },
            {
                title: 'Customer Information',
                pathname: Global.ROUTER_MS_CUSTOMER_INFORMATION
            }
        ]
    },
    {
        product: Global.ROUTER_CYBER_SECURITY_BASE,
        pages: [
            {
                title: 'Recommendation',
                pathname: Global.ROUTER_CYBER_SECURITY_RECOMMENDATION
            },
            {
                title: 'Overview',
                pathname: Global.ROUTER_CYBER_SECURITY_OVERVIEW
            },
            {
                title: 'Contract Terms',
                pathname: Global.ROUTER_CYBER_SECURITY_CONTRACT
            },
            {
                title: 'Customer Information',
                pathname: Global.ROUTER_CYBER_SECURITY_QUOTATION
            }
        ]
    }
]

export default ProgressStepConfiguration