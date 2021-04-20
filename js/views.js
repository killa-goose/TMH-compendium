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
var WrestlerInfoView = Backbone.View.extend({
  el: $('footer'),
  template: _.templateFromUrl("/resources/templates/html/wrestler.htm", this.collection),
  initialize: function() {
    this.listenTo(this.collection, 'create reset', this.render);
  },
  render: function() {
    this.$el.after(this.template({
      collection: this.collection.toJSON()
    }));
    return this;
  },
});
var GymWrestlerView = Backbone.View.extend({
  events: {
    ".details-btn click": "showInfoPane"
  },
  template: _.templateFromUrl("/resources/templates/html/gymWrestler.htm", this.model),
  initialize: function() {
    this.listenTo(this.model, 'create reset', this.render);
    return this;
  },
  render: function() {
    console.log('GymWrestlerView render: ' + this);
    this.$el.append(this.template({
      model: this.model.toJSON()
    }));
    return this;
  },
  showInfoPane: function(event) {
    console.log(event);
    console.log(this.model);
  },
});
/*
var GymView = Backbone.CollectionView.extend({
  childViews :{},
  el: $('#wrestlerpedia'),
  events: {},
  createWrestlerView : function(wrestler){
    var w = new GymWrestlerView({model:wrestler});
    this.$el.append(w.render().el);
  },
  template: _.templateFromUrl("/resources/templates/html/gym.htm", this.collection),
  initialize: function() {
    this.listenTo(this.collection, 'reset', this.render);
  },
  render: function() {
    if (this.collection.length > 0) {
      this.$el.html(this.template({
        collection: this.collection.toJSON()
      }));
      this.collection.each(this.createWrestlerView(), this);
    } else {
      this.$el.html("<h1>Wrestlers</h1>");
    }
    return this;
  },
});
*/