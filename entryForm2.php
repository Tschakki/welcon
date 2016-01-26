
<?php include_once("header.php") ?>

 <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.0/jquery.min.js"></script>
 <script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"></script>
   

<section id="submitForm">
    <form id="editNeed" class="form" method="post" novalidate="novalidate">
<div class="container">
  <h2>What do you announce?</h2>
  <label class="frontLable" for="chooseKind"></label>    
    <br>                 
  <div class="dropdown">
    <button class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown">Do you need or offer?
    <span class="caret"></span></button>
    <ul class="dropdown-menu" name="chooseKind" id="chooseKind" form="editNeed" required autofocus>
      <li><a href="#" value="need">Need</a></li>
      <li><a href="#" value="offer">Offer</a></li>
    </ul>
  </div>
    <br>
    <div class="dropdown">
    <button class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown">Choose kind
    <span class="caret"></span></button>
    <ul class="dropdown-menu">
      <li><a href="#">Cloth</a></li>
      <li><a href="#">Rooms</a></li>
      <li><a href="#">Food</a></li>
      <li><a href="#">Furniture</a></li>
      <li><a href="#">Books</a></li>
      <li><a href="#">Information</a></li>
      <li><a href="#">Contact</a></li>
      <li><a href="#">Something else</a></li>
    </ul>
  </div>
    <br>
    <div class="form-group">
        
         <div class="form-group">
    <label for="email">Email address:</label>
    <input type="email" class="form-control" id="email">
  </div>
        
    <label for="name">Author:</label>
        <input type="name" name="name" id="name" form="editNeed" class="form-control" size="25">
     </div>
        
    <div class="form-group">
    <label for="email">Contact-email:</label>
    <input type="email" class="form-control" id="email">
  </div>
     <div class="form-group">
    <label for="email">Email address:</label>
    <input type="email" class="form-control" id="email">
  </div>
</div>
    </form>
</section>
<?php include_once("footer.php") ?>