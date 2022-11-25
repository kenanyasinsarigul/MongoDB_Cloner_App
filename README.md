[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

<br>

<p align="center">
  <h2 align="center">MongoDB_Cloner_App (11.2022)</h2>
  <p align="center">
    Backend : <a href="https://github.com/kenanyasinsarigul/MongoDB_Cloner_App/tree/main/app">NODEJS</a>
    Frontend : <a href="https://github.com/kenanyasinsarigul/MongoDB_Cloner_App/tree/main/frontend">VUEJS</a>
    <br />
    <br />
    <a href="https://github.com/kenanyasinsarigul/MongoDB_Cloner_App/issues">Report Bug</a>
    ·
    <a href="https://github.com/kenanyasinsarigul/MongoDB_Cloner_App/issues">Request Feature</a>
  </p>
</p>

## Screenshots of The Project

<img width="1440" alt="Screenshot_2022-11-25_at_10 46 15" src="https://user-images.githubusercontent.com/51781007/203929333-663dda1a-4658-405e-a4dc-ea9a2096779f.png">
<img width="1440" alt="Screenshot_2022-11-25_at_10 46 43" src="https://user-images.githubusercontent.com/51781007/203929311-4eb56337-f42f-4b66-a2c6-64c9b0355bdf.png">

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
- Tugay İPEK - <a href="https://github.com/tugayipek1/">Github</a>

## Author
Kenan Yasin SARIGÜL - <a href="https://github.com/kenanyasinsarigul/">Github</a>
