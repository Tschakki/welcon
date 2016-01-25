<?php include_once("header.php") ?>
<section id="submitForm">
    <br>
<h2>what do you announce?</h2>
    <br>
    
    <form id="editNeed" method="post" role="form" novalidate="novalidate">
    <div class="form-group">
    <label class="frontLable" for="chooseKind">Do you offer or need?:</label>
    <select name="chooseKind" id="chooseKind" form="editNeed" class="form-control" required autofocus>
        <option value="offer">Offer</option>
        <option value="need">Need</option>
    </select>
    </div>
    <div class="form-group">
    <label class="frontLable" for="chooseCategory">Choose:</label>
    <select name="chooseCategory" id="chooseCategory" form="editNeed" class="form-control" required autofocus>
        <option value="cloth">cloth</option>
        <option value="rooms">rooms</option>
        <option value="food">food</option>
        <option value="furniture">furniture</option>
        <option value="books">books</option>
        <option value="information">information</option>
        <option value="contact">contact</option>
        <option value="other">something else</option>
    </select>
    </div>
    <div class="form-group">
        <label class="frontLable" for="title">Title:</label>
        <input id="title" name="title" form="editNeed" size="25" class="form-control" />
    </div>
    <div class="form-group">
        <label class="frontLable" for="description">Description:</label>
        <textarea name="description" id="description" form="editNeed" cols="75" rows="15" class="form-control"></textarea>
    </div>
    <div class="form-group row">
        <label class="frontLable" for="latitude">Location:</label>
    </div>
    <div class="form-group row">
            <section id="map"></section>
            <input id="latitude" type="hidden" name="latitude" form="editNeed" placeholder="Latitude" class="form-control"  />
            <input id="longitude" type="hidden" name="longitude" form="editNeed" placeholder="Longitude" class="form-control"  />  
    </div>
    <div class="form-group">
        <label class="frontLable" for="name">Author:</label>
        <input type="name" name="name" id="name" form="editNeed" size="25" class="form-control" />
    </div>
    <div class="form-group">
        <label class="frontLable" for="image"></label>
        <input type="hidden" name="image" id="image" form="editNeed" class="form-control" />
    </div>
    <div class="form-group">
        <label class="frontLable" for="email">Contact Email:</label>
        <input type="email" name="email" id="email" form="editNeed" size="25" class="form-control" />
    </div>
</form>
<form id="imageUpload" class="form" method="post" action="upload.php"></form>
    
<div id="addForm">
    
 <label class="frontLable" for="selectImg">Select image to upload:</label>
    <div class="container">
            <div class="col-md-4">
                <input type="file" name="fileToUpload" id="fileToUpload" form="imageUpload" >
                <input type="submit" value="Upload Image" name="submit" form="imageUpload" >
            </div>
            <div id="uploadStatus" class="col-md-4">
            </div>
            <div id="errorMsg" class="col-md-4">
            </div>
        </div>
    
    
    <div class="form-group">
        <label class="frontLable" for="submitbtn"></label>
        <button type="submit" class="btn-primary" id="submitbtn" form="editNeed">
        <img src="res/save8.png" class="save"/>
        </button>
    </div>
</div>
</section>
<?php include_once("footer.php") ?>