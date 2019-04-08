import React, {Component} from 'react';
import { ipfsSender, ipfsFetcher } from '../ipfsStore';


export default class CandidateRequestForm extends Component{

    constructor(props){
        super(props)
        this.state = {
            isAgree : false,
            inputPlace : null,
            RequestHash : null
        }
    }

     updateInputValue(evt) {
        
        if(evt.target.name === 'place'){
            this.setState({
                inputPlace: evt.target.value
            })
        }
        if(evt.target.name === 'agree'){
            this.setState({
                isAgree: evt.target.checked
            })
        }

    }

    sendRequest = async(event) => {
        event.preventDefault();
        console.log("request sended")

        const {contract, accounts} = this.props.userObject;

        // const RequestData = {
        //     electionHash : this.props.electionHash,
        //     candidateHash : this.props.candidateHash,
        //     time : new Date(),
        //     status:'Requested',
        //     place : this.state.inputPlace
        // }

        // let RequestHash = await ipfsSender(RequestData)
        // this.setState({RequestHash})
        
        let date= new Date() + "";
        console.log(date)

        await contract.methods.setRequest(this.props.username, this.props.electionHash, date, this.state.inputPlace, "Requested").send({from: accounts[2],gas:6721975})
        .then((receipt) => {
          console.log(receipt)
          alert("Thank You for Sending Request")

          this.props.back();
          
        })
        .catch((error) => {
          console.log(error)
        });

        

    }

    render(){
        return (
            <div>
                <div>
                    <h3>Selected Election</h3>
                    <p>{this.props.electionHash}</p>
                </div>
                <div>
                    <h3>Selected Candidate</h3>
                    <p>{this.props.candidateHash}</p>
                </div>
                <div>
                    <form onSubmit={this.sendRequest}>
                        <label htmlFor='place'>Place</label>
                        <input name='place' onChange={evt => this.updateInputValue(evt)}/>
                        <br />
                        <label htmlFor='agree'>Agree</label>
                        <input type='checkbox' name='agree' onChange={evt => this.updateInputValue(evt)}/>
                        {
                            this.state.isAgree &&  <input type="submit" value="Send"/>
                        }       
                    </form>
                </div>
            </div>
        )
    }
}