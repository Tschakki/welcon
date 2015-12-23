<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <!-- Set the viewport so this responsive site displays correctly on mobile devices -->
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- Include bootstrap CSS -->
    <link href="includes/bootstrap/css/bootstrap.min.css" rel="stylesheet">
    <link href="includes/style.css" rel="stylesheet">
    <link rel="stylesheet" href="css/style.css" />
	<link rel="stylesheet" href="css/leaflet.css" />
    <link href='https://fonts.googleapis.com/css?family=Cinzel' rel='stylesheet' type='text/css'>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
	<title>Welcome Connection</title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css">
    
	<!--<link rel="stylesheet" href="includes/resources/form.css" />-->
	
</head>
<body>
    <!-- Include Javascript -->
    <script src="js/jquery-1.11.3.min.js"></script>
    <script src="http://malsup.github.com/jquery.form.js"></script> 
    <script src="includes/bootstrap/js/bootstrap.min.js"></script>
    <script src="js/jquery.validate.js"></script>
    <script src="js/bootstrap-notify.min.js"></script>
    <script src="js/leaflet.js"></script>
    <script src="js/script.js"></script>
    <script type="text/javascript" src="js/leafletembed.js"></script>
    <script>
    $("form").validate();
    </script>
    <!-- Site header and navigation -->
    <header class="top" role="header">
        <div class="container">
            <a href="#" class="navbar-brand pull-left">
                WELCON
            </a>
            <button class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                <span class="glyphicon glyphicon-align-justify"></span>
            </button>
            <nav class="navbar-collapse collapse" role="navigation">
                <ul class="nav navbar-nav">
                        <li>
                            <a href="index.php"><i class="fa fa-map-marker fa-2x"></i></a>
                        </li>
                        <li>
                            <a href="entryForm.php"><i class="fa fa-bullhorn fa-2x"></i></a>
                        </li>
                        <li>
                        <a href="settings.php"><i class="fa fa-align-justify fa-2x"></i></a>
                        </li>
                        <li>
                        <a href="info.php"><i class="fa fa-info-circle fa-2x"></i></a>
                        </li>
                    </ul>
          <span>
                <form id="searchForm">
                    <input type="search" class="search" placeholder="Search for..." required>
                    <select required>
                    <option value="offers">Offers</option>
                    <option value="needs">Needs</option></select>
                    <input type="submit" class="btn btn-primary searchButton" value="Search">
                </form>
            </span>
            </nav>
        </div>
    </header>

    <!-- Middle content section -->
    <div class="middle">
        <div class="container">