var ChampionshipView = Backbone.View.extend({
  el: $('#championships'),
  template: _.templateFromUrl("/resources/templates/html/accordian.htm", this.collection),
  initialize: function() {
    this.listenTo(this.collection, 'reset', this.render);
  },
  render: function() {
    if (this.collection.length > 0) {
      this.$el.html(this.template({
        collection: this.collection.toJSON()
      }));
    } else {
      this.$el.html("<h1>Championships</h1>");
    }
    return this;
  },
});
var WrestlerView = Backbone.View.extend({
  el: $('footer'),
  template: _.templateFromUrl("/resources/templates/html/wrestler.htm", this.collection),
  initialize: function() {
    this.listenTo(this.collection, 'create reset', this.render);
    console.log("WrestlerView initialised!");
    console.log(this.collection);
  },
  render: function() {
      this.$el.after(this.template({
        collection: this.collection.toJSON()
      }));
      //this.$el.html("<h1>Wrestlers</h1>");
  },
});
var GymView = Backbone.View.extend({
  el: $('#wrestlerpedia'),
  events: {
    "click .btn": "showWrestler"
  },
  showWrestler: function(event) {
    console.log(event);
    console.log(this.collection);
  },
  createWrestlerView : function(wrestler){
    var wrestlerView = new WrestlerView({model:wrestler});
    this.$el.append(wrestlerView.render().el);
  },
  template: _.templateFromUrl("/resources/templates/html/gym.htm", this.collection),
  initialize: function() {
    this.listenTo(this.collection, 'reset', this.render);
    console.log(this.collection);
  },
  render: function() {
    if (this.collection.length > 0) {
      this.$el.html(this.template({
        collection: this.collection.toJSON()
      }));
      //this.collection.forEach(this.createWrestlerView(),this);
    } else {
      this.$el.html("<h1>Wrestlers</h1>");
    }
    return this;
  },
});