import '../sass/page.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import {App} from './App';


const person = {
    firstName: 'Alex',
    lastName: 'Repeta'
};

ReactDOM.render(<App user = {person} />, document.getElementById('root'));

