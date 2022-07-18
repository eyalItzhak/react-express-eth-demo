// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.15;


contract basic {


modifier onlyOwner {
      require(msg.sender == owner);
      _;
}

address public owner;
address public peer;

address public lastSender;
int public lastAmaunt;

constructor(address p2){
	owner=msg.sender;
	peer=p2;
}

//see the balance of the contract
function getTotalBalance () public view returns (uint){
	return address(this).balance;
}

//only owner can sent money from contract 
function sentMoneyto (uint to,uint256 _value) public onlyOwner{
		if(to==1){
			(payable(peer)).transfer(_value);
		}else{
			(payable(owner)).transfer(_value);
		}
}
//can get money from evreyone 
function getMoneyFrom() public payable{
		lastSender = msg.sender;
		lastAmaunt =int(msg.value);
}

function cangePeer(address newPeer) public onlyOwner{
	peer=newPeer;
}

}