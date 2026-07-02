const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const fs = require("fs");
const path = require("path");
const mime = require("mime-types");

const REGION = "ap-south-1"; // Change if your bucket is in another region
const BUCKET = "velocity-jan-mern-public-bucket";

const fileName = "PAN_card_2.jpg";
const filePath = path.join(__dirname, fileName);

const s3 = new S3Client({
  region: REGION,
});

async function uploadFile() {
  try {
    const command = new PutObjectCommand({
      Bucket: BUCKET,
      Key: fileName,
      Body: fs.createReadStream(filePath),
      ContentType: mime.lookup(fileName) || "application/octet-stream",
    });

    await s3.send(command);

    console.log("✅ Upload successful!");

    console.log(
      `https://${BUCKET}.s3.${REGION}.amazonaws.com/${encodeURIComponent(fileName)}`
    );
  } catch (err) {
    console.error("❌ Upload failed");
    console.error(err);
  }
}

uploadFile();