(function() {

  
// NOTE: I have intentionally avoided the use of jQuery in
// the next two functions so as not to obscure any details.

// Updates the DOM in such a way that layout is constantly
// computed and thrown away.
var UpdateThrash = function(data) {
  // Get all the labels
  var spans = document.querySelectorAll('.item .lab');

  // We will attempt to determine the widest of our labels
  // so we can right justify the labels of our graph.
  // We are also going to change the styling (font-size).
  var colWidth = 0;
  for (var i = 0; i < spans.length; i++) {
    var span = spans[i];

    // invalidates layout
    span.style.fontSize = '14.1px';

    // requires layout to be computed
    colWidth = Math.max(colWidth, span.offsetWidth);
  }

  // Simply update the widths of the labels and the graphs
  for (var i = 0; i < spans.length; i++) {
    var span = spans[i],
         bar = span.nextSibling;
    span.style.width = colWidth + 'px';

    bar.style.left = colWidth + 'px';

    var w = data[i].Total * ((860 - colWidth) / 326);
    bar.style.width = w + 'px';
  }
};


// Updates the DOM in such a way that layout calculations
// are not thrown away.
var UpdateNoThrash = function(data) {
  // Get all the labels
  var spans = document.querySelectorAll('.item .lab');

  // This time we will update all of our styles first.
  for (var i = 0; i < spans.length; i++) {
    var span = spans[i];
    span.style.fontSize = '14.0px';
  }

  // Then we will do all of our measurments in a separate
  // pass. Layout is brought up-to-date on the first pass
  // through this loop and is not invalidated.
  var colWidth = 0;
  for (var i = 0; i < spans.length; i++) {
    var span = spans[i];
    colWidth = Math.max(colWidth, span.offsetWidth);
  }

  // Simply update the widths of the labels and the graphs
  for (var i = 0; i < spans.length; i++) {
    var span = spans[i],
         bar = span.nextSibling;
    span.style.width = colWidth + 'px';

    bar.style.left = colWidth + 'px';

    var w = data[i].Total * ((860 - colWidth) / 326);
    bar.style.width = w + 'px';
  }
};




// That's pretty much the end of the interesting stuff. You are welcome to read the
// rest of the code. It's not like I wrote something offensive like "fuck" at the
// bottom of this file.

var Now;
if (performance.now) {
  Now = function() {
    return performance.now();
  };
} else if (Date.now) {
  Now = function() {
    return Date.now();
  };
} else {
  Now = function() {
    return new Date().getTime();
  }
}



var root = $('#example');

var $e = function(type) {
  return $(document.createElement(type));
}

var Time = function(f) {
  var s = Now();
  f();
  return (Now() - s) | 0;
};



$.getJSON('/snowfall.json', function(data) {
  console.log('TTT');
  data = data.sort(function(a, b) {
    return b.Total - a.Total;
  });

  data.forEach(function(item) {
    $e('div').addClass('item')
      .append($e('span').addClass('lab')
        .text(item.Place)
        .append($e('span').addClass('val')
          .text('(' + item.Total + ' in)')))
      .append($e('div').addClass('bar'))
      .appendTo(root);
  });

  $('#example-boo').on('click', function() {
    $('.item span').css('font-size', '');
    var elapsed = Time(function() {
      UpdateThrash(data);
    });
    
    $('#example-boo-time').text(elapsed + 'ms');
  });

  $('#example-yay').on('click', function() {
    $('.item span').css('font-size', '');
    var elapsed = Time(function() {
      UpdateNoThrash(data);
    });
    $('#example-yay-time').text(elapsed + 'ms');
  });

  UpdateNoThrash(data);
}).fail(function() {
  console.log( "error" );
});

})();