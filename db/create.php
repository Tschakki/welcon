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
            // connect to mongodb
            $m = new MongoClient();
            // select a database
            $d = "weco";
            $db = $m->$d;
            // select a collection
            $c = "entry";
            $collection = $db->$c;
            // set $query
            $query                  = new stdClass();
            $query->kind            = $postEntry->kind;
            $query->title           = $postEntry->title;
            $query->category        = $postEntry->category;
            $query->name            = $postEntry->name;
            $query->email           = $postEntry->email;
            $query->lat             = $postEntry->lat;
            $query->lon             = $postEntry->lon;
            $query->description     = $postEntry->description;
            $query->imageURL        = $postEntry->imageURL;
            $query->timestamp       = $gmtTime;
            $history                = clone $query;
            $history->action        = 'create';
    //        $query->_id             = $postObject->glossarID;
            $query->history         = new stdClass();
            $query->history         = (object)array($history);
    
            // convert $query from stdObject to an arrayObject
            $query = stdObject_to_arrayObject($query);
    //var_dump($query);die;
            // database query
            $cursor = $collection->insert($query);
            // return result of database query
            if ($cursor["ok"] == 1) {
                $status = array(
                    "status"   => array(
                        "code" => 200,
                        "msg"  => "success,insert success"),
                    "data"     => NULL
                );
                echo json_encode($status);
                die;
            } else {
                $status = array(
                    "status"   => array(
                        "code" => 409,
                        "msg"  => "danger,insert failed"),
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
