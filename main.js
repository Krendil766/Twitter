const Character = function(param) {
    this.name = param.name;
    this.server = param.server;
    this.gender = param.gender;
}

Character.prototype.walk = function() {
    console.log(this.name + " walk ");
}

Character.prototype.run = function() {
    console.log(this.name + ' run ');
}

const Race = function(param) {
    Character.apply(this, arguments)
    this.race = param.race;
}
Race.prototype = Object.create(Character.prototype);

Race.prototype.mainSkills = function() {
    console.log(this.name + ' mag ');
}

const Class = function(param) {
    Race.apply(this, arguments)
    this.specialSkills = param.specialSkills;
}
Class.prototype.classSkill = function() {
    console.log(this.name + ' use classes ability ');
}

Class.prototype = Object.create(Race.prototype)

let classss = new Class({
    name: "aleh",
    gender: 'man',
    server: 'cisco',
    specialSkills: 'strength',
    race: "Org"
});

console.log(classss);
classss.walk()