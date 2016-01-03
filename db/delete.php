<?php
    // connect to mongodb
            $m = new MongoClient();
            // select a database
            $d = "weco";
            $db = $m->$d;
            // select a collection
            $c = "entry";
            $collection = $db->$c;


 $cursor = $collection->find();
// iterate cursor to display title of documents
   echo "Inhalt der Collection";
	
   foreach ($cursor as $document) {
      echo $document["title"] . "\n";
   }

   
 // now remove the document
    echo "start von delete: title: 'bed needed'";
   $collection->remove(array("title"=>"bed needed"),false);
   echo "Document 'bed needed' deleted successfully";
   
   // now display the available documents
   $cursor = $collection->find();
	
   // iterate cursor to display title of documents
   echo "Updated document";
	
   foreach ($cursor as $document) {
      echo $document["title"] . "\n";
   }

