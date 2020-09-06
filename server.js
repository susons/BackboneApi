const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

mongoose.connect('mongodb://localhost/blogroll')

const Schema = mongoose.Schema;
const BlogSchema = new Schema({
  author: String,
  title: String,
  url: String,
});
mongoose.model('Blog', BlogSchema);

const Blog = mongoose.model('Blog');
// const blog = new Blog({
//   author: ' test',
//   title: 'lolz',
//   url: 'testsssszzzz',
// })
// blog.save();
const app = express();

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());


//Routes

app.get('/api/blogs' , function(req, res) {
  Blog.find(function(err, docs) {
    docs.forEach(function(i) {
      console.log(' received a GET request for _id' + i._id);
    });
    res.send(docs);
  })
});

app.post('/api/blogs', function(req, res) {
  console.log(' received a post request');
  for(var key in req.body) {
    console.log(key + '  :' + req.body[key])
  }
  const blog = new Blog(req.body);
  blog.save(function(err, doc) {
    res.send(doc);
  })
});

app.delete('/api/blogs/:id', function(req, res) {
  console.log(' received a delete request' + req.params.id)
  Blog.remove({
    _id: req.params.id
  }, function(err) {
    res.send({_id: req.params.id})
  })
});

app.put('/api/blogs/:id', function(req, res) {
  console.log(' received a put request' + req.params.id)
  Blog.update({
    _id: req.params.id
  }, req.body, function(err) {
    res.send({_id: req.params.id})
  })
});

const port = 3000;
app.listen(port);
console.log('server on ' + port);