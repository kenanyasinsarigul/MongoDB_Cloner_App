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

<br>
<p>MongoDB_Cloner_App is a free <b>open source</b> cloning application that provides backup and transfer of MongoDb databases from one server to another. This application is mostly developed for developers who experience data confusion between preprod and test environments.</p>
<br>

## Screenshots of The Project
<img width="1440" alt="Screenshot_2022-11-25_at_10 46 43" src="https://github.com/kenanyasinsarigul/MongoDB_Cloner_App/assets/51781007/e810f571-1f1a-46c7-97f7-a03bcc1ab218">
<img width="1440" alt="Screenshot_2022-11-25_at_10 46 43" src="https://github.com/kenanyasinsarigul/MongoDB_Cloner_App/assets/51781007/30b31c4a-ce7a-44a3-9f46-be9c486dd2c9">
<img width="1440" alt="Screenshot_2022-11-25_at_10 46 43" src="https://github.com/kenanyasinsarigul/MongoDB_Cloner_App/assets/51781007/af8f2e05-9db2-48d5-848d-86fc99ac8a5c">
<img width="1440" alt="Screenshot_2022-11-25_at_10 46 43" src="https://github.com/kenanyasinsarigul/MongoDB_Cloner_App/assets/51781007/f82078d0-238e-4290-812b-7855ed71a4ed">
<img width="1440" alt="Screenshot_2022-11-25_at_10 46 43" src="https://github.com/kenanyasinsarigul/MongoDB_Cloner_App/assets/51781007/526b5a82-1d5f-4545-801b-a23f3728a227">
<img width="1440" alt="Screenshot_2022-11-25_at_10 46 43" src="https://github.com/kenanyasinsarigul/MongoDB_Cloner_App/assets/51781007/a918ee14-d133-4a33-b569-4e29ff467059">
<img width="1440" alt="Screenshot_2022-11-25_at_10 46 43" src="https://github.com/kenanyasinsarigul/MongoDB_Cloner_App/assets/51781007/575eeb14-17ee-4dda-b6e3-a1d74c50b700">
<img width="1440" alt="Screenshot_2022-11-25_at_10 46 43" src="https://github.com/kenanyasinsarigul/MongoDB_Cloner_App/assets/51781007/851461cd-6390-470f-8e1e-66b5add515b6">
<img width="1440" alt="Screenshot_2022-11-25_at_10 46 43" src="https://github.com/kenanyasinsarigul/MongoDB_Cloner_App/assets/51781007/f7bcb07f-0607-4593-98f9-3ce08e786974">

# Create Image

```
docker build --platform linux/amd64 -t phexum/mongodb_cloner:latest .
```

# Push Image

```
docker login
docker push phexum/mongodb_cloner:latest
```
 


# Run Container 

```


docker run -p 9090:8080 -e DB_CONNECTION=mongodb://host.docker.internal:27017/cloner -e PAGINATION_LIMIT=500 -e EMAIL_HOST=smtp.office365.com -e EMAIL_PORT=587 -e EMAIL_ACCOUNT=<email> -e EMAIL_PWD=<password> -e EMAIL_FROM='"<name>" <<mail>>' -e EMAIL_TO='<email1,email2>' -d --name cloner  phexum/mongodb_cloner:latest

```

or with env file

```
docker run -p 9090:8080 --env-file ./.env --add-host host.docker.internal:host-gateway -d --name cloner  phexum/mongodb_cloner:latest
```

then go to -> http://localhost:9090

## DockerHub link

https://hub.docker.com/r/phexum/mongodb_cloner

## Used Technologies
<ul>
  <li>NodeJs, VueJs2, Postman, MongoDb, Docker, VsCode, Bootstrap</li>
</ul>

## Acknowledgements
-
## Author
Kenan Yasin SARIGÜL - <a href="https://github.com/kenanyasinsarigul/">Github</a>

[contributors-shield]: https://img.shields.io/github/contributors/kenanyasinsarigul/MongoDB_Cloner_App.svg?style=for-the-badge
[contributors-url]: https://github.com/kenanyasinsarigul/MongoDB_Cloner_App/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/kenanyasinsarigul/MongoDB_Cloner_App.svg?style=for-the-badge
[forks-url]: https://github.com/kenanyasinsarigul/MongoDB_Cloner_App/network/members
[stars-shield]: https://img.shields.io/github/stars/kenanyasinsarigul/MongoDB_Cloner_App.svg?style=for-the-badge
[stars-url]: https://github.com/kenanyasinsarigul/MongoDB_Cloner_App/stargazers
[issues-shield]: https://img.shields.io/github/issues/kenanyasinsarigul/MongoDB_Cloner_App.svg?style=for-the-badge
[issues-url]: https://github.com/kenanyasinsarigul/MongoDB_Cloner_App/issues
[license-shield]: https://img.shields.io/github/license/kenanyasinsarigul/MongoDB_Cloner_App.svg?style=for-the-badge
[license-url]: https://github.com/kenanyasinsarigul/MongoDB_Cloner_App/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/kenan-yasin-sar%C4%B1g%C3%BCl-155379188/
