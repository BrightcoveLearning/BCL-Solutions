<?php
/**
 * delete-log.php - deletes log files associated with a retranscode job
 *
 * @returns {string} $response - JSON response received from the API
 */

// security checks
if (strpos($_SERVER['HTTP_REFERER'], 'solutions.brightcove.com') == false) {
    exit('{"ERROR":"Only requests from  http:solutions.brightcove.com are accepted by this proxy"}');
}
// CORS enablement and other headers
header("Access-Control-Allow-Origin: *");
header("Content-type: application/json");
header("X-Content-Type-Options: nosniff");
header("X-XSS-Protection");

$m_account = new stdClass();
$m_account->message = 'An account id is required!';

// get request body
$requestData = json_decode(file_get_contents('php://input'));

// get the account_id or die
if ($requestData->account_id) {
    $account_id = $requestData->account_id;
} else {
    exit($m_account);
}
// delete existing files if any
$files = [
  "https://solutions.brightcove.com/bcls/retranscode/.$account_id.'_count.txt'",
  "https://solutions.brightcove.com/bcls/retranscode/.$account_id.'_notifications.txt"
];
foreach ($files as $file) {
    if (file_exists($file)) {
        unlink(realpath($file));
    } else {
        // File not found.
    }
}
// now create new ones
$job_count_file    = $account_id.'_count.txt';
$job_count_decoded            = new stdClass();
$job_count_decoded->job_count = "1";
$job_count_decoded->failed    = [];
$job_count_encoded = json_encode($job_count_decoded);
$job_count         = fopen($job_count_file, 'w+');
chmod($job_count_file, 0777);
fwrite($job_count, $job_count_encoded);
fclose($job_count);
$notifications_file = $account_id.'_notifications.txt';
fopen($notifications_file, 'w+');
chmod($notifications_file, 0777);
$m_account->message = 'Old files deleted; new ones created';
echo json_encode($m_account);
?>
