window.onload = function() {
  const theForm = document.getElementById("payment-form");

  Stripe.setPublishableKey("pk_test_WtKftRIzpOlpR1A3l3BjJsxs000vXfOC0G");
  const stripeResponseHandler = (status, response) => {
    if (response.error) {
      console.log("my stripe error runs....olgy");
      const errorParagraph = document.getElementById("payment-errors");
      errorParagraph.parentElement.parentElement.style.display = "block";
      errorParagraph.innerText = response.error.message;
    } else {
      const token = response.id;
      const myInp = document.createElement("input");
      myInp.value = token;
      myInp.setAttribute("type", "hidden");
      myInp.setAttribute("name", "stripeToken");
      theForm.appendChild(myInp);
      theForm.submit();
    }
  };

  if (theForm) {
    theForm.onsubmit = function(e) {
      e.preventDefault();
      let cardNumber = document.getElementById("card-number").value;
      let cvcCode = document.getElementById("card-cvc").value;
      let expMonth = document
        .getElementById("card-expiry-month-year")
        .value.slice(0, 2);
      let expYear = document
        .getElementById("card-expiry-month-year")
        .value.slice(3, 5);

      Stripe.card.createToken(
        {
          cvc: cvcCode,
          number: cardNumber,
          exp_month: expMonth,
          exp_year: expYear
        },
        stripeResponseHandler
      );
    };
  }
};
