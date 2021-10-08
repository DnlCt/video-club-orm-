const Sequelize = require('sequelize');

const actorModel = require('./models/actor');
const bookingModel = require('./models/booking');
const copyModel = require('./models/copy');
const directorModel = require('./models/director');
const genreModel = require('./models/genre');
const memberModel = require('./models/member');
const movieModel = require('./models/movie');
const movieActorModel =require('./models/movieActor');

// 1.- db name
// 2.- user
// 3.- password
// 4.- Obj conf
const sequelize = new Sequelize('video-club', 'root', 'abc1234', {
    host:'localhost',
    dialect:'mysql'
});
const Actor = actorModel(sequelize,Sequelize);
const Booking = bookingModel(sequelize,Sequelize);
const Copy = copyModel(sequelize,Sequelize);
const Director = directorModel(sequelize,Sequelize);
const Genre = genreModel(sequelize,Sequelize);
const Member = memberModel(sequelize,Sequelize);
const Movie = movieModel(sequelize,Sequelize);
const MovieActor = movieActorModel(sequelize,Sequelize);

Genre.hasMany(Movie, {as:'movies'});
Movie.belongsTo(Genre, {as:'genre'});
Director.hasMany(Movie, {as:'movies'});
Movie.belongsTo(Director, {as:'director'});
Copy.belongsTo(Movie, {as:'movie'});
Movie.hasMany(Copy, {as:'copies'});
Copy.hasMany(Booking, {as:'bookings'});
Booking.belongsTo(Copy, {as:'copy'});
Member.hasMany(Booking, {as:'bookings'});
Booking.belongsTo(Member, {as:'member'});

MovieActor.belongsTo(Movie, {foreignKey: 'movieId'});
MovieActor.belongsTo(Actor, {foreignKey: 'actorId'});
Movie.belongsToMany(Actor, {
  foreignKey: 'actorId',
  as: 'actors',
  through: 'moviesActors'
});
Actor.belongsToMany(Movie, {
  foreignKey: 'movieId',
  as: 'movies',
  through: 'moviesActors'
});


sequelize.sync({
    force: true
}).then(()=>{
    console.log("Base de datos actualizada correctamente");
});

module.exports = { 
  Actor, Booking, Copy, Director, Genre, Member, Movie, MovieActor
};
