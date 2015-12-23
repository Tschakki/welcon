	$(document).ready(function() {

        switch($(location).attr('pathname')){      
          case "/weco/start.php":
              initmap(function() {
            //Test um JSON-Objekt zu erstellen und anzusprechen
        /*var myJSONOffers = {"Offers": [
        {"title": "One winterjacket for free!", "latitude": "52.52113", "longitude": "13.38570", "image":"res/Mens-Winter-Jacket.jpg"},
        {"title": "Offering German lessons", "latitude": "52.52123", "longitude": "13.38577", "image":"res/keyboard-books.gif"},
        {"title": "Bed to give away", "latitude": "52.52113", "longitude": "13.38587", "image":"res/liegen01_bett.jpg"}
    ]
};*/
             //Beginn der Slideshow
             if (document.getElementById("changeText")) {
                 var elem = document.getElementById("changeText");
        elem.innerHTML = 
                '<div id="slideshow"><article><div id="summary"><ul><li> Title: ' + JsonPlots[2].title + '</li><li>Latitude: ' + JsonPlots[2].latitude + '</li><li>Longitude: ' + JsonPlots[2].longitude + '</li></ul></div>'
            + '<div id="image"><img src="' + JsonPlots[2].image + '" class="imgSlide"></div></article></div>';
        
             //Beginn der Schleife zum Springen in der Slideshow
                var counter = 0;
                var elem = document.getElementById("changeText");
                setInterval(function () {
                    if (elem != null) {
                    elem.innerHTML = 
                        '<div id="slideshow"><article><div id="summary"><ul><li> Title: ' + JsonPlots[counter].name + '</li><li>Latitude: ' + JsonPlots[counter].lat + '</li><li>Longitude: ' + JsonPlots[counter].lon + '</li></ul></div>'
                    + '<div id="image"><img src="' + JsonPlots[counter].image + '" class="imgSlide"></div></article></div>';
                        //console.log("JsonPlots.length: " + JsonPlots.length);
                    counter++;
                    if(counter >= JsonPlots.length) { counter = 0; }
                    }
                }, 6000);
             }
              });
            break;
          case "/weco/entryForm.php":
            showMap(function() { 
            });
            break;
        }
       
        
        		// validate signup form on keyup and submit
		$("#editOffer").validate({
            onkeyup: function(element) {$(element).valid()},
            focusInvalid: true,
			rules: {
            chooseCategory: {
                required: true,
            },
            title: {
                required: true,
                minlength: 2,
                maxlength: 20
            },
            amount: {
                required: true,
                number: true,
                min: 1,
                max: 500
                
            },
            latitude: {
                required: true,
                min: -180,
                max: 180
            },
            longitude: {
            required: true,
            min: -180,
            max: 180
            },
            description: {
                required: true,
                minlength: 2,
                maxlength: 500
            },
            email: {
                required: true,
                email: true
            }
        },
		messages: {
			chooseCategory: {
                required: "Please choose a category."
            },
            title: {
                required: "Insert a title.",
                minlength: "The minimal length of the title is 2 characters.",
                maxlength: "The maximum length of the title is 20 characters."
            },
            amount: {
                required: "Insert an amount.",
                number: "Put the amount in numerals.",
                min: "The minimum amount is 1.",
                max: "The maximum amount is 500."
                
            },
            latitude: {
                required: "Please mark a location.",
                min: "The numeral must be between -180 and 180.",
                max: "The numeral must be between -180 and 180."
            },
            longitude: {
                required: "Please mark a location.",
                min: "The numeral must be between -180 and 180.",
                max: "The numeral must be between -180 and 180."
            },
            description: {
                required: "Please put a short description.",
                minlength: "The minimal length of the description is 2 characters.",
                maxlength: "The maximum length of the description is 20 characters."
            },
            email: {
                required: "Please insert a mailadress.",
                email: "Please insert a valid mailadress."
            }
		},
        submitHandler: function(form) {
            console.log("form: " + form);
            // Fire off the request to /form.php
            request = $.ajax({
                            url: form.action,
                            type: form.method,
                            data: $(form).serialize(),
                            success: function(data_response){
            $("#output1").html(data_response);
                            }
            });

            // Callback handler that will be called on success
            request.done(function (response, textStatus, jqXHR){
                // Log a message to the console
                console.log("Hooray, it worked!");
            });

            // Callback handler that will be called on failure
            request.fail(function (jqXHR, textStatus, errorThrown){
                // Log the error to the console
                console.error(
                    "The following error occurred: "+
                    textStatus, errorThrown
                );
            });
        }
    });    
    $("#editNeed").validate({
        onkeyup: function(element) {$(element).valid()},
        focusInvalid: true,
        /*definiert welche Felder Eingabe verlangen und welcher Art, diese Eingaben
        sein müssen*/
        rules: {
            chooseCategory: {
                required: true,
            },
            title: {
                required: true,
                minlength: 2,
                maxlength: 20
            },
            latitude: {
                required: true,
                min: -180,
                max: 180
            },
            longitude: {
                required: true,
                min: -180,
                max: 180
            },
            description: {
                required: true,
                minlength: 2,
                maxlength: 500
            },
            email: {
                required: true,
                email: true
            }
        },
        /*Erstellt spezielle Fehlermeldungen für alle Felder.*/
        messages: {
            chooseCategory: {
                required: "Please choose a category."
            },
            title: {
                required: "Insert a title.",
                minlength: "The minimal length of the title is 2 characters.",
                maxlength: "The maximum length of the title is 20 characters."
            },
            latitude: {
                required: "Please mark a location.",
                min: "The numeral must be between -180 and 180.",
                max: "The numeral must be between -180 and 180."
            },
            longitude: {
                required: "Please mark a location.",
                min: "The numeral must be between -180 and 180.",
                max: "The numeral must be between -180 and 180."
            },
            description: {
                required: "Please put a description.",
                minlength: "The minimal length of the description is 2 characters.",
                maxlength: "The maximum length of the description is 20 characters."
            },
            email: {
                required: "Please insert a mailadress.",
                email: "Please insert a valid mailadress."
            }
        },
        submitHandler: function (form) {
            ajaxCREATE(form)
        }
    });
        

        function ajaxCREATE  (form) {
       console.log("form: " + form);
        var postEntry = new Object();

        postEntry.kind = $("#chooseKind").val();
        postEntry.title = $("#title").val();
        postEntry.category = $("#chooseCategory").val();
        postEntry.name = $("#name").val();
        postEntry.email = $("#email").val();
        postEntry.lat = $("#latitude").val();
        postEntry.lon = $("#longitude").val();
        postEntry.description = $("#description").val();
        postEntry.imageURL = $("#imageURL").val();
        var successResponse;

        var promise = $.ajax({
            type: "POST",
            url: "db/create.php",
            data: {
                postEntry: JSON.stringify(postEntry),
            },
            success: function (data) {
    console.log("ERFOLG!!");
                /*var response = $.parseJSON(data);*/
                if (data.status) {
                    swal({
                                title: "Erfolg",
                                text: 'Speichern von von ' + localStorage.getItem('selectedGlossarId') + ' erfolgreich!',
                                type: "success"
                            }, function () {
                        location.reload();
                    });
                    $.notify({
                        message: 'Speichern von von ' + localStorage.getItem('selectedGlossarId') + ' erfolgreich!'
                    }, {
                        type: 'success'
                    });
                    //                     alert("true: "+response.data);
                } else {
                    //                      alert("false: "+response.data);
                    $.notify({
                        message: 'Speichern von von ' + localStorage.getItem('selectedGlossarId') + ' nicht erfolgreich!'
                    }, {
                        type: 'warning'
                    });
                }
            },
        });
    }
        
        function ajaxREAD (entryID, actionID) {
        localStorage.setItem("selectedEntry", entryID);
        console.log("entryID: " + entryID);
        var find = new Object();
        find._id = entryID;
        find.action = actionID;

        var promise = $.ajax({
            type: "POST",
            url: "db/read.php",
            data: {
                postEntry: JSON.stringify(find),
            },
            success: function (data) {
    console.log("ERFOLG!!");
                /*var response = $.parseJSON(data);*/
                if (data.status) {
                    swal({
                                title: "Erfolg",
                                text: 'Speichern von von ' + localStorage.getItem('selectedEntry') + ' erfolgreich!',
                                type: "success"
                            }, function () {
                        location.reload();
                    });
                    $.notify({
                        message: 'Speichern von von ' + localStorage.getItem('selectedEntry') + ' erfolgreich!'
                    }, {
                        type: 'success'
                    });
                    //                     alert("true: "+response.data);
                } else {
                    //                      alert("false: "+response.data);
                    $.notify({
                        message: 'Speichern von von ' + localStorage.getItem('selectedEntry') + ' nicht erfolgreich!'
                    }, {
                        type: 'warning'
                    });
                }
            },
        });
    }
});


/*$("#ask").click(function(){
    window.location.href = "ask.php";
});
             
$("#offer").click(function(){
    window.location.href = "offer.php";
});

$(document).on("click", "#overview", function () {
    $("#content").clear;
    $("#content").load("overview.html");
});
$(document).on("click", "#ask", function () {
    $("#content").clear;
    $("#content").load("ask.html");
});*/
/*$(document).on("click", ".editOffer", function() {
    console.log("blub");
   $("#theForm").ajaxSubmit({url: 'editOffer.php', type: 'post'});
});*/
/*$(document).on("click", ".editOffer", function() {
    window.location.href = "editOffer.php";
});
$(document).on("click", ".editNeed", function() {
    window.location.href = "editNeed.php";
});
$(document).on("click", ".delete", function() {
    window.confirm("Do you really want to delete the entry?");
});
$(document).on("click", ".showNeed", function() {
    window.location.href = "showNeed.php";
});
$(document).on("click", ".showOffer", function() {
    window.location.href = "showOffer.php";
});
$(document).on("click", ".saveNeed", function() {
    window.confirm("Ihre Anfrage wurde gespeichert.");
});
$(document).on("click", ".saveOffer", function() {
    
    window.confirm("Ihr Angebot wurde gespeichert.");
});




         });
        
        */
