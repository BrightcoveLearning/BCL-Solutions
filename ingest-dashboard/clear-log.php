<?php
    $logFileLocation = "video-ids.js";
    $freshContent = "var videoIdArray = [];";

    $fileHandle      = fopen($logFileLocation, 'w') or die("-1");
    fwrite($fileHandle, $freshContent);
    fclose($fileHandle);


echo 'Log file cleared - <a href="di-log.html">go back to the dashboard</a>';
?>
