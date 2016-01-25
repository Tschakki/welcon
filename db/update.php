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
//require("../config/functions.php");
    // initiate $status
    $status = array(
        "status"   => array(
            "code" => 204,
            "msg"  => "info,status not changed"),
        "data"     => NULL
    );
    // check $_POST
    if (!empty($_POST)) {
        if (!isset($_POST['postEntry'])) {
            $status = array(
                "status"   => array(
                    "code" => 400,
                    "msg"  => "danger,parameter postEntry missing"),
                "data"     => NULL
            );
            echo json_encode($status);
            die;
        } else {
           
            // create mongodb timestamp
            $dt             = new DateTime(date('Y-m-d H:i:s'), new DateTimeZone('UTC'));
            $ts             = $dt->getTimestamp();
            $mongoTimestamp = new MongoDate($ts);
            // set GMT time
            $gmtTime = gmdate('d.m.Y H:i:s', $mongoTimestamp->sec);
            // make $postEntry an object
            $postEntry = json_decode($_POST['postEntry']);
            $realmongoid = new MongoId($postEntry->_id);
                // Pass the actual instance of the MongoId object to the query
            $find = array('_id' => $realmongoid);
            
            // connect to mongodb
            $m = new MongoClient();
            // select a database
            $d = "weco";
            $db = $m->$d;
            // select a collection
            $c = "entry";
            $collection = $db->$c;
            // set $query
            // set $addToSet
            $addToSet             = new stdClass();
            $addToSet->timestamp  = $gmtTime;
            $query                = new stdClass();
            $set                  = new stdClass();
            $set->_id             = $postEntry->_id;
            $set->kind            = $postEntry->kind;
            $set->category        = $postEntry->category;
            $set->title           = $postEntry->title;
            $set->description     = $postEntry->description;
            $set->lat             = $postEntry->lat;
            $set->lon             = $postEntry->lon;
            $set->name            = $postEntry->name;
            $set->imageURL        = $postEntry->imageURL;
            $set->email           = $postEntry->email;
            
            $set->timestamp       = $gmtTime;
            $history              = clone $set;
     //       $history->action      = 'update';
    //        $query->_id         = $postObject->glossarID;
            $addToSet             = new stdClass();
            $addToSet             = (object)array($history);
            $query = new stdClass();
            $query->{'$set'} = $set;
            $query->{'$addToSet'} = new stdClass();
            $query->{'$addToSet'}->history = $addToSet;
            // convert $query from stdObject to an arrayObject
            
//            $query = stdObject_to_arrayObject($query);
    //var_dump($query);die;
            // database query
 //           $cursor = $collection->update($find,$query);
            $set = stdObject_to_arrayObject($set);
    //var_dump($query);die;
            // database query
            $cursor = $collection->insert($set);
            // return result of database query
            if ($cursor["ok"] == 1) {
                $status = array(
                    "status"   => array(
                        "code" => 200,
                        "msg"  => "success,update success"),
                    "data"     => "true"
                );
                echo json_encode($status);
                die;
            } else {
                $status = array(
                    "status"   => array(
                        "code" => 409,
                        "msg"  => "danger,update failed"),
                    "data"     => NULL
                );
                echo json_encode($status);
                die;
            }
        }
    } else {
        // minimum one parameter is missing
        $status = array(
            "status"   => array(
                "code" => 400,
                "msg"  => "danger,parameters missing"),
            "data"     => NULL
        );
        echo json_encode($status);
        die;
    }
    
     $cursor = $collection->find();
// iterate cursor to display title of documents
   echo "Inhalt der Collection";
	
   foreach ($cursor as $document) {
      echo $document["title"] . "\n";
   }
    
} catch (Exception $ex) {
    $status = array(
        "status"   => array(
            "code" => 501,
            "msg"  => "danger BE,".$ex->getMessage()),
        "data"     => NULL
    );
    echo json_encode($status);
    die;
}
// return
echo json_encode($status);
