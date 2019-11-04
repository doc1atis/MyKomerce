const myInp = $("#instantBox");
const myForm = $("#myForm");
function createDOM() {
  $.ajax({
    method: "GET",
    url: "/api/products/instant/search",
    data: {
      search_item: myInp.val()
    },
    dataType: "json",
    success: items => {
      $("#productSearchResults").empty();
      if (items.length === 0) {
        $("#productSearchResults")
          .append("Product you are looking for is not found!")
          .addClass("s-flex justify-content-center alert alert-warning");
      } else {
        $("#productSearchResults").removeClass("alert alert-warning");
        items.forEach(item => {
          $("#productSearchResults").append(
            `
<div class="col">
        <div class="card">
            <a href="/api/products/${item._id}">
                <img class="card-img-top" src="${item._source.image}" alt="Card image cap" />
            </a>
            <div class="card-body">
                <h5 class="card-title">Name: ${item._source.name}</h5>
                <p class="card-text">Category: ${item._source.category.name}</p>
                <p class="card-text">$ ${item._source.price}</p>
                <a href="/api/products/${item._id}" class="btn btn-primary">Shop</a>
            </div>
        </div>
    </div>
`
          );
        });
      }
    }
  });
}
myInp.keyup(function() {
  createDOM();
});
myForm.submit(function(e) {
  e.preventDefault();
  createDOM();
});
