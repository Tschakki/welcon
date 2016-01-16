<?php

try {
    
    // convert a standard object to array object
    function stdObject_to_arrayObject($object) {
        if (is_object($object)) {
            // get properties of given object
            $object = get_object_vars($object);
        }
        if (is_array($object)) {
            return array_map(__FUNCTION__, $object);
        } else {
            return $object;
        }
    }
   
   // echo "<p>huhu</p>";
    // check $_POST
    if (!empty($_POST)) {
        echo "<p>echo</p>";
        if (!isset($_POST['find'])) {
            $status = array(
                "status"   => array(
                    "code" => 400,
                    "msg"  => "danger,parameter find missing"),
                "data"     => NULL
            );
             
            echo json_encode($status);
            die;
        } else {
            $parameters = new stdClass();
            $find2 = new stdClass();
            // make $find an object
            $find = json_decode($_POST['find']);
    // connect to mongodb
            $m = new MongoClient();
            // select a database
            $d = "weco";
            $db = $m->$d;
            // select a collection
            $c = "entry";
            $collection = $db->$c;


 $cursor = $collection->find($find2, $parameters);
// iterate cursor to display title of documents
   echo "Inhalt der Collection vor dem Delete ";
	
   foreach ($cursor as $document) {
      echo "<p>Titel: " . $document["title"] . "\n</p>";
      echo "<p>ID: " . $document["_id"] . "\n</p>";
   }
// ID-
   
 // now remove the document
    echo "<p>start von delete</p>";
  
   $collection->remove( array( '_id' => new MongoID( '56915856f0f4fe780c8b4567' ) ) );
   echo "<p>Document deleted successfully</p>   ";

// iterate cursor to display title of documents
   echo "Inhalt der Collection nach dem Delete ";
	
   foreach ($cursor as $document) {
      echo "Titel: " . $document["title"] . "\n";
   }
   
   // now display the available documents
   $cursor = $collection->find();
	
   // iterate cursor to display title of documents
   echo "Updated document";
	
   foreach ($cursor as $document) {
      echo $document["title"] . "\n";
   }
 $array = iterator_to_array($cursor);
            if ($array) {
                $status = array(
                    "status"   => array(
                        "code" => 200,
                        "msg"  => true),
                    "data"     => $array
                );
                echo json_encode($status);
                die;
            } else {
                $status = array(
                    "status"   => array(
                        "code" => 404,
                        "msg"  => "warning,combination not found"),
                    "data"     => NULL
                );
                echo json_encode($status);
                die;
            }
        }
        } 
      } catch (Exception $ex) {
   
            $status = array(
            "status"   => array(
                "code" => 501,
                "msg"  => "danger,".$ex->getMessage()),
            "data"     => NULL
        );
   
        echo json_encode($status);
        die;
    }
// return
echo "<p>vor json_encode</p>";
echo json_encode($status);

