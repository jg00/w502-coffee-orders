const COFFEE_ORDERS = "http://dc-coffeerun.herokuapp.com/api/coffeeorders/"


$("#btnAll").click(function(){
    getAllOrders()
});


function getAllOrders() {

    $("#divItems").empty();

    // Fetch coffee orders
    fetch(COFFEE_ORDERS)
        .then(function(response){
            return response.json() 
        })
        .then(function(coffeeOrders){
    
            for (let order in coffeeOrders){
    
                let id = coffeeOrders[order]._id;
                let emailAddress = coffeeOrders[order].emailAddress;
                let coffee = coffeeOrders[order].coffee;
    
                displayItem = `<div id='divDisplayItem'>
                                    <div class='divDisplayItemElement'>Id: ${id}</div>
                                    <div class='divDisplayItemElement'>Email: <span class='emailAddress'>${emailAddress}</span></div>
                                    <div class='divDisplayItemElement'>Order: ${coffee}</div>
                                    <div class='divDisplayItemElement'>
                                        <button id='btnRemoveOrder' onclick='RemoveOrder(this)'>Remove Order</button>
                                    </div>
                              </div>`
    
                $("#divItems").append(displayItem);
            }
        });
}


function RemoveOrder(sender) {

    let emailToRemove = $(sender).parent().parent().find('.emailAddress').text(); 

    let url = `http://dc-coffeerun.herokuapp.com/api/coffeeorders/${emailToRemove}`;
    
    fetch(url, {
        method: 'delete'
      }); 

    // Remove from list
    $(sender).parent().parent().remove();
}


$("#btnSearchByEmail").click(function(){
    let txtSearch = $("#txtSearch").val();
    let url = `http://dc-coffeerun.herokuapp.com/api/coffeeorders/${txtSearch}`;

    getOrderByEmail(url)
});


function getOrderByEmail(urlEmail) {

    $("#divItems").empty();

    // Fetch coffee orders
    fetch(urlEmail)
        .then(function(response){
            return response.json() 
        })
        .then(function(coffeeOrders){

            let id = coffeeOrders._id;
            let emailAddress = coffeeOrders.emailAddress;
            let coffee = coffeeOrders.coffee;

            displayItem = `<div id='divDisplayItem'>
                                <div class='divDisplayItemElement'>Id: ${id}</div>
                                <div class='divDisplayItemElement'>Email: <span class='emailAddress'>${emailAddress}</span></div>
                                <div class='divDisplayItemElement'>Order: ${coffee}</div>

                                <div class='divDisplayItemElement'>
                                    <button id='btnRemoveOrder' onclick='RemoveOrder(this)'>Remove Order</button>
                                </div>

                            </div>`
    
                $("#divItems").append(displayItem);
        });
}


$("#btnAddOrder").click(function(){
    let txtEmailAddress = $("#txtEmailAddress").val();
    let txtOrder = $("#txtOrder").val();

    let url = `http://dc-coffeerun.herokuapp.com/api/coffeeorders/`;

    newOrder = { 
        emailAddress: txtEmailAddress,
        coffee: txtOrder,
    }

    createNewOrder(url, newOrder)

    $("#txtEmailAddress").val("");
    $("#txtOrder").val("");
});


function createNewOrder(postUrl, newOrder) {

    fetch(postUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newOrder)
      }) 

}
















