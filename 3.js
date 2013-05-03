// **This example illustrates how to use a Collection of Models to store data, and how to tie changes in those to a View.**
//
// _Working example: [3.html](../3.html)._  
// _[Go to Example 4](4.html)_

//
(function($){
  // **Item class**: The atomic part of our Model. A model is basically a Javascript object, i.e. key-value pairs, with some helper functions to handle event triggering, persistence, etc.
  var Item = Backbone.Model.extend({
    defaults: {
      part1: 'hello',
      part2: 'world'
    }
  });      
  
  // **List class**: A collection of `Item`s. Basically an array of Model objects with some helper functions.
  var List = Backbone.Collection.extend({
    model: Item
  });

  var ListView = Backbone.View.extend({
    el: $('body'),
    events: {
      'click button#add': 'addItem'
    },
    // `initialize()` now instantiates a Collection, and binds its `add` event to own method `appendItem`. (Recall that Backbone doesn't offer a separate Controller for bindings...).
    initialize: function(){
      _.bindAll(this, 'render', 'addItem', 'appendItem'); // remember: every function that uses 'this' as the current object should be in here
      
      this.collection = new List();
      this.collection.bind('add', this.appendItem); // collection event binder

      this.counter = 0;
      this.render();      
    },
    render: function(){
      // Save reference to `this` so it can be accessed from within the scope of the callback below
      var self = this;      
      $(this.el).append("<button id='add'>Add list item</button>");
      $(this.el).append("<ul></ul>");
      _(this.collection.models).each(function(item){ // in case collection is not empty
        self.appendItem(item);
      }, this);
    },
    // `addItem()` now deals solely with models/collections. View updates are delegated to the `add` event listener `appendItem()` below.
    addItem: function(){
      this.counter++;
      var item = new Item();
      item.set({
        part2: item.get('part2') + this.counter // modify item defaults
      });
      this.collection.add(item); // add item to collection; view is updated via event 'add'
    },
    // `appendItem()` is triggered by the collection event `add`, and handles the visual update.
    appendItem: function(item){
      $('ul', this.el).append("<li>"+item.get('part1')+" "+item.get('part2')+"</li>");
    }
  });

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
