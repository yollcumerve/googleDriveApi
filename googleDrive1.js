const { google } = require("googleapis");
const path = require("path");
const fs = require("fs");


const CLIENT_ID = "";
const CLIENT_SECRET = "";
const REDIRECT_URI = "";

const REFRESH_TOKEN = "";

const oauth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);

oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

const drive = google.drive({
  version: "v3",
  auth: oauth2Client,
});
const filePath = path.join(__dirname, "google.jpg");

async function uploadFile() {
  try {
    const response = await drive.files.create({
      requestBody: {
        name: "googleBest.jpg", //this name to be saved inside google drive 😉 and we want this name to be saved in our google drive and then we need to also provide in the mime type of this file
        mimeType: "image/jpg",
      },
      media: {
        mimeType: "image/jpg",
        body: fs.createReadStream(filePath),
        //body would contain  the actual file and for this what we need to do we need to create a readable stream of
      },
    });
    console.log(response.data);
  } catch (e) {
    console.log(e.message);
  }
}

//upluadFile()  you need to invoke function for the see the result

// DELETİNG FİLE
async function deleteFile() {
  try {
    const response = await drive.files.delete({
      fileId: "", // when we upload a file to drive , google return us a fileId , in here we use that Id
    });
    console.log(response.data, response.status);
    /* when we involved the func , after process it writes to console 204 sttaus code and we do not get anything the response.data
        204 which means that the body has no content but the http sttaus code is 204 which means the req has been successfully processed by the server
        */
  } catch (e) {
    console.log(e.message);
  }
}

//deleteFile() you need to invoke function for the see the result

// CREATE A PUBLİC URL
async function generatePublicUrl() {
  try {
    const fileId = "";
    await drive.permissions.create({
      fileId: fileId,
      requestBody: {
        role: "reader",
        type: "anyone",
      },
    });
    const result = await drive.files.get({
      fileId: fileId,
      fields: "webViewLink, webContentLink",
    });
    console.log(result.data);
  } catch (e) {
    console.log(e.message);
  }
}

//generatepublicUrl() you need to invoke function for the see the result


async function dowloadFile(){
    try {
        const response = await drive.files.export({
            fileId: fileId,
            mimeType: "image/jpg"
        });
        console.log(result.status)
        return result
    } catch (e) {
        console.log(e.message)
    }
}

// dowloadFile() you need to invoke function for the see the result