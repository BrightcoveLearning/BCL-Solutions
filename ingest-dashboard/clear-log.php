<?php
    // clear log file
    $logFileLocation = "video-ids.js";
    $freshContent = "var videoIdArray = [];";

    $fileHandle      = fopen($logFileLocation, 'w') or die("-1");
    fwrite($fileHandle, $freshContent);
    fclose($fileHandle);

    // clear full log
    $logFileLocation = "full-log.txt";
    $freshContent = "";

    $fileHandle      = fopen($logFileLocation, 'w') or die("-1");
    fwrite($fileHandle, $freshContent);
    fclose($fileHandle);

echo 'Log files cleared - <a href="di-log.html">go back to the dashboard</a>';
?>
