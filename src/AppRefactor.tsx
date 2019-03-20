import React from 'react'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import { inject, observer } from 'mobx-react'
//import Loadable from 'react-loadable'
import { PageLoading, HeaderLoading, HomeLoading, ProductLoading } from './components/common/Loading'
import Footer from 'components/Footer'
import RouteConfiguration from 'utils/RouteConfiguration'

//const Header = Loadable({ loader: () => import('./components/Header'), loading: () => <HeaderLoading /> })
const Header = React.lazy(() => import('./components/Header'))

interface IAppContentProps {
	rootStore: object
	ready: boolean
}

class AppContent extends React.Component<IAppContentProps> {
	render() {
		const getLoading = (type: string) => {
			const loading: any = {
				home: <HomeLoading />,
				product: <ProductLoading />,
				page: <PageLoading />
			}
			return loading[type]
		}
		return (
			<Router>
				<div className="App">
					<React.Suspense fallback={<HeaderLoading />}><Header rootStore={this.props.rootStore} /></React.Suspense>
					<Switch>
						{RouteConfiguration.map((d, i) => {
							//const PageComponent = Loadable({ loader: () => import('./pages/'+d.filePath), loading: () => getLoading(d.loadingType) })
							const PageComponent = React.lazy(() => import('pages/' + d.filePath))
							return <Route key={i} exact path={d.path} component={(route: object, history: object) =>
								<React.Suspense fallback={getLoading(d.loadingType)}>
									{d.component ?
										d.component(route, this.props.rootStore, PageComponent) :
										<PageComponent route={route} rootStore={this.props.rootStore} />}
								</React.Suspense>}
							/>
						})}
					</Switch>
					<Footer />
				</div>
			</Router>
		);
	}
}

const App = inject('rootStore')(
	observer(({ rootStore }) => {
		return <AppContent rootStore={rootStore} ready={rootStore.product.isReady} />;
	})
);

export default App;
