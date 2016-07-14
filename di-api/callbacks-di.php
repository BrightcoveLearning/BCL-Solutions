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




// function to get index of video object if it already exists
function getIndex($videoId)
{
    $idx = -1;
    for($i = 0; $i < count($notificationDataDecoded); $i++) {
        if ($notificationDataDecoded[$i]->videoId == $videoId) {
            $idx = $i;
            break;
        }
    }
    return $idx;
}

// function to make new video notification object
function makeNotificationObject($videoId) {
    $object = new stdClass();
    $object->videoId = $videoId;
    $object->complete = 'no';
    $object->mp4Renditions = 0;
    $object->hlsRenditions = 0;
    $object->dashRenditions = 0;
    $object->hdsRenditions = 0;
    $object->smoothismRenditions = 0;
    $object->hlsManifests = 0;
    $object->dashManifests = 0;
    $object->hdsManifests = 0;
    $object->smoothManifests = 0;
    return $object;
}




// Begin by extracting the useful parts of the notification

if (isset($decoded["videoId"])) {
    $videoId = $decoded["videoId"];
    // check data to see if object already exists; if not create one
    $videoIndex = getIndex($videoId);
    if ($videoIndex < 0) {
        makeNotificationObject($videoId);
        $videoIndex = getIndex($videoId);
    }
    if (isset($decoded["status"])) {
        $status = $decoded["status"];
    } else {
        $status = null;
    }
    if (isset($decoded["entityType"])) {
        $entityType = $decoded["entityType"];
        // see if the entity type is ASSET and only proceed if the status is SUCCESS
        if ($entityType == "ASSET" && $status == "SUCCESS") {
            // see if there's a profileRefId
            if (isset($decoded["profileRefId"])) {
                $profileRefId = $decoded["profileRefId"];
                // check for manifest or rendition types
                // only checking for HLS manifests here, because that's all the sample app will be seeing
                // but you could add additional checks for other types
                // also, only checking for MP4 or HLS renditions with standard profile reference ids,
                // because that's all this app will see
                // but you can check for other or additional reference id substrings based on the ingest profile(s)
                // you are using
                if ($profileRefId == "HlsManifest") {
                    // increment the hsl manifest count in the notificaitons object
                    $notificationDataDecoded[$videoIndex]->hlsManifests++;
                } elseif (substr($profileRefId, 0, 2) == "mp") {
                    $notificationDataDecoded[$videoIndex]->mp4Renditions++;
                } elseif (substr($profileRefId, 0, 2) == "ts") {
                    $notificationDataDecoded[$videoIndex]->hlsRenditions++;
                }
            }
            // if the entity type is TITLE and status is success, mark this on complete
        } elseif ($entityType = "TITLE" && $status == "SUCCESS") {
            $notificationDataDecoded[$videoIndex]->complete = 'yes';
        }
        // all relevant information should be written
        // now we'll replace the contents of di.json with what we have
        file_put_contents('di.json', json_encode($notificationDataDecoded));

    } else {
        $entityType = null;
    }

} else {
    $videoId = null;
}


echo "Dynamic Ingest callback app is running";
var_dump($notificationData);

?>
