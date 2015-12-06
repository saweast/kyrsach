var express = require('express');
var router = express.Router();
var indx = express();
var cookieParser = require('cookie-parser');
var mysql = require('mysql');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'VLtest'
});
connection.connect();
//connection.end();
indx.use(cookieParser());


/* GET home page. */
router.get('/', function(req, res) {

  //console.log('load main page: ' + req.cookies.isLogged);
  connection.query('SELECT * FROM `offenders`', function(err, rows) {
    if (err) throw err;
    //console.log(rows);
    res.render('index', {title: 'Express', isLogged: req.cookies.isLogged, list: rows});
  });
});
router.get('/offender', function(req, res) {
  //console.log('load main page: ' + req.cookies.isLogged);
  connection.query('SELECT * FROM `offenders`', function(err, rows) {
    if (err) throw err;
    //console.log(rows);
    res.render('index', {title: 'Express', isLogged: req.cookies.isLogged, list: rows});
  });
});
router.post('/', function(req, res) {
  var login = req.body.login;
  var password = req.body.password;
  connection.query('SELECT * FROM `user`', function(err, rows) {
    if (err) throw err;
    for (key in rows) {
      if (rows[key].login == login) {
        if (rows[key].pwd == password) {
          res.cookie('isLogged', 1, {});
          //console.log('set cookie when authorised ' +req.cookies.isLogged);
          res.render('index', {title: 'Express', isLogged: req.cookies.isLogged});
        }
      }
    }
    res.end('Access denied');
  });
});
router.post('/logout', function(req, res) {
  res.cookie('isLogged', 0, {});
  //console.log('logout cookie: ' + req.cookies.isLogged);
  res.render('index', {title: 'Express', isLogged: req.cookies.isLogged});
});
router.post('/update', function(req, res) {
  var id = req.body.id;
  var fullName = req.body.fullName.toLocaleString();
  var number = req.body.number;
  var block = req.body.block;
  var room = req.body.room;
  var date = new Date(req.body.date);
  var day = date.getDate();
  day += 1;
  date.setDate(day);
  date = date.toISOString();
  //console.log(date);
  var offender = req.body.offender;
  connection.query("update offenders set id="+id+", fullname='"+fullName+"', number="+number+", block="+block+", room="+room+", date='"+date+"', offender='"+offender+"' where id="+id+"");
});
router.post('/insert', function(req, res) {
  var fullName = req.body.fullName.toLocaleString();
  var number = req.body.number;
  var block = req.body.block;
  var room = req.body.room;
  var date = new Date(req.body.date);
  var day = date.getDate();
  day += 1;
  date.setDate(day);
  date = date.toISOString();
  //date.setDate('day');
  //console.log(date);
  var offender = req.body.offender;
  //console.log('я имя:'+fullName+' '+number+' '+block+' '+room+' '+date+' '+offender);
  connection.query("insert into offenders (fullname, number, block, room, date, offender) values ('"+fullName+"',"+number+","+block+","+room+",'"+date+"','"+offender+"')");
});
router.post('/remove', function(req, res) {
  var id = req.body.id;
  connection.query('DELETE FROM `offenders` WHERE `id`='+id+'');
});
router.get('/byName', function(req, res) {
  connection.query('SELECT * FROM `offenders` order by fullname', function(err, rows) {
    if (err) throw err;
    //console.log(rows);
    res.render('index', {title: 'Express', isLogged: req.cookies.isLogged, list: rows});
  });
});
router.get('/byNameDesc', function(req, res) {
  connection.query('SELECT * FROM `offenders` order by fullname desc', function(err, rows) {
    if (err) throw err;
    //console.log(rows);
    res.render('index', {title: 'Express', isLogged: req.cookies.isLogged, list: rows});
  });
});
router.get('/byNumber', function(req, res) {
  connection.query('SELECT * FROM `offenders` order by number desc', function(err, rows) {
    if (err) throw err;
    //console.log(rows);
    res.render('index', {title: 'Express', isLogged: req.cookies.isLogged, list: rows});
  });
});
router.get('/byNumberDesc', function(req, res) {
  connection.query('SELECT * FROM `offenders` order by number', function(err, rows) {
    if (err) throw err;
    //console.log(rows);
    res.render('index', {title: 'Express', isLogged: req.cookies.isLogged, list: rows});
  });
});
router.get('/byBlock', function(req, res) {
  connection.query('SELECT * FROM `offenders` order by block desc', function(err, rows) {
    if (err) throw err;
    //console.log(rows);
    res.render('index', {title: 'Express', isLogged: req.cookies.isLogged, list: rows});
  });
});
router.get('/byBlockDesc', function(req, res) {
  connection.query('SELECT * FROM `offenders` order by block ', function(err, rows) {
    if (err) throw err;
    //console.log(rows);
    res.render('index', {title: 'Express', isLogged: req.cookies.isLogged, list: rows});
  });
});
router.get('/byDate', function(req, res) {
  connection.query('SELECT * FROM `offenders` order by date desc', function(err, rows) {
    if (err) throw err;
    //console.log(rows);
    res.render('index', {title: 'Express', isLogged: req.cookies.isLogged, list: rows});
  });
});
router.get('/byDateDesc', function(req, res) {
  connection.query('SELECT * FROM `offenders` order by date ', function(err, rows) {
    if (err) throw err;
    //console.log(rows);
    res.render('index', {title: 'Express', isLogged: req.cookies.isLogged, list: rows});
  });
});


module.exports = router;
