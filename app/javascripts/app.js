var accounts;
var account;
var balance;

function setStatus(message) {
  var status = document.getElementById("status");
  status.innerHTML = message;
};

function refreshBalance() {
  var meta = Splitter.deployed();
    
  var balance_element = document.getElementById("balance");
  balance_element.innerHTML = meta.balance;
    
    meta.getOwner.call().then(function(value) {
      var owner_element = document.getElementById("owner");
      owner_element.innerHTML = value.valueOf();
    }).catch(function(e) {
     console.log(e);
     setStatus("Error getting owner; see log.");
    });
    
    meta.getBalance.call().then(function(value) {
                              var balance_element = document.getElementById("balance");
                              //is this correct for BigNumber size values???
                              balance_element.innerHTML = value.valueOf();
                              }).catch(function(e) {
                                       console.log(e);
                                       setStatus("Error getting balance; see log.");
                                       });
    meta.getA.call().then(function(value) {
                                  var elementA = document.getElementById("addressA");
                                  elementA.innerHTML = value;
                                  }).catch(function(e) {
                                           console.log(e);
                                           setStatus("Error getting address A; see log.");
                                           });
    meta.getBalanceA.call().then(function(value) {
                          var balanceA = document.getElementById("balanceA");
                          //is this correct for BigNumber size values???
                          balanceA.innerHTML = value.toString(10);
                          }).catch(function(e) {
                                   console.log(e);
                                   setStatus("Error getting balance of A; see log.");
                                   });

    meta.getB.call().then(function(value) {
                          var elementB = document.getElementById("addressB");
                          elementB.innerHTML = value;
                          
                          }).catch(function(e) {
                                   console.log(e);
                                   setStatus("Error getting address B; see log.");
                                   });
    meta.getBalanceB.call().then(function(value) {
                                 var balanceB = document.getElementById("balanceB");
                                 //is this correct for BigNumber size values???
                                 balanceB.innerHTML = value.toString(10);
                                 }).catch(function(e) {
                                          console.log(e);
                                          setStatus("Error getting balance of B; see log.");
                                          });

};

function sendEth() {
  var meta = Splitter.deployed();
    var destination = meta.address;

  var amount = parseInt(document.getElementById("amount").value);
  //var receiver = document.getElementById("receiver").value;

  setStatus("Initiating transaction; sending " + amount+  "to " + destination.toString() + "... (please wait)");
    web3.eth.sendTransaction({
         from: web3.eth.coinbase,
         to: destination,
         value: web3.toWei(amount, "ether")
         }, function(error, result){
             if(!error){
                 setStatus("Sent transaction; sending " + amount+  " to " + destination.toString() + "... (please wait)");
                 console.log("sent "+ amount+" ether from "+web3.eth.coinbase+" to " + destination+ "conformation " + result);
                 //use an event to update the UI once the transaction is complete;
                 var events = meta.Transfer({fromBlock: web3.eth.blockNumber, toBlock: 'latest'});
         
                 events.watch(function(error, result) {
                     if (error == null) {
                        console.log(result.args);
                        setStatus("Transaction completed. Split " + result.args._value + " from "+ result.args._from );
                        refreshBalance();
                     }
                 });
          
             }else{
                 console.error("ERROR sending "+ amount+" ether from "+web3.eth.coinbase+" to " + destination+ "error " + error);
                 setStatus("Error sending ether; see log.");
             }
    });
    
};

window.onload = function() {
  web3.eth.getAccounts(function(err, accs) {
    if (err != null) {
      alert("There was an error fetching your accounts.");
      return;
    }

    if (accs.length == 0) {
      alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
      return;
    }

    accounts = accs;
    account = accounts[0];

    refreshBalance();
  });
}
