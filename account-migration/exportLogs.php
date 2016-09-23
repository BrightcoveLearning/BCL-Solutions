<?PHP
//error_reporting(E_ALL);
//var_dump($_SERVER);
$source_video_id = $_POST["source_video_id"];
$target_video_id = $_POST["target_video_id"];
//$type = $_POST["type"];
$source_account_id = $_POST["source_account_id"];
$target_account_id = $_POST["target_account_id"];

    $dir = "/Users/lchok/cloud/htdocs/migration/bcovtobcov/logs/";
    //$file = uniqid().getmypid();
    $filename = $dir.$source_account_id.'_'.$target_account_id.".txt";
    $handle = fopen($filename, "a");
    /*
    if($type == "source"){
    	fwrite($handle, "source:".$video_id.",");
	}else{
    	fwrite($handle, "target:".$video_id."\n");
	}*/
	fwrite($handle, $source_video_id.",".$target_video_id."\n");
    fclose($handle);
    echo $filename;
?>
