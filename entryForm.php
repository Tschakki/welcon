<?php include_once("header.php") ?>
<section id="submitForm">
    <br>
<h1Body>what do you announce?</h1Body>
    <br>
<form id="editNeed" lass="form" action="db/create.php" method="post" novalidate="novalidate">
    <fieldset>
    <p>
    <label class="frontLable" for="chooseKind">Do you offer or need?:</label>
    <select name="chooseKind" id="chooseKind" class="form" required autofocus>
        <option value="offer">Offer</option>
        <option value="need">Need</option>
    </select>
    </p>
    <p>
    <label class="frontLable" for="chooseCategory">Choose:</label>
    <select name="chooseCategory" id="chooseCategory" class="form" required autofocus multiple>
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
    <input id="title" name="title" class="form" size="25" ></input>
    </p>
    <p>
    <label class="frontLable" for="description">Description:</label>
    <textarea name="description" id="description" class="form" cols="75" rows="15"></textarea>
    </p>
    <p> <label class="frontLable" for="latitude">Location:</label>
    <section id="map"></section>
    <input id="latitude" type="hidden" name="latitude" class="form" placeholder="Latitude"  />
    <input id="longitude" type="hidden" name="longitude" class="form"placeholder="Longitude"  />
    </p>
    <p>
    <label class="frontLable" for="name">Author:</label>
    <input type="name" name="name" id="name" class="form" size="25" ></input>
    </p>
    <p>
    <label class="frontLable" for="image"></label>
    <input type="hidden" name="image" id="image" class="form"></input>
    </p>
    <p>
    <label class="frontLable" for="email">Contact Email:</label>
    <input type="email" name="email" id="email" class="form" size="25" ></input>
    </p>
    <p><label class="frontLable"></label>
        <!--<input name="submitButton" type="submit">
        <img src="res/save8.png" class="save form">
        </input>-->
        <button type="submit">
        <img src="res/save8.png" class="save"/>
        </button>
    </p>
    
    <!--<label><br><br><span class="save" id="overview"><a href="overview.php"><manIcons class="fa fa-floppy-o fa-2x saveNeed"></i>
</i></a></span></label>-->
</fieldset>
</form>
<form id="imageUpload" action="upload.php" method="post" enctype="multipart/form-data">
    Select image to upload:
    <input type="file" name="fileToUpload" id="fileToUpload">
    <input type="submit" value="Upload Image" name="submit">
</form>
</section>
<section id="output1"></section>
<?php include_once("footer.php") ?>