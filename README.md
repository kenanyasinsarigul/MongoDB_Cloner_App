# MongoDB_Cloner_App
Mongo Database Cloner App developed with NodeJs and VueJs

# Create Image

```
docker build -t phexum/mongodb_cloner:latest .
```

# Push Image

```
docker login
docker push phexum/mongodb_cloner:latest
```
 


# Run Container 

```
docker run -p 9090:8080 -e DB_CONNECTION=mongodb://host.docker.internal:27017/cloner -e PAGINATION_LIMIT=1000 -d --name cloner  phexum/mongodb_cloner:latest
```

then go to -> http://localhost:9090

## Used Technologies
<ul>
  <li>NodeJs, VueJs2, Postman, MongoDb, Docker, VsCode, Bootstrap</li>
</ul>

## Acknowledgements
- Tugay İPEK- <a href="https://github.com/tugayipek1/">Github</a>

## Author
Kenan Yasin SARIGÜL- <a href="https://github.com/kenanyasinsarigul/">Github</a>
