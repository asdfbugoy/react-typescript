import React from 'react';
import ReactDOM from 'react-dom';
import App from 'AppRefactor';
import * as serviceWorker from 'serviceWorker';

import { Provider } from 'mobx-react';

import RootStore from 'stores/RootStore';
import makeInspectable from 'mobx-devtools-mst'
import { onPatch } from 'mobx-state-tree';


const store = RootStore.create({});

const startDebugging = () => {
	onPatch(store, patch => {
		console.log(patch)
	})
	makeInspectable(store)
}
if(process.env.NODE_ENV === 'development') startDebugging()

//*/ this is temporary counter for the keep alive, should remove it and use a proper API to update the token
setInterval( store.keepAlive, 900000 );
//*/ remove line above when refresh token work/////

store.createNewProduct({productName: 'SD LAN'});

ReactDOM.render(
	<Provider rootStore={store}>
		<App />
	</Provider>, 
	document.getElementById('singtel-go')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
