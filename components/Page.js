import React from 'react';
import Question from './Question';

class Page extends React.Component{
    render(){
        return(
            <div className="page panel panel-default">
                <div className="panel-body">{this.props.title}

                    {this.props.questions.map((v,i)=>{
                        <Question key={i} name={v.name}/>
                    })}

                </div>
                <div className="panel-footer">
                    <button className="btn btn-primary">Save</button>
                    <button className="btn btn-default">Cancel</button>
                </div>
            </div>
        );    
    }   
}

export default Page;