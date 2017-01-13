<?php
// POST won't work for JSON data
$problem = "No errors";
$notificationType = null;
try {
    $json    = file_get_contents('php://input');
    $decoded = json_decode($json, true);
} catch (Exception $e) {
    $problem = $e->getMessage();
}

// if notification received turn notification into pretty printed JSON
if ($decoded) {
    $account_id = $decoded['accountId'];

    // if notification received job complete, update the job count file
    if ($account_id) {
        $job_count_file    = $account_id.'_count.txt';
        $job_count_data    = file_get_contents($job_count_file);
        $job_count_decoded = json_decode($job_count_data);
        if ($decoded['entityType'] == 'TITLE') {
            // check action as well as status for Bolt compatibility
            if ($decoded['status'] == 'SUCCESS' && $decoded['action'] == 'CREATE') {
                if ($job_count_decoded->job_count > 0) {
                    $job_count_decoded->job_count--;
                }
            } elseif ($decoded['status'] == 'FAILED') {
                if ($job_count_decoded->job_count > 0) {
                    $job_count_decoded->job_count--;
                }
                $err = new stdClass();
                $err->job_id = $decoded['jobId'];
                $err->video_id = $decoded['videoId'];
                array_push($job_count_decoded->failed, $err);
            }
        }
        $job_count = fopen($job_count_file, 'w');
        fwrite($job_count, json_encode($job_count_decoded));
        fclose($job_count);

        $logFileLocation = $account_id.'_notifications.txt';
        $current_log = file_get_contents($logFileLocation);
        if ($current_log) {
            $current_log_decoded = json_decode($current_log);
            if ($current_log_decoded == 'null') {
                $current_log_decoded = array();
            }
        } else {
            $current_log_decoded = array();
        }
        array_push($current_log_decoded, $decoded);

        $fileHandle = fopen($logFileLocation, 'w');
        fwrite($fileHandle, json_encode($current_log_decoded));
        fclose($fileHandle);
    }
}

// line below is displayed when you browse the app directly
echo "Callback app is running";
?>
