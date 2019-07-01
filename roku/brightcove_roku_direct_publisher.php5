<?
// Welcome to Carl's sample Video Cloud Roku Direct Publisher feed

// Please use this at your own risk.
// This is just a sample to get you started. You can customize further as your requirements
// grow.

// The following is a list of requirements and conditions in order for this Roku Direct Publisher feed
// to function properly;

//1) You must have a Pro or Enterprise level Video Cloud Account.
//2) You need to create the following custom fields. They are in your Account Settings: 
// Video Fields page on the Video Cloud Studio Home page:
//			1) roku_category
//			2) 
//
//3) You will have to manually or programmatically set the custom metadata values when you
// upload content.



// Please customize the variables below:

// This is the title of the Roku Feed itself.
$title = "Brightcove Test Roku Direct Publisher Feed";
// This is a link to where the podcast can be found.
$link = "http://www.blacktreeproductions.com/brightcove_roku_direct_publisher.php5";
// This is a description of this Roku Direct Publisher Feed.
$description= "Description of the Video Cloud Roku Direct Publisher Test Feed";


//Brightcove Account ID
$accountId = "948002569001";
// This is your Policy Key associated with your account. 
$policyKey = "BCpkADawqM0WjAJnQCXelwCL_sudfR4HycluOT5LOImBPAfUCLn46vxR6hG7mMm1VoineewK4tkFbfDakfEwYInEMSa_fAJ7HxVMIN1ItBJHXEDYGMnPbJrkK0U";
// The ID of the playlist you wish to publish.
$playlistid = "6026675134001";

// This is the baseURL of the API endpoint you would like to use
$baseURL = "https://edge.api.brightcove.com/playback/v1/accounts/";




// Please DO NOT alter the code below;
header('Content-Type: text/xml');
print('<rss version="2.0" xmlns:media="http://search.yahoo.com/mrss/">');
echo"\n";
print('<channel>');
echo"\n";
print('	<title>'. $title .'</title>');
echo"\n";
print('	<link>'. $link .'</link>');
echo"\n";
print('	<description><![CDATA['. $description .']]></description>');
echo"\n";

$ch = curl_init();
$timeout = 5; // set to zero for no timeout
curl_setopt ($ch, CURLOPT_URL, $baseURL . $accountId . '/playlists/'. $playlistid);
curl_setopt ($ch, CURLOPT_HTTPHEADER, array(('Authorization:BCOV-Policy '. $policyKey),('BCOV-Policy:'. $policyKey),('Accept:application/json;pk='. $policyKey)));
curl_setopt ($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt ($ch, CURLOPT_CONNECTTIMEOUT, $timeout);
$file_contents = curl_exec($ch);
curl_close($ch);

$returndata = json_decode($file_contents);

foreach($returndata->videos as $items)
{
print('	<item>');
echo"\n";

print('		<guid>');
print_r($items->{"id"});
print('</guid>');
echo"\n";

print('		<pubDate>');
print_r(date(DATE_RFC2822,($items->{"published_at"})));
print('</pubDate>');
echo"\n";

print('		<media:title>');
print_r($items->{"name"});
print('</media:title>');
echo"\n";

print('		<media:description>');
print_r($items->{"description"});
print('</media:description>');
echo"\n";

print('		<media:category>');
print_r($items->custom_fields->{"roku_category"});
print('</media:category>');
echo"\n";

print('		<media:thumbnail url="');
print_r($items->{"poster"});
print('" />');
echo"\n";


print('		<media:content url="');
$newurl = $items->sources[1]->{"src"};
print_r($newurl);
print('" duration="');
echo (($items->{"duration"})/1000);
print('" />');
echo"\n";


print('		<media:subTitle lang="');
print_r($items->text_tracks[0]->{"srclang"});
print('" href="');
print_r($items->text_tracks[0]->{"src"});
print('" />');
echo"\n";

//print_r($items);  DUMP THE ENTIRE ARRAY FOR TESTING
 
print('	</item>');
echo"\n";
}

echo"\n";

print('</channel>');
echo"\n";
print('</rss>');

?> 