var 
  validVMAP,
  validAdRollVMAP,
  validNoAdsVMAP,
  validSkipOffsetVMAP,
  validPreRollJson,
  validMidRollJson,
  validPostRollJson,
  validVMAPJson,
  validAdRollVMAPJson,
  validMidRollVMAPJson,
  invalidVMAPJson,
  invalidVMAP;

validVMAP = '<vmap:VMAP version="1.0" xmlns:uo="uo" xmlns:vmap="http://www.iab.net/vmap-1.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">' +
'  <vmap:Extensions>' +
'    <uo:unicornOnce contentlength="105.867" contenturi="http://api14-phx.unicornmedia.com/now/stitched/mp4/95ea75e1-dd2a-4aea-851a-28f46f8e8195/43f54cc0-aa6b-4b2c-b4de-63d707167bf9/3a41c6e4-93a3-4108-8995-64ffca7b9106/9b118b95-38df-4b99-bb50-8f53d62f6ef8/content.mp4?oasid=8d3b56e6-639e-4777-9194-cf82fb386c1e%26umtp=0" contextid="8d3b56e6-639e-4777-9194-cf82fb386c1e" payloadlength="196.067" ttl="600"/>' +
'    <uo:contentImpressions/>' +
'    <uo:requestParameters/>' +
'  </vmap:Extensions>' +
'  <vmap:AdBreak breakId="PreRoll_0_0" breakType="linear" timeOffset="start">' +
'    <vmap:AdSource allowMultipleAds="true" followRedirects="true" id="0">' +
'      <vmap:VASTData>' +
'        <VAST xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">' +
'          <Ad id="UmStarbucks">' +
'            <InLine>' +
'              <AdSystem>UnicornInternal</AdSystem>' +
'              <AdTitle>videoadvertisement</AdTitle>' +
'              <Description>video ad</Description>' +
'              <Impression>http://impressionurl1.demo.url.com/impression/starbuckstwo</Impression>' +
'              <Creatives>' +
'                <Creative>' +
'                  <Linear>' +
'                    <Duration>00:00:30.0666666+00:00</Duration>' +
'                    <TrackingEvents>' +
'                      <Tracking event="start" offset="0">http://trackingurl.demo.url.com/start/starbuckstwo</Tracking>' +
'                      <Tracking event="firstQuartile" offset="7">http://trackingurl.demo.url.com/firstQuartile/starbuckstwo</Tracking>' +
'                      <Tracking event="midpoint" offset="15">http://trackingurl.demo.url.com/midpoint/starbuckstwo</Tracking>' +
'                      <Tracking event="thirdQuartile" offset="22">http://trackingurl.demo.url.com/thirdQuartile/starbuckstwo</Tracking>' +
'                      <Tracking event="complete" offset="30">http://trackingurl.demo.url.com/complete/starbuckstwo</Tracking>' +
'                    </TrackingEvents>' +
'                    <VideoClicks>' +
'                      <ClickThrough id="abc">http://www.starbucks.com/static/images/global/logo.png</ClickThrough>' +
'                      <ClickTracking id="">http://www.clicktracking.com/test?click</ClickTracking>' +
'                    </VideoClicks>' +
'                    <MediaFiles/>' +
'                  </Linear>' +
'                </Creative>' +
'                <Creative>' +
'                  <CompanionAds>' +
'                    <Companion height="250" id="54061052904921234300x250" width="300">' +
'                      <StaticResource creativeType="image/jpeg">http://demo.umedia.com/jes/ads/starbuckstwo300.jpg</StaticResource>' +
'                      <TrackingEvents>' +
'                        <Tracking event="creativeView">http://companiontrack.demo.url.com/companion/starbuckstwo</Tracking>' +
'                      </TrackingEvents>' +
'                      <CompanionClickThrough>http://www.starbucks.com/static/images/global/logo.png</CompanionClickThrough>' +
'                    </Companion>' +
'                  </CompanionAds>' +
'                </Creative>' +
'              </Creatives>' +
'            </InLine>' +
'          </Ad>' +
'        </VAST>' +
'      </vmap:VASTData>' +
'    </vmap:AdSource>' +
'  </vmap:AdBreak>' +
'  <vmap:AdBreak breakId="MidRoll_30_0" breakType="linear" timeOffset="00:00:30.000">' +
'    <vmap:AdSource allowMultipleAds="true" followRedirects="true" id="1">' +
'      <vmap:VASTData>' +
'        <VAST xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">' +
'          <Ad id="UmStarbucks">' +
'            <InLine>' +
'              <AdSystem>UnicornInternal</AdSystem>' +
'              <AdTitle>videoadvertisement</AdTitle>' +
'              <Description>video ad</Description>' +
'              <Impression>http://impressionurl1.demo.url.com/impression/starbuckstwo</Impression>' +
'              <Creatives>' +
'                <Creative>' +
'                  <Linear>' +
'                    <Duration>00:00:30.0666666+00:00</Duration>' +
'                    <TrackingEvents>' +
'                      <Tracking event="start" offset="0">http://trackingurl.demo.url.com/start/starbuckstwo</Tracking>' +
'                      <Tracking event="firstQuartile" offset="7">http://trackingurl.demo.url.com/firstQuartile/starbuckstwo</Tracking>' +
'                      <Tracking event="midpoint" offset="15">http://trackingurl.demo.url.com/midpoint/starbuckstwo</Tracking>' +
'                      <Tracking event="thirdQuartile" offset="22">http://trackingurl.demo.url.com/thirdQuartile/starbuckstwo</Tracking>' +
'                      <Tracking event="complete" offset="30">http://trackingurl.demo.url.com/complete/starbuckstwo</Tracking>' +
'                    </TrackingEvents>' +
'                    <VideoClicks>' +
'                      <ClickTracking id="">http://www.clicktracking.com/test?click</ClickTracking>' +
'                    </VideoClicks>' +
'                    <MediaFiles/>' +
'                  </Linear>' +
'                </Creative>' +
'                <Creative>' +
'                  <CompanionAds>' +
'                    <Companion height="250" id="54061052904921234300x250" width="300">' +
'                      <StaticResource creativeType="image/jpeg">http://demo.umedia.com/jes/ads/starbuckstwo300.jpg</StaticResource>' +
'                      <TrackingEvents>' +
'                        <Tracking event="creativeView">http://companiontrack.demo.url.com/companion/starbuckstwo</Tracking>' +
'                      </TrackingEvents>' +
'                      <CompanionClickThrough>http://www.starbucks.com/static/images/global/logo.png</CompanionClickThrough>' +
'                    </Companion>' +
'                  </CompanionAds>' +
'                </Creative>' +
'              </Creatives>' +
'            </InLine>' +
'          </Ad>' +
'        </VAST>' +
'      </vmap:VASTData>' +
'    </vmap:AdSource>' +
'  </vmap:AdBreak>' +
'  <vmap:AdBreak breakId="PostRoll_105_0" breakType="linear" timeOffset="end">' +
'    <vmap:AdSource allowMultipleAds="true" followRedirects="true" id="2">' +
'      <vmap:VASTData>' +
'        <VAST xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">' +
'          <Ad id="UmStarbucks">' +
'            <InLine>' +
'              <AdSystem>UnicornInternal</AdSystem>' +
'              <AdTitle>videoadvertisement</AdTitle>' +
'              <Description>video ad</Description>' +
'              <Impression>http://impressionurl1.demo.url.com/impression/starbuckstwo</Impression>' +
'              <Creatives>' +
'                <Creative>' +
'                  <Linear>' +
'                    <Duration>00:00:30.0666666+00:00</Duration>' +
'                    <TrackingEvents>' +
'                      <Tracking event="start" offset="0">http://trackingurl.demo.url.com/start/starbuckstwo</Tracking>' +
'                      <Tracking event="firstQuartile" offset="7">http://trackingurl.demo.url.com/firstQuartile/starbuckstwo</Tracking>' +
'                      <Tracking event="midpoint" offset="15">http://trackingurl.demo.url.com/midpoint/starbuckstwo</Tracking>' +
'                      <Tracking event="thirdQuartile" offset="22">http://trackingurl.demo.url.com/thirdQuartile/starbuckstwo</Tracking>' +
'                      <Tracking event="complete" offset="30">http://trackingurl.demo.url.com/complete/starbuckstwo</Tracking>' +
'                    </TrackingEvents>' +
'                    <VideoClicks>' +
'                      <ClickThrough id="abc">http://www.starbucks.com/static/images/global/logo.png</ClickThrough>' +
'                      <ClickTracking id="">http://www.clicktracking.com/test?click</ClickTracking>' +
'                    </VideoClicks>' +
'                    <MediaFiles/>' +
'                  </Linear>' +
'                </Creative>' +
'                <Creative>' +
'                  <CompanionAds>' +
'                    <Companion height="250" id="54061052904921234300x250" width="300">' +
'                      <StaticResource creativeType="image/jpeg">http://demo.umedia.com/jes/ads/starbuckstwo300.jpg</StaticResource>' +
'                      <TrackingEvents>' +
'                        <Tracking event="creativeView">http://companiontrack.demo.url.com/companion/starbuckstwo</Tracking>' +
'                      </TrackingEvents>' +
'                      <CompanionClickThrough>http://www.starbucks.com/static/images/global/logo.png</CompanionClickThrough>' +
'                    </Companion>' +
'                  </CompanionAds>' +
'                </Creative>' +
'              </Creatives>' +
'            </InLine>' +
'          </Ad>' +
'        </VAST>' +
'      </vmap:VASTData>' +
'    </vmap:AdSource>' +
'  </vmap:AdBreak>' +
'</vmap:VMAP>';

validAdRollVMAP = '<vmap:VMAP version="1.0" xmlns:uo="uo" xmlns:vmap="http://www.iab.net/vmap-1.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">' +
'  <vmap:Extensions>' +
'    <uo:unicornOnce ttl="600" contenturi="http://onceapi0-qa.unicornmedia.com/now/stitched/mp4/96c78eda-0f69-4904-a312-74178d053a73/eb4a3afd-db21-4ea3-b9e3-642376bc27e5/3a41c6e4-93a3-4108-8995-64ffca7b9106/f556a122-2e69-467e-aef2-fe97c7ed215b/content.mp4?oasid=690f8162-5501-4d64-b20b-160d1508c74e" contentlength="123.1333" payloadlength="401.3333" contextid="690f8162-5501-4d64-b20b-160d1508c74e" />' +
'    <uo:contentImpressions />' +
'    <uo:requestParameters />' +
'  </vmap:Extensions>' +
'  <vmap:AdBreak breakType="linear" breakId="PreRoll_0_0" timeOffset="start">' +
'    <vmap:AdSource allowMultipleAds="true" followRedirects="true" id="0">' +
'      <vmap:VASTData>' +
'        <VAST xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">' +
'          <Ad id="exxon">' +
'            <InLine>' +
'              <AdSystem>FreeWheel</AdSystem>' +
'              <AdTitle>Unknown</AdTitle>' +
'              <Impression id="FWi_1085022.0">http://dpl02.qa.unicornapp.com/freewheel_final/l/1?s=b151&amp;n=168234&amp;t=1343325920105958003&amp;adid=1085022&amp;reid=609199&amp;arid=0&amp;auid=&amp;cn=defaultImpression&amp;et=i&amp;_cc=1085022,609199,13120.,13120.,1343325920,1&amp;tpos=0&amp;iw=&amp;uxnw=&amp;uxss=&amp;uxct=&amp;metr=121&amp;init=1&amp;cr=</Impression>' +
'              <Impression>http://dpl02.qa.unicornapp.com/freewheel/wrapper2/impression/2912a.v.fwmrm.net/ad/l/1?s=b060&amp;t=1339713806542489130&amp;adid=1123397&amp;reid=629832&amp;arid=0&amp;auid=&amp;cn=defaultImpression&amp;et=i&amp;_cc=1123397,629832,,13120.,1339713806,1&amp;tpos=0&amp;iw=&amp;uxnw=&amp;uxss=&amp;uxct=&amp;metr=121&amp;init=1&amp;cr=</Impression>' +
'              <Impression>http://dpl02.qa.unicornapp.com/podposition2/impression/pagead/adview?ai=BOOkapOykUb_UIa-TlALB1oCQD6LS98cFAAAAEAEgsoGMKTgAWIq6_K-BAWDJ_suGxKPIF7oBCzQ4MHgzNjBfeG1syAEF2gEFaHR0cDqYAqi7AsACAuACAOoCJi80MjY2L2N3dHYuZnVsbHN0cmVhbS9oYXJ0b2ZkaXhpZV94Ym94-AKC0h6QA6wCmAPgA6gDAeAEAaAGJA&amp;sigh=echOpNh9_ko</Impression>' +
'              <Creatives>' +
'                <Creative sequence="1">' +
'                  <Linear>' +
'                    <Duration>00:00:32.0000000+00:00</Duration>' +
'                    <TrackingEvents>' +
'                      <Tracking event="firstQuartile" offset="8">http://trackingurl.demo.url.com/start/starbuckstwo</Tracking>' +
'                    </TrackingEvents>' +
'                    <AdParameters />' +
'                    <VideoClicks>' +
'                      <ClickThrough />' +
'                      <ClickTracking id="FWc_1085022.0">http://dpl02.qa.unicornapp.com/freewheel_final/l/1?s=b151&amp;n=168234&amp;t=1343325920105958003&amp;adid=1085022&amp;reid=609199&amp;arid=0&amp;auid=&amp;cn=defaultClick&amp;et=c&amp;_cc=&amp;tpos=0&amp;cr=</ClickTracking>' +
'                      <ClickTracking id="FWc_1123397.0">http://2912a.v.fwmrm.net/ad/l/1?s=b060&amp;t=1339713806542489130&amp;adid=1123397&amp;reid=629832&amp;arid=0&amp;auid=&amp;cn=defaultClick&amp;et=c&amp;_cc=&amp;tpos=0&amp;cr=</ClickTracking>' +
'                      <ClickTracking id="GDFP">http://dpl02.qa.unicornapp.com/podposition2/clicktracking/aclk?sa=L&amp;ai=CVHdzpOykUb_UIa-TlALB1oCQD6LS98cFAAAQASCygYwpUMCZht4FYMn-y4bEo8gXyAEF4AIAqAMBqgRgT9C3pKO5vfD6Kmsq3WxMMwx2mHHn_tR5CRevRZ4K18B7q5hlzFlu--0MoMOXQ-frdfUndxGPPFtvpm1DroZHGqsekaBwgNvQxxXoPSvnH_b4SlOw3e7l1xQJWdaPtV6l4AQBoAYk&amp;num=0&amp;sig=AOD64_3AU87dl7gbpGeVCmbNsDzAwemNVw&amp;client=ca-pub-0775588607848145</ClickTracking>' +
'                    </VideoClicks>' +
'                    <MediaFiles />' +
'                  </Linear>' +
'                </Creative>' +
'                <Creative sequence="1">' +
'                  <NonLinearAds>' +
'                    <TrackingEvents>' +
'                      <Tracking event="creativeView">http://dpl02.qa.unicornapp.com/podposition2/nonlinear/creativeview2/cgi-bin/m?ci=ENT21192&amp;am=4&amp;ep=1&amp;at=view&amp;rt=banner&amp;st=image&amp;ca=1213P-179-164&amp;cr=34728779018&amp;pc=145516178&amp;r=1181970027</Tracking>' +
'                    </TrackingEvents>' +
'                    <NonLinear id="" width="480" height="360" scalable="false" maintainAspectRatio="false" minSuggestedDuration="00:00:30.0000000+00:00" />' +
'                  </NonLinearAds>' +
'                </Creative>' +
'              </Creatives>' +
'              <Extensions>' +
'                <Extension>' +
'                  <ad ownerId="789" adId="adId" />' +
'                </Extension>' +
'                <Extension type="geo">' +
'                  <Bandwidth>4</Bandwidth>' +
'                </Extension>' +
'                <Extension type="pod" sequence="2" />' +
'              </Extensions>' +
'            </InLine>' +
'          </Ad>' +
'        </VAST>' +
'      </vmap:VASTData>' +
'    </vmap:AdSource>' +
'  </vmap:AdBreak>' +
'  <vmap:AdBreak breakType="linear" breakId="PreRoll_0_1" timeOffset="start">' +
'    <vmap:AdSource allowMultipleAds="true" followRedirects="true" id="1">' +
'      <vmap:VASTData>' +
'        <VAST xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">' +
'          <Ad id="exxon">' +
'            <InLine>' +
'              <AdSystem>FreeWheel</AdSystem>' +
'              <AdTitle>Unknown</AdTitle>' +
'              <Impression id="FWi_1085022.0">http://dpl02.qa.unicornapp.com/freewheel_final/l/1?s=b151&amp;n=168234&amp;t=1343325920105958003&amp;adid=1085022&amp;reid=609199&amp;arid=0&amp;auid=&amp;cn=defaultImpression&amp;et=i&amp;_cc=1085022,609199,13120.,13120.,1343325920,1&amp;tpos=0&amp;iw=&amp;uxnw=&amp;uxss=&amp;uxct=&amp;metr=121&amp;init=1&amp;cr=</Impression>' +
'              <Impression>http://dpl02.qa.unicornapp.com/freewheel/wrapper2/impression/2912a.v.fwmrm.net/ad/l/1?s=b060&amp;t=1339713806542489130&amp;adid=1123397&amp;reid=629832&amp;arid=0&amp;auid=&amp;cn=defaultImpression&amp;et=i&amp;_cc=1123397,629832,,13120.,1339713806,1&amp;tpos=0&amp;iw=&amp;uxnw=&amp;uxss=&amp;uxct=&amp;metr=121&amp;init=1&amp;cr=</Impression>' +
'              <Impression>http://dpl02.qa.unicornapp.com/pagead/adview?ai=BcH4PpOykUcHUIa-TlALB1oCQD-KUzccFAAAAEAEgsoGMKTgAWOrilK-BAWDJ_suGxKPIF7oBCzQ4MHgzNjBfeG1syAEF2gEFaHR0cDqYApaJBMACAuACAOoCJi80MjY2L2N3dHYuZnVsbHN0cmVhbS9oYXJ0b2ZkaXhpZV94Ym94-AKC0h6QA6wCmAPgA6gDAeAEAaAGJA&amp;sigh=Zel_Q9n35Fo</Impression>' +
'              <Creatives>' +
'                <Creative sequence="1">' +
'                  <Linear>' +
'                    <Duration>00:00:32.0000000+00:00</Duration>' +
'                    <TrackingEvents>' +
'                      <Tracking event="firstQuartile" offset="8">http://trackingurl.demo.url.com/start/starbuckstwo</Tracking>' +
'                    </TrackingEvents>' +
'                    <AdParameters />' +
'                    <VideoClicks>' +
'                      <ClickThrough />' +
'                      <ClickTracking id="FWc_1085022.0">http://dpl02.qa.unicornapp.com/freewheel_final/l/1?s=b151&amp;n=168234&amp;t=1343325920105958003&amp;adid=1085022&amp;reid=609199&amp;arid=0&amp;auid=&amp;cn=defaultClick&amp;et=c&amp;_cc=&amp;tpos=0&amp;cr=</ClickTracking>' +
'                      <ClickTracking id="FWc_1123397.0">http://2912a.v.fwmrm.net/ad/l/1?s=b060&amp;t=1339713806542489130&amp;adid=1123397&amp;reid=629832&amp;arid=0&amp;auid=&amp;cn=defaultClick&amp;et=c&amp;_cc=&amp;tpos=0&amp;cr=</ClickTracking>' +
'                      <ClickTracking id="GDFP">http://dpl02.qa.unicornapp.com/aclk?sa=L&amp;ai=C0paLpOykUcHUIa-TlALB1oCQD-KUzccFAAAQASCygYwpUMCZht4FYMn-y4bEo8gXyAEF4AIAqAMBqgRgT9CQ-6aaeoTjK9nVyzpGm-Zmr6Htrkl2iPQYl-Cn-Hq0Lr8BRuubVgR0TK_-de_aDlawfO144AHbbNOISR3WbZOTu5YPC2phF13Qta16-qoRsizDd0h_upLEvriL5gEB4AQBoAYk&amp;num=0&amp;sig=AOD64_2uYRwiZHpkN6VrwpZ7DRS0MFwa8w&amp;client=ca-pub-0775588607848145</ClickTracking>' +
'                    </VideoClicks>' +
'                    <MediaFiles />' +
'                  </Linear>' +
'                </Creative>' +
'                <Creative sequence="1">' +
'                  <NonLinearAds>' +
'                    <TrackingEvents>' +
'                      <Tracking event="creativeView">http://dpl02.qa.unicornapp.com/podposition2/nonlinear/creativeview2/cgi-bin/m?ci=ENT21192&amp;am=4&amp;ep=1&amp;at=view&amp;rt=banner&amp;st=image&amp;ca=1213P-179-164&amp;cr=34728779018&amp;pc=145516178&amp;r=1181970027</Tracking>' +
'                    </TrackingEvents>' +
'                    <NonLinear id="" width="480" height="360" scalable="false" maintainAspectRatio="false" minSuggestedDuration="00:00:30.0000000+00:00" />' +
'                  </NonLinearAds>' +
'                </Creative>' +
'              </Creatives>' +
'              <Extensions>' +
'                <Extension>' +
'                  <ad ownerId="789" adId="adId" />' +
'                </Extension>' +
'                <Extension type="geo">' +
'                  <Bandwidth>4</Bandwidth>' +
'                </Extension>' +
'                <Extension type="pod" sequence="3" />' +
'              </Extensions>' +
'            </InLine>' +
'          </Ad>' +
'        </VAST>' +
'      </vmap:VASTData>' +
'    </vmap:AdSource>' +
'  </vmap:AdBreak>' +
'  <vmap:AdBreak breakType="linear" breakId="PreRoll_0_2" timeOffset="start">' +
'    <vmap:AdSource allowMultipleAds="true" followRedirects="true" id="2">' +
'      <vmap:VASTData>' +
'        <VAST xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">' +
'          <Ad id="95863418">' +
'            <InLine>' +
'              <AdSystem>GDFP</AdSystem>' +
'              <AdTitle>video</AdTitle>' +
'              <Description>video ad</Description>' +
'              <Survey>http://dpl02.qa.unicornapp.com/podposition10/cgi-bin/m?ci=ENT29622&amp;am=4&amp;ep=1&amp;at=view&amp;rt=banner&amp;st=image&amp;ca=1213P-240-16&amp;cr=33567367298&amp;pc=145516178&amp;r=360294534</Survey>' +
'              <Error>http://dpl02.qa.unicornapp.com/podposition10/error/pagead/conversion/?ai=BrPD0pOykUb7UIa-TlALB1oCQD-LSkbAFAAAAEAEgsoGMKTgAUPTJuZP4_____wFYgsGVhn1gyf7LhsSjyBe6AQs0ODB4MzYwX3htbMgBBdoBBWh0dHA6mAKOqATAAgLgAgDqAiYvNDI2Ni9jd3R2LmZ1bGxzdHJlYW0vaGFydG9mZGl4aWVfeGJvePgCgtIekAOsApgD4AOoAwHgBAGgBiM&amp;sigh=9hFZJgo26cE&amp;label=videoplayfailed</Error>' +
'              <Impression>http://dpl02.qa.unicornapp.com/podposition10/pagead/adview?ai=BrPD0pOykUb7UIa-TlALB1oCQD-LSkbAFAAAAEAEgsoGMKTgAUPTJuZP4_____wFYgsGVhn1gyf7LhsSjyBe6AQs0ODB4MzYwX3htbMgBBdoBBWh0dHA6mAKOqATAAgLgAgDqAiYvNDI2Ni9jd3R2LmZ1bGxzdHJlYW0vaGFydG9mZGl4aWVfeGJvePgCgtIekAOsApgD4AOoAwHgBAGgBiM&amp;sigh=kmNW7UR3GOA</Impression>' +
'              <Creatives>' +
'                <Creative sequence="1">' +
'                  <Linear>' +
'                    <Duration>00:00:30.1666666+00:00</Duration>' +
'                    <TrackingEvents>' +
'                      <Tracking event="firstQuartile" offset="8">http://trackingurl.demo.url.com/start/starbuckstwo</Tracking>' +
'                    </TrackingEvents>' +
'                    <VideoClicks>' +
'                      <ClickThrough id="GDFP">http://dpl02.qa.unicornapp.com/aclk?sa=L&amp;ai=CwzrApOykUb7UIa-TlALB1oCQD-LSkbAFAAAQASCygYwpUPTJuZP4_____wFgyf7LhsSjyBfIAQXgAgCoAwGqBF9P0Nuhil_cylk0R2jP7EjAbSv6emxw7Or1HSZD5Dp2MiTeTIU4qt1zy59U2RKFpmMD4Sq2gv2sAaMMKy_EujBPi4tBBQXlLI1fI7US_6Sa4xfNZB7GzvKsaXhTzweU0OAEAaAGIw&amp;num=0&amp;sig=AOD64_0VYP39qH0i65NKG3u51Skjo3LV1Q&amp;client=ca-pub-0775588607848145&amp;adurl=http://www.facebook.com/SchickHydroSilk</ClickThrough>' +
'                    </VideoClicks>' +
'                    <MediaFiles />' +
'                  </Linear>' +
'                </Creative>' +
'              </Creatives>' +
'              <Extensions>' +
'                <Extension type="geo">' +
'                  <Bandwidth>4</Bandwidth>' +
'                </Extension>' +
'                <Extension type="pod" sequence="10" />' +
'              </Extensions>' +
'            </InLine>' +
'          </Ad>' +
'        </VAST>' +
'      </vmap:VASTData>' +
'    </vmap:AdSource>' +
'  </vmap:AdBreak>' +
'  <vmap:AdBreak breakType="linear" breakId="PreRoll_0_3" timeOffset="start">' +
'    <vmap:AdSource allowMultipleAds="true" followRedirects="true" id="3">' +
'      <vmap:VASTData>' +
'        <VAST xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">' +
'          <Ad id="12841124">' +
'            <InLine>' +
'              <AdSystem>GDFP</AdSystem>' +
'              <AdTitle>video</AdTitle>' +
'              <Description>video ad</Description>' +
'              <Survey>http://dpl02.qa.unicornapp.com/podpositionempty/cgi-bin/m?ci=ENT21192&amp;am=4&amp;ep=1&amp;at=view&amp;rt=banner&amp;st=image&amp;ca=1213P-179-149&amp;cr=34728778538&amp;pc=145516178&amp;r=638319766</Survey>' +
'              <Error>http://dpl02.qa.unicornapp.com/podpositionempty/pagead/conversion/?ai=Bs-8RpOykUcDUIa-TlALB1oCQD4q398cFAAAAEAEgsoGMKTgAUOLclaj9_____wFYqrb8r4EBYMn-y4bEo8gXugELNDgweDM2MF94bWzIAQXaAQVodHRwOpgCqLsCwAIC4AIA6gImLzQyNjYvY3d0di5mdWxsc3RyZWFtL2hhcnRvZmRpeGllX3hib3j4AoLSHpADrAKYA-ADqAMB4AQBoAYj&amp;sigh=JSGUJ5zQmx4&amp;label=videoplayfailed</Error>' +
'              <Impression>http://dpl02.qa.unicornapp.com/podpositionempty/pagead/adview?ai=Bs-8RpOykUcDUIa-TlALB1oCQD4q398cFAAAAEAEgsoGMKTgAUOLclaj9_____wFYqrb8r4EBYMn-y4bEo8gXugELNDgweDM2MF94bWzIAQXaAQVodHRwOpgCqLsCwAIC4AIA6gImLzQyNjYvY3d0di5mdWxsc3RyZWFtL2hhcnRvZmRpeGllX3hib3j4AoLSHpADrAKYA-ADqAMB4AQBoAYj&amp;sigh=WVIgymJcYUs</Impression>' +
'              <Creatives>' +
'                <Creative sequence="1">' +
'                  <Linear>' +
'                    <Duration>00:00:29.9666666+00:00</Duration>' +
'                    <TrackingEvents>' +
'                      <Tracking event="firstQuartile" offset="8">http://trackingurl.demo.url.com/start/starbuckstwo</Tracking>' +
'                    </TrackingEvents>' +
'                    <VideoClicks>' +
'                      <ClickThrough id="GDFP">http://dpl02.qa.unicornapp.com/aclk?sa=L&amp;ai=C3BzIpOykUcDUIa-TlALB1oCQD4q398cFAAAQASCygYwpUOLclaj9_____wFgyf7LhsSjyBfIAQXgAgCoAwGqBGBP0Kef4Qby85ZTXHNbD8mjvdVa3G_znm0oBgGNcKd6R07ihxI1rlhwGEY-0lV_Gd7necjqc8fv4lERiLuOOJbKBEvv9YSvLtvK5Qe6NiUc_pQ1LQtxVVH6CQXL_CzPnUPgBAGgBiM&amp;num=0&amp;sig=AOD64_3PUz1wjU3IqPR8qrDaaA9iWE0WuQ&amp;client=ca-pub-0775588607848145&amp;adurl=http://ad.doubleclick.net/clk%3B270116543%3B96083136%3Be%3Bpc%3D%5BTPAS_ID%5D</ClickThrough>' +
'                    </VideoClicks>' +
'                    <MediaFiles />' +
'                  </Linear>' +
'                </Creative>' +
'              </Creatives>' +
'              <Extensions>' +
'                <Extension type="geo">' +
'                  <Bandwidth>4</Bandwidth>' +
'                </Extension>' +
'                <Extension type="pod" sequence="" />' +
'              </Extensions>' +
'            </InLine>' +
'          </Ad>' +
'        </VAST>' +
'      </vmap:VASTData>' +
'    </vmap:AdSource>' +
'  </vmap:AdBreak>' +
'  <vmap:AdBreak breakType="linear" breakId="MidRoll_60_0" timeOffset="00:01:00.0000">' +
'    <vmap:AdSource allowMultipleAds="true" followRedirects="true" id="4">' +
'      <vmap:VASTData>' +
'        <VAST xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">' +
'          <Ad id="exxon">' +
'            <InLine>' +
'              <AdSystem>FreeWheel</AdSystem>' +
'              <AdTitle>Unknown</AdTitle>' +
'              <Impression id="FWi_1085022.0">http://dpl02.qa.unicornapp.com/freewheel_final/l/1?s=b151&amp;n=168234&amp;t=1343325920105958003&amp;adid=1085022&amp;reid=609199&amp;arid=0&amp;auid=&amp;cn=defaultImpression&amp;et=i&amp;_cc=1085022,609199,13120.,13120.,1343325920,1&amp;tpos=0&amp;iw=&amp;uxnw=&amp;uxss=&amp;uxct=&amp;metr=121&amp;init=1&amp;cr=</Impression>' +
'              <Impression>http://dpl02.qa.unicornapp.com/freewheel/wrapper2/impression/2912a.v.fwmrm.net/ad/l/1?s=b060&amp;t=1339713806542489130&amp;adid=1123397&amp;reid=629832&amp;arid=0&amp;auid=&amp;cn=defaultImpression&amp;et=i&amp;_cc=1123397,629832,,13120.,1339713806,1&amp;tpos=0&amp;iw=&amp;uxnw=&amp;uxss=&amp;uxct=&amp;metr=121&amp;init=1&amp;cr=</Impression>' +
'              <Impression>http://dpl02.qa.unicornapp.com/freewheel/wrapper1/impression/2912a.v.fwmrm.net/ad/l/1?s=b060&amp;t=1339713806542489130&amp;adid=1123397&amp;reid=629832&amp;arid=0&amp;auid=&amp;cn=defaultImpression&amp;et=i&amp;_cc=1123397,629832,,13120.,1339713806,1&amp;tpos=0&amp;iw=&amp;uxnw=&amp;uxss=&amp;uxct=&amp;metr=121&amp;init=1&amp;cr=</Impression>' +
'              <Creatives>' +
'                <Creative AdID="1123397">' +
'                  <Linear>' +
'                    <Duration>00:00:32.0000000+00:00</Duration>' +
'                    <TrackingEvents>' +
'                      <Tracking event="firstQuartile" offset="8">http://trackingurl.demo.url.com/start/starbuckstwo</Tracking>' +
'                    </TrackingEvents>' +
'                    <AdParameters />' +
'                    <VideoClicks>' +
'                      <ClickThrough />' +
'                      <ClickTracking id="FWc_1085022.0">http://dpl02.qa.unicornapp.com/freewheel_final/l/1?s=b151&amp;n=168234&amp;t=1343325920105958003&amp;adid=1085022&amp;reid=609199&amp;arid=0&amp;auid=&amp;cn=defaultClick&amp;et=c&amp;_cc=&amp;tpos=0&amp;cr=</ClickTracking>' +
'                      <ClickTracking id="FWc_1123397.0">http://2912a.v.fwmrm.net/ad/l/1?s=b060&amp;t=1339713806542489130&amp;adid=1123397&amp;reid=629832&amp;arid=0&amp;auid=&amp;cn=defaultClick&amp;et=c&amp;_cc=&amp;tpos=0&amp;cr=</ClickTracking>' +
'                      <ClickTracking id="FWc_1123397.0">http://2912a.v.fwmrm.net/ad/l/1?s=b060&amp;t=1339713806542489130&amp;adid=1123397&amp;reid=629832&amp;arid=0&amp;auid=&amp;cn=defaultClick&amp;et=c&amp;_cc=&amp;tpos=0&amp;cr=</ClickTracking>' +
'                    </VideoClicks>' +
'                    <MediaFiles />' +
'                  </Linear>' +
'                </Creative>' +
'              </Creatives>' +
'              <Extensions>' +
'                <Extension>' +
'                  <ad ownerId="789" adId="adId" />' +
'                </Extension>' +
'              </Extensions>' +
'            </InLine>' +
'          </Ad>' +
'        </VAST>' +
'      </vmap:VASTData>' +
'    </vmap:AdSource>' +
'  </vmap:AdBreak>' +
'  <vmap:AdBreak breakType="linear" breakId="MidRoll_60_1" timeOffset="00:01:00.0000">' +
'    <vmap:AdSource allowMultipleAds="true" followRedirects="true" id="5">' +
'      <vmap:VASTData>' +
'        <VAST xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">' +
'          <Ad id="nike-adcache-ctadaptive">' +
'            <InLine>' +
'              <AdSystem>Rhythm NewMedia</AdSystem>' +
'              <AdTitle>zSDKTest_Antoine_video_socialnetwork</AdTitle>' +
'              <Description>Rhythm NewMedia</Description>' +
'              <Impression id="Rhythm NewMedia">http://dpl02.qa.unicornapp.com/rhythm_final/impression/ads.rnmd.net/adAck?requestId=20891189551339710916281449&amp;id=1707914&amp;personCookie=208.91.189.55.39d02856-c094-46fa-b84e-cd17c70e77b6&amp;appId=66&amp;completed=100</Impression>' +
'              <Creatives>' +
'                <Creative sequence="1">' +
'                  <Linear>' +
'                    <Duration>00:00:30.0000000+00:00</Duration>' +
'                    <TrackingEvents>' +
'                      <Tracking event="firstQuartile" offset="8">http://trackingurl.demo.url.com/start/starbuckstwo</Tracking>' +
'                    </TrackingEvents>' +
'                    <VideoClicks>' +
'                      <ClickThrough>http://dpl02.qa.unicornapp.com/rhythm/_final/dp/B0034G4P7Q/?tag=sonypicturese-20</ClickThrough>' +
'                      <ClickTracking id="Rhythm NewMedia">http://ads.rnmd.net/adClicked?requestId=20891189551339710916281449&amp;action=10&amp;id=1707914&amp;personCookie=208.91.189.55.39d02856-c094-46fa-b84e-cd17c70e77b6</ClickTracking>' +
'                    </VideoClicks>' +
'                    <MediaFiles />' +
'                  </Linear>' +
'                </Creative>' +
'              </Creatives>' +
'              <Extensions>' +
'                <Extension>' +
'                  <overlay videoFade="0.4">' +
'                    <ad-element type="info">' +
'                      <bounds x="440" y="280" height="30" width="30" />' +
'                      <animation entry="slideup" exit="slidedown" />' +
'                      <action info="1" type="page" />' +
'                      <pages>' +
'                        <page num="0" />' +
'                      </pages>' +
'                    </ad-element>' +
'                    <ad-element type="close">' +
'                      <bounds x="10" y="10" height="30" width="30" />' +
'                      <animation entry="slidedown" exit="slideup" />' +
'                      <action info="0" type="page" />' +
'                      <pages>' +
'                        <page num="1" />' +
'                      </pages>' +
'                    </ad-element>' +
'                    <ad-element type="url">' +
'                      <bounds x="205" y="251" height="59" width="69" />' +
'                      <animation entry="slideup" exit="slidedown" />' +
'                      <action info="http://www.amazon.com/dp/B0034G4P7Q/?tag=sonypicturese-20" type="url" />' +
'                      <pages>' +
'                        <page num="1" />' +
'                      </pages>' +
'                    </ad-element>' +
'                  </overlay>' +
'                  <contentId>-1</contentId>' +
'                </Extension>' +
'              </Extensions>' +
'            </InLine>' +
'          </Ad>' +
'        </VAST>' +
'      </vmap:VASTData>' +
'    </vmap:AdSource>' +
'  </vmap:AdBreak>' +
'  <vmap:AdBreak breakType="linear" breakId="MidRoll_120_0" timeOffset="00:01:59.9666">' +
'    <vmap:AdSource allowMultipleAds="true" followRedirects="true" id="6">' +
'      <vmap:VASTData>' +
'        <VAST xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">' +
'          <Ad id="exxon">' +
'            <InLine>' +
'              <AdSystem>FreeWheel</AdSystem>' +
'              <AdTitle>Unknown</AdTitle>' +
'              <Impression id="FWi_1085022.0">http://dpl02.qa.unicornapp.com/freewheel_final/l/1?s=b151&amp;n=168234&amp;t=1343325920105958003&amp;adid=1085022&amp;reid=609199&amp;arid=0&amp;auid=&amp;cn=defaultImpression&amp;et=i&amp;_cc=1085022,609199,13120.,13120.,1343325920,1&amp;tpos=0&amp;iw=&amp;uxnw=&amp;uxss=&amp;uxct=&amp;metr=121&amp;init=1&amp;cr=</Impression>' +
'              <Impression>http://dpl02.qa.unicornapp.com/freewheel/wrapper2/impression/2912a.v.fwmrm.net/ad/l/1?s=b060&amp;t=1339713806542489130&amp;adid=1123397&amp;reid=629832&amp;arid=0&amp;auid=&amp;cn=defaultImpression&amp;et=i&amp;_cc=1123397,629832,,13120.,1339713806,1&amp;tpos=0&amp;iw=&amp;uxnw=&amp;uxss=&amp;uxct=&amp;metr=121&amp;init=1&amp;cr=</Impression>' +
'              <Impression>http://dpl02.qa.unicornapp.com/freewheel/wrapper1/impression/2912a.v.fwmrm.net/ad/l/1?s=b060&amp;t=1339713806542489130&amp;adid=1123397&amp;reid=629832&amp;arid=0&amp;auid=&amp;cn=defaultImpression&amp;et=i&amp;_cc=1123397,629832,,13120.,1339713806,1&amp;tpos=0&amp;iw=&amp;uxnw=&amp;uxss=&amp;uxct=&amp;metr=121&amp;init=1&amp;cr=</Impression>' +
'              <Creatives>' +
'                <Creative AdID="1123397">' +
'                  <Linear>' +
'                    <Duration>00:00:32.0000000+00:00</Duration>' +
'                    <TrackingEvents>' +
'                      <Tracking event="firstQuartile" offset="8">http://trackingurl.demo.url.com/start/starbuckstwo</Tracking>' +
'                    </TrackingEvents>' +
'                    <AdParameters />' +
'                    <VideoClicks>' +
'                      <ClickThrough />' +
'                      <ClickTracking id="FWc_1085022.0">http://dpl02.qa.unicornapp.com/freewheel_final/l/1?s=b151&amp;n=168234&amp;t=1343325920105958003&amp;adid=1085022&amp;reid=609199&amp;arid=0&amp;auid=&amp;cn=defaultClick&amp;et=c&amp;_cc=&amp;tpos=0&amp;cr=</ClickTracking>' +
'                      <ClickTracking id="FWc_1123397.0">http://2912a.v.fwmrm.net/ad/l/1?s=b060&amp;t=1339713806542489130&amp;adid=1123397&amp;reid=629832&amp;arid=0&amp;auid=&amp;cn=defaultClick&amp;et=c&amp;_cc=&amp;tpos=0&amp;cr=</ClickTracking>' +
'                      <ClickTracking id="FWc_1123397.0">http://2912a.v.fwmrm.net/ad/l/1?s=b060&amp;t=1339713806542489130&amp;adid=1123397&amp;reid=629832&amp;arid=0&amp;auid=&amp;cn=defaultClick&amp;et=c&amp;_cc=&amp;tpos=0&amp;cr=</ClickTracking>' +
'                    </VideoClicks>' +
'                    <MediaFiles />' +
'                  </Linear>' +
'                </Creative>' +
'              </Creatives>' +
'              <Extensions>' +
'                <Extension>' +
'                  <ad ownerId="789" adId="adId" />' +
'                </Extension>' +
'              </Extensions>' +
'            </InLine>' +
'          </Ad>' +
'        </VAST>' +
'      </vmap:VASTData>' +
'    </vmap:AdSource>' +
'  </vmap:AdBreak>' +
'  <vmap:AdBreak breakType="linear" breakId="PostRoll_123_0" timeOffset="end">' +
'    <vmap:AdSource allowMultipleAds="true" followRedirects="true" id="7">' +
'      <vmap:VASTData>' +
'        <VAST xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">' +
'          <Ad id="7082">' +
'            <InLine>' +
'              <AdSystem>YuMe</AdSystem>' +
'              <AdTitle>loreal video w companion banner</AdTitle>' +
'              <Description />' +
'              <Impression>http://dpl02.qa.unicornapp.com/impression/shadow01.yumenetworks.com/dynamic_watchedchapter_1_3240_0_0.gif?tracker=0rO0ABXchAAAAAQAAAAACS10_AQAADKgAABuqAAABzhpRgQwba_DR&amp;sessionId=0A20011601388696577839594772FB31</Impression>' +
'              <Creatives>' +
'                <Creative AdID="6015">' +
'                  <Linear>' +
'                    <Duration>00:00:30.0333333+00:00</Duration>' +
'                    <TrackingEvents>' +
'                      <Tracking event="firstQuartile" offset="8">http://trackingurl.demo.url.com/start/starbuckstwo</Tracking>' +
'                    </TrackingEvents>' +
'                    <VideoClicks>' +
'                      <ClickThrough>http://dpl02.qa.unicornapp.com/clickthrough/shadow01.yumenetworks.com/dynamic_moreinfo.html?ref=http%3A%2F%2Fwww.loreal.com&amp;placement_id=3240&amp;ctype=3&amp;sessionId=0A20011601388696577839594772FB31&amp;tracker=0rO0ABXchAAAAAQAAAAACS10_AQAADKgAABuqAAABzhpRgQwba_DR</ClickThrough>' +
'                      <ClickTracking />' +
'                    </VideoClicks>' +
'                    <MediaFiles />' +
'                  </Linear>' +
'                </Creative>' +
'              </Creatives>' +
'            </InLine>' +
'          </Ad>' +
'        </VAST>' +
'      </vmap:VASTData>' +
'    </vmap:AdSource>' +
'  </vmap:AdBreak>' +
'  <vmap:AdBreak breakType="linear" breakId="PostRoll_123_1" timeOffset="end">' +
'    <vmap:AdSource allowMultipleAds="true" followRedirects="true" id="8">' +
'      <vmap:VASTData>' +
'        <VAST xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">' +
'          <Ad id="AdCacheTest1">' +
'            <InLine>' +
'              <AdSystem>GDFP</AdSystem>' +
'              <AdTitle>AdCacheTest1</AdTitle>' +
'              <Description>video ad</Description>' +
'              <Error>http://dpl02.qa.unicornapp.com/pagead/conversion/?ai=B83pQXwY-UYSZKIumlASQo4GQBeSc9csDAAAAEAEgvNGUGjgAUJmh_dD9_____wFY7IKG9VNgyf7LhsSjyBe6AQozMDB4NjBfeG1syAEF2gEFaHR0cDqYAtyIAcACAuACAOoCDS84MDI2L0NBTi9jYnP4AoLSHpADrAKYA-ADqAMB4AQBoAYj&amp;sigh=CzadGCN7Zd0&amp;label=videoplayfailed</Error>' +
'              <Impression>http://dpl02.qa.unicornapp.com/4/impression1/pagead/adview?ai=BDegMXwY-UfzcJ4umlASQo4GQBYylj80DAAAAEAEgvNGUGjgAWJzIjsBSYMn-y4bEo8gXugEKMzAweDYwX3htbMgBBdoBBWh0dHA6wAIC4AIA6gINLzgwMjYvQ0FOL2Nic_gCgtIekAOsApgD4AOoAwHQBJBO4AQBoAYk&amp;sigh=_KKCCFB_JLQ</Impression>' +
'              <Creatives>' +
'                <Creative sequence="1">' +
'                  <Linear>' +
'                    <Duration>00:00:30.0333333+00:00</Duration>' +
'                    <TrackingEvents>' +
'                      <Tracking event="firstQuartile" offset="8">http://trackingurl.demo.url.com/start/starbuckstwo</Tracking>' +
'                    </TrackingEvents>' +
'                    <VideoClicks>' +
'                      <ClickThrough id="GDFP">http://dpl02.qa.unicornapp.com/aclk?sa=L&amp;ai=B83pQXwY-UYSZKIumlASQo4GQBeSc9csDAAAAEAEgvNGUGjgAUJmh_dD9_____wFY7IKG9VNgyf7LhsSjyBe6AQozMDB4NjBfeG1syAEF2gEFaHR0cDqYAtyIAcACAuACAOoCDS84MDI2L0NBTi9jYnP4AoLSHpADrAKYA-ADqAMB4AQBoAYj&amp;num=0&amp;sig=AOD64_3dDdIAleCkKEmgQw9oUPzaMUjDtA&amp;client=ca-pub-6059349485773808&amp;adurl=http://www.gamespot.com/contests/unicorn-apocalypse/</ClickThrough>' +
'                    </VideoClicks>' +
'                    <MediaFiles />' +
'                  </Linear>' +
'                </Creative>' +
'              </Creatives>' +
'              <Extensions>' +
'                <Extension type="geo">' +
'                  <Bandwidth>4</Bandwidth>' +
'                </Extension>' +
'                <Extension type="waterfall" fallback_index="4" />' +
'              </Extensions>' +
'            </InLine>' +
'          </Ad>' +
'        </VAST>' +
'      </vmap:VASTData>' +
'    </vmap:AdSource>' +
'  </vmap:AdBreak>' +
'</vmap:VMAP>';

validNoAdsVMAP = '<vmap:VMAP xmlns:uo="uo" xmlns:vmap="http://www.iab.net/vmap-1.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" version="1.0">' +
'  <vmap:Extensions>' +
'    <uo:unicornOnce ttl="600" contenturi="http://api202-qa.unicornmedia.com/now/adaptive/m3u8/96c78eda-0f69-4904-a312-74178d053a73/c08044c5-d687-413c-a6cb-0fa6a27e77b3/432e97b1-77a3-4f89-ae1d-1838f36da071/content.m3u8?oasid=c0d0d299-1bb4-4593-a2eb-67166a7964e3" contentlength="123.133" payloadlength="123.133" contextid="c0d0d299-1bb4-4593-a2eb-67166a7964e3"/>' +
'    <uo:contentImpressions>' +
'      <uo:Impression url="http://dpl02.qa.unicornapp.com/ad/l/1?s=b130&amp;n=82124%3B193465&amp;t=1363289293102005010&amp;metr=7&amp;ct=0&amp;et=i&amp;cn=firstQuartile" time="0" />' +
'      <uo:Impression url="http://dpl02.qa.unicornapp.com/ad/l/1?s=b130&amp;n=82124%3B193465&amp;t=1363289293102005010&amp;metr=7&amp;ct=0&amp;et=i&amp;cn=midPoint" time="0" />' +
'      <uo:Impression url="http://dpl02.qa.unicornapp.com/ad/l/1?s=b130&amp;n=82124%3B193465&amp;t=1363289293102005010&amp;metr=7&amp;ct=0&amp;et=i&amp;cn=thirdQuartile" time="0" />' +
'      <uo:Impression url="http://dpl02.qa.unicornapp.com/ad/l/1?s=b130&amp;n=82124%3B193465&amp;t=1363289293102005010&amp;metr=7&amp;ct=0&amp;et=i&amp;cn=complete" time="0" />' +
'    </uo:contentImpressions>' +
'    <uo:requestParameters/>' +
'  </vmap:Extensions>' +
'</vmap:VMAP>';

validSkipOffsetVMAP = '<vmap:VMAP version="1.0" xmlns:uo="uo" xmlns:vmap="http://www.iab.net/vmap-1.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">' +
' <vmap:Extensions>' +
'   <uo:unicornOnce contentlength="123.133" contenturi="http://api202-qa.unicornmedia.com/now/stitched/mp4/96c78eda-0f69-4904-a312-74178d053a73/6e1a0239-596c-4e9b-b697-ab390ff3c364/3a41c6e4-93a3-4108-8995-64ffca7b9106/f556a122-2e69-467e-aef2-fe97c7ed215b/content.mp4?oasid=78270dd9-a241-4517-b3d6-d68b813e597e" contextid="78270dd9-a241-4517-b3d6-d68b813e597e" payloadlength="153.163" ttl="600"/>' +
'   <uo:contentImpressions/>' +
'   <uo:requestParameters/>' +
' </vmap:Extensions>' +
' <vmap:AdBreak breakId="PreRoll_0_0" breakType="linear" timeOffset="start">' +
'   <vmap:AdSource allowMultipleAds="true" followRedirects="true" id="0">' +
'     <vmap:VASTData>' +
'       <VAST xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">' +
'         <Ad id="192892689">' +
'           <InLine>' +
'             <AdSystem>GDFP</AdSystem>' +
'             <AdTitle>Delta__Hiking_15</AdTitle>' +
'             <Description>Delta_Hiking_15</Description>' +
'             <Error>http://199.30.108.171/pagead/conversion/?ai=Bn1b2HMX3U-XhL5CglAT5q4HgCrG6oN4FAAAAEAEgkam6HzgAUJCDpMz' +
'             </Error>' +
'             <Impression>http://199.30.108.171/pagead/adview?ai=Bn1b2HMX3U-XhL5CglAT5q4HgCrG6oN4FAAAAEAEgkam6HzgAUJCDpMz' +
'             </Impression>' +
'             <Creatives>' +
'               <Creative id="54545246529" sequence="1">' +
'                 <Linear skipoffset="00:00:05">' +
'                   <Duration>00:00:15.0150000+00:00</Duration>' +
'                   <TrackingEvents>' +
'                     <Tracking event="start" offset="0">http://199.30.108.171/start/pagead/conversion/?ai=Bn1b2HMX3U-XhL5CglAT5q4HgCrG6oN4FAAAAEAEgkam6HzgAUJCDpMz' +
'                     </Tracking>' +
'                     <Tracking event="firstQuartile" offset="3">http://199.30.108.171/firstQuartile/pagead/conversion/?ai=Bn1b2HMX3U-XhL5CglAT5q4HgCrG6oN4FAAAAEAEgkam6HzgAUJCDpMz' +
'                     </Tracking>' +
'                     <Tracking event="midpoint" offset="7">http://199.30.108.171/midpoint/pagead/conversion/?ai=Bn1b2HMX3U-XhL5CglAT5q4HgCrG6oN4FAAAAEAEgkam6HzgAUJCDpMz' +
'                     </Tracking>' +
'                     <Tracking event="thirdQuartile" offset="11">http://199.30.108.171/thirdQuartile/pagead/conversion/?ai=Bn1b2HMX3U-XhL5CglAT5q4HgCrG6oN4FAAAAEAEgkam6HzgAUJCDpMz' +
'                     </Tracking>' +
'                     <Tracking event="complete" offset="15">http://199.30.108.171/complete/pagead/conversion/?ai=Bn1b2HMX3U-XhL5CglAT5q4HgCrG6oN4FAAAAEAEgkam6HzgAUJCDpMz0' +
'                     </Tracking>' +
'                     <Tracking event="skip">http://199.30.108.171/skip/pagead/conversion/?ai=Bn1b2HMX3U-XhL5CglAT5q4HgCrG6oN4FAAAAEAEgkam6HzgAUJCDpMz0' +
'                     </Tracking>' +
'                     <Tracking event="mute">http://199.30.108.171/mute/pagead/conversion/?ai=Bn1b2HMX3U-XhL5CglAT5q4HgCrG6oN4FAAAAEAEgkam6HzgAUJCDpMz' +
'                     </Tracking>' +
'                     <Tracking event="unmute">http://199.30.108.171/unmute/pagead/conversion/?ai=Bn1b2HMX3U-XhL5CglAT5q4HgCrG6oN4FAAAAEAEgkam6HzgAUJCDpMz' +
'                     </Tracking>' +
'                     <Tracking event="rewind">http://199.30.108.171/rewind/pagead/conversion/?ai=Bn1b2HMX3U-XhL5CglAT5q4HgCrG6oN4FAAAAEAEgkam6HzgAUJCDpMz' +
'                     </Tracking>' +
'                     <Tracking event="pause">http://199.30.108.171/pause/pagead/conversion/?ai=Bn1b2HMX3U-XhL5CglAT5q4HgCrG6oN4FAAAAEAEgkam6HzgAUJCDpMz' +
'                     </Tracking>' +
'                     <Tracking event="resume">http://199.30.108.171/resume/pagead/conversion/?ai=Bn1b2HMX3U-XhL5CglAT5q4HgCrG6oN4FAAAAEAEgkam6HzgAUJCDpMz' +
'                     </Tracking>' +
'                     <Tracking event="fullscreen">http://199.30.108.171/fullscreen/pagead/conversion/?ai=Bn1b2HMX3U-XhL5CglAT5q4HgCrG6oN4FAAAAEAEgkam6HzgAUJCDpMz' +
'                     </Tracking>' +
'                     <Tracking event="creativeView">http://199.30.108.171/creativeView/pagead/conversion/?ai=Bn1b2HMX3U-XhL5CglAT5q4HgCrG6oN4FAAAAEAEgkam6HzgAUJCDpMz' +
'                     </Tracking>' +
'                     <Tracking event="acceptInvitation">http://199.30.108.171/acceptInvitation/pagead/conversion/?ai=Bn1b2HMX3U-XhL5CglAT5q4HgCrG6oN4FAAAAEAEgkam6HzgAUJCDpMzn' +
'                     </Tracking>' +
'                   </TrackingEvents>' +
'                   <VideoClicks>' +
'                     <ClickThrough id="GDFP">http://www.brightcove.com</ClickThrough>' +
'                     <ClickTracking id="GDFP">http://199.30.108.171/ClickTracking/Tracking/V3/Instream/Impression/?vct-2060-164113-282000-19642-93137-' +
'                     </ClickTracking>' +
'                   </VideoClicks>' +
'                   <MediaFiles/>' +
'                 </Linear>' +
'               </Creative>' +
'               <Creative id="54545246769" sequence="1">' +
'                 <CompanionAds>' +
'                   <Companion height="60" id="54545246769" width="300">' +
'                     <StaticResource creativeType="image/jpeg">http://umrss.com/qa/ibc_demo/delta_hiking_15.jpg</StaticResource>' +
'                     <TrackingEvents>' +
'                       <Tracking event="creativeView">http://199.30.108.171/creativeView/pagead/adview?ai=BLU60HMX3U_afMZCglAT5q4HgCrG6oN4FAAAAEAEgkam6HzgAUPa' +
'                       </Tracking>' +
'                     </TrackingEvents>' +
'                     <CompanionClickThrough>http://www.brightcove.com</CompanionClickThrough>' +
'                   </Companion>' +
'                 </CompanionAds>' +
'               </Creative>' +
'             </Creatives>' +
'             <Extensions>' +
'               <Extension type="activeview">' +
'                 <CustomTracking>' +
'                   <Tracking event="viewable_impression"><![CDATA[' +
'                 http://199.30.108.171/pagead/conversion/?ai=Bn1b2HMX3U-XhL5CglAT5q4HgCrG6oN4FAAAAEAEgkam6HzgAUJCDpMz' +
'                 ]]></Tracking>' +
'                 </CustomTracking>' +
'               </Extension>' +
'               <Extension type="geo">' +
'                 <Bandwidth>4</Bandwidth>' +
'               </Extension>' +
'               <Extension fallback_index="0" type="waterfall"/>' +
'             </Extensions>' +
'           </InLine>' +
'         </Ad>' +
'       </VAST>' +
'     </vmap:VASTData>' +
'   </vmap:AdSource>' +
' </vmap:AdBreak>' +
' <vmap:AdBreak breakId="PostRoll_123_0" breakType="linear" timeOffset="end">' +
'   <vmap:AdSource allowMultipleAds="true" followRedirects="true" id="1">' +
'     <vmap:VASTData>' +
'       <VAST xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">' +
'         <Ad id="192892689">' +
'           <InLine>' +
'             <AdSystem>GDFP</AdSystem>' +
'             <AdTitle>Delta__Hiking_15</AdTitle>' +
'             <Description>Delta_Hiking_15</Description>' +
'             <Error>http://199.30.108.171/pagead/conversion/?ai=Bn1b2HMX3U-XhL5CglAT5q4HgCrG6oN4FAAAAEAEgkam6HzgAUJCDpMz' +
'             </Error>' +
'             <Impression>http://199.30.108.171/pagead/adview?ai=Bn1b2HMX3U-XhL5CglAT5q4HgCrG6oN4FAAAAEAEgkam6HzgAUJCDpMz' +
'             </Impression>' +
'             <Creatives>' +
'               <Creative id="54545246529" sequence="1">' +
'                 <Linear skipoffset="33%">' +
'                   <Duration>00:00:15.0150000+00:00</Duration>' +
'                   <TrackingEvents>' +
'                     <Tracking event="start" offset="0">http://199.30.108.171/start/pagead/conversion/?ai=Bn1b2HMX3U-XhL5CglAT5q4HgCrG6oN4FAAAAEAEgkam6HzgAUJCDpMz' +
'                     </Tracking>' +
'                     <Tracking event="firstQuartile" offset="3">http://199.30.108.171/firstQuartile/pagead/conversion/?ai=Bn1b2HMX3U-XhL5CglAT5q4HgCrG6oN4FAAAAEAEgkam6HzgAUJCDpMz' +
'                     </Tracking>' +
'                     <Tracking event="midpoint" offset="7">http://199.30.108.171/midpoint/pagead/conversion/?ai=Bn1b2HMX3U-XhL5CglAT5q4HgCrG6oN4FAAAAEAEgkam6HzgAUJCDpMz' +
'                     </Tracking>' +
'                     <Tracking event="thirdQuartile" offset="11">http://199.30.108.171/thirdQuartile/pagead/conversion/?ai=Bn1b2HMX3U-XhL5CglAT5q4HgCrG6oN4FAAAAEAEgkam6HzgAUJCDpMz' +
'                     </Tracking>' +
'                     <Tracking event="complete" offset="15">http://199.30.108.171/complete/pagead/conversion/?ai=Bn1b2HMX3U-XhL5CglAT5q4HgCrG6oN4FAAAAEAEgkam6HzgAUJCDpMz0' +
'                     </Tracking>' +
'                     <Tracking event="skip">http://199.30.108.171/skip/pagead/conversion/?ai=Bn1b2HMX3U-XhL5CglAT5q4HgCrG6oN4FAAAAEAEgkam6HzgAUJCDpMz0' +
'                     </Tracking>' +
'                     <Tracking event="mute">http://199.30.108.171/mute/pagead/conversion/?ai=Bn1b2HMX3U-XhL5CglAT5q4HgCrG6oN4FAAAAEAEgkam6HzgAUJCDpMz' +
'                     </Tracking>' +
'                     <Tracking event="unmute">http://199.30.108.171/unmute/pagead/conversion/?ai=Bn1b2HMX3U-XhL5CglAT5q4HgCrG6oN4FAAAAEAEgkam6HzgAUJCDpMz' +
'                     </Tracking>' +
'                     <Tracking event="rewind">http://199.30.108.171/rewind/pagead/conversion/?ai=Bn1b2HMX3U-XhL5CglAT5q4HgCrG6oN4FAAAAEAEgkam6HzgAUJCDpMz' +
'                     </Tracking>' +
'                     <Tracking event="pause">http://199.30.108.171/pause/pagead/conversion/?ai=Bn1b2HMX3U-XhL5CglAT5q4HgCrG6oN4FAAAAEAEgkam6HzgAUJCDpMz' +
'                     </Tracking>' +
'                     <Tracking event="resume">http://199.30.108.171/resume/pagead/conversion/?ai=Bn1b2HMX3U-XhL5CglAT5q4HgCrG6oN4FAAAAEAEgkam6HzgAUJCDpMz' +
'                     </Tracking>' +
'                     <Tracking event="fullscreen">http://199.30.108.171/fullscreen/pagead/conversion/?ai=Bn1b2HMX3U-XhL5CglAT5q4HgCrG6oN4FAAAAEAEgkam6HzgAUJCDpMz' +
'                     </Tracking>' +
'                     <Tracking event="creativeView">http://199.30.108.171/creativeView/pagead/conversion/?ai=Bn1b2HMX3U-XhL5CglAT5q4HgCrG6oN4FAAAAEAEgkam6HzgAUJCDpMz' +
'                     </Tracking>' +
'                     <Tracking event="acceptInvitation">http://199.30.108.171/acceptInvitation/pagead/conversion/?ai=Bn1b2HMX3U-XhL5CglAT5q4HgCrG6oN4FAAAAEAEgkam6HzgAUJCDpMzn' +
'                     </Tracking>' +
'                   </TrackingEvents>' +
'                   <VideoClicks>' +
'                     <ClickThrough id="GDFP">http://www.brightcove.com</ClickThrough>' +
'                     <ClickTracking id="GDFP">http://199.30.108.171/ClickTracking/Tracking/V3/Instream/Impression/?vct-2060-164113-282000-19642-93137-' +
'                     </ClickTracking>' +
'                   </VideoClicks>' +
'                   <MediaFiles/>' +
'                 </Linear>' +
'               </Creative>' +
'               <Creative id="54545246769" sequence="1">' +
'                 <CompanionAds>' +
'                   <Companion height="60" id="54545246769" width="300">' +
'                     <StaticResource creativeType="image/jpeg">http://umrss.com/qa/ibc_demo/delta_hiking_15.jpg</StaticResource>' +
'                     <TrackingEvents>' +
'                       <Tracking event="creativeView">http://199.30.108.171/creativeView/pagead/adview?ai=BLU60HMX3U_afMZCglAT5q4HgCrG6oN4FAAAAEAEgkam6HzgAUPa' +
'                       </Tracking>' +
'                     </TrackingEvents>' +
'                     <CompanionClickThrough>http://www.brightcove.com</CompanionClickThrough>' +
'                   </Companion>' +
'                 </CompanionAds>' +
'               </Creative>' +
'             </Creatives>' +
'             <Extensions>' +
'               <Extension type="activeview">' +
'                 <CustomTracking>' +
'                   <Tracking event="viewable_impression"><![CDATA[' +
'                 http://199.30.108.171/pagead/conversion/?ai=Bn1b2HMX3U-XhL5CglAT5q4HgCrG6oN4FAAAAEAEgkam6HzgAUJCDpMz' +
'                 ]]></Tracking>' +
'                 </CustomTracking>' +
'               </Extension>' +
'               <Extension type="geo">' +
'                 <Bandwidth>4</Bandwidth>' +
'               </Extension>' +
'               <Extension fallback_index="0" type="waterfall"/>' +
'             </Extensions>' +
'           </InLine>' +
'         </Ad>' +
'       </VAST>' +
'     </vmap:VASTData>' +
'   </vmap:AdSource>' +
' </vmap:AdBreak>' +
'</vmap:VMAP>';


validPreRollJson = {
  'breakType':'linear',
  'absoluteBeginTime': 0,
  'absoluteEndTime': 30.0666666,
  'breakId':'PreRoll_0_0',
  'timeOffset':'start',
  'AdSource': {
    'id':'0',
    'VASTData': {
      'VAST': {
        'Ad': {
          'id':'UmStarbucks',
          'Inline': {
            'Impression':'http://impressionurl1.demo.url.com/impression/starbuckstwo',
            'Creatives': {
              'Creative': [
                {
                  'Linear': {
                    'Duration':'00:00:30.0666666+00:00',
                    'TrackingEvents': {
                  'Tracking': [
                      {
                        'event': 'start',
                            'offset': '0',
                            'url': 'http://trackingurl.demo.url.com/start/starbuckstwo'
                      },
                      {
                        'event': 'firstQuartile',
                            'offset': '7',
                            'url': 'http://trackingurl.demo.url.com/firstQuartile/starbuckstwo'
                      },
                      {
                        'event': 'midpoint',
                            'offset': '15',
                            'url': 'http://trackingurl.demo.url.com/midpoint/starbuckstwo'
                    },
                    {
                        'event': 'thirdQuartile',
                            'offset': '22',
                            'url': 'http://trackingurl.demo.url.com/thirdQuartile/starbuckstwo'
                    },
                    {
                        'event': 'complete',
                            'offset': '30',
                            'url': 'http://trackingurl.demo.url.com/complete/starbuckstwo'
                    }
                  ]
                    },
                    'VideoClicks': {
                      'ClickThrough': {
                        'id': 'abc',
                        'url': 'http://www.starbucks.com/static/images/global/logo.png'
                      },
                      'ClickTracking': {
                        'id': '',
                        'url': 'http://www.clicktracking.com/test?click'
                      }
                    }
                  },
                  "CompanionAds": {
                    "Companion": {
                      "CompanionClickThrough": "http://www.starbucks.com/static/images/global/logo.png",
                      "TrackingEvents": {
                        "Tracking": [
                          {
                            "event": "creativeView",
                            "url": "http://companiontrack.demo.url.com/companion/starbuckstwo"
                          }
                        ]
                      },
                      "StaticResource": {
                        "creativeType": "image/jpeg",
                        "url": "http://demo.umedia.com/jes/ads/starbuckstwo300.jpg"
                      },
                      "height": "250",
                      "id": "54061052904921234300x250",
                      "width": "300"
                    }
                  }
                }
              ]
            }
          }
        }
      }
    }
  }
};

validMidRollJson = {
  'breakType':'linear',
  'absoluteBeginTime': 60.066666600000005,
  'absoluteEndTime': 90.13333320000001,
  'breakId':'MidRoll_30_0',
  'timeOffset':'00:00:30.000',
  'AdSource': {
    'id':'1',
    'VASTData': {
      'VAST': {
        'Ad': {
          'id':'UmStarbucks',
          'Inline': {
            'Impression':'http://impressionurl1.demo.url.com/impression/starbuckstwo',
            'Creatives': {
              'Creative': [{
                'Linear': {
                  'Duration':'00:00:30.0666666+00:00',
                  'TrackingEvents': {
                  'Tracking': [
                      {
                        'event': 'start',
                            'offset': '0',
                            'url': 'http://trackingurl.demo.url.com/start/starbuckstwo'
                      },
                      {
                        'event': 'firstQuartile',
                            'offset': '7',
                            'url': 'http://trackingurl.demo.url.com/firstQuartile/starbuckstwo'
                      },
                      {
                        'event': 'midpoint',
                            'offset': '15',
                            'url': 'http://trackingurl.demo.url.com/midpoint/starbuckstwo'
                    },
                    {
                        'event': 'thirdQuartile',
                            'offset': '22',
                            'url': 'http://trackingurl.demo.url.com/thirdQuartile/starbuckstwo'
                    },
                    {
                        'event': 'complete',
                            'offset': '30',
                            'url': 'http://trackingurl.demo.url.com/complete/starbuckstwo'
                    }
                  ]
                   },
                  'VideoClicks': {
                    'ClickTracking': {
                      'id': '',
                      'url': 'http://www.clicktracking.com/test?click'
                    }
                  }
                },
                "CompanionAds": {
                  "Companion": {
                    "CompanionClickThrough": "http://www.starbucks.com/static/images/global/logo.png",
                    "TrackingEvents": {
                      "Tracking": [
                        {
                          "event": "creativeView",
                          "url": "http://companiontrack.demo.url.com/companion/starbuckstwo"
                        }
                      ]
                    },
                    "StaticResource": {
                      "creativeType": "image/jpeg",
                      "url": "http://demo.umedia.com/jes/ads/starbuckstwo300.jpg"
                    },
                    "height": "250",
                    "id": "54061052904921234300x250",
                    "width": "300"
                  }
                }
              }
            ]}
          }
        }
      }
    }
  }
};

validPostRollJson = {
  'breakType':'linear',
  'absoluteBeginTime': 166.0003332,
  'absoluteEndTime': 196.0669998,
  'breakId':'PostRoll_105_0',
  'timeOffset':'end',
  'AdSource': {
    'id':'2',
    'VASTData': {
      'VAST': {
        'Ad': {
          'id':'UmStarbucks',
          'Inline': {
            'Impression':'http://impressionurl1.demo.url.com/impression/starbuckstwo',
            'Creatives': {
              'Creative': [{
                'Linear': {
                  'Duration':'00:00:30.0666666+00:00',
                  'TrackingEvents': {
                  'Tracking': [
                      {
                        'event': 'start',
                            'offset': '0',
                            'url': 'http://trackingurl.demo.url.com/start/starbuckstwo'
                      },
                      {
                        'event': 'firstQuartile',
                            'offset': '7',
                            'url': 'http://trackingurl.demo.url.com/firstQuartile/starbuckstwo'
                      },
                      {
                        'event': 'midpoint',
                            'offset': '15',
                            'url': 'http://trackingurl.demo.url.com/midpoint/starbuckstwo'
                    },
                    {
                        'event': 'thirdQuartile',
                            'offset': '22',
                            'url': 'http://trackingurl.demo.url.com/thirdQuartile/starbuckstwo'
                    },
                    {
                        'event': 'complete',
                            'offset': '30',
                            'url': 'http://trackingurl.demo.url.com/complete/starbuckstwo'
                    }
                  ]
                   },
                  'VideoClicks': {
                    'ClickThrough': {
                      'id': 'abc',
                      'url': 'http://www.starbucks.com/static/images/global/logo.png'
                    },
                    'ClickTracking': {
                      'id': '',
                      'url': 'http://www.clicktracking.com/test?click'
                    }
                  }
                },
                "CompanionAds": {
                  "Companion": {
                    "CompanionClickThrough": "http://www.starbucks.com/static/images/global/logo.png",
                    "TrackingEvents": {
                      "Tracking": [
                        {
                          "event": "creativeView",
                          "url": "http://companiontrack.demo.url.com/companion/starbuckstwo"
                        }
                      ]
                    },
                    "StaticResource": {
                      "creativeType": "image/jpeg",
                      "url": "http://demo.umedia.com/jes/ads/starbuckstwo300.jpg"
                    },
                    "height": "250",
                    "id": "54061052904921234300x250",
                    "width": "300"
                  }
                }
              }
            ]}
          }
        }
      }
    }
  }
};

validVMAPJson = {
  "Extensions":{
    "once":{
      "ttl":"600",
      "contenturi":"http://api212-phx.unicornmedia.com/now/stitched/mp4/95ea75e1-dd2a-4aea-851a-28f46f8e8195/43f54cc0-aa6b-4b2c-b4de-63d707167bf9/3a41c6e4-93a3-4108-8995-64ffca7b9106/9b118b95-38df-4b99-bb50-8f53d62f6ef8/content.mp4?oasid=5708ae58-ef88-4954-b5bb-0d1815d65132&umtp=0",
      "contentlength":"105.867",
      "payloadlength":"196.067",
      "contextid":"1177d1c9-09a5-4337-a56a-d2ecdf783607"
    },
    "contentImpressions":{

    },
    "requestParameters":{

    }
  },
  "adBreaks":[
    {
      "breakType":"linear",
      "breakId":"PreRoll_0_0",
      "timeOffset":"start",
      "AdSource":{
        "allowMultipleAds":"true",
        "followRedirects":"true",
        "id":"0",
        "VASTData":{
          "VAST":{
            "Ad":{
              "id":"UmStarbucks",
              "Inline":{
                "AdSystem":"UnicornInternal",
                "AdTitle":"videoadvertisement",
                "Description":"video ad",
                "Impression":"http://impressionurl1.demo.url.com/impression/starbuckstwo",
                "Creatives":{
                  "Creative":[
                    {
                      "Linear":{
                        "Duration":"00:00:30.0666666+00:00",
                        "TrackingEvents":{
                          "Tracking":[
                            {
                              "event":"start",
                              "offset":"0",
                              "text":"http://trackingurl.demo.url.com/start/starbuckstwo"
                            },
                            {
                              "event":"firstQuartile",
                              "offset":"7",
                              "text":"http://trackingurl.demo.url.com/firstQuartile/starbuckstwo"
                            },
                            {
                              "event":"midpoint",
                              "offset":"15",
                              "text":"http://trackingurl.demo.url.com/midpoint/starbuckstwo"
                            },
                            {
                              "event":"thirdQuartile",
                              "offset":"22",
                              "text":"http://trackingurl.demo.url.com/thirdQuartile/starbuckstwo"
                            },
                            {
                              "event":"complete",
                              "offset":"30",
                              "text":"http://trackingurl.demo.url.com/complete/starbuckstwo"
                            }
                          ]
                        },
                        "VideoClicks":{
                          "ClickThrough":{
                            "id":"abc",
                            "text":"http://www.starbucks.com/static/images/global/logo.png"
                          },
                          "ClickTracking":{
                            "id":"",
                            "text":"http://www.clicktracking.com/test?click"
                          }
                        },
                        "MediaFiles":{

                        }
                      },
                      "CompanionAds":{
                        "Companion":{
                          "id":"54061052904921234300x250",
                          "width":"300",
                          "height":"250",
                          "StaticResource":{
                            "creativeType":"image/jpeg",
                            "text":"http://demo.umedia.com/jes/ads/starbuckstwo300.jpg"
                          },
                          "TrackingEvents":{
                            "Tracking":{
                              "event":"creativeView",
                              "text":"http://companiontrack.demo.url.com/companion/starbuckstwo"
                            }
                          },
                          "CompanionClickThrough":"http://www.starbucks.com/static/images/global/logo.png"
                        }
                      }
                    }
                  ]
                }
              }
            }
          }
        }
      }
    },
    {
      "breakType":"linear",
      "breakId":"MidRoll_30_0",
      "timeOffset":"00:00:30.000",
      "AdSource":{
        "allowMultipleAds":"true",
        "followRedirects":"true",
        "id":"1",
        "VASTData":{
          "VAST":{
            "Ad":{
              "id":"UmStarbucks",
              "Inline":{
                "AdSystem":"UnicornInternal",
                "AdTitle":"videoadvertisement",
                "Description":"video ad",
                "Impression":"http://impressionurl1.demo.url.com/impression/starbuckstwo",
                "Creatives":{
                  "Creative":[
                    {
                      "Linear":{
                        "Duration":"00:00:30.0666666+00:00",
                        "TrackingEvents":{
                          "Tracking":[
                            {
                              "event":"start",
                              "offset":"0",
                              "text":"http://trackingurl.demo.url.com/start/starbuckstwo"
                            },
                            {
                              "event":"firstQuartile",
                              "offset":"7",
                              "text":"http://trackingurl.demo.url.com/firstQuartile/starbuckstwo"
                            },
                            {
                              "event":"midpoint",
                              "offset":"15",
                              "text":"http://trackingurl.demo.url.com/midpoint/starbuckstwo"
                            },
                            {
                              "event":"thirdQuartile",
                              "offset":"22",
                              "text":"http://trackingurl.demo.url.com/thirdQuartile/starbuckstwo"
                            },
                            {
                              "event":"complete",
                              "offset":"30",
                              "text":"http://trackingurl.demo.url.com/complete/starbuckstwo"
                            }
                          ]
                        },
                        "VideoClicks":{
                          "ClickTracking":{
                            "id":"",
                            "text":"http://www.clicktracking.com/test?click"
                          }
                        },
                        "MediaFiles":{

                        }
                      },
                      "CompanionAds":{
                        "Companion":{
                          "id":"54061052904921234300x250",
                          "width":"300",
                          "height":"250",
                          "StaticResource":{
                            "creativeType":"image/jpeg",
                            "text":"http://demo.umedia.com/jes/ads/starbuckstwo300.jpg"
                          },
                          "TrackingEvents":{
                            "Tracking":{
                              "event":"creativeView",
                              "text":"http://companiontrack.demo.url.com/companion/starbuckstwo"
                            }
                          },
                          "CompanionClickThrough":"http://www.starbucks.com/static/images/global/logo.png"
                        }
                      }
                    }
                  ]
                }
              }
            }
          }
        }
      }
    },
    {
      "breakType":"linear",
      "breakId":"PostRoll_105_0",
      "timeOffset":"end",
      "AdSource":{
        "allowMultipleAds":"true",
        "followRedirects":"true",
        "id":"2",
        "VASTData":{
          "VAST":{
            "Ad":{
              "id":"UmStarbucks",
              "Inline":{
                "AdSystem":"UnicornInternal",
                "AdTitle":"videoadvertisement",
                "Description":"video ad",
                "Impression":"http://impressionurl1.demo.url.com/impression/starbuckstwo",
                "Creatives":{
                  "Creative":[
                    {
                      "Linear":{
                        "Duration":"00:00:30.0666666+00:00",
                        "TrackingEvents":{
                          "Tracking":[
                            {
                              "event":"start",
                              "offset":"0",
                              "text":"http://trackingurl.demo.url.com/start/starbuckstwo"
                            },
                            {
                              "event":"firstQuartile",
                              "offset":"7",
                              "text":"http://trackingurl.demo.url.com/firstQuartile/starbuckstwo"
                            },
                            {
                              "event":"midpoint",
                              "offset":"15",
                              "text":"http://trackingurl.demo.url.com/midpoint/starbuckstwo"
                            },
                            {
                              "event":"thirdQuartile",
                              "offset":"22",
                              "text":"http://trackingurl.demo.url.com/thirdQuartile/starbuckstwo"
                            },
                            {
                              "event":"complete",
                              "offset":"30",
                              "text":"http://trackingurl.demo.url.com/complete/starbuckstwo"
                            }
                          ]
                        },
                        "VideoClicks":{
                          "ClickThrough":{
                            "id":"abc",
                            "text":"http://www.starbucks.com/static/images/global/logo.png"
                          },
                          "ClickTracking":{
                            "id":"",
                            "text":"http://www.clicktracking.com/test?click"
                          }
                        },
                        "MediaFiles":{

                        }
                      },
                      "CompanionAds":{
                        "Companion":{
                          "id":"54061052904921234300x250",
                          "width":"300",
                          "height":"250",
                          "StaticResource":{
                            "creativeType":"image/jpeg",
                            "text":"http://demo.umedia.com/jes/ads/starbuckstwo300.jpg"
                          },
                          "TrackingEvents":{
                            "Tracking":{
                              "event":"creativeView",
                              "text":"http://companiontrack.demo.url.com/companion/starbuckstwo"
                            }
                          },
                          "CompanionClickThrough":"http://www.starbucks.com/static/images/global/logo.png"
                        }
                      }
                    }
                  ]
                }
              }
            }
          }
        }
      }
    }
  ]
};


validAdRollVMAPJson = {
  "Extensions":{
    "once":{
      "contenturi":"http://onceapi0-qa.unicornmedia.com/now/stitched/mp4/96c78eda-0f69-4904-a312-74178d053a73/eb4a3afd-db21-4ea3-b9e3-642376bc27e5/3a41c6e4-93a3-4108-8995-64ffca7b9106/f556a122-2e69-467e-aef2-fe97c7ed215b/content.mp4?oasid=267b6d33-3ac2-4acf-ae1e-f65d0ddfd2eb",
      "contentlength":"123.1333",
      "payloadlength":"401.3333"
    }
  },
  "adRolls":[
    {
      "linearAds":[
        {
          "breakType":"linear",
          "breakId":"PreRoll_0_0",
          "timeOffset":"start",
          "AdSource":{
            "id":"0",
            "VASTData":{
              "VAST":{
                "Ad":{
                  "id":"exxon",
                  "Inline":{
                    "Impression":"http://dpl02.qa.unicornapp.com/freewheel_final/l/1?s=b151&n=168234&t=1343325920105958003&adid=1085022&reid=609199&arid=0&auid=&cn=defaultImpression&et=i&_cc=1085022,609199,13120.,13120.,1343325920,1&tpos=0&iw=&uxnw=&uxss=&uxct=&metr=121&init=1&cr=",
                    "Creatives":{
                      "Creative":[
                        {
                          "Linear":{
                            "Duration":"00:00:32.0000000+00:00",
                            "TrackingEvents":{
                               "Tracking":[
                                  {
                                     "event":"firstQuartile",
                                     "offset":"8",
                                     "url":"http://trackingurl.demo.url.com/start/starbuckstwo"
                                  }
                               ]
                            },
                            "VideoClicks":{
                              "ClickThrough":{
                                "url":""
                              },
                              "ClickTracking":{
                                "id":"FWc_1085022.0",
                                "url":"http://dpl02.qa.unicornapp.com/freewheel_final/l/1?s=b151&n=168234&t=1343325920105958003&adid=1085022&reid=609199&arid=0&auid=&cn=defaultClick&et=c&_cc=&tpos=0&cr="
                              }
                            }
                          }
                        }
                      ]
                    }
                  }
                }
              }
            }
          }
        },
        {
          "breakType":"linear",
          "breakId":"PreRoll_0_1",
          "timeOffset":"start",
          "AdSource":{
            "id":"1",
            "VASTData":{
              "VAST":{
                "Ad":{
                  "id":"exxon",
                  "Inline":{
                    "Impression":"http://dpl02.qa.unicornapp.com/freewheel_final/l/1?s=b151&n=168234&t=1343325920105958003&adid=1085022&reid=609199&arid=0&auid=&cn=defaultImpression&et=i&_cc=1085022,609199,13120.,13120.,1343325920,1&tpos=0&iw=&uxnw=&uxss=&uxct=&metr=121&init=1&cr=",
                    "Creatives":{
                      "Creative":[
                        {
                          "Linear":{
                            "Duration":"00:00:32.0000000+00:00",
                            "TrackingEvents":{
                               "Tracking":[
                                  {
                                     "event":"firstQuartile",
                                     "offset":"8",
                                     "url":"http://trackingurl.demo.url.com/start/starbuckstwo"
                                  }
                               ]
                            },
                            "VideoClicks":{
                              "ClickThrough":{
                                "url":""
                              },
                              "ClickTracking":{
                                "id":"FWc_1085022.0",
                                "url":"http://dpl02.qa.unicornapp.com/freewheel_final/l/1?s=b151&n=168234&t=1343325920105958003&adid=1085022&reid=609199&arid=0&auid=&cn=defaultClick&et=c&_cc=&tpos=0&cr="
                              }
                            }
                          }
                        }
                      ]
                    }
                  }
                }
              }
            }
          }
        },
        {
          "breakType":"linear",
          "breakId":"PreRoll_0_2",
          "timeOffset":"start",
          "AdSource":{
            "id":"2",
            "VASTData":{
              "VAST":{
                "Ad":{
                  "id":"95863418",
                  "Inline":{
                    "Impression":"http://dpl02.qa.unicornapp.com/podposition10/pagead/adview?ai=BrPD0pOykUb7UIa-TlALB1oCQD-LSkbAFAAAAEAEgsoGMKTgAUPTJuZP4_____wFYgsGVhn1gyf7LhsSjyBe6AQs0ODB4MzYwX3htbMgBBdoBBWh0dHA6mAKOqATAAgLgAgDqAiYvNDI2Ni9jd3R2LmZ1bGxzdHJlYW0vaGFydG9mZGl4aWVfeGJvePgCgtIekAOsApgD4AOoAwHgBAGgBiM&sigh=kmNW7UR3GOA",
                    "Creatives":{
                      "Creative":[
                        {
                          "Linear":{
                            "Duration":"00:00:30.1666666+00:00",
                            "TrackingEvents":{
                               "Tracking":[
                                  {
                                     "event":"firstQuartile",
                                     "offset":"8",
                                     "url":"http://trackingurl.demo.url.com/start/starbuckstwo"
                                  }
                               ]
                            },
                            "VideoClicks":{
                              "ClickThrough":{
                                "id":"GDFP",
                                "url":"http://dpl02.qa.unicornapp.com/aclk?sa=L&ai=CwzrApOykUb7UIa-TlALB1oCQD-LSkbAFAAAQASCygYwpUPTJuZP4_____wFgyf7LhsSjyBfIAQXgAgCoAwGqBF9P0Nuhil_cylk0R2jP7EjAbSv6emxw7Or1HSZD5Dp2MiTeTIU4qt1zy59U2RKFpmMD4Sq2gv2sAaMMKy_EujBPi4tBBQXlLI1fI7US_6Sa4xfNZB7GzvKsaXhTzweU0OAEAaAGIw&num=0&sig=AOD64_0VYP39qH0i65NKG3u51Skjo3LV1Q&client=ca-pub-0775588607848145&adurl=http://www.facebook.com/SchickHydroSilk"
                              }
                            }
                          }
                        }
                      ]
                    }
                  }
                }
              }
            }
          }
        },
        {
          "breakType":"linear",
          "breakId":"PreRoll_0_3",
          "timeOffset":"start",
          "AdSource":{
            "id":"3",
            "VASTData":{
              "VAST":{
                "Ad":{
                  "id":"12841124",
                  "Inline":{
                    "Impression":"http://dpl02.qa.unicornapp.com/podpositionempty/pagead/adview?ai=Bs-8RpOykUcDUIa-TlALB1oCQD4q398cFAAAAEAEgsoGMKTgAUOLclaj9_____wFYqrb8r4EBYMn-y4bEo8gXugELNDgweDM2MF94bWzIAQXaAQVodHRwOpgCqLsCwAIC4AIA6gImLzQyNjYvY3d0di5mdWxsc3RyZWFtL2hhcnRvZmRpeGllX3hib3j4AoLSHpADrAKYA-ADqAMB4AQBoAYj&sigh=WVIgymJcYUs",
                    "Creatives":{
                      "Creative":[
                        {
                          "Linear":{
                            "Duration":"00:00:29.9666666+00:00",
                            "TrackingEvents":{
                               "Tracking":[
                                  {
                                     "event":"firstQuartile",
                                     "offset":"8",
                                     "url":"http://trackingurl.demo.url.com/start/starbuckstwo"
                                  }
                               ]
                            },
                            "VideoClicks":{
                              "ClickThrough":{
                                "id":"GDFP",
                                "url":"http://dpl02.qa.unicornapp.com/aclk?sa=L&ai=C3BzIpOykUcDUIa-TlALB1oCQD4q398cFAAAQASCygYwpUOLclaj9_____wFgyf7LhsSjyBfIAQXgAgCoAwGqBGBP0Kef4Qby85ZTXHNbD8mjvdVa3G_znm0oBgGNcKd6R07ihxI1rlhwGEY-0lV_Gd7necjqc8fv4lERiLuOOJbKBEvv9YSvLtvK5Qe6NiUc_pQ1LQtxVVH6CQXL_CzPnUPgBAGgBiM&num=0&sig=AOD64_3PUz1wjU3IqPR8qrDaaA9iWE0WuQ&client=ca-pub-0775588607848145&adurl=http://ad.doubleclick.net/clk%3B270116543%3B96083136%3Be%3Bpc%3D%5BTPAS_ID%5D"
                              }
                            }
                          }
                        }
                      ]
                    }
                  }
                }
              }
            }
          }
        }
      ]
    },
    {
      "linearAds":[
        {
          "breakType":"linear",
          "breakId":"MidRoll_60_0",
          "timeOffset":"00:01:00.0000",
          "AdSource":{
            "id":"4",
            "VASTData":{
              "VAST":{
                "Ad":{
                  "id":"exxon",
                  "Inline":{
                    "Impression":"http://dpl02.qa.unicornapp.com/freewheel_final/l/1?s=b151&n=168234&t=1343325920105958003&adid=1085022&reid=609199&arid=0&auid=&cn=defaultImpression&et=i&_cc=1085022,609199,13120.,13120.,1343325920,1&tpos=0&iw=&uxnw=&uxss=&uxct=&metr=121&init=1&cr=",
                    "Creatives":{
                      "Creative":[
                        {
                          "Linear":{
                            "Duration":"00:00:32.0000000+00:00",
                            "TrackingEvents":{
                               "Tracking":[
                                  {
                                     "event":"firstQuartile",
                                     "offset":"8",
                                     "url":"http://trackingurl.demo.url.com/start/starbuckstwo"
                                  }
                               ]
                            },
                            "VideoClicks":{
                              "ClickThrough":{
                                "url":""
                              },
                              "ClickTracking":{
                                "id":"FWc_1085022.0",
                                "url":"http://dpl02.qa.unicornapp.com/freewheel_final/l/1?s=b151&n=168234&t=1343325920105958003&adid=1085022&reid=609199&arid=0&auid=&cn=defaultClick&et=c&_cc=&tpos=0&cr="
                              }
                            }
                          }
                        }
                      ]
                    }
                  }
                }
              }
            }
          }
        },
        {
          "breakType":"linear",
          "breakId":"MidRoll_60_1",
          "timeOffset":"00:01:00.0000",
          "AdSource":{
            "id":"5",
            "VASTData":{
              "VAST":{
                "Ad":{
                  "id":"nike-adcache-ctadaptive",
                  "Inline":{
                    "Impression":"http://dpl02.qa.unicornapp.com/rhythm_final/impression/ads.rnmd.net/adAck?requestId=20891189551339710916281449&id=1707914&personCookie=208.91.189.55.39d02856-c094-46fa-b84e-cd17c70e77b6&appId=66&completed=100",
                    "Creatives":{
                      "Creative":[
                        {
                          "Linear":{
                            "Duration":"00:00:30.0000000+00:00",
                            "TrackingEvents":{
                               "Tracking":[
                                  {
                                     "event":"firstQuartile",
                                     "offset":"8",
                                     "url":"http://trackingurl.demo.url.com/start/starbuckstwo"
                                  }
                               ]
                            },
                            "VideoClicks":{
                              "ClickThrough":{
                                "url":"http://dpl02.qa.unicornapp.com/rhythm/_final/dp/B0034G4P7Q/?tag=sonypicturese-20"
                              },
                              "ClickTracking":{
                                "id":"Rhythm NewMedia",
                                "url":"http://ads.rnmd.net/adClicked?requestId=20891189551339710916281449&action=10&id=1707914&personCookie=208.91.189.55.39d02856-c094-46fa-b84e-cd17c70e77b6"
                              }
                            }
                          }
                        }
                      ]
                    }
                  }
                }
              }
            }
          }
        }
      ]
    },
    {
      "linearAds":[
        {
          "breakType":"linear",
          "breakId":"MidRoll_120_0",
          "timeOffset":"00:01:59.9666",
          "AdSource":{
            "id":"6",
            "VASTData":{
              "VAST":{
                "Ad":{
                  "id":"exxon",
                  "Inline":{
                    "Impression":"http://dpl02.qa.unicornapp.com/freewheel_final/l/1?s=b151&n=168234&t=1343325920105958003&adid=1085022&reid=609199&arid=0&auid=&cn=defaultImpression&et=i&_cc=1085022,609199,13120.,13120.,1343325920,1&tpos=0&iw=&uxnw=&uxss=&uxct=&metr=121&init=1&cr=",
                    "Creatives":{
                      "Creative":[
                        {
                          "Linear":{
                            "Duration":"00:00:32.0000000+00:00",
                            "TrackingEvents":{
                               "Tracking":[
                                  {
                                     "event":"firstQuartile",
                                     "offset":"8",
                                     "url":"http://trackingurl.demo.url.com/start/starbuckstwo"
                                  }
                               ]
                            },
                            "VideoClicks":{
                              "ClickThrough":{
                                "url":""
                              },
                              "ClickTracking":{
                                "id":"FWc_1085022.0",
                                "url":"http://dpl02.qa.unicornapp.com/freewheel_final/l/1?s=b151&n=168234&t=1343325920105958003&adid=1085022&reid=609199&arid=0&auid=&cn=defaultClick&et=c&_cc=&tpos=0&cr="
                              }
                            }
                          }
                        }
                      ]
                    }
                  }
                }
              }
            }
          }
        }
      ]
    },
    {
      "linearAds":[
        {
          "breakType":"linear",
          "breakId":"PostRoll_123_0",
          "timeOffset":"end",
          "AdSource":{
            "id":"7",
            "VASTData":{
              "VAST":{
                "Ad":{
                  "id":"7082",
                  "Inline":{
                    "Impression":"http://dpl02.qa.unicornapp.com/impression/shadow01.yumenetworks.com/dynamic_watchedchapter_1_3240_0_0.gif?tracker=0rO0ABXchAAAAAQAAAAACS10_AQAADKgAABuqAAABzhpRgQwba_DR&sessionId=0A20011601388696577839594772FB31",
                    "Creatives":{
                      "Creative":[
                        {
                          "Linear":{
                            "Duration":"00:00:30.0333333+00:00",
                            "TrackingEvents":{
                               "Tracking":[
                                  {
                                     "event":"firstQuartile",
                                     "offset":"8",
                                     "url":"http://trackingurl.demo.url.com/start/starbuckstwo"
                                  }
                               ]
                            },
                            "VideoClicks":{
                              "ClickThrough":{
                                "url":"http://dpl02.qa.unicornapp.com/clickthrough/shadow01.yumenetworks.com/dynamic_moreinfo.html?ref=http%3A%2F%2Fwww.loreal.com&placement_id=3240&ctype=3&sessionId=0A20011601388696577839594772FB31&tracker=0rO0ABXchAAAAAQAAAAACS10_AQAADKgAABuqAAABzhpRgQwba_DR"
                              },
                              "ClickTracking":{
                                "url":""
                              }
                            }
                          }
                        }
                      ]
                    }
                  }
                }
              }
            }
          }
        },
        {
          "breakType":"linear",
          "breakId":"PostRoll_123_1",
          "timeOffset":"end",
          "AdSource":{
            "id":"8",
            "VASTData":{
              "VAST":{
                "Ad":{
                  "id":"AdCacheTest1",
                  "Inline":{
                    "Impression":"http://dpl02.qa.unicornapp.com/4/impression1/pagead/adview?ai=BDegMXwY-UfzcJ4umlASQo4GQBYylj80DAAAAEAEgvNGUGjgAWJzIjsBSYMn-y4bEo8gXugEKMzAweDYwX3htbMgBBdoBBWh0dHA6wAIC4AIA6gINLzgwMjYvQ0FOL2Nic_gCgtIekAOsApgD4AOoAwHQBJBO4AQBoAYk&sigh=_KKCCFB_JLQ",
                    "Creatives":{
                      "Creative":[
                        {
                          "Linear":{
                            "Duration":"00:00:30.0333333+00:00",
                            "TrackingEvents":{
                               "Tracking":[
                                  {
                                     "event":"firstQuartile",
                                     "offset":"8",
                                     "url":"http://trackingurl.demo.url.com/start/starbuckstwo"
                                  }
                               ]
                            },
                            "VideoClicks":{
                              "ClickThrough":{
                                "id":"GDFP",
                                "url":"http://dpl02.qa.unicornapp.com/aclk?sa=L&ai=B83pQXwY-UYSZKIumlASQo4GQBeSc9csDAAAAEAEgvNGUGjgAUJmh_dD9_____wFY7IKG9VNgyf7LhsSjyBe6AQozMDB4NjBfeG1syAEF2gEFaHR0cDqYAtyIAcACAuACAOoCDS84MDI2L0NBTi9jYnP4AoLSHpADrAKYA-ADqAMB4AQBoAYj&num=0&sig=AOD64_3dDdIAleCkKEmgQw9oUPzaMUjDtA&client=ca-pub-6059349485773808&adurl=http://www.gamespot.com/contests/unicorn-apocalypse/"
                              }
                            }
                          }
                        }
                      ]
                    }
                  }
                }
              }
            }
          }
        }
      ]
    }
  ]
};

invalidVMAPJson = {
  "Extensions":{
    "once":{
      "ttl":"600",
      "contentlength":"105.867",
      "payloadlength":"196.067",
      "contextid":"1177d1c9-09a5-4337-a56a-d2ecdf783607"
    },
    "contentImpressions":{

    },
    "requestParameters":{

    }
  }
};

invalidVMAP = '<vmap:VMAP version="1.0" xmlns:uo="uo" xmlns:vmap="http://www.iab.net/vmap-1.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">' +
'  <vmap:Extensions>' +
'    <uo:unicornOnce contentlength="105.867" contenturi="http://api14-phx.unicornmedia.com/now/stitched/mp4/95ea75e1-dd2a-4aea-851a-28f46f8e8195/43f54cc0-aa6b-4b2c-b4de-63d707167bf9/3a41c6e4-93a3-4108-8995-64ffca7b9106/9b118b95-38df-4b99-bb50-8f53d62f6ef8/content.mp4?oasid=8d3b56e6-639e-4777-9194-cf82fb386c1e%26umtp=0" contextid="8d3b56e6-639e-4777-9194-cf82fb386c1e" payloadlength="196.067" ttl="600"/>' +
'    <uo:contentImpressions/>' +
'    <uo:requestParameters/>' +
'  </vmap:Extensions>' +
'  <vmap:AdBreak breakId="PreRoll_0_0" breakType="linear" timeOffset="start">' +
'    <vmap:AdSource allowMultipleAds="true" followRedirects="true" id="0">' +
'      <vmap:VASTData>' +
'        <VAST xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">' +
'          <Ad id="UmStarbucks">' +
'            <InLine>' +
'              <AdSystem>UnicornInternal</AdSystem>' +
'              <AdTitle>videoadvertisement</AdTitle>' +
'              <Description>video ad</Description>' +
'              <Impression>http://impressionurl1.demo.url.com/impression/starbuckstwo</Impression>' +
'              <Creatives>' +
'                <Creative>' +
'                  <Linear>' +
'                    <Duration></Duration>' +
'                    <TrackingEvents>' +
'                      <Tracking event="start" offset="0">http://trackingurl.demo.url.com/start/starbuckstwo</Tracking>' +
'                      <Tracking event="firstQuartile" offset="7">http://trackingurl.demo.url.com/firstQuartile/starbuckstwo</Tracking>' +
'                      <Tracking event="midpoint" offset="15">http://trackingurl.demo.url.com/midpoint/starbuckstwo</Tracking>' +
'                      <Tracking event="thirdQuartile" offset="22">http://trackingurl.demo.url.com/thirdQuartile/starbuckstwo</Tracking>' +
'                      <Tracking event="complete" offset="30">http://trackingurl.demo.url.com/complete/starbuckstwo</Tracking>' +
'                    </TrackingEvents>' +
'                    <VideoClicks>' +
'                      <ClickThrough id="abc">http://www.starbucks.com/static/images/global/logo.png</ClickThrough>' +
'                      <ClickTracking id="">http://www.clicktracking.com/test?click</ClickTracking>' +
'                    </VideoClicks>' +
'                    <MediaFiles/>' +
'                  </Linear>' +
'                </Creative>' +
'                <Creative>' +
'                  <CompanionAds>' +
'                    <Companion height="250" id="54061052904921234300x250" width="300">' +
'                      <StaticResource creativeType="image/jpeg">http://demo.umedia.com/jes/ads/starbuckstwo300.jpg</StaticResource>' +
'                      <TrackingEvents>' +
'                        <Tracking event="creativeView">http://companiontrack.demo.url.com/companion/starbuckstwo</Tracking>' +
'                      </TrackingEvents>' +
'                      <CompanionClickThrough>http://www.starbucks.com/static/images/global/logo.png</CompanionClickThrough>' +
'                    </Companion>' +
'                  </CompanionAds>' +
'                </Creative>' +
'              </Creatives>' +
'            </InLine>' +
'          </Ad>' +
'        </VAST>' +
'      </vmap:VASTData>' +
'    </vmap:AdSource>' +
'  </vmap:AdBreak>' +
'  <vmap:AdBreak breakId="MidRoll_30_0" breakType="linear" timeOffset="00:00:30.000">' +
'    <vmap:AdSource allowMultipleAds="true" followRedirects="true" id="1">' +
'      <vmap:VASTData>' +
'        <VAST xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">' +
'          <Ad id="UmStarbucks">' +
'            <InLine>' +
'              <AdSystem>UnicornInternal</AdSystem>' +
'              <AdTitle>videoadvertisement</AdTitle>' +
'              <Description>video ad</Description>' +
'              <Impression>http://impressionurl1.demo.url.com/impression/starbuckstwo</Impression>' +
'              <Creatives>' +
'                <Creative>' +
'                  <Linear>' +
'                    <Duration>00:00:30.0666666+00:00</Duration>' +
'                    <TrackingEvents>' +
'                      <Tracking event="start" offset="0">http://trackingurl.demo.url.com/start/starbuckstwo</Tracking>' +
'                      <Tracking event="firstQuartile" offset="7">http://trackingurl.demo.url.com/firstQuartile/starbuckstwo</Tracking>' +
'                      <Tracking event="midpoint" offset="15">http://trackingurl.demo.url.com/midpoint/starbuckstwo</Tracking>' +
'                      <Tracking event="thirdQuartile" offset="22">http://trackingurl.demo.url.com/thirdQuartile/starbuckstwo</Tracking>' +
'                      <Tracking event="complete" offset="30">http://trackingurl.demo.url.com/complete/starbuckstwo</Tracking>' +
'                    </TrackingEvents>' +
'                    <VideoClicks>' +
'                      <ClickTracking id="">http://www.clicktracking.com/test?click</ClickTracking>' +
'                    </VideoClicks>' +
'                    <MediaFiles/>' +
'                  </Linear>' +
'                </Creative>' +
'                <Creative>' +
'                  <CompanionAds>' +
'                    <Companion height="250" id="54061052904921234300x250" width="300">' +
'                      <StaticResource creativeType="image/jpeg">http://demo.umedia.com/jes/ads/starbuckstwo300.jpg</StaticResource>' +
'                      <TrackingEvents>' +
'                        <Tracking event="creativeView">http://companiontrack.demo.url.com/companion/starbuckstwo</Tracking>' +
'                      </TrackingEvents>' +
'                      <CompanionClickThrough>http://www.starbucks.com/static/images/global/logo.png</CompanionClickThrough>' +
'                    </Companion>' +
'                  </CompanionAds>' +
'                </Creative>' +
'              </Creatives>' +
'            </InLine>' +
'          </Ad>' +
'        </VAST>' +
'      </vmap:VASTData>' +
'    </vmap:AdSource>' +
'  </vmap:AdBreak>' +
'  <vmap:AdBreak breakId="PostRoll_105_0" breakType="linear" timeOffset="end">' +
'    <vmap:AdSource allowMultipleAds="true" followRedirects="true" id="2">' +
'      <vmap:VASTData>' +
'        <VAST xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">' +
'          <Ad id="UmStarbucks">' +
'            <InLine>' +
'              <AdSystem>UnicornInternal</AdSystem>' +
'              <AdTitle>videoadvertisement</AdTitle>' +
'              <Description>video ad</Description>' +
'              <Impression>http://impressionurl1.demo.url.com/impression/starbuckstwo</Impression>' +
'              <Creatives>' +
'                <Creative>' +
'                  <Linear>' +
'                    <Duration>00:00:30.0666666+00:00</Duration>' +
'                    <TrackingEvents>' +
'                      <Tracking event="start" offset="0">http://trackingurl.demo.url.com/start/starbuckstwo</Tracking>' +
'                      <Tracking event="firstQuartile" offset="7">http://trackingurl.demo.url.com/firstQuartile/starbuckstwo</Tracking>' +
'                      <Tracking event="midpoint" offset="15">http://trackingurl.demo.url.com/midpoint/starbuckstwo</Tracking>' +
'                      <Tracking event="thirdQuartile" offset="22">http://trackingurl.demo.url.com/thirdQuartile/starbuckstwo</Tracking>' +
'                      <Tracking event="complete" offset="30">http://trackingurl.demo.url.com/complete/starbuckstwo</Tracking>' +
'                    </TrackingEvents>' +
'                    <VideoClicks>' +
'                      <ClickThrough id="abc">http://www.starbucks.com/static/images/global/logo.png</ClickThrough>' +
'                      <ClickTracking id="">http://www.clicktracking.com/test?click</ClickTracking>' +
'                    </VideoClicks>' +
'                    <MediaFiles/>' +
'                  </Linear>' +
'                </Creative>' +
'                <Creative>' +
'                  <CompanionAds>' +
'                    <Companion height="250" id="54061052904921234300x250" width="300">' +
'                      <StaticResource creativeType="image/jpeg">http://demo.umedia.com/jes/ads/starbuckstwo300.jpg</StaticResource>' +
'                      <TrackingEvents>' +
'                        <Tracking event="creativeView">http://companiontrack.demo.url.com/companion/starbuckstwo</Tracking>' +
'                      </TrackingEvents>' +
'                      <CompanionClickThrough>http://www.starbucks.com/static/images/global/logo.png</CompanionClickThrough>' +
'                    </Companion>' +
'                  </CompanionAds>' +
'                </Creative>' +
'              </Creatives>' +
'            </InLine>' +
'          </Ad>' +
'        </VAST>' +
'      </vmap:VASTData>' +
'    </vmap:AdSource>' +
'  </vmap:AdBreak>' +
'</vmap:VMAP>';

validMidRollVMAPJson = {
    "Extensions": {
        "once": {
            "contenturi": "http://api212-phx.unicornmedia.com/now/stitched/mp4/95ea75e1-dd2a-4aea-851a-28f46f8e8195/43f54cc0-aa6b-4b2c-b4de-63d707167bf9/3a41c6e4-93a3-4108-8995-64ffca7b9106/9b118b95-38df-4b99-bb50-8f53d62f6ef8/content.mp4?oasid=5708ae58-ef88-4954-b5bb-0d1815d65132&umtp=0",
            "contentlength": "105.867",
            "payloadlength": "196.157"
        }
    },
    "adBreaks": [
        {
            "breakType": "linear",
            "breakId": "MidRoll_30_0",
            "timeOffset": "00:00:30.000",
            "AdSource": {
                "id": "1",
                "VASTData": {
                    "VAST": {
                        "Ad": {
                            "id": "UmStarbucks",
                            "Inline": {
                                "Impression": "http://impressionurl1.demo.url.com/impression/starbuckstwo",
                                "Creatives": {
                                    "Creative": [
                                        {
                                            "Linear": {
                                                "Duration": "00:00:30.0967634+00:00",
                                                "VideoClicks": {
                                                    "ClickTracking": {
                                                        "id": "",
                                                        "url": "http://www.clicktracking.com/test?click"
                                                    }
                                                }
                                            }
                                        }
                                    ]
                                }
                            }
                        }
                    }
                }
            }
        },
        {
            "breakType": "linear",
            "breakId": "PostRoll_105_0",
            "timeOffset": "end",
            "AdSource": {
                "id": "2",
                "VASTData": {
                    "VAST": {
                        "Ad": {
                            "id": "UmStarbucks",
                            "Inline": {
                                "Impression": "http://impressionurl1.demo.url.com/impression/starbuckstwo",
                                "Creatives": {
                                    "Creative": [
                                        {
                                            "Linear": {
                                                "Duration": "00:00:30.0967634+00:00",
                                                "VideoClicks": {
                                                    "ClickThrough": {
                                                        "id": "abc",
                                                        "url": "http://www.starbucks.com/static/images/global/logo.png"
                                                    },
                                                    "ClickTracking": {
                                                        "id": "",
                                                        "url": "http://www.clicktracking.com/test?click"
                                                    }
                                                }
                                            }
                                        }
                                    ]
                                }
                            }
                        }
                    }
                }
            }
        }
    ]
};
