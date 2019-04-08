import React, { Component } from 'react';
import {ipfsSender, ipfsFetcher} from '../ipfsStore'

export default class OrganizeElection extends Component {

    constructor(props){
        super(props)
        this.state = {
            ElectionHash : null,
            ElectionData : null
        }
    }

    createElelction = async() => {
        console.log("Create it");

        const {contract, OrganizerData, back, accounts} = this.props;
        const ElectionData = {
            typeOfElection : "Lok Sabha",
            constituency : "Madhya Pradesh",
            organizer : "Election Committion",
            electionDate : "20/3/19",
            resultDate : "28/3/19",
            ICRD : "17/3/19",
            FCRD : "19/3/19",
            TotalVoters : 55
        }

        let ElectionHash = await ipfsSender(ElectionData);
        console.log(ElectionHash);
        console.log(contract)

        await contract.methods.addElection(OrganizerData.Address, ElectionHash).send({from: accounts[2],gas:6721975})
        .then((result) => {
          console.log(result)
        })
        .then(console.log)
        .catch((error) => {
          console.log(error)
        });

        //add an NOTA CAndidate into the new election
        await contract.methods.addCandidate(ElectionHash, "NOTA", "anywhere").send({from: accounts[2],gas:6721975})
        .then((receipt) => {
          console.log(receipt)
        })
        .catch((error) => {
          console.log(error)
        });

        // let ElectionData2 = await ipfsFetcher(ElectionHash)
        // console.log(ElectionData2);
    
        await contract.methods.getElection(OrganizerData.Address, 0).call()
        .then(console.log)
        .catch(console.error)

        alert("Thank you for Organize Election")
        back();
    }   

    render(){
        console.log(this.props.OrganizerData)
        return (
            <div>
                <button onClick={this.createElelction}>Sumit</button>
            </div>
        )
    }
}