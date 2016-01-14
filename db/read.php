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
 //           $find->_id = "";
//var_dump($find);die;
           if ($find->actionID == 'all') {
              // console.log("ACTIONid AKK ERKANNT");
                $parameters->_id = 0;
                $parameters->history = 0;
                $parameters->lat = 1;
                $parameters->lon = 1;
                $parameters->title = 1;
                $parameters->imageURL = 1;
                $parameters->description = 1;

            // actionID = "location"
            } elseif ($find->actionID == 'location') {
                $parameters->_id = 0;
            } elseif ($find->actionID == 'list') {
                $parameters->_id = 1;
                $parameters->title = 1;
                $parameters->description = 1;
                $parameters->name = 1;
                $parameters->email = 1;
            }
            
            // connect to mongodb
            $m = new MongoClient();
            
            // select a database
            $d = "weco";
            $db = $m->$d;

            // select a collection
            $c = "entry";
            $collection = $db->$c;
    
            // convert $query from stdObject to an arrayObject
           // $find = stdObject_to_arrayObject($find);
           // $parameters = stdObject_to_arrayObject($parameters);
     
            
            // database query
            $cursor = $collection->find($find2, $parameters);
            //$cursor = $collection->find($parameters);
            // return result of database query
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
                "msg"  => "danger,".$ex->getMessage()),
            "data"     => NULL
        );
        echo json_encode($status);
        die;
    }
// return
echo json_encode($status);
