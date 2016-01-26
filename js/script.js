$(document).ready(function() {

    
    
    switch($(location).attr('pathname')){      
      case "/welcon/index.php":
        initmap(function() {
         //Beginn der Slideshow
             if (document.getElementById("changeText")) {

                 var find = new Object();
                find.myId = "";
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
                        if (response.status.code == 200) {
                            // set up the map
                            var elem = document.getElementById("changeText");
                            elem.innerHTML = 
                        '<div id="slideshow"><article><div id="summary"><ul><li> Title: ' + response.data[0].title + '</li><li>Details: ' + response.data[0].description + '</li></ul></div>'
                    + '<div id="image"><img src="uploads/' + response.data[0].imageURL + '" class="imgSlide"></div></article></div>';
                            console.log("image-url: " + response.data[0].imageURL);
                     //Beginn der Schleife zum Springen in der Slideshow
                            var counter = 1;
                            var elem = document.getElementById("changeText");
                            setInterval(function () {
                                if (elem != null) {
                                    elem.innerHTML = 
                                '<div id="slideshow"><article><div id="summary"><ul><li> Title: ' + response.data[counter].title + '</li><li>Details: ' + response.data[counter].description + '</li></ul></div>'
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
      case "/welcon/settings.php":
            var find = new Object();
                find.myId = "";
                find.actionID = "list";

                var promise = $.ajax({
                    type: "POST",
                    url: "db/read.php",
                    data: {
                        find: JSON.stringify(find),
                    },
                    success: function (data) {
           
                        var response = $.parseJSON(data);
                        var item2;
                        if (response.status.code == 200) {
                            
                            for (var key in response.data) {
                                if (response.data.hasOwnProperty(key)) {
                                   // console.dir(response.data[key]);
                            //for (i=0;i<response.data.length;i++){
              //              response.forEach(function(item) {
                                $("#listEntries").append('<div id="' + response.data[key].myId + '" class="row"><div class="col-md-3"><h3>'  + response.data[key].title + '</h3></div><div class="col-md-3"><h3>'  + response.data[key].description + '</h3></div><div class="col-md-3"><h3>'  + response.data[key].name + '</h3></div><div class="col-md-3"><h3><span id="' + response.data[key].myId + '" class="glyphicon glyphicon-eye-open"></span>&nbsp;&nbsp;<span id="' + response.data[key].myId + '" class="glyphicon glyphicon-edit"></span>&nbsp;&nbsp;<span id="deleteButton" class="glyphicon glyphicon-trash"></span></h3></div></div>');

                                    
                
                                }
                                
                            }
                            
/*                        var container = document.getElementById(key).parentNode;
                            console.log("container: " + container);
                        console.log("ID vom Lösch-Button: " +  key);*/

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
            
        break;
      case "/welcon/entry.php":
            var find = new Object();
                find.myId = localStorage.getItem("id");
                find.actionID = "one";

                var promise = $.ajax({
                    type: "POST",
                    url: "db/read.php",
                    data: {
                        find: JSON.stringify(find),
                    },
                    success: function (data) {
            console.log("ERFOLG!!");
                        var response = $.parseJSON(data);
                        if (response.status.code == 200) {
                            console.dir(response);
                            $("#pic").html('<img src="uploads/' + response.data[Object.keys(response.data)[0]].imageURL + '">');
                            $("#details").html('<div><h3>' + response.data[Object.keys(response.data)[0]].title + '</h3><p>' + response.data[Object.keys(response.data)[0]].description + '</p></div>');
                            //$("#marker").html('<div><div id="map"></div></div>');
                            $("#message").html('<div><button id="messagebtn" class="btn-primary">send message</button></div>');
                            showMarker(response.data[Object.keys(response.data)[0]].lat,response.data[Object.keys(response.data)[0]].lon,function(){});
                            
                    $.notify({
                        message: 'Lesen von ' + localStorage.getItem('id') + ' erfolgreich!'
                    }, {
                        type: 'success'
                    });
                } else {
                    $.notify({
                        message: 'Lesen von ' + localStorage.getItem('id') + ' nicht erfolgreich!'
                    }, {
                        type: 'warning'
                    });
                }
            },
        });
            break;
         case "/welcon/update.php":
            var index = 0;
            function lookdeep(object, conti) {
                if (conti) {
                    var elements = conti;
                } else {
                    var elements = document.getElementById("updateEntry");
                }
                var next, item;
                for (item in object) {
                    if (object.hasOwnProperty(item)) {
                        next = object[item];
                        if (typeof next == 'object' && next != null) {
                            lookdeep(next);
                        } else {
                            while (elements.elements[index].type != "text" && elements.elements[index].type != "hidden" && elements.elements[index].type != "select-one" && elements.elements[index].type != "textarea" && elements.elements[index].type != "email") {
                                index = index + 1;
                            }
                            if (elements.elements[index].type == "text" || elements.elements[index].type == "hidden" || elements.elements[index].type == "select-one" || elements.elements[index].type == "textarea" || elements.elements[index].type == "email") {
                                elements.elements[index].value = String(next);
                                index = index + 1;
                            }
                        }
                    }
                }
            }
            showMap(function() { 
            var find = new Object();
                find.myId = localStorage.getItem("id");
                find.actionID = "one";

                var promise = $.ajax({
                    type: "POST",
                    url: "db/read.php",
                    data: {
                        find: JSON.stringify(find),
                    },
                    success: function (data) {
            console.log("ERFOLG!!");
                        
                        var response = $.parseJSON(data);
                        if (response.status.code == 200) {
                            console.dir(response);
                           lookdeep(response.data);
                         
                            
                    $.notify({
                        message: 'Lesen von ' + localStorage.getItem('id') + ' erfolgreich!'
                    }, {
                        type: 'success'
                    });
                } else {
                    $.notify({
                        message: 'Lesen von ' + localStorage.getItem('id') + ' nicht erfolgreich!'
                    }, {
                        type: 'warning'
                    });
                }
            },
        });    
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
    $("#updateEntry").validate({
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
        setLocation(form, ajaxUPDATE)
    }
});
    $(document).on("click", ".glyphicon-eye-open", function() {
        var parDIV = $(this).parent().parent().parent();
        localStorage.setItem("id", parDIV[0].id);
        /*var paket = []
        paket = '{ "id": "' + parDIV[0].id + '"}';
        paket = $.parseJSON(paket);*/
        //window.location.href = "entry.php";
         var myForm = document.createElement("form");
        myForm.action= "entry.php"; //this.href;// the href of the link
        //myForm.target="myFrame";
        myForm.method="GET";
        var myInput = document.createElement("input");
        myInput.setAttribute('type',"text");
        myInput.setAttribute('id',"id");
        myInput.setAttribute('name',"id");
        myInput.setAttribute('value',parDIV[0].id);
        var myButton = document.createElement("input");
        myButton.setAttribute('type',"submit");
        myButton.setAttribute('value',"Submit");
        myForm.appendChild(myInput);
        myForm.appendChild(myButton);
        document.getElementsByTagName('body')[0].appendChild(myForm);
        myForm.submit();
        //return false; // cancel the actual link
        //;
        /*$.ajax({
          type: "GET",
          url: "entry.php",
          data: paket,
          cache: false,
          success: function(data){
             // window.location.href = "entry.php";
             //$("#resultarea").text(data);
            console.log("id paket " + localStorage.getItem("id"));
           // console.dir(parDIV);
          }
        });*/
    }); 
    $(document).on("click", ".glyphicon-edit", function() {
        var parDIV = $(this).parent().parent().parent();
        localStorage.setItem("id", parDIV[0].id);
        /*var paket = []
        paket = '{ "id": "' + parDIV[0].id + '"}';
        paket = $.parseJSON(paket);*/
        window.location.href = "update.php";
        //;
       
    
        /*$.ajax({
          type: "GET",
          url: "entry.php",
          data: paket,
          cache: false,
          success: function(data){
             // window.location.href = "entry.php";
             //$("#resultarea").text(data);
            console.log("id paket " + localStorage.getItem("id"));
           // console.dir(parDIV);
          }
        });*/
    }); 
    $(document).on("click", ".glyphicon-trash", function() {
        if (confirm('Are you sure you want to delete this entry from the database?')) {
            // delete it!
        
        var parDIV = $(this).parent().parent().parent();
        localStorage.setItem("id", parDIV[0].id);
        var find = new Object();
                find.myId = localStorage.getItem('id');
                find.actionID = "one";

                var promise = $.ajax({
                    type: "POST",
                    url: "db/delete.php",
                    data: {
                        find: JSON.stringify(find),
                    },
                    success: function (data) {
            console.log("ERFOLG!!");
                        var response = $.parseJSON(data);
                        
                        console.dir(response);
                        if (response.status.code == 200) {
                        window.location.reload();      
                    $.notify({
                        message: 'Löschen von ' + localStorage.getItem('id') + ' erfolgreich!'
                    }, {
                        type: 'success'
                    });
                } else {
                    $.notify({
                        message: 'Löschen von ' + localStorage.getItem('id') + ' nicht erfolgreich!'
                    }, {
                        type: 'warning'
                    });
                }
            },
        });
            } else {
            // Do nothing!
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
                var response = $.parseJSON(data);
                if (response.status.code == 200) {
                    $("#uploadStatus").html('<h3><span class="glyphicon glyphicon-ok"></span></h3>');
                     $("#errorMsg").html('<span>' + response.status.msg + '</span>');
                    $("#image").val(response.data);
                } else {
                    $("#uploadStatus").html('<h3><span class="glyphicon glyphicon-remove"></span></h3>');
                    $("#errorMsg").html('<span>' + response.status.msg + '</span>');
                }
                
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
function ajaxUPDATE  (form) {
       console.log("form: " + form);
        var postEntry = new Object();
        localStorage.setItem("selectedEntry", $("#id").val());
        postEntry.myId = $("#id").val();
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
            url: "db/update.php",
            data: {
                postEntry: JSON.stringify(postEntry),
            },
            success: function (data) {
    var response = $.parseJSON(data);
                if (response.status["code"] == 200) {
                    $.notify({
                        message: 'Bearbeiten von ' + localStorage.getItem('selectedEntry') + ' erfolgreich!'
                    }, {
                        type: 'success'
                    });
                } else {
                    $.notify({
                        message: 'Bearbeiten von ' + localStorage.getItem('selectedEntry') + ' nicht erfolgreich!'
                    }, {
                        type: 'danger'
                    });
                }
            },
        });
    }
;
 function ajaxDELETE (sender) {
      // console.log("form: " + form);
        var postEntry = new Object();
        localStorage.setItem("selectedEntry", $("#title").val());
     var tr = sender.parentNode.parentNode;
        postEntry._id = $(document.getElementById("deleteButton").parentNode.parentNode);
        var successResponse;
        console.log("Ich bin grad hier in der nähe am werkeln, zeile 284");
     console.log("in Postentry: " + postEntry._id);
     
        
        var promise = $.ajax({
            type: "POST",
            url: "db/delete.php",
            data: { id_of_div: $('#span div').html()
            },
            success: function (data) {
                console.log("In data steckt: " + data);
               console.log ("vor dem parseJSON, dass Fehler wirft."); 
    var response = $.parseJSON(data);
               
                if (response.status) {
                    $.notify({
                        message: 'Löschen von ' + localStorage.getItem('selectedEntry') + ' erfolgreich!'
                    }, {
                        type: 'success'
                    });
                } else {
                    $.notify({
                        message: 'Löschen von ' + localStorage.getItem('selectedEntry') + ' nicht erfolgreich!'
                    }, {
                        type: 'warning'
                    });
                }
            },
        });
    }
