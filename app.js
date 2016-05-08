import React from 'react';
import ReactDOM from 'react-dom';
import Form from './components/Form';

let pages = [{title:'page 1'},{title:'page 2'}];

ReactDOM.render(<Form title="form 1" pages={pages} />, document.getElementById('jorder-create'));