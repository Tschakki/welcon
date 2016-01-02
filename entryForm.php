<?php include_once("header.php") ?>
<section id="submitForm">
    <br>
<h1Body>what do you announce?</h1Body>
    <br>
    
    <form id="editNeed" class="form" method="post" novalidate="novalidate">
    <p>
    <label class="frontLable" for="chooseKind">Do you offer or need?:</label>
    <select name="chooseKind" id="chooseKind" class="form" form="editNeed" required autofocus>
        <option value="offer">Offer</option>
        <option value="need">Need</option>
    </select>
    </p>
    <p>
    <label class="frontLable" for="chooseCategory">Choose:</label>
    <select name="chooseCategory" id="chooseCategory" form="editNeed" class="form" required autofocus>
        <option value="cloth">cloth</option>
        <option value="rooms">rooms</option>
        <option value="food">food</option>
        <option value="furniture">furniture</option>
        <option value="books">books</option>
        <option value="information">information</option>
        <option value="contact">contact</option>
        <option value="other">something else</option>
    </select>
    </p>
    <p>
    <label class="frontLable" for="title">Title:</label>
    <input id="title" name="title" class="form" form="editNeed" size="25" ></input>
    </p>
<p>
    <label class="frontLable" for="description">Description:</label>
    <textarea name="description" id="description" form="editNeed" class="form" cols="75" rows="15"></textarea>
    </p>
    <p> 
        
        <label class="frontLable" for="latitude">Location:</label>
        
    <section id="map"></section>
<input id="latitude" type="hidden" name="latitude" form="editNeed" class="form" placeholder="Latitude"  />
    <input id="longitude" type="hidden" name="longitude" form="editNeed" class="form" placeholder="Longitude"  />
    
    </p>
    <p>
    <label class="frontLable" for="name">Author:</label>
    <input type="name" name="name" id="name" form="editNeed" class="form" size="25" ></input>
    </p>
    <p>
    <label class="frontLable" for="image"></label>
    <input type="hidden" name="image" id="image" form="editNeed" class="form"></input>
    </p>
    <p>
    <label class="frontLable" for="email">Contact Email:</label>
    <input type="email" name="email" id="email" form="editNeed" class="form" size="25" ></input>
    </p>
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
    
    
    <p><label class="frontLable" for="submitbtn"></label>
        <button type="submit" class="form" id="submitbtn" form="editNeed">
        <img src="res/save8.png" class="save"/>
        </button>
    </p>
</div>
</section>
<?php include_once("footer.php") ?>