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
                                    <div class='divDisplayItemElement'>Email: ${emailAddress}</div>
                                    <div class='divDisplayItemElement'>Order: ${coffee}</div>
                              </div>`
    
                $("#divItems").append(displayItem);
            }
        });
}


$("#btnSearchByEmail").click(function(){
    let txtSearch = $("#txtSearch").val();
    let url = `http://dc-coffeerun.herokuapp.com/api/coffeeorders/${txtSearch}`;

    getOrderByEmail(url)
});


function getOrderByEmail(urlEmail) {

    $("#divItems").empty();

    // Fetch coffee order
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
                                <div class='divDisplayItemElement'>Email: ${emailAddress}</div>
                                <div class='divDisplayItemElement'>Order: ${coffee}</div>
                            </div>`
    
                $("#divItems").append(displayItem);
        });
}






