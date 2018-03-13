
function calculator() {
  let array = [];
  let val = '';
  let opValue = "";
  let tot = 0;

document.getElementById('total').innerHTML = tot;

  $(document).ready(function() {
    $('.operator').on('click', function() {
      opValue = $(this).attr('value');
      console.log('v1', val)

      val = parseFloat(val);
      console.log('v2', val)

      array.push(val);
      val = "";
      document.getElementById('total').innerHTML = opValue;
      console.log(opValue)
    });

      $('.num').on('click', function() {
        let numValue = $(this).attr('value');
        val += numValue;
        document.getElementById('total').innerHTML = val;
    });

    $('.equal').on('click', function() {
      val = parseFloat(val);
      array.push(val);
      switch(opValue) {
        case "*": tot = (array[0] * array[1]).toFixed(2);
        break;
        case "+": tot = (array[0] + array[1]).toFixed(2);
        break;
        case "-": tot = (array[0] - array[1]).toFixed(2);
        break;
        case "/": tot = (array[0] / array[1]).toFixed(2);
        break;
      }
      array.length = 0;
      val = tot;
      console.log(tot)
      document.getElementById('total').innerHTML = tot;
    });

    $('.clear').on('click', function() {
      array = [];
      val = '';
      opValue = "";
      tot = 0;
      document.getElementById('total').innerHTML = tot;
    });
  });
}


calculator()
