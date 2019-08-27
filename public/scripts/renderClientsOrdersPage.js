const renderClientsOrdersPage = function(data) {
  $("#clients-landing").empty();

  let newTemplateString = ``;
  console.log(data);

  data.forEach(element => {
    const newOrder = `
    <div class = "order-card-wrap" data-orderID='${element.order_id}'>
    <div class="ui raised very padded text container segment status-${element.order_status}" data-orderidstatus=${element.order_id}'>
  <h2 class="ui header order-card-wrap" >Order ID: ${element.order_id} </h2>
  <div class='orders-usersID'>
  <h1>Customer Name: ${element.name}</h1>
  </div>
  <div class='orders-placed_at'>
  Order Placed At: ${element.placed_at}
  </div>
  <div class='total'>
  Total: $ ${element.total_price / 100}
  </div>
  <div class='status'>
  Status: ${element.order_status}
  </div>
  <div class='confirm-completed' data-id='${element.order_id}'>
  <button class="ui secondary button">
  ${(element.order_status == 'submitted') ? 'Confirm' : 'Pick Up'}</button>
</div>
</div>
</div>
</div>
    `;
    newTemplateString += newOrder;
  });

  $("#clientsLeftContainer").append(newTemplateString);

  $(".order-card-wrap").on("click", function() {
    const orderId = $(this).data().orderid;
    const queryString = `/clients/2/orders/${orderId}`;

    $.ajax(queryString, { method: "GET" }).done(function(value) {
      console.log(value)
      renderOrdersDetail(value);
    });
  });

  $('.confirm-completed').on('click', function() {
    const orderId = $(this).data().id;
    const queryString = `/clients/2/orders/${orderId}`;
    $.ajax(queryString, { method: 'POST' })
    .done((value)=> {console.log(value)})
    setTimeout($.ajax('/clients/2/orders', { method: 'GET' })
      .done(function(value) {
      renderClientsOrdersPage(value);
      }), 5000);
  });
};
