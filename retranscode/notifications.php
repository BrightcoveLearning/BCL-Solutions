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
                $job_count_decoded->job_count--;
            } elseif ($decoded['status'] == 'FAILED') {
                $job_count_decoded->job_count--;
                $job_count_decoded->failed.push($decoded['videoId']);
            }
        }
        $job_count = fopen($job_count_file, 'w');
        fwrite($job_count, json_encode($job_count_decoded));
        fclose($job_count);

        $logFileLocation = $account_id.'_notifications.txt';
        $current_log = file_get_contents($logFileLocation);
        if (!current_log) {
            $current_log_decoded = array();
        } else {
            $current_log_decoded = json_decode($current_log);
        }
        $current_log_decoded.push($decoded);
        $current_log = json_encode($current_log_decoded, JSON_PRETTY_PRINT);

        // Lastly, tell PHP where it can find the log file and tell PHP to open it

        $fileHandle      = fopen($logFileLocation, 'a');
        fwrite($fileHandle, $current_log);
        fclose($fileHandle);
    }
}

// line below is displayed when you browse the app directly
echo "Callback app is running";
?>
