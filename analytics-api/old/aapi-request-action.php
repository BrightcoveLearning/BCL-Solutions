  <?php
  /*!
  | @ Sends the request
  | @return string
  */
  function SendRequest( $url, $method = "GET", $data = array(), $headers = array("Content-type: application/x-www-form-urlencoded") )
  {
    $context = stream_context_create(array
    (
      "http" => array(
        "method" => $method,
        "header" => $headers,
        "content" => http_build_query( $data )
      )
    ));
    return file_get_contents($url, false, $context);
  }
  // no data to submit
  $data = array();
  // get the URL and authorization info from the form data
  $request = $_POST["request"];
  $authorization = $_POST["authorization"];
  // add headers
  $headers = array(1 => "Authorization: ".$authorization,"Content-Type: application/json");
  //send the http request
  $result = SendRequest($request, $method = "GET", $data, $headers);
  // if the data is a string replace linebreaks with <br>'s to prevent breaking JavaScript
  if (is_string($result))
   {
      $result = nl2br($result);
      $result = preg_replace('/\s+/', ' ', trim($result));
   }
   else
   {
    $result = 'The result is an xlsx binary file and cannot be displayed';
   }

?>

<html>
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>Analytics API Response</title>
    <link href="//files.brightcove.com/proxima-nova/font-faces.css" rel="stylesheet" type="text/css">
    <style>
      body {
        font-family: 'ProximaNovaA-Regular', "Helvetica Neue", Arial, Helvetica, sans-serif;
      }
      pre {
        background-color: #f5f5f5;
        border: 1px #999 solid;
        border-radius: 5px;
        font-family: "Source Code Pro",Menlo, Consolas, Monaco, "Lucida Console", monospace;
        padding: 5px;
      }
    </style>
  </head>
  <body>
    <!-- display the result -->
    <pre id="response"></pre>
    <script type="text/javascript" src="//docs.brightcove.com/en/scripts/jquery-1.9.1.min.js"></script>
    <!-- open source charting package, currently not used -- >
    <script src="//docs.brightcove.com/en/scripts/jquery.flot.js"></script>
    <!-- homegrown utility to format json -->
    <script src="//docs.brightcove.com/en/scripts/format_json.js"></script>
    <script>
      // need to wrap the response as a string in case it's CSV
      var AAPIresponse = '<?php echo $result; ?>';
      // check to see if it's JSON
      if (AAPIresponse.indexOf("{") >= 0) {
        AAPIresponse = JSON.parse(AAPIresponse);
        $("#response").html(BCLSformatJSON.formatJSON(AAPIresponse));
      }
      // else check for CSV
      else if (AAPIresponse.indexOf('"') === 0) {
        $("#response").html(AAPIresponse);
      }
      // must be XLSX
      else {
        $("#response").html("The result is an xlsx binary file and cannot be displayed")
      }
    </script>
  </body>
</html>
