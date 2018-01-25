import Rebase from 're-base';
import firebase from 'firebase';

const app = firebase.initializeApp({
	apiKey: "AIzaSyB8u6npR4uAkeOx40GiIFvbzZ7mN2FP1jA",
    authDomain: "trail-way.firebaseapp.com",
    databaseURL: "https://trail-way.firebaseio.com/",
});

const base = Rebase.createClass(app.database());

export { app, base };