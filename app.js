import React from 'react';
import ReactDOM from 'react-dom';
import Form from './components/Form';
import FormList from './components/FormList';

//let pages = [{title:'page 1', questions:[{name:'jcaps'},{name:'jcaps'}]},{title:'page 2',questions:[]}];
let id = document.getElementById('formId').value;

ReactDOM.render(<Form id={id} />, document.getElementById('jorder-create'));
//ReactDOM.render(<FormList />, document.getElementById('jorder-forms'));