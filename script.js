document.getElementById('orderForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Förhindra standardbeteende för formulärskickning
    var name = document.getElementById('name').value;
    var phone = document.getElementById('phone').value;
    var email = document.getElementById('email').value;
    var address = document.getElementById('address').value;
  
    // Enkel validering (bara för att visa konceptet)
    if (name && phone && email && address) {
      // Skicka beställningen till backend eller visa bekräftelsesida
      window.location.href = 'confirmation.html';
    } else {
      alert('Var god fyll i alla fält');
    }
  });
  