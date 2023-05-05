//jshint esversion:6

const express = require("express");
const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');

app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(`mongodb+srv://${process.env.DATA_USER}:${process.env.DATA_PW}@cluster0.vgskun3.mongodb.net/?retryWrites=true&w=majority`);
  // await mongoose.connect('mongodb://127.0.0.1:27017/wikiDB');
}

const articleShema = new mongoose.Schema({
    title: {
        type: String,
        required: true
      },
    content: {
        type: String,
        required: true
      }
})

const Article = mongoose.model('Article', articleShema);

app.route('/articles')
  .get((req, res) => {
    Article.find()
      .then(articles=> {
        if (articles.length===0){
          res.send("No article found")
        } else {
          res.send(articles)
        }})
      .catch(err => res.send(err))
  })
  .post((req, res) => {
    const newArticle = new Article ({
      title: req.body.title,
      content: req.body.content
    });;
    newArticle.save()
      .then(res.send("Succesfully added the new article!"))
      .catch(err => res.send(err))
  })
  .delete((req, res)=> {
    Article.deleteMany()
      .then(res.send("Succesfully deleted all the articles!"))
      .catch(err => res.send(err));
  });

app.route('/articles/:article')
  .get((req, res)=>{
    Article.findOne({title: req.params.article})
      .then(article=> {
        // console.log(article) //null is no article, article object if it exist
        if (!article){
          res.send("No article found")
        } else {
          res.send(article)
        }})
      .catch(err => res.send(err))
  })
  .put((req, res)=>{
    Article.replaceOne(
      { title: req.params.article },
      { title: req.body.title, content: req.body.content}
      )
      .then(result=> {
        // console.log(result) //result.deletedCount === 0 if no article found, 1 if it exist
        if (result.matchedCount === 0){
          res.send("No article found")
        } else {
            res.send("Succesfully updated the article!")
        }})
      .catch(err => res.send(err))
  })
  .patch((req, res)=>{
    Article.findOneAndUpdate(
      { title: req.params.article },
      { $set: req.body }
      )
      .then(article=> {
        // console.log(article) //null is no article, article object if it exist
        if (!article){
          res.send("No article found")
        } else {
            res.send("Succesfully updated the article!")
        }})
      .catch(err => res.send(err))
  })
  .delete((req, res)=>{
    Article.deleteOne(
      { title: req.params.article }
      )
      .then(result=> {
        // console.log(result) //result.deletedCount === 0 if no article found, 1 if it exist
        if (result.deletedCount === 0){
          res.send("No article found")
        } else {
            res.send("Article succesfully deleted")
        }})
      .catch(err => res.send(err))
  })


app.listen(3000, function() {
  console.log("Server started on port 3000");
});