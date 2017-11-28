<?php
// var to log errors, if any
$problem = "No errors";
// var to store current video index
$videoIndex = -1;

// get input data
try {
    $json    = file_get_contents('php://input');
    $decoded = json_decode($json, true);
} catch (Exception $e) {
    $problem = $e->getMessage();
    echo $problem;
}

// get the data file contents and parse them
try {
    $notificationData = file_get_contents('di.json');
    $notificationDataDecoded = json_decode($notificationData, true);
} catch (Exception $e) {
    $problem = $e->getMessage();
    echo $problem;
}


    if (isset($decoded["entityType"])) {
        $entityType = $decoded["entityType"];
        // if the entity type is ASSET or TITLE, add it to notification data array
        if ($entityType == "ASSET" || $entityType == "TITLE") {
            array_push($notificationDataDecoded, $decoded);
        }
        // now we'll replace the contents of di.json with what we have
        file_put_contents('di.json', json_encode($notificationDataDecoded));

    }

echo "Dynamic Ingest callback app is running";
var_dump($notificationData);

?>
