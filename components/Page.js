import React from 'react';

class Page extends React.Component{
    render(){
        return(
            <div className="page panel panel-default">
                <div className="panel-body">{this.props.title}</div>
                <div className="panel-footer">
                    <button className="btn btn-primary">Save</button>
                    <button className="btn btn-default">Cancel</button>
                </div>
            </div>
        );    
    }   
}

export default Page;