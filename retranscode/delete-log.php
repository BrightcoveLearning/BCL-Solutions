<?php
/**
 * delete-log.php - deletes log files associated with a retranscode job
 *
 * @returns {string} $response - JSON response received from the API
 */

// security checks
if (strpos($_SERVER['HTTP_REFERER'], 'solutions.brightcove.com') == false && strpos($_SERVER['HTTP_REFERER'], 'docs.brightcove.com') == false && strpos($_SERVER['HTTP_REFERER'], 's.codepen.io') == false && strpos($_SERVER['HTTP_REFERER'], 'players.brightcove.net') == false) {
    exit('{"ERROR":"Only requests from http://docs.brightcove.com or http:solutions.brightcove.com are accepted by this proxy"}');
}
// CORS enablement and other headers
header("Access-Control-Allow-Origin: *");
header("Content-type: application/json");
header("X-Content-Type-Options: nosniff");

$m_account = new stdClass();
$m_account->message = 'An account id is required!';

// get the account_id or die
if ($_POST["account_id"]) {
    $account_id = $_POST["account_id"];
} else {
    exit($m_account);
}
// first check to see if the running job count is under 100
$job_count_file    = $account_id.'_count.txt';
$notification_file    = $account_id.'_notifications.txt';
$count_delete = unlink($job_count_file);
$notification_delete = unlink($notification_file);
$result = ($count_delete && $notification_delete) ? true : false;
if ($result) {
    $m_account->message = 'Old log files were deleted';
} else {
    $m_account->message = 'No old log files found';
}
echo json_encode($m_account);
?>
