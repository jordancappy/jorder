import React from 'react';
import ReactDOM from 'react-dom';
import Form from './components/Form';

let pages = [{title:'page 1', questions:[{name:'jcaps'},{name:'jcaps'}]},{title:'page 2',questions:[]}];

ReactDOM.render(<Form title="form 1" pages={pages} />, document.getElementById('jorder-create'));