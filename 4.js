// **This example illustrates how to delegate the rendering of a Model to a dedicated View.**
//
// _Working example: [4.html](../4.html)._  
// _[Go to Example 5](5.html)_

//
(function($){
  var Item = Backbone.Model.extend({
    defaults: {
      part1: 'hello',
      part2: 'world'
    }
  });
  
  var List = Backbone.Collection.extend({
    model: Item
  });

  // **ItemView class**: Responsible for rendering each individual `Item`.
  var ItemView = Backbone.View.extend({
    tagName: 'li', // name of (orphan) root tag in this.el
    initialize: function(){
      _.bindAll(this, 'render'); // every function that uses 'this' as the current object should be in here
    },
    render: function(){
      $(this.el).html('<span>'+this.model.get('part1')+' '+this.model.get('part2')+'</span>');
      return this; // for chainable calls, like .render().el
    }
  });
  
  var ListView = Backbone.View.extend({
    el: $('body'), // el attaches to existing element
    events: {
      'click button#add': 'addItem'
    },
    initialize: function(){
      _.bindAll(this, 'render', 'addItem', 'appendItem'); // every function that uses 'this' as the current object should be in here
      
      this.collection = new List();
      this.collection.bind('add', this.appendItem); // collection event binder

      this.counter = 0;
      this.render();
    },
    render: function(){
      var self = this;
      $(this.el).append("<button id='add'>Add list item</button>");
      $(this.el).append("<ul></ul>");
      _(this.collection.models).each(function(item){ // in case collection is not empty
        self.appendItem(item);
      }, this);
    },
    addItem: function(){
      this.counter++;
      var item = new Item();
      item.set({
        part2: item.get('part2') + this.counter // modify item defaults
      });
      this.collection.add(item);
    },
    // `appendItem()` is no longer responsible for rendering an individual `Item`. This is now delegated to the `render()` method of each `ItemView` instance.
    appendItem: function(item){
      var itemView = new ItemView({
        model: item
      });
      $('ul', this.el).append(itemView.render().el);
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
