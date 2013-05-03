// **This example introduces two new Model actions (swap and delete), illustrating how such actions can be handled within a Model's View.**
//
// _Working example: [5.html](../5.html)._

//
(function($){
  // `Backbone.sync`: Overrides persistence storage with dummy function. This enables use of `Model.destroy()` without raising an error.
  Backbone.sync = function(method, model, success, error){ 
    success();
  }
  
  var Item = Backbone.Model.extend({
    defaults: {
      part1: 'hello',
      part2: 'world'
    }
  });
  
  var List = Backbone.Collection.extend({
    model: Item
  });

  var ItemView = Backbone.View.extend({
    tagName: 'li', // name of tag to be created        
    // `ItemView`s now respond to two clickable actions for each `Item`: swap and delete.
    events: { 
      'click span.swap':  'swap',
      'click span.delete': 'remove'
    },    
    // `initialize()` now binds model change/removal to the corresponding handlers below.
    initialize: function(){
      _.bindAll(this, 'render', 'unrender', 'swap', 'remove'); // every function that uses 'this' as the current object should be in here

      this.model.bind('change', this.render);
      this.model.bind('remove', this.unrender);
    },
    // `render()` now includes two extra `span`s corresponding to the actions swap and delete.
    render: function(){
      $(this.el).html('<span style="color:black;">'+this.model.get('part1')+' '+this.model.get('part2')+'</span> &nbsp; &nbsp; <span class="swap" style="font-family:sans-serif; color:blue; cursor:pointer;">[swap]</span> <span class="delete" style="cursor:pointer; color:red; font-family:sans-serif;">[delete]</span>');
      return this; // for chainable calls, like .render().el
    },
    // `unrender()`: Makes Model remove itself from the DOM.
    unrender: function(){
      $(this.el).remove();
    },
    // `swap()` will interchange an `Item`'s attributes. When the `.set()` model function is called, the event `change` will be triggered.
    swap: function(){
      var swapped = {
        part1: this.model.get('part2'), 
        part2: this.model.get('part1')
      };
      this.model.set(swapped);
    },
    // `remove()`: We use the method `destroy()` to remove a model from its collection. Normally this would also delete the record from its persistent storage, but we have overridden that (see above).
    remove: function(){
      this.model.destroy();
    }
  });
  
  // Because the new features (swap and delete) are intrinsic to each `Item`, there is no need to modify `ListView`.
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
