// **This example illustrates the declaration and instantiation of a minimalist View.**
//
// _Working example: [1.html](../1.html)._  
// _[Go to Example 2](2.html)_

// Self-executing wrapper
(function($){
  // **ListView class**: Our main app view.
  var ListView = Backbone.View.extend({    
    el: $('body'), // attaches `this.el` to an existing element.
    // `initialize()`: Automatically called upon instantiation. Where you make all types of bindings, _excluding_ UI events, such as clicks, etc.
    initialize: function(){
      _.bindAll(this, 'render'); // fixes loss of context for 'this' within methods
       
       this.render(); // not all views are self-rendering. This one is.
    },
    // `render()`: Function in charge of rendering the entire view in `this.el`. Needs to be manually called by the user.
    render: function(){
      $(this.el).append("<ul> <li>hello world</li> </ul>");
    }
  });

  // **listView instance**: Instantiate main app view.
  var listView = new ListView();      
})(jQuery);

// <div style="float:left; margin-bottom:40px;"><img style="width:42px; margin-right:10px;" src="https://twitter.com/images/resources/twitter-bird-light-bgs.png"/></div> <div style="background:rgb(245,245,255); padding:10px;">Follow me on Twitter: <a target="_blank" href="http://twitter.com/ar2r">@ar2r</a> </div>
// <script>
//   if (window.location.href.search(/\?x/) < 0) {
//     var _gaq = _gaq || [];
//     _gaq.push(['_setAccount', 'UA-924459-7']);
//     _gaq.push(['_trackPageview']);
//     (function() {
//       var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
//       ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
//       var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
//     })();
//   }
// </script>
