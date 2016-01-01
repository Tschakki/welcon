$(document).ready(function() {

    switch($(location).attr('pathname')){      
      case "/welcon/index.php":
        initmap(function() {
         //Beginn der Slideshow
             if (document.getElementById("changeText")) {

                 var find = new Object();
                find._id = "";
                find.actionID = "all";

                var promise = $.ajax({
                    type: "POST",
                    url: "db/read.php",
                    data: {
                        find: JSON.stringify(find),
                    },
                    success: function (data) {
            console.log("ERFOLG!!");
                        var response = $.parseJSON(data);
                        if (response.status) {
                            // set up the map
                            var elem = document.getElementById("changeText");
                            elem.innerHTML = 
                        '<div id="slideshow"><article><div id="summary"><ul><li> Title: ' + response.data[0].title + '</li><li>Latitude: ' + response.data[0].lat + '</li><li>Longitude: ' + response.data[0].lon + '</li></ul></div>'
                    + '<div id="image"><img src="uploads/' + response.data[0].imageURL + '" class="imgSlide"></div></article></div>';

                     //Beginn der Schleife zum Springen in der Slideshow
                            var counter = 0;
                            var elem = document.getElementById("changeText");
                            setInterval(function () {
                                if (elem != null) {
                                    elem.innerHTML = 
                                '<div id="slideshow"><article><div id="summary"><ul><li> Title: ' + response.data[counter].title + '</li><li>Latitude: ' + response.data[counter].lat + '</li><li>Longitude: ' + response.data[counter].lon + '</li></ul></div>'
                            + '<div id="image"><img src="uploads/' + response.data[counter].imageURL + '" class="imgSlide"></div></article></div>';
                                //console.log("JsonPlots.length: " + JsonPlots.length);
                                    counter++;
                                    if(counter >= response.data.length) { counter = 0; }
                                }
                            }, 6000);
                            $.notify({
                                message: 'Lesen von den Einträgen erfolgreich!'
                            }, {
                                type: 'success'
                            });
                            return response;
                        //                     alert("true: "+response.data);
                        } else {
                        //                      alert("false: "+response.data);
                            $.notify({
                                message: 'Lesen von ' + localStorage.getItem('selectedEntry') + ' nicht erfolgreich!'
                            }, {
                                type: 'warning'
                            });
                        }
                    },
                });
             } 
        });
        break;
      case "/welcon/entryForm.php":
        showMap(function() { 
        });
        break;
    }
    $("#editNeed").validate({
        ignore: [],
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
        name: {
            required: true   
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
        name: {
            required: "Please tell your Name"
        },
        email: {
            required: "Please insert a mailadress.",
            email: "Please insert a valid mailadress."
        }
    },
    submitHandler: function (form) {
        setLocation(form, ajaxCREATE)
    }
});
    $("#imageUpload").submit(function (event) {

        //disable the default form submission
        event.preventDefault();
        $.ajax({
            url: 'db/upload.php',
            type: 'POST',
            data: new FormData( this ),
            async: false,
            cache: false,
            contentType: false,
            processData: false,
            success: function (data) {

                alert('Form Submitted!');
                var response = $.parseJSON(data);
                $("#image").val(response.data);
            },
            error: function(){
                alert("error in ajax form submission");
            }
        });
    });
    function setLocation(form, callback) {
        localStorage.setItem("lat","");
        localStorage.setItem("lon","");
        callback(form);
    }
    function ajaxCREATE  (form) {
       console.log("form: " + form);
        var postEntry = new Object();
        localStorage.setItem("selectedEntry", $("#title").val());
        postEntry.kind = $("#chooseKind").val();
        postEntry.title = $("#title").val();
        postEntry.category = $("#chooseCategory").val();
        postEntry.name = $("#name").val();
        postEntry.email = $("#email").val();
        postEntry.lat = $("#latitude").val();
        postEntry.lon = $("#longitude").val();
        postEntry.description = $("#description").val();
        postEntry.imageURL = $("#image").val();
        var successResponse;

        var promise = $.ajax({
            type: "POST",
            url: "db/create.php",
            data: {
                postEntry: JSON.stringify(postEntry),
            },
            success: function (data) {
    var response = $.parseJSON(data);
                if (response.status) {
                    $.notify({
                        message: 'Speichern von ' + localStorage.getItem('selectedEntry') + ' erfolgreich!'
                    }, {
                        type: 'success'
                    });
                } else {
                    $.notify({
                        message: 'Speichern von ' + localStorage.getItem('selectedEntry') + ' nicht erfolgreich!'
                    }, {
                        type: 'warning'
                    });
                }
            },
        });
    }
});