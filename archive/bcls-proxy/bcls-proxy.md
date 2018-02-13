# bcls-proxy
 * Version: 0.1.4
 ************
 * Change log
 * 0.1.4:   add support for pull based ingest, ingest profiles, and cms api
 * 0.1.3:   add support for Analytics API LA tokens
 *          check for account match before using existing token
 * 0.1.2:   added support for AJAX requests
 * 0.1.1:   added separate ports per API to take advantage of token expire time
 ************
Author: Robert Crooks
Description: Proxies Brightcove API requests, getting an access token, making the call, and returning the response to an iframe on the client page

## Requirements:
### POST your request to:
    solutions.brightcove.com:8001 (any API, no check for existing valid token)
    solutions.brightcove.com:8002 (for the Analytics API)
    solutions.brightcove.com:8003 (for the Player Management API)
    solutions.brightcove.com:8004 (Pull Based Ingest API)
    solutions.brightcove.com:8005 (Ingest Profiles API)
    solutions.brightcove.com:8006 (CMS API)
### Target an iframe on your page to display the response (unless using AJAX)
### Required fields for the body:
    client_id **[1]**      // (get from the Brightcove OAuth UI in Studio)
    client_secret **[1]**  // (get from the Brightcove OAuth UI in Studio)
    url                // the full url for the API call you want to make, including parameters
    requestType        // (optional, default: GET)GET | POST | PUT | PATCH | DELETE
    requestBody        // (optional) request body for calls that submit data
 
**[1]** For the ANALYTICS API *ONLY* you can substitute the following for the client_id and client_secret:
    aapi_token    // if you have a permanent token from the Limited Availability program
 
###Note: this is a sample only, not a supported Brightcove app
 * It only accepts requests from brightcove domains
 * If you would like to use the code to build your own proxy, see:
     http://docs.brightcove.com/en/video-cloud/oauth-api/guides/quick-start.html
