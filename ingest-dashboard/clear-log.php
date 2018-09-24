<?php
    $logFileLocation = "video-ids.js";
    $freshContent = "var videoIdArray = [];";
    file_put_contents($logFileLocation, $freshContent);

echo 'Log file cleared - <a href="di-log.html">go back to the dashboard</a>';
?>
