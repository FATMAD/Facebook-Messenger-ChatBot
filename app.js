/*
 * Copyright 2016-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

/* jshint node: true, devel: true */
//import config from './config/default.json'
//import { Client } from 'recastai'

const recastai = require('recastai');
//const client = new  recastai.request('6f87654653b231f79b97d9f07f09d7b1');
//const apiaiApp = require('apiai')('aed60680db3b42b4b4b52209b3a792ed');
const apiai = require("api.ai");

/*const nlp = new apiai({
  token: "aed60680db3b42b4b4b52209b3a792ed",
  session: "12345678"
});*/

var lat,lang,destination,formulairesenderid;
const download = require('image-downloader');
//var nodemailer = require('nodemailer');
//var resemble = require('node-resemble-js');
var async = require("async");
//var random = require5("node-random");
//var mysql = require("mysql");
//var moment = require('moment');
//var btoa = require('btoa');
//var schedule = require('node-schedule');

var fs = require('fs');
var os = require('os');
var path = require('path');



/*

var db_config = {
  host: "localhost",
  user: "root",
  password: "58490097",
  database: "gomycode",
  charset : 'utf8mb4_bin'
};
var con;

function handleDisconnect() {
  con = mysql.createConnection(db_config); // Recreate the connection, since
                                                  // the old one cannot be reused.

  con.connect(function(err) {              // The server is either down
    if(err) {                                     // or restarting (takes a while sometimes).
      console.log('error when connecting to db:', err);
      setTimeout(handleDisconnect, 2000); // We introduce a delay before attempting to reconnect,
    }                                     // to avoid a hot loop, and to allow our node script to
  });                                     // process asynchronous requests in the meantime.
                                          // If you're also serving http, display a 503 error.
  con.on('error', function(err) {
    console.log('db error', err);
    if(err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
      handleDisconnect();                         // lost due to either server restart, or a
    } else {                                      // connnection idle timeout (the wait_timeout
      throw err;                                  // server variable configures this)
    }
  });
}

handleDisconnect();



*/
var request = require("request");




  const 
  bodyParser = require('body-parser'),
  geolib = require('geolib'),
  

  //config = require('config'),
  crypto = require('crypto'),
  express = require('express'),
  https = require('https'); 
  var downloadfile = require('download-file');
  var multer  = require('multer');
  var upload = multer({ dest: 'uploads/' });
  // request = require('request');

  const config = {}

config.PAGE_ACCESS_TOKEN = 'EAAEvU69VqwEBAPYcNXcz6IrtQ2jWOZAx1EnO6aSfRyDaatpwzFZBCcJbEgk6o90Svq0WfleZCh9JZCGTVG9iPvatlFU3tuexBRgLXFJUDd4zQnKshlGPNAjEbGL9qY37Wv74WCZBO0JgtoQO8prnVY1bM9T0uMs8afjKlcsWQr9F7GZAjileNZC'
config.VALIDATION_TOKEN = 'try'
config.APP_SECRET = 'c54bab66bd1d5d2103adb914b7b6ceab'
config.SERVER_URL = 'https://a75433e1.ngrok.io'
//config.recastToken = '6f87654653b231f79b97d9f07f09d7b1'

config.language = 'fr'



var app = express();
app.set('port', process.env.PORT || 5005);
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(express.static('public'));


//server.use(express.static('public'));

/*
 * Be sure to setup your config values before running this code. You can 
 * set them using environment variables or modifying the config file in /config.
 *
 */

// App Secret can be retrieved from the App Dashboard
const APP_SECRET = config.APP_SECRET;

// Arbitrary value used to validate a webhook
const VALIDATION_TOKEN = config.VALIDATION_TOKEN;

// Generate a page access token for your page from the App Dashboard
const PAGE_ACCESS_TOKEN = config.PAGE_ACCESS_TOKEN;

// URL where the app is running (include protocol). Used to point to scripts and 
// assets located at this address. 
const SERVER_URL = "197.14.14.105:8000/publiczitouna";

if (!(APP_SECRET && VALIDATION_TOKEN && PAGE_ACCESS_TOKEN && SERVER_URL)) {
  console.error("Missing config values");
  process.exit(1);
}


/*
 * Use your own validation token. Check that the token used in the Webhook 
 * setup is the same token used here.
 *
 */


app.get('/webhook', function(req, res) {
  console.log("Validating webhook");
    res.status(200).send(req.query['hub.challenge']);
  if (req.query['hub.mode'] === 'subscribe' && req.query['hub.verify_token'] === VALIDATION_TOKEN) {
    console.log("Validating webhook");
    res.status(200).send(req.query['hub.challenge']);
  } else {
    console.error("Failed validation. Make sure the validation tokens match.");
    res.sendStatus(403);          
  }  
});
app.get('/webhook/feed', function(req, res) {
  console.log("Validating webhook");
    res.status(200).send(req.query['hub.challenge']);
  if (req.query['hub.mode'] === 'subscribe' && req.query['hub.verify_token'] === VALIDATION_TOKEN) {
    console.log("Validating webhook");
    res.status(200).send(req.query['hub.challenge']);
  } else {
    console.error("Failed validation. Make sure the validation tokens match.");
    res.sendStatus(403);          
  }  
});
/*
 * All callbacks for Messenger are POST-ed. They will be sent to the same
 * webhook. Be sure to subscribe your app to your page to receive callbacks
 * for your page. 
 * https://developers.facebook.com/docs/messenger-platform/product-overview/setup#subscribe_app
 *
 */
app.post('/webhook', function (req, res) {
  var data = req.body;
  // Make sure this is a page subscription
  if (data.object == 'page') {
    // Iterate over each entry
    data.entry.forEach(function(pageEntry) {
//Newsfeed changes webhook request
if(pageEntry.hasOwnProperty('changes')){
        pageEntry.changes.forEach(function(changes){
         // if(changes.field=="feed" && changes.value.item=="comment" && changes.value.verb=="add"){
          if((changes.field=="feed")&&(( changes.value.item =='reaction')||( changes.value.item =='comment'))){
            console.log(changes);

            //console.log(changes.value.recipient_id);
            console.log(changes.value.sender_name);
            var messageData = {
                message: "hello"
              };
              feedname=changes.value.sender_name;

          }
        });
}
//Messenger webhook request
      if(pageEntry.hasOwnProperty('messaging')){
        //messenger code goes here
            data.entry.forEach(function(pageEntry) {
      var pageID = pageEntry.id;
      var timeOfEvent = pageEntry.time;
      // Iterate over each messaging event
      pageEntry.messaging.forEach(function(messagingEvent) {
        if (messagingEvent.optin) {
          console.log("messagingEvent.optin")
          receivedAuthentication(messagingEvent);
        } else if (messagingEvent.message) {
          receivedMessage(messagingEvent);
        } else if (messagingEvent.delivery) {
          receivedDeliveryConfirmation(messagingEvent);
        } else if (messagingEvent.postback) {
          receivedPostback(messagingEvent);
        } else if (messagingEvent.read) {
          receivedMessageRead(messagingEvent);
        } else if (messagingEvent.account_linking) {
          receivedAccountLink(messagingEvent);
        } else {
          console.log("Webhook received unknown messagingEvent: ", messagingEvent);
        }
      });
});
}
});
// Assume all went well.
    //
    // You must send back a 200, within 20 seconds, to let us know you've 
    // successfully received the callback. Otherwise, the request will time out.
    res.sendStatus(200);
}
});

function callPrivateReply(messageData,comment_id) {
  request({
    uri: 'https://graph.facebook.com/v2.9/'+comment_id+'/private_replies',
    qs: { access_token: 'EAALJB1gyZAkYBABZCnAeHFecXHsE6P3t8x5nXxObKTM4pg5QHYZAAbZACmUMxS9rERqH6G8cprR8mIiZBjhwN4Go5qYdF2ZAdckDoy4BmZB6Bfyir2AXTR4B9bvqWphgAiq0qjZAazdZAn9bM2gFqYUATkUykWvSOyHGfXpz1tjlBhIVCFn6rZBKOP' },
    method: 'POST',
    json: messageData
}, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log(body);
    } else {
      console.error("Failed calling Send API", response.statusCode, response.statusMessage, body.error);
    }
  });  
}

/*
 * This path is used for account linking. The account linking call-to-action
 * (sendAccountLinking) is pointed to this URL. 
 * 
 */
app.get('/authorize', function(req, res) {
  var accountLinkingToken = req.query.account_linking_token;
  var redirectURI = req.query.redirect_uri;

  // Authorization Code should be generated per user by the developer. This will 
  // be passed to the Account Linking callback.
  var authCode = "1234567890";

  // Redirect users to this URI on successful login
  var redirectURISuccess = redirectURI + "&authorization_code=" + authCode;

  res.render('authorize', {
    accountLinkingToken: accountLinkingToken,
    redirectURI: redirectURI,
    redirectURISuccess: redirectURISuccess
  });
});

/*
 * Verify that the callback came from Facebook. Using the App Secret from 
 * the App Dashboard, we can verify the signature that is sent with each 
 * callback in the x-hub-signature field, located in the header.
 *
 * https://developers.facebook.com/docs/graph-api/webhooks#setup
 *
 */
function verifyRequestSignature(req, res, buf) {
  var signature = req.headers["x-hub-signature"];

  if (!signature) {
    // For testing, let's log an error. In production, you should throw an 
    // error.
    console.error("Couldn't validate the signature.");
  } else {
    var elements = signature.split('=');
    var method = elements[0];
    var signatureHash = elements[1];

    var expectedHash = crypto.createHmac('sha1', APP_SECRET)
                        .update(buf)
                        .digest('hex');

    if (signatureHash != expectedHash) {
      throw new Error("Couldn't validate the request signature.");
    }
  }
}
/*
 * Authorization Event
 *
 * The value for 'optin.ref' is defined in the entry point. For the "Send to 
 * Messenger" plugin, it is the 'data-ref' field. Read more at 
 * https://developers.facebook.com/docs/messenger-platform/webhook-reference/authentication
 *
 */
function receivedAuthentication(event) {

  var senderID = event.sender.id;
  var recipientID = event.recipient.id;
  var timeOfAuth = event.timestamp;

  // The 'ref' field is set in the 'Send to Messenger' plugin, in the 'data-ref'
  // The developer can set this to an arbitrary value to associate the 
  // authentication callback with the 'Send to Messenger' click event. This is
  // a way to do account linking when the user clicks the 'Send to Messenger' 
  // plugin.
  var passThroughParam = event.optin.ref;

  console.log("Received authentication for user %d and page %d with pass " +
    "through param '%s' at %d", senderID, recipientID, passThroughParam, 
    timeOfAuth);

  // When an authentication is received, we'll send a message back to the sender
  // to let them know it was successful.

  sendTextMessage(senderID, "Authentication successful");

}
/*
 * Message Event
 *
 * This event is called when a message is sent to your page. The 'message' 
 * object format can vary depending on the kind of message that was received.
 * Read more at https://developers.facebook.com/docs/messenger-platform/webhook-reference/message-received
 *
 * For this example, we're going to echo any text that we get. If we get some 
 * special keywords ('button', 'generic', 'receipt'), then we'll send back
 * examples of those bubbles to illustrate the special message bubbles we've 
 * created. If we receive a message with an attachment (image, video, audio), 
 * then we'll simply confirm that we've received the attachment.
 */
function receivedMessage(event) {
    var senderID = event.sender.id;
  var recipientID = event.recipient.id;
  var timeOfMessage = event.timestamp;
  var message = event.message;

  console.log("Received message for user %d and page %d at %d with message:", senderID, recipientID, timeOfMessage);

  console.log(JSON.stringify(message));

  var isEcho = message.is_echo;
  var messageId = message.mid;
  var appId = message.app_id;
  var metadata = message.metadata;

  // You may get a text or attachment but not both
  var messageText = message.text;
  var messageAttachments = message.attachments;
  var quickReply = message.quick_reply;

  console.log("\n------------event_log receivedPostback------------\n"+JSON.stringify(event)+"\n------------event_log receivedPostback fin------------\n")

//photocin1361801687270524='ok';
//date="2017-06-15";
//dossieruser1361801687270524={client: 'oui' ,agence: 'centreurbainnord' , jours: '2017-06-15' ,créneaux: '11:30' };
//datecr2017_06_15centreurbainnord = {nbcrlibre: 4 ,cr1: '8:30' ,cr2: '11:30',cr3: '14:30',cr4: '15:00'};

//datecr2017_06_15ariana = {nbcrlibre: 4 ,cr1: '8:30' ,cr2: '11:30',cr3: '14:30',cr4: '15:00'};

 // var azerty = JSON.parse(message.attachments);
 if(messageAttachments){

    console.log(message.attachments);
    //console.log(messageAttachments[0].payload.url);
    //console.log(message.attachments.payload.URL);
   if(messageAttachments[0].payload){
    options = {
  url: messageAttachments[0].payload.url,
  dest: 'C:/Users/user/Desktop/gomycode/download'        // Save to /path/to/dest/photo.jpg 
}
 
//download.image(options);
  if (messageAttachments[0].payload.coordinates) {

console.log("lat= "+messageAttachments[0].payload.coordinates.lat);
console.log("long= "+messageAttachments[0].payload.coordinates.long);
lat=messageAttachments[0].payload.coordinates.lat;
lang=messageAttachments[0].payload.coordinates.long;
//sendTextMessage(senderID,"votre lat est : "+lat);
  }

}

  else if (messageAttachments[0].type== "image")
        {       

 async.series([
    function(callback){
               console.log("+++++ url image : "+messageAttachments[0].payload.url);


                var url = messageAttachments[0].payload.url;
                 
                var options = {
                    directory: "C:/Users/user/Desktop/gomycode/download/",
                    filename: "image"+senderID+".jpeg"
                }
                 
                downloadfile(url, options, function(err){
                    if (err) throw err
                    console.log("\ndownload done :)\n")
                });

                setTimeout(function(){
                callback(null, 1);
            }, 3000);

      }


    ], function(error, results) {
      console.log(results);
    });

  }
else if (messageAttachments[0].type== "audio")
        {
        
console.log("\n\n audio received :)\n\n ")

 async.series([
    function(callback){
               console.log("+++++ url audio : "+messageAttachments[0].payload.url);


                var url = messageAttachments[0].payload.url;
                 
                var options = {
                    directory: "C:/Users/user/Desktop/gomycode/download/voice/",
                    filename: "speech"+senderID+".mp3"
                }
                 
                downloadfile(url, options, function(err){
                    if (err) throw err
                    console.log("\ndownload mp3 done :)")
                });

                setTimeout(function(){
                callback(null, 1);
            }, 3000);

      }
   

    ], function(error, results) {
      console.log(results);
    });

}
}


  /*else if (isEcho)
  {
    console.log("echo");
  }*/
  else if (quickReply) {
    var quickReplyPayload = quickReply.payload;

   if  (quickReplyPayload=='Programmespayload')
    {

      async.series([
        function(callback){

            sendTextMessage(senderID, "Tu es un passionné du numérique ? Un féru des nouvelles technologies ? \nTu rêves de créer ton propre jeu vidéo, app mobile ou site web ? \nTu veux devenir un développeur professionnel ?\nGo My Code vous propose une varietée de programmes adaptés à vos divers besoins.");


                    setTimeout(function(){
                    callback(null, 1);
                }, 1000);

          } ,
         
          function(callback){

          sendGenericMessagePrograms(senderID);

                     setTimeout(function(){
                     callback(null, 2);
                }, 1000);
          }

        ], function(error, results) {
          console.log(results);
        });
    }

  }

  else if (messageText) {

}
}
/*
 * Delivery Confirmation Event
 *
 * This event is sent to confirm the delivery of a message. Read more about 
 * these fields at https://developers.facebook.com/docs/messenger-platform/webhook-reference/message-delivered
 *
 
 */

function receivedDeliveryConfirmation(event) {
  var senderID = event.sender.id;
  var recipientID = event.recipient.id;
  var delivery = event.delivery;
  var messageIDs = delivery.mids;
  var watermark = delivery.watermark;
  var sequenceNumber = delivery.seq;

  if (messageIDs) {
    messageIDs.forEach(function(messageID) {
      console.log("Received delivery confirmation for message ID: %s", 
        messageIDs);

      console.log("message watermark ID: %s", 
        watermark);

      console.log("message sequenceNumber : %s", 
        sequenceNumber);
    });
  }

  console.log("All message before %d were delivered.", watermark);

}

/*
 * Postback Event
 *
 * This event is called when a postback is tapped on a Structured Message. 
 * https://developers.facebook.com/docs/messenger-platform/webhook-reference/postback-received
 * 
 */
function receivedPostback(event) {
  var senderID = event.sender.id;
  var recipientID = event.recipient.id;
  var timeOfPostback = event.timestamp;
  var payload = event.postback.payload;

  console.log("Received postback for user %d and page %d with payload '%s' " + 
    "at %d", senderID, recipientID, payload, timeOfPostback);

  console.log("\n------------event_log receivedPostback------------\n"+JSON.stringify(event)+"\n------------event_log receivedPostback fin------------\n")

/* demarrer*/
    if (payload == 'demarrer'){

                   async.series([
                  function(callback){

                  getuserprofile(senderID);

                              setTimeout(function(){
                              callback(null, 1);
                          }, 3000);

                    } ,
                    function(callback){
                     if (eval("profile"+senderID+".gender == 'male'"))
                  {
                  sendTextMessage(senderID, eval("usergreeting"+senderID)+" Mr "+eval("profile"+senderID+".first_name")+" ! :) ");
                  eval("profile"+senderID+".gender = 1 ;");
                  }

                  else if (eval("profile"+senderID+".gender == 'female'"))
                  {
                  sendTextMessage(senderID, eval("usergreeting"+senderID)+" Mme "+eval("profile"+senderID+".first_name")+" ! :) ");
                  eval("profile"+senderID+".gender = 2 ;");
                  }
                    else 
                  {
                  sendTextMessage(senderID, eval("usergreeting"+senderID)+" "+eval("profile"+senderID+".first_name")+" ! :) ");
                  eval("profile"+senderID+".gender = 0 ;");
                  }       
                              setTimeout(function(){
                              callback(null, 2);
                          }, 2000);

                    } ,
                  
                  function(callback){


                       sendQuickReplyprincipal(senderID)

                               setTimeout(function(){
                               callback(null, 4);
                          }, 2000);
                    }

                  ], function(error, results) {
                    console.log(results);
                  });
    }

/* Programmes*/
else if  (payload == 'ProgrammesPayload')
    {

      async.series([
        function(callback){

            sendTextMessage(senderID, "Go My Code vous propose une varietée de programmes adaptés à vos divers besoins.");


                    setTimeout(function(){
                    callback(null, 1);
                }, 1000);

          },
         
          function(callback){

          sendGenericMessagePrograms(senderID);

                     setTimeout(function(){
                     callback(null, 2);
                }, 1000);
          }


        ], function(error, results) {
          console.log(results);
        });
    }
    /*event */

else if  (payload == 'EventsPayload')
    {
      async.series([
        function(callback){

            sendTextMessage(senderID, "Nous Events sont :");

                    setTimeout(function(){
                    callback(null, 1);
                }, 1000);

          },
         
          function(callback){
          sendGenericMessageEvents(senderID);

                     setTimeout(function(){
                     callback(null, 2);
                }, 1000);
          }


        ], function(error, results) {
          console.log(results);
        });
    } 

/*carte visite*/
else if  (payload == 'CarteVisitePayload')
    {
      async.series([
        function(callback){

            sendTextMessage(senderID, "Carte Visite Go My Code ");


                    setTimeout(function(){
                    callback(null, 1);
                }, 1000);

          },
         
          function(callback){

          sendGenericMessageCarteVisite(senderID);

                     setTimeout(function(){
                     callback(null, 2);
                }, 1000);
          }


        ], function(error, results) {
          console.log(results);
        });
    }  

/*bookmeeting*/ 
else if  (payload == 'PriseRendezVousPayload')
    {

      async.series([
          function(callback){

          sendQuickReplPriseRdv(senderID);

                     setTimeout(function(){
                     callback(null, 2);
                }, 1000);
          }


        ], function(error, results) {
          console.log(results);
        });
}  
 
/* Formation PriseRendezVous*/
else if (payload =='FormationPayload'){
  async.series([
        function(callback){

            sendTextMessage(senderID, "Quel est ton numéro de téléphone ?");


                    setTimeout(function(){
                    callback(null, 1);
                }, 1000);

          },
        

        ], function(error, results) {
          console.log(results);
        });
}        
/*PriseRendezVous Investisseur*/
else  if (payload == 'InvestisseurPayload'){
   async.series([
        function(callback){

            sendTextMessage(senderID, "Quel est ton numéro de téléphone ?");


                    setTimeout(function(){
                    callback(null, 1);
                }, 1000);

          },
        

        ], function(error, results) {
          console.log(results);
        });
} 

/*PriseRendezVous Partenariat*/
else if  (payload == 'PartenariatPayload'){
   async.series([
        function(callback){

            sendTextMessage(senderID, "Quel est ton numéro de téléphone ?");


                    setTimeout(function(){
                    callback(null, 1);
                }, 1000);

          },
        

        ], function(error, results) {
          console.log(results);
        });
 }           
  
  // When a postback is called, we'll send a message back to the sender to 
  // let them know it was successful
  //sendTextMessage(senderID, "Postback called");
}

/*
 * Message Read Event
 *
 * This event is called when a previously-sent message has been read.
 * https://developers.facebook.com/docs/messenger-platform/webhook-reference/message-read
 * 
 */
function receivedMessageRead(event) {
  var senderID = event.sender.id;
  var recipientID = event.recipient.id;

  // All messages before watermark (a timestamp) or sequence have been seen.
  var watermark = event.read.watermark;
  var sequenceNumber = event.read.seq;

  console.log("\n---------------------\n"+JSON.stringify(event)+"\n---------------------\n")

  console.log("Received message read event for watermark %d and sequence " +
    "number %d", watermark, sequenceNumber);

    if (!error && response.statusCode == 200) {
        // Print out the response body
      //  console.log(body)
    }

}

/*
 * Account Link Event
 *
 * This event is called when the Link Account or UnLink Account action has been
 * tapped.
 * https://developers.facebook.com/docs/messenger-platform/webhook-reference/account-linking
 * 
 */
function receivedAccountLink(event) {
  var senderID = event.sender.id;
  var recipientID = event.recipient.id;

  var status = event.account_linking.status;
  var authCode = event.account_linking.authorization_code;

  console.log("Received account link event with for user %d with status %s " +
    "and auth code %s ", senderID, status, authCode);
}
/*
 * Send an image using the Send API.
 *
 */

function sendTextMessage(recipientId, messageText) {
  var messageData = {
    recipient: {
      id: recipientId
    },
    message: {
      text: messageText,
      //metadata: "DEVELOPER_DEFINED_METADATA"
    }
  };

  callSendAPI(messageData);
}

function sendButtonServices(recipientId) {
  var messageData = {
    recipient: {
      id: recipientId
    },
    message: {
      attachment: {
        type: "template",
        payload: {
          template_type: "button",
          text: "Nous proposons différents produits bancaires, que voulez vous découvrir? :)",
          buttons:[{
            type: "postback",
            title: "Compte bancaire 💶",
            payload: "Compte bancaire"
          },
          {
            type: "postback",
            title: "Carte bancaire 💳",
            payload: "Carte bancaire"
          },
          {
            type: "postback",
            title: "Financement 💰",
            payload: "Financement"
          }
          ]
        }
      }
    }
  };  

  callSendAPI(messageData);
}
/*sendQuickReplyprincipal*/

function sendQuickReplyprincipal(recipientId) {
 
  var messageData = {
    recipient: {
      id: recipientId
    },
    message: {
      text: "Je peux vous aider à avoir des informations par rapport au thémes suivants",
      quick_replies: [
        {
          content_type: "text",
          title: "Programmes 📚",
          payload: "ProgrammesPayload"
        }
        ,
      
        {
          content_type: "text",
          title: "Events" ,
          payload: "EventsPayload"
          //image_url: SERVER_URL + "/assets/E-Banking.png"
        }
        ,
        {
          content_type: "text",
          title: "Prise de rendez-vous" ,
          payload: "PriseRendezVousPayload"
          //image_url: SERVER_URL + "/assets/E-Banking.png"
        },
        {
          content_type: "text",
          title: "Carte carte Visite" ,
          payload: "CarteVisitePayload"
          //image_url: SERVER_URL + "/assets/E-Banking.png"
        } 
        ]
    }
  };
 callSendAPI(messageData);
}
/*sendQuickReplPriseRdv */
function sendQuickReplPriseRdv(recipientId) {
 
  var messageData = {
    recipient: {
      id: recipientId
    },
    message: {
      text: "Quel est le sujet :",
      quick_replies: [
        {
          content_type: "text",
          title: "Formation",
          payload: "FormationPayload"
        }
        ,
      
        {
          content_type: "text",
          title: "Investisseur" ,
          payload: "InvestisseurPayload"
          //image_url: SERVER_URL + "/assets/E-Banking.png"
        }
        ,
        {
          content_type: "text",
          title: "Partenariat",
          payload: "PartenariatPayload"
          //image_url: SERVER_URL + "/assets/E-Banking.png"
        }
        ]
    }
  };
 callSendAPI(messageData);
}

/*  */
function sendQuickReplyoperation(recipientId) {
 
  var messageData = {
    recipient: {
      id: recipientId
    },
    message: {
      text: "Merci de choisir le type d'opération de change :)",
      quick_replies: [
        {
          content_type: "text",
          title: "Vente ⬆️",
           payload: "Vente"
        },
        {
          content_type: "text",
          title: "Achat ⬇️",
           payload: "Achat"
        }]
    }
  };

  callSendAPI(messageData);
}

function sendGenericMessagePrograms(recipientId) {
  var messageData = {
    recipient: {
      id: recipientId
    },
    message: {
      attachment: {
        type: "template",
        payload: {
          template_type: "generic",
          elements: [{
            title: "FULL TIME PROGRAM",
            subtitle: "un programme intensif de 3 mois pour devenir développeur fullstack js ou java. Un coaching technique et professionnel régulier et des liens très forts avec le monde de l'entreprise.",
            //item_url: "https://gomycode.tn/full-time",               
            image_url: "https://media.licdn.com/mpr/mpr/shrink_200_200/AAEAAQAAAAAAAAoWAAAAJGIyNDExM2IxLWI2MmMtNDk5YS05ZDUwLTRkZTcwZTA3ZTE4NQ.png",
            buttons: [{
              type: "web_url",
              url: "https://gomycode.tn/full-time",
              title: "Open Web URL",
              webview_height_ratio: "TALL"
            },{
              type: "web_url",
              url: "https://gomycode.tn/full-time#apply",
              title: "Inscription",
              webview_height_ratio: "TALL"

            }, {
              type:"element_share"
              
            }],
          }, {
            title: "Part time coding",
            subtitle: "Une opportunité unique pour apprendre à coder durant les weekends",
            item_url: "https://gomycode.tn/part-time",               
            image_url: "https://images.trueafrica.co/Go-my-code-school-at-Cogite1-2000x1333.jpg",
            buttons: [{
              type: "web_url",
              url: "https://gomycode.tn/part-time",
              title: "Open Web URL"
            },{
              type: "web_url",
              url: "https://gomycode.tn/full-time#apply",
              title: "Inscription"
            },{
            
              type:"element_share"
              
            }]
          },  {
            title: "Summer Academy",
            subtitle: "Profitez des vacances d'été pour apprendre à coder",
            item_url: "https://gomycode.tn/summer-academy",               
            image_url: "https://images.trueafrica.co/Go-my-code-school-at-Cogite1-2000x1333.jpg",
            buttons: [{
              type: "web_url",
              url: "https://gomycode.tn/summer-academy",
              title: "Open Web URL"
            },{
              type: "web_url",
              url: "https://gomycode.tn/full-time#apply",
              title: "Inscription"
            }, {
              type:"element_share"
              
            }],
          }, {
            title: "Kids coding",
            subtitle: "Initiez vos enfants à la programmation",
            item_url: "https://gomycode.tn/kids",               
            image_url: "https://images.trueafrica.co/Go-my-code-school-at-Cogite1-2000x1333.jpg",
            buttons: [{
              type: "web_url",
              url: "https://gomycode.tn/kids",
              title: "Open Web URL"
            },{
              type: "web_url",
              url: "https://gomycode.tn/full-time#apply",
              title: "Inscription"
            }, {
              type:"element_share"
              
            }],
          }]
        }
      }
    }
  };  

  callSendAPI(messageData);
}
/*sendGenericMessageEvents*/

function sendGenericMessageEvents(recipientId) {
  var messageData = {
    recipient: {
      id: recipientId
    },
    message: {
      attachment: {
        type: "template",
        payload: {
          template_type: "generic",
          elements: [{
            title: "Artificial Intelligence",
            subtitle: "Building Artificial Intelligence talents in Tunisia",
            //item_url: "https://gomycode.tn/full-time",               
            image_url: "https://media.licdn.com/mpr/mpr/shrink_200_200/AAEAAQAAAAAAAAoWAAAAJGIyNDExM2IxLWI2MmMtNDk5YS05ZDUwLTRkZTcwZTA3ZTE4NQ.png",
            buttons: [{
              type: "web_url",
              url: "https://gomycode.tn/full-time",
              title: "Open Web URL",
              webview_height_ratio: "TALL"
            },{
              type: "web_url",
              url: "https://gomycode.tn/full-time#apply",
              title: "Inscription",
              webview_height_ratio: "TALL"

            }, {
              type:"element_share"
              
            }],
          }, {
            title: "Node Js",
            subtitle: "GoMyCodeWednesdays Workshops: Node Js for Beginners",
            item_url: "https://gomycode.tn/part-time",               
            image_url: "https://images.trueafrica.co/Go-my-code-school-at-Cogite1-2000x1333.jpg",
            buttons: [{
              type: "web_url",
              url: "https://gomycode.tn/part-time",
              title: "Description"
            },{
              type: "web_url",
              url: "https://gomycode.tn/full-time#apply",
              title: "Inscription"
            },{
            
              type:"element_share"
              
            }]
          },{
           title: "Hacks",
            subtitle: "GoMyCode Hacks",
            item_url: "https://gomycode.tn/part-time",               
            image_url: "https://images.trueafrica.co/Go-my-code-school-at-Cogite1-2000x1333.jpg",
            buttons: [{
              type: "web_url",
              url: "https://gomycode.tn/part-time",
              title: "Description"
            },{
              type: "web_url",
              url: "https://gomycode.tn/full-time#apply",
              title: "Inscription"
            },{
            
              type:"element_share"
              
            }]
          }]
        }
      }
    }
  };  

  callSendAPI(messageData);
}

/*sendGenericMessageCarteVisite*/

function sendGenericMessageCarteVisite(recipientId) {

  var messageData = {
    recipient: {
      id: recipientId
    },
    message: {
      attachment: {
        type: "template",
        payload: {
          template_type: "generic",
          elements: [{
            title: "Carte visite ",
            subtitle: "Conatcter Nous ",
            item_url: "https://gomycode.tn/assets/images/logo.png",               
            image_url: "https://gomycode.tn/assets/images/logo.png",
            buttons: [{
      
              type:"phone_number",
              title:"Appeler",
              payload:"24873931"
              },
              {
              type:"postback",
              title:"Adresse",
              payload:"AdressePayload" 
              },
             {
              type:"element_share"
              
            }],
        
          }]
        }
      }
    }
  };  

  callSendAPI(messageData)
}

function sendMessageapiai(event) {
  let sender = event.sender.id;
  let text = event.message.text;

  let apiai = apiaiApp.textRequest(text, {
    sessionId: 'tabby_cat' // use any arbitrary id
  });

  apiai.on('response', (response) => {
    // Got a response from api.ai. Let's POST to Facebook Messenger
  });

  apiai.on('error', (error) => {
    console.log(error);
  });

  apiai.end();
}

/*
 * Send a message with Quick Reply buttons.
 *
 */

/*
 * Send a read receipt to indicate the message has been read
 *
 */

function sendReadReceipt(recipientId) {
  console.log("Sending a read receipt to mark message as seen");

  var messageData = {
    recipient: {
      id: recipientId
    },
    sender_action: "mark_seen"
  };

  callSendAPIcompaign(messageData,compaign_id,eval("broadcast"+i))
}

/*
 * Turn typing indicator on
 *
 */
function sendTypingOn(recipientId) {
  console.log("Turning typing indicator on");

  var messageData = {
    recipient: {
      id: recipientId
    },
    sender_action: "typing_on"
  };

  callSendAPI(messageData);
}

/*
 * Turn typing indicator off
 *
 */
function sendTypingOff(recipientId) {
  console.log("Turning typing indicator off");

  var messageData = {
    recipient: {
      id: recipientId
    },
    sender_action: "typing_off"
  };

  callSendAPI(messageData);
}

/*
 * Send a message with the account linking call-to-action
 *
 */
function sendAccountLinking(recipientId) {
  var messageData = {
    recipient: {
      id: recipientId
    },
    message: {
      attachment: {
        type: "template",
        payload: {
          template_type: "button",
          text: "Welcome. Link your account.",
          buttons:[{
            type: "account_link",
            url: config.SERVER_URL + "/authorize"
          }]
        }
      }
    }
  };  

  callSendAPI(messageData);
}

/*
 * Call the Send API. The message data goes in the body. If successful, we'll 
 * get the message id in a response 
 *
 */
function callSendAPI(messageData) {

  // console.log("\n--------------send message data-----------\n"+JSON.stringify(messageData.message.attachment.payload.text)+"\n-------------- fin send message data-----------\n");



  console.log("\n--------------send message data-----------\n"+JSON.stringify(messageData)+"\n-------------- fin send message data-----------\n");



        

  request({
    uri: 'https://graph.facebook.com/v2.6/me/messages',
    qs: { access_token: PAGE_ACCESS_TOKEN },
    method: 'POST',
    json: messageData


  }, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var recipientId = body.recipient_id;
      var messageId = body.message_id;

      console.log("Successfully sent generic message with id %s to recipient %s", 
        messageId, recipientId);
    } else {
      console.error("Unable to send message.");
      console.error(response);
      console.error(error);
    }
  });  
}

function deletestartbutton() {
  request({
    uri: 'https://graph.facebook.com/v2.6/me/thread_settings',
    qs: { access_token: PAGE_ACCESS_TOKEN },
    method: 'DELETE',
    json:{
              setting_type:"call_to_actions",
              thread_state:"new_thread"
            }   
    }, function(error, response, body) {
    console.log(response)
    if (error) {
        console.log('Error sending messages: ', error)
    } else if (response.body.error) {
        console.log('Error: ', response.body.error)
    }
})
}

function callstartbutton() {
  request({
    uri: 'https://graph.facebook.com/v2.6/me/thread_settings',
    qs: { access_token: PAGE_ACCESS_TOKEN },
    method: 'POST',
       json:{
              setting_type:"call_to_actions",
              thread_state:"new_thread",
              call_to_actions:[
                {
                  "payload":"demarrer"
                }
                              ]
                    
      }  
  }, function(error, response, body) {
    console.log(response)
    if (error) {
        console.log('Error sending messages: ', error)
    } else if (response.body.error) {
        console.log('Error: ', response.body.error)
    }
})
}

function callgreeting() {
  getuserprofile();
  request({
    uri: 'https://graph.facebook.com/v2.6/me/thread_settings',
    qs: { access_token: PAGE_ACCESS_TOKEN },
    method: 'POST',
    json:{
      setting_type:"greeting",
      greeting :{
                text:"Bonjour ! \nGo my code vous présente son nouveau Assistant Virtuel My-Code-Bot."
                }
        }
    }, function(error, response, body) {
    console.log(response)
    if (error) {
        console.log('Error sending messages: ', error)
    } else if (response.body.error) {
        console.log('Error: ', response.body.error)
    }
});
}
function deletegreeting() {
  console.log("delete greeting");
  request({
    uri: 'https://graph.facebook.com/v2.6/me/thread_settings',
    qs: { access_token: PAGE_ACCESS_TOKEN },
    method: 'DELETE',
    json:{
      setting_type:"greeting",
    }
    }, function(error, response, body) {
    console.log(response)
    if (error) {
        console.log('Error sending messages: ', error)
    } else if (response.body.error) {
        console.log('Error: ', response.body.error)
    }
});
}
function addPersistentMenu(){
 request({
    url: 'https://graph.facebook.com/v2.6/me/thread_settings',
    qs: { access_token: PAGE_ACCESS_TOKEN },
    method: 'POST',
    json:{
        setting_type : "call_to_actions",
        thread_state : "existing_thread",
        call_to_actions:[
        {
          type:"postback",
          title: "Programmes",
          payload: "ProgrammesPayload"
        }
        ,
      
        {
            type:"postback",
            title:"Events",
            payload:"EventsPayload"
        }
        ,
        {
          type:"postback",
          title: "Prise des rendez-vous" ,
          payload: "PriseRendezVousPayload"
          //image_url: SERVER_URL + "/assets/E-Banking.png"
        },
        {
          type:"postback",
          title: "Carte carte Visite" ,
          payload: "CarteVisitePayload"
          //image_url: SERVER_URL + "/assets/E-Banking.png"
        }
          ]
    }

}, function(error, response, body) {
    console.log(response)
    if (error) {
        console.log('Error sending messages: ', error)
    } else if (response.body.error) {
        console.log('Error: ', response.body.error)
    }
})
}
function removePersistentMenu(){
 request({
    url: 'https://graph.facebook.com/v2.6/me/thread_settings',
    qs: { access_token: PAGE_ACCESS_TOKEN },
    method: 'POST',
    json:{
        setting_type : "call_to_actions",
        thread_state : "existing_thread",
        call_to_actions:[ ]
    }

}, function(error, response, body) {
    console.log(response)
    if (error) {
        console.log('Error sending messages: ', error)
    } else if (response.body.error) {
        console.log('Error: ', response.body.error)
    }
})
}
function getuserprofile(senderID) {
 request({
    uri: 'https://graph.facebook.com/v2.6/'+senderID+'?fields=first_name,last_name,profile_pic,locale,timezone,gender',
    qs: { access_token: PAGE_ACCESS_TOKEN },
    method: 'GET'
    }, function(error, response, body) {
    //console.log(response)
    if (error) {
        console.log('Error sending messages: ', error)
    } else  {
      dateuserprofile = new Date();
      eval("profile"+senderID +"= JSON.parse(body);");
 profile = JSON.parse(body);
   console.log(profile);    
   console.log(profile.gender);
   //eval("fullname"+senderID)=eval("profile"+senderID+".first_name")+" "+eval("profile"+senderID+".last_name");
   eval("fullname"+senderID+"=profile"+senderID+".first_name+ ' ' + profile"+senderID+".last_name") ;
   console.log("+++++++++++++++");
    eval("console.log(fullname"+senderID+");");
   //eval("console.log(profile"+senderID+".gender);");
   //eval("console.log(profile"+senderID+".timezone);") ;
  eval("userhour"+senderID+"=profile"+senderID+".timezone+dateuserprofile.getHours()-1;") ;
  //eval("console.log(userhour"+senderID+");") ;
  eval("profile"+senderID+".timezone+"+dateuserprofile.getHours()-1+";") ;
  //eval("console.log(profile"+senderID+".timezone + dateuserprofile.getHours()-1);") ;
  eval("console.log('userhour ='+userhour"+senderID+");") ;
if(eval("userhour"+senderID+">3 && userhour"+senderID+"<20")){
  eval("usergreeting"+senderID+"='Bonjour 👋';") ;
  eval("console.log('usergreeting ='+usergreeting"+senderID+");") ;
}
else{
  eval("usergreeting"+senderID+"='Bonsoir 👋';") ;
  eval("console.log('usergreeting ='+usergreeting"+senderID+");") ;
}

   if (eval("profile"+senderID+".gender == 'male'"))
{
eval("profile"+senderID+".gender = 1 ;");
}

else if (eval("profile"+senderID+".gender == 'female'"))
{
eval("profile"+senderID+".gender = 2 ;");
}
  else 
{
eval("profile"+senderID+".gender = 0 ;");
}  
}

})

}
/*
function getuserprofile(senderID) {
 request({
    uri: 'https://graph.facebook.com/v2.6/'+senderID+'?fields=first_name,last_name,profile_pic,locale,timezone,gender',
    qs: { access_token: PAGE_ACCESS_TOKEN },
    method: 'GET'
    }, function(error, response, body) {
    //console.log(response)
    if (error) {
        console.log('Error sending messages: ', error)
    } else  {
      dateuserprofile = new Date();
      eval("profile"+senderID +"= JSON.parse(body);");
 profile = JSON.parse(body);
   console.log(profile);    
   console.log(profile.gender);
    //eval("console.log(profile"+senderID+");");
   //eval("console.log(profile"+senderID+".gender);");
   //eval("console.log(profile"+senderID+".timezone);") ;
  eval("userhour"+senderID+"=profile"+senderID+".timezone+dateuserprofile.getHours()-1;") ;
  //eval("console.log(userhour"+senderID+");") ;
  eval("profile"+senderID+".timezone+"+dateuserprofile.getHours()-1+";") ;
  //eval("console.log(profile"+senderID+".timezone + dateuserprofile.getHours()-1);") ;
  eval("console.log('userhour ='+userhour"+senderID+");") ;
if(eval("userhour"+senderID+">3 && userhour"+senderID+"<20")){
  eval("usergreeting"+senderID+"='Bonjour 👋';") ;
  eval("console.log('usergreeting ='+usergreeting"+senderID+");") ;
}
else{
  eval("usergreeting"+senderID+"='Bonsoir 👋';") ;
  eval("console.log('usergreeting ='+usergreeting"+senderID+");") ;
}
}
})
}*/

function replyImage2(recipientId) {
  return new Promise((resolve, reject) => {

    var messageData = {
    recipient: {
      id: recipientId
    },
    message: {
      attachment: {
        type: "image",
        payload: {
          url: config.SERVER_URL +"/assets/simulateur.jpg",
        }
      }
    }
  };
    callSendAPI(messageData).then(() => {
      resolve()
    }).catch( err => {
      reject(err)
    })
  })
}


// Start server
// Webhooks must be available via SSL with a certificate signed by a valid 
// certificate authority
/*server.get('/maps', function (req,res){

  res.render('maps',{lat: lat, lang: lang, destination: destination});
});*/


/*
server.get('/maps/:senderID', function (req,res){
console.log(req.params.senderID);
  res.render('maps',{lat: eval("latuser"+req.params.senderID ), lang: eval("languser"+req.params.senderID )});
});

*/

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));

     //deletestartbutton();
     //removePersistentMenu();
    //deletegreeting();
    //deletegreeting();
    callstartbutton();
    callgreeting();
    deletestartbutton();
    addPersistentMenu();
    removePersistentMenu();
});

/*
app1.listen(app1.get('port'), function() {
  console.log('Node app is running on port', app1.get('port'));





   //deletestartbutton();
   //removePersistentMenu();
   //deletegreeting();
   //deletegreeting();
   //removePersistentMenu();
   //deletestartbutton();
 // callstartbutton();
 //callgreeting();
  //addPersistentMenu();
});
*/
/*
server.listen(server.get('port'), function() {
  console.log('server running on port', server.get('port'));
  var now = moment().format("YYYY-MM-DD HH:mm:ss");
    console.log("\nDate.now() = "+now+"\n");

    // timestamp to Date


});
*/

module.exports = app;