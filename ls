[1mdiff --git a/templates/home.html b/templates/home.html[m
[1mindex 68e573b..d151b3d 100644[m
[1m--- a/templates/home.html[m
[1m+++ b/templates/home.html[m
[36m@@ -5,34 +5,98 @@[m
   <meta http-equiv="X-UA-Compatible" content="IE=edge">[m
   <meta name="viewport" content="width=device-width, initial-scale=1.0">[m
   <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-GLhlTQ8iRABdZLl6O3oVMWSktQOp6b7In1Zl3/Jr59b6EGGoI1aFkw7cmDA6j6gD" crossorigin="anonymous">[m
[31m-  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js" integrity="sha384-w76AqPfDkMBDXo30jS1Sgez6pr3x5MlQ1ZAGC+nuZB+EYdgRZgiwxhTBTkF7CXvN" crossorigin="anonymous"></script>[m
[31m-  <nav class="navbar navbar-expand-lg bg-body-tertiary">[m
[31m-    <div class="container-fluid"  style="background-color: #10c525;">[m
[31m-      <a class="navbar-brand" href="#">Zoo</a>[m
[31m-      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">[m
[31m-        <span class="navbar-toggler-icon"></span>[m
[31m-      </button>[m
[31m-      <div class="collapse navbar-collapse" id="navbarSupportedContent">[m
[31m-        <ul class="navbar-nav me-auto mb-2 mb-lg-0">[m
[31m-          <li class="nav-item">[m
[31m-          </li>[m
[31m-          <li class="nav-item">[m
[31m-            <a class="nav-link" href="#">Link</a>[m
[31m-          <li class="nav-item">[m
[31m-            <a class="nav-link disabled">Disabled</a>[m
[31m-          </li>[m
[31m-        </ul>[m
[31m-        <form class="d-flex" role="search">[m
[31m-          <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">[m
[31m-          <button class="btn btn-outline-success" type="submit">Search</button>[m
[31m-        </form>[m
[32m+[m[32m  <link rel="stylesheet" href="{{ url_for('static', filename='css/hoStyle.css') }}">[m
[32m+[m
[32m+[m[32m</head>[m
[32m+[m[32m<body>[m
[32m+[m[32m  <div class="menu">[m
[32m+[m[32m    <nav class="navbar navbar-expand-lg ">[m
[32m+[m[32m      <div class="container">[m
[32m+[m[32m        <a class="navbar-item" href="#">Zoo</a>[m
[32m+[m[32m        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">[m
[32m+[m[41m        [m
[32m+[m[32m          <span class="navbar-toggler-icon"></span>[m
[32m+[m[32m        </button>[m
[32m+[m[32m        <div class="collapse navbar-collapse" id="navbarText">[m
[32m+[m[32m          <ul class="botones">[m
[32m+[m[32m            <li class="nav-item">[m
[32m+[m[32m              <a class="nav-link active" aria-current="page" href="#">Home</a>[m
[32m+[m[32m            </li>[m
[32m+[m[32m            <li class="nav-item">[m
[32m+[m[32m              <a class="nav-link" href="#">about</a>[m
[32m+[m[32m            </li>[m
[32m+[m[32m          </ul>[m
[32m+[m[32m          <span class="navbar-item">[m
[32m+[m[32m            Navbar text with an inline element[m
[32m+[m[32m          </span>[m
[32m+[m[32m        </div>[m
[32m+[m[32m      </div>[m
[32m+[m[32m    </nav>[m
[32m+[m[32m  </div>[m
[32m+[m[32m  <!-- src="{{url_for('static', filename='/images/homeGiraffe.jpg')}}" -->[m
[32m+[m[32m  <div id="carouselExampleAutoplaying" class="carousel slide" data-bs-ride="carousel">[m
[32m+[m[32m    <div class="carousel-inner">[m
[32m+[m[32m      <div class="carousel-item active">[m
[32m+[m[32m        <img src="{{url_for('static', filename='/images/homeWater.jpg')}}" class="d-block" alt="...">[m
[32m+[m[32m      </div>[m
[32m+[m[32m      <div class="carousel-item">[m
[32m+[m[32m        <img src="{{url_for('static', filename='/images/homeLeon.jpg')}}" class="d-block" alt="...">[m
[32m+[m[32m      </div>[m
[32m+[m[32m      <div class="carousel-item">[m
[32m+[m[32m        <img src="{{url_for('static', filename='/images/homeTiger.jpg')}}" class="d-block" alt="...">[m
       </div>[m
     </div>[m
[32m+[m[32m    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">[m
[32m+[m[32m      <span class="carousel-control-prev-icon" aria-hidden="true"></span>[m
[32m+[m[32m      <span class="visually-hidden">Previous</span>[m
[32m+[m[32m    </button>[m
[32m+[m[32m    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">[m
[32m+[m[32m      <span class="carousel-control-next-icon" aria-hidden="true"></span>[m
[32m+[m[32m      <span class="visually-hidden">Next</span>[m
[32m+[m[32m    </button>[m
[32m+[m[41m    [m
[32m+[m[32m  </div>[m
[32m+[m[32m  <div id="middleNavBar">[m[41m  [m
[32m+[m[32m  <nav class="nav nav-pills">[m
[32m+[m[32m    <a id="lineItem" class="nav-link" aria-current="page" href="#">Active</a>[m
[32m+[m[32m    <a id="lineItem" class="nav-link" href="#">Much longer nav link</a>[m
[32m+[m[32m    <a id="lineItem" class="nav-link" href="#">Link</a>[m
[32m+[m[32m    <a class="nav-link disabled" style="background-color: #669900; border-radius: 0%;">Disabled</a>[m
   </nav>[m
[31m-  <title>zoo home</title>[m
[31m-  <h1>zoo home</h1>[m
[31m-</head>[m
[31m-<body>[m
[32m+[m[41m  [m
[32m+[m[32m  </div>[m
[32m+[m
[32m+[m
[32m+[m[32m  <div class="slider">[m
[32m+[m[32m    <span class="slider-word active" data-gallery="gallery1">Galería 1</span>[m
[32m+[m[32m    <span class="slider-word" data-gallery="gallery2">Galería 2</span>[m
[32m+[m[32m    <span class="slider-word" data-gallery="gallery3">Galería 3</span>[m
[32m+[m[32m  </div>[m
[32m+[m[32m  <div class="gallery" id="gallery1">[m
[32m+[m[32m    <figure>[m
[32m+[m[32m    <img src="{{url_for('static', filename='/images/homeWater.jpg')}}" alt="a big bobba">[m
[32m+[m[32m    <figcaption>a big bobba</figcaption>[m
[32m+[m[32m    </figure>[m
[32m+[m[32m    <img src="{{url_for('static', filename='/images/homeWater.jpg')}}" alt="Imagen 2">[m
[32m+[m[32m    <img src="{{url_for('static', filename='/images/homeWater.jpg')}}" alt="Imagen 3">[m
[32m+[m[32m  </div>[m
[32m+[m[41m  [m
[32m+[m[32m  <div class="gallery" id="gallery2">[m
[32m+[m[32m    <img src="{{url_for('static', filename='/images/homeLeon.jpg')}}" alt="Imagen 4">[m
[32m+[m[32m    <img src="{{url_for('static', filename='/images/homeLeon.jpg')}}" alt="Imagen 5">[m
[32m+[m[32m    <img src="{{url_for('static', filename='/images/homeLeon.jpg')}}" alt="Imagen 6">[m
[32m+[m[32m  </div>[m
[32m+[m[41m  [m
[32m+[m[32m  <div class="gallery" id="gallery3">[m
[32m+[m[32m    <img src="{{url_for('static', filename='/images/homeTiger.jpg')}}" alt="Imagen 7">[m
[32m+[m[32m    <img src="{{url_for('static', filename='/images/homeTiger.jpg')}}" alt="Imagen 8">[m
[32m+[m[32m    <img src="{{url_for('static', filename='/images/homeTiger.jpg')}}" alt="Imagen 9">[m
[32m+[m[32m  </div>[m
[32m+[m[41m    [m
[32m+[m
[32m+[m[32m  <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.6/dist/umd/popper.min.js" integrity="sha384-oBqDVmMz9ATKxIep9tiCxS/Z9fNfEXiDAYTujMAeBAsjFuCZSmKbSSUnQlmh/jp3" crossorigin="anonymous"></script>[m
[32m+[m[32m  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.min.js" integrity="sha384-mQ93GR66B00ZXjt0YO5KlohRA5SY2XofN4zfuZxLkoj1gXtW8ANNCe9d5Y3eG5eD" crossorigin="anonymous"></script>[m
[32m+[m[32m  <script type="text/javascript" src="{{url_for('static', filename='js/jsHomePage.js')}}"></script>[m
   [m
 </body>[m
 </html>[m
\ No newline at end of file[m
