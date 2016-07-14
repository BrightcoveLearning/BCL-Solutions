<?php
    $logFileLocation = "di.json";
    $freshContent = array ();
    $encodedContent = json_encode($freshContent);
    file_put_contents($logFileLocation, $encodedContent);

echo 'Log file cleared - <a href="di-log.html">go back to the dashboard</a>';
?>
