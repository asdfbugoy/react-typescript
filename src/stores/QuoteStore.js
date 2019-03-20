import { types, flow, applySnapshot, getParent, destroy, getSnapshot } from 'mobx-state-tree';
import { REST_API_QUOTE_SEARCH, REST_API_QUOTE_AM, REST_API_QUOTE_DELETE, REST_CREDENTIALS } from './global';
import * as moment from 'moment'

const QuoteModel = types
    .model('QuoteModel', {
        accountName: '',
        accountUEN: '',
        am: '',
        duration: 0,
        durationUnit: '',
        lastModifiedDate: '',
        otc: 0,
        rc: 0,
        uuid: '',
        isFetching: false,
        productName: ''
    })
    .views(self => ({
        getLastModifiedDate() {
            return moment(self.lastModifiedDate).format('D MMM Y')
        }
    }))
    .actions( self => ({
        remove: flow ( function* remove(){
            try {
                self.isFetching = true;
				const response = yield window.fetch(
					REST_API_QUOTE_DELETE,
					{
						method: 'POST', credentials: REST_CREDENTIALS,
						headers: {
							'Content-Type': 'application/json'
						},
						body: self.uuid.toString()
					}
				)
				if ( response.ok ) {
                    getParent(self, 2).removeItem(self);
                    return { status: response.status };
                }
					
                const result = yield response.json();
                self.isFetching = false;
				return {
					status: response.status,
					body: result
				};
			} catch (err) {
				console.error(err);
				throw 'There is unexpected issue from your request';
			}
        }),
    }))



const AccountManagerModel = types
    .model('AccountManagerModel', {
        userId: types.identifierNumber,
        name: ''
    })

const SearchModel = types
    .model('SearchModel', {
        query: '',
        from: types.maybeNull(types.Date),
        to: types.maybeNull(types.Date),
        am: types.maybeNull(AccountManagerModel)
    })

const PaginationModel = types
    .model('PaginateModel', {
        totalCount: 0,
        pageSize: 0,
        pageNo: 0,
    })

const QuoteStore = types
    .model('QuoteStore', {
        isLoading: false,
        params: types.optional(SearchModel, {}),
        quotes: types.array(QuoteModel, []),
        pagination: types.optional(PaginationModel, {
            pageSize: 12,
            pageNo: 1,
        }),
        ams: types.array(AccountManagerModel, [])
    })
	.views(self => ({
        get showLoadMore() {
            return !self.isLoading ? self.pagination.totalCount > self.pagination.pageNo * self.pagination.pageSize : true
        },
        getAms() {
            return getSnapshot(self.ams).map(d=>({
                label: d.name,
                value: d.userId
            }))
        },
        get getAm() {
            return self.params.am ? {
                label: self.params.am.name,
                value: self.params.am.userId
            } : null
            // if(self.params.am) {
            //     getSnapshot(self.ams).find(d => {
            //         return d.userId === parseInt(self.params.am) ? {
            //             label: d.name,
            //             value: d.userId
            //         } : null
            //     })
            // }
            // else return null
        },
        get formattedFrom() {
            return self.params.from ? moment(self.params.from) : null
        },
        get formattedTo() {
            return self.params.to ? moment(self.params.to) : null
        },
        getServerDateFormat(date) {
            return moment(date).format('YYYY-MM-DD') // YYYY-MM-DDT00:00:00
        },
        getDisplayDateFormat(name) {
            return self.params[name] ? moment(self.params[name]) : null
        }
	}))
	.actions(self => ({
        toggleLoading(status) {
            self.isLoading = status
        },
        onChange({name, value}) {
            self.params[name] = value.toString()
        },
        onChangeSelect({name, value}) {
            self.params[name] =  value && value.value ? {
                name: value.label,
                userId: value.value,
            } : null
        },
        onChangeDate({name, value}) {
            self.params[name] = moment(value)._isValid ? new Date(value) : null
        },
        resetParams() {
            destroy(self.params)
        },
        setPageNo(isLoadMore) {
            isLoadMore ? ++self.pagination.pageNo : self.pagination.pageNo = 1
        },
        fetchQuoteBackUp: flow(function* fetchQuote(isLoadMore) {
            try {
                const response = yield window.fetch(
                    REST_API_QUOTE_SEARCH,
                    {
                        method: 'POST', credentials: REST_CREDENTIALS,
                        headers: {
                            'Content-Type': 'application/json',
                            'pageSize': self.pagination.pageSize,
							'pageNo': self.pagination.pageNo
                        },
                        body: JSON.stringify({
                                //...getSnapshot(self.params),
                                query: self.params.query,
                                from: self.params.from ? self.getServerDateFormat(self.params.from) : null,
                                to: self.params.to ? self.getServerDateFormat(self.params.to) : null,
                                am: self.params.am ? self.params.am.userId : null
                            })
                    }
                )
                const data = yield response.json()
                applySnapshot(self.quotes, isLoadMore ? [...self.quotes, ...data] : data)
                self.pagination.totalCount = parseInt(response.headers.get('TotalCount'))
            } catch (err) {
                console.error(err);
                throw 'There is unexpected issue from your request';
            }
        }),
        fetchQuote: flow(function* fetchQuote(isLoadMore) {
            try {
                const response = yield window.fetch(
                    REST_API_QUOTE_SEARCH,
                    {
                        method: 'POST', credentials: REST_CREDENTIALS,
                        headers: {
                            'Content-Type': 'application/json',
                            // 'pageSize': self.pagination.pageSize,
                            // 'pageNo': self.pagination.pageNo
                        },
                        body: JSON.stringify({
                            DashboardListReqParam: {
                                //...getSnapshot(self.params),
                                query: self.params.query,
                                from: self.params.from ? self.getServerDateFormat(self.params.from) : null,
                                to: self.params.to ? self.getServerDateFormat(self.params.to) : null,
                                am: self.params.am ? self.params.am.userId : null
                            },
                            'pageSize': self.pagination.pageSize,
                            'pageNo': self.pagination.pageNo
                        })
                    }
                )
                const data = yield response.json()
                applySnapshot(self.quotes, isLoadMore ? [...self.quotes, ...data.list] : data.list)
                self.pagination.totalCount = parseInt(data.count)
            } catch (err) {
                console.error(err);
                throw 'There is unexpected issue from your request';
            }
        }),
        fetchAM: flow(function* fetchAM() {
            try {
                const response = yield window.fetch(
                    REST_API_QUOTE_AM,
                    {
                        method: 'POST', credentials: REST_CREDENTIALS,
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }
                )
                applySnapshot(self.ams, yield response.json())
            } catch (err) {
                console.error(err);
                throw 'There is unexpected issue from your request';
            }
        }),
        removeItem(item){
            destroy(item);
        }
    }))
    
export { QuoteStore }