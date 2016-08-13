/**
Splits sent ether to two accounts A and B which are set when the contract is deployed
I think on the bright side it's not complex enough to present a significant attack surface
 **/
contract Splitter{

    //TODO: admin functions
    address public owner;
    address A;
    address B;
    bool public isReady;
    
    event Transfer(address indexed _from, uint256 _value);
    
    function Splitter(address _A, address _B){
        owner = msg.sender;
        A = _A;
        B = _B;
        isReady = true;
    }
    
    
    function setAddresses(address _A, address _B){
        if(msg.sender != owner){ return;}
        A = _A;
        B = _B;
        isReady = true;
    }
    
    //note: does not work. I don't understand why!!!
    function getAddresses() returns (address[]){
        address[] memory addresses;
        addresses[0] = 0x1df350adb023808b3ef077e966869f48b7c42b9b;//dummy
        addresses[1] = B;//real one - do any work?
        return addresses;
    }
    
    function getA() returns (address){
        return A;
    }

    function getB() returns (address){
        return B;
    }
    
    function getBalanceA() returns(uint256){
        return A.balance;
    }
    
    function getBalanceB() returns(uint256){
        return B.balance;
    }
    
    function getBalance() returns(uint256){
        return this.balance;
    }
    
    function getOwner() returns (address){
        return owner;
    }
    
    function () {
        if(!isReady) {return;}
        uint toA = msg.value / 3;//keep a third for the contract as a fee
        uint toB = msg.value / 3;
        
        A.send(toA);
        B.send(toB);
        
        Transfer(msg.sender, msg.value);
        
}
    
    //how did this get in here??? ^_^;;;
    function haircut() returns (uint256){
        if(msg.sender != owner){ return;}
        owner.send(this.balance);
    }
}