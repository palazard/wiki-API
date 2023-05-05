# WELCOME TO THE WIKI RESTFULL API!!

The API open source to find definitions about programation.

## Guide:
main url = https://wiki-api-6f4c.onrender.com/

| HTTP Verb | /articles | /articles/articleTitle |
|---|---|---|
| GET | Fetch all articles on JSON format | Fetch the article with the title articleTitle |
| POST | Create new post.<br>Add in req.body:<br>title: "article title" AND content: "article content | - |
| PUT | - | Remplace post.<br>Add in req.body:<br>title: "article title" AND/OR content: "article content<br>CAUTION: if title missing, the post won't be accessible later, beacause the API look it by title.|
| PATCH | - | Update a post.<br>Add in req.body:<br>title: "article title" AND/OR content: "article content |
| DELETE | Delete all the articles | Delete the article with the title articleTitle |


## Technologies
### Backend
build with Node.js + Express.js

### Database
MongoDB with Mongoose.

Hosted in render.com.

WARNING: render.com can be slow to respond when using the free tier (demo purpose only). Please be patient.

