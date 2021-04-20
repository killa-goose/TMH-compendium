var Wrestler = Backbone.Model.extend({
  initialize: function() {
    this.set('id', this.attributes.Name.replace(/ /g,""));
    this.set('MinTier', function() {return this.MaxTier - 2});
    console.log(this);
  },
  defaults: {
    Abilities: {},
    AbilityLevels: 0,
    Alignment: "",
    Archetype: "",
    AscensionLevel: 0,
    Attack: 100,
    CountdownReduction: 0,
    DamageReduction: 0,
    Description: "",
    Gear: [],
    Health: 5000,
    id: "",
    Level: 1,
    Name: "",
    MaxLevel: 65,
    MaxTier: 6,
    MinTier: 4,
    MovementType: "",
    Power: 200,
    Range: 80,
    Role: "",
    Speed: 75,
    SprintTime: 1.5,
    Talent: "Superstar",
    Weight: 250
  }
});
var Piercer = Wrestler.extend({
  defaults: _.extend({},Wrestler.prototype.defaults,
    {MovementType: "Piercer",Weight: 150}
  )
});
var Lightweight = Wrestler.extend({
  defaults: _.extend({}, Wrestler.prototype.defaults,
    {MovementType: "Lightweight",Weight: 80}
  )
});
var Superstar = Wrestler.extend({
  defaults: _.extend({}, Wrestler.prototype.defaults,
    {MaxLevel: 60,MaxTier: 5,Talent: "Superstar"}
  )
});
var Stage = Backbone.Model.extend({
  defaults: {
    Belt: false,
    NRounds: 1,
    Name: "",
    Rewards: {
      Cash: 0,
      Coaches: [""],
      Gear: [""]
    }
  }
});
var Championship = Backbone.Model.extend({
  defaults: {
    NStages: 0,
    Name: "",
    id: 0
  }
});
var ChampionshipsCollection = Backbone.Collection.extend({
    model: Championship,
    url: "/resources/data/championships.json"
});
var WrestlersCollection = Backbone.Collection.extend({
  model: Wrestler,
  url: "/resources/data/wrestlers.json"
});