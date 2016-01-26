<?php

try {
    
    // convert a standard object to array object
    function stdObject_to_arrayObject($object)
    {
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
        if (!isset($_POST['find'])) {
            $status = array(
                "status" => array(
                    "code" => 400,
                    "msg" => "danger,parameter find missing"
                ),
                "data" => NULL
            );
            
            echo json_encode($status);
            die;
        } else {
            $find       = json_decode($_POST['find']);
            $parameters = new stdClass();
            $find2      = array();
            // make $find an object
            //$realmongoid = new MongoId($find->myId);
                // Pass the actual instance of the MongoId object to the query
            $find2 = array('myId' => $find->myId);
    //        print_r($find2);die;
            // connect to mongodb
            $m          = new MongoClient();
            // select a database
            $d          = "weco";
            $db         = $m->$d;
            // select a collection
            $c          = "entry";
            $collection = $db->$c;
            $cursor = $collection->remove($find2);
            
            if ($cursor["ok"] > 0) {
                $status = array(
                    "status" => array(
                        "code" => 200,
                        "msg" => true
                    ),
                    "data" => $array
                );
                echo json_encode($status);
                die;
            } else {
                $status = array(
                    "status" => array(
                        "code" => 404,
                        "msg" => "warning,combination not found"
                    ),
                    "data" => NULL
                );
                echo json_encode($status);
                die;
            }
        }
    }
}
catch (Exception $ex) {
    
    $status = array(
        "status" => array(
            "code" => 501,
            "msg" => "danger," . $ex->getMessage()
        ),
        "data" => NULL
    );
    
    echo json_encode($status);
    die;
}
// return
echo "<p>vor json_encode</p>";
echo json_encode($status);
