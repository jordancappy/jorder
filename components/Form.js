import React from 'react';
import Page from './Page';

class Form extends React.Component {
  constructor(props) {
    super();
    this.state = { pages: [] };
  }
  componentDidMount() {
    $.get('/api/forms/' + this.props.id, (data) => {
      console.log('data', data);
      this.setState({ name: data.name });
    });
  }
  render() {
    return (
      <div className="form">
        <h1>{this.state.name}</h1>
        {this.state.pages.map((x, i) =>
          <Page key={i} title={x.title} questions={x.questions}/>
        ) }
      </div>
    );
  }
}

export default Form;