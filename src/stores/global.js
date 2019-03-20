//const REST_API_ROOT = /^agile(dev[1-2]?)?.ncs.com.sg$/g.exec(window.location.hostname) ? '' : 'https://agiledev1.ncs.com.sg'
const REST_API_ROOT = process.env.NODE_ENV === 'production' ? '' : 'https://agiledev.ncs.com.sg'; //'http://localhost:3001';// 'http://agiledev.ncs.com.sg';
export const REST_CREDENTIALS = process.env.NODE_ENV === 'production' ? 'include' : 'omit';
export const STORAGE_NAME = 'SDLAN';
export const REST_API_QUESTION = REST_API_ROOT + '/goapi/rest/v1/quote/questions';
export const REST_API_RECOMMENDEDPACKAGE = REST_API_ROOT + '/goapi/rest/v1/quote/recommend';
export const REST_API_PRODUCT_CONTENT = REST_API_ROOT + '/goapi/rest/v1/content/product';
export const REST_API_BOM = REST_API_ROOT + '/goapi/rest/v1/quote/profile/boms';
export const REST_API_ADDON = REST_API_ROOT + '/goapi/rest/v1/quote/addons';
export const REST_API_ADDON_CONTENT = REST_API_ROOT + '/goapi/rest/v1/content/addon';
export const REST_API_MISC = REST_API_ROOT + '/goapi/rest/v1/quote/price/params';
export const REST_API_TERMS = REST_API_ROOT + '/goapi/rest/v1/quote/price/terms';
export const REST_API_QUOTE_BOM = REST_API_ROOT + '/goapi/rest/v1/quote/boms';
export const REST_API_PRICE_SUMMARY = REST_API_ROOT + '/goapi/rest/v1/quote/price/summary';
export const REST_API_PRICE_PLANNER = REST_API_ROOT + '/goapi/rest/v1/quote/price/planner';
export const REST_API_PRICE_SAVE = REST_API_ROOT + '/goapi/rest/v1/quote/price/save';
export const REST_API_RETRIEVEADDRESS = REST_API_ROOT + '/goapi/rest/v1/search/address';
export const PDF_TnC = REST_API_ROOT + '/goapi/download/tc/SD LAN';
export const REST_API_QUOTE_SAVE = REST_API_ROOT + '/goapi/rest/v1/quote/save';
export const REST_API_QUOTE_CREATE = REST_API_ROOT + '/goapi/rest/v1/quote/submit';
export const REST_API_QUOTE_PDF = REST_API_ROOT + '/goapi/download/pdf';
// 
export const REST_API_SEARCH_CUSTOMER_CONTACT = REST_API_ROOT + '/goapi/rest/v1/search/customer/contact'; //'/goapi/SearchCustomerContact.aspx' //
export const REST_API_SEARCH_CUSTOMER = REST_API_ROOT + '/goapi/rest/v1/search/customer';
export const REST_API_QUOTE_SEARCH = REST_API_ROOT + '/goapi/rest/v2/DashboardList' //'/goapi/rest/v1/dashboard/list';
export const REST_API_QUOTE_DETAIL = REST_API_ROOT + '/goapi/rest/v1/quote/retrieve';
export const REST_API_QUOTE_AM = REST_API_ROOT +  '/goapi/rest/v2/GetAMS'  // '/goapi/rest/v1/dashboard/ams'; 
export const REST_API_QUOTE_DELETE = REST_API_ROOT + '/goapi/rest/v1/quote/delete';
export const REST_KEEPALIVE = REST_API_ROOT + '/goapi/rest/v1/keepalive';

//
const REST_MSCLOUD_ROOT = process.env.NODE_ENV === 'production' ? '' : 'https://agiledev.ncs.com.sg'; //'http://localhost:3001';
export const REST_CLOUD_QUESTION = REST_MSCLOUD_ROOT + '/goapi/rest/v2/GetQuestions'; // GetQuestionsV2.json
export const REST_CLOUD_PACKAGES = REST_MSCLOUD_ROOT + '/goapi/rest/v2/GetPackageOffer'; // GetPackageOffer.json
export const REST_CLOUD_ADDONS = REST_MSCLOUD_ROOT + '/goapi/rest/v2/GetAddons'; // GetAddons.json // https://agiledev.ncs.com.sg/GOAPI/rest/v2/GetAddons
export const REST_CLOUD_TERMS = REST_MSCLOUD_ROOT + '/goapi/rest/v2/GetContractDurations'; // GetContractDuration.json
export const REST_CLOUD_PRICE_SUMMARY = REST_MSCLOUD_ROOT + '/goapi/rest/v2/GetPriceSummary'; // GetPriceSummaryV2.json
export const REST_CLOUD_PRICE_SAVE = REST_MSCLOUD_ROOT + '/goapi/rest/v2/SavePriceSummary';


export const REST_CLOUD_QUOTE_DETAIL = REST_MSCLOUD_ROOT + '/goapi/rest/v2/QuoteRetrieve';
export const REST_CLOUD_QUOTE_SAVE = REST_MSCLOUD_ROOT + '/goapi/rest/v2/SaveDraftQuote';
export const REST_CLOUD_QUOTE_CREATE = REST_MSCLOUD_ROOT + '/goapi/rest/v2/CreateQuotation'; //'/goapi/rest/v2/quote/submit';
export const REST_CLOUD_QUOTE_PDF = REST_MSCLOUD_ROOT + '/goapi/DownloadPDFCloud.aspx'; //?uuid={uuid}
export const REST_CLOUD_PDF_TnC = REST_MSCLOUD_ROOT + '/goapi/DownloadDA.aspx?product=CLOUD'

const REST_CYBER_SECURITY_ROOT = process.env.NODE_ENV === 'production' 
	? 'http://localhost:3001' 
	: 'http://localhost:3001' // 'https://agiledev.ncs.com.sg';

export const REST_CYBER_SECURITY_QUESTIONS = REST_CYBER_SECURITY_ROOT + '/GOAPI/rest/v2/cyber/sec/questions' //'/goapi/rest/cyber-security/questions'
export const REST_CYBER_SECURITY_RECOMMENDATIONS = REST_CYBER_SECURITY_ROOT + '/GOAPI/rest/v2/cyber/sec/recommendations'
export const REST_CYBER_SECURITY_OVERVIEW = REST_CYBER_SECURITY_ROOT + '/GOAPI/rest/v2/cyber/sec/overview'
export const REST_CYBER_SECURITY_CONTRACT_TERMS = REST_CYBER_SECURITY_ROOT + '/GOAPI/rest/v2/cyber/sec/contract/duration'
export const REST_CYBER_SECURITY_CONTRACT_BOM = REST_CYBER_SECURITY_ROOT + '/GOAPI/rest/v2/cyber/sec/bom'
export const REST_CYBER_SECURITY_CONTRACT_SUMMARY = REST_CYBER_SECURITY_ROOT + '/GOAPI/rest/v2/cyber/sec/price/summary'

export const ROUTER_QUOTATION_DRAFT = '/QuotationDraft'

export const ROUTER_SD_BASE = '/SDLan';
export const ROUTER_SD_SOLUTION = ROUTER_SD_BASE + '/SolutionBuilder';
export const ROUTER_SD_CART = ROUTER_SD_BASE + '/ProfileList';
export const ROUTER_SD_PACKAGES = ROUTER_SD_BASE + '/RecommendedPackages';
export const ROUTER_SD_ADDON = ROUTER_SD_BASE + '/Addons';
export const ROUTER_SD_TERMS = ROUTER_SD_BASE + '/ContractTerms';
export const ROUTER_SD_CUSTOMER = ROUTER_SD_BASE + '/CustomerInfo';
export const ROUTER_SD_CONFIRMATION = ROUTER_SD_BASE + '/Confirmation';
export const ROUTER_SD_QUOTATION_DRAFT_EDIT = ROUTER_SD_BASE + ROUTER_QUOTATION_DRAFT + '/edit'

export const ROUTER_MS_CLOUD_BASE = '/MSCloud';
export const ROUTER_MS_TIERPLANS = ROUTER_MS_CLOUD_BASE + '/TierPlans';
export const ROUTER_MS_OVERVIEW = ROUTER_MS_CLOUD_BASE + '/Overview'
export const ROUTER_MS_ADDONS = ROUTER_MS_CLOUD_BASE + '/Addons'
export const ROUTER_MS_CONTRACT_TERMS = ROUTER_MS_CLOUD_BASE + '/ContractTerms'
export const ROUTER_MS_CUSTOMER_INFORMATION = ROUTER_MS_CLOUD_BASE + '/CustomerInformation'
export const ROUTER_MS_QUOTATION_DRAFT_EDIT = ROUTER_MS_CLOUD_BASE + ROUTER_QUOTATION_DRAFT + '/edit'

export const ROUTER_CYBER_SECURITY_BASE = '/CyberSecurity'
export const ROUTER_CYBER_SECURITY_SELECTION = ROUTER_CYBER_SECURITY_BASE + '/Selection'
export const ROUTER_CYBER_SECURITY_RECOMMENDATION = ROUTER_CYBER_SECURITY_BASE + '/Recommendation'
export const ROUTER_CYBER_SECURITY_OVERVIEW = ROUTER_CYBER_SECURITY_BASE + '/Overview'
export const ROUTER_CYBER_SECURITY_CONTRACT= ROUTER_CYBER_SECURITY_BASE + '/Contract'
export const ROUTER_CYBER_SECURITY_QUOTATION = ROUTER_CYBER_SECURITY_BASE + '/Quotation'

export const ROUTER_CART = '/Cart';

export const ROUTER_THANKYOU = '/Thankyou';
export const ROUTER_ERROR = '/Error';
export const ROUTER_LOGOUT =
	[
		'localhost',
		'agiledev.ncs.com.sg',
		'agilesit.ncs.com.sg',
		'agileuat.ncs.com.sg',
		'agilepreprod.ncs.com.sg',
		'agile.ncs.com.sg'
	].indexOf(window.location.hostname) >= 0
		? 'https://ssodev.ncs.com.sg/sso/UI/Logout'
		: 'https://sso.ncs.com.sg/sso/UI/Logout';
export const ROUTER_HOME = '/';
