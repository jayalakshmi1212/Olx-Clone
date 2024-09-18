import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { FirebaseContext } from './store/firebaseContext';
import Context from './store/firebaseContext';
import { firestore, Firebase } from './firebase';
ReactDOM.render(
<FirebaseContext.Provider value={{firestore, Firebase}}>
<Context>
    <App />
</Context>
</FirebaseContext.Provider>
,document.getElementById('root'));
