import AWS from 'aws-sdk';
class Aws {
  constructor() {
    AWS.config.update({
      accessKeyId: process.env.REACT_APP_ACCESS_KEY_ID,
      secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY,
      region: process.env.REACT_APP_REGION
    });
    this.s3 = new AWS.S3();
    this.bucketName = process.env.REACT_APP_BUCKET_NAME;
    this.configFileName = process.env.REACT_APP_CONFIG_FILE_NAME;
  }

  readConfig() {
    const params = {
      Bucket: this.bucketName,
      Key: this.configFileName, // e.g., 'path/to/yourfile.json'
    };
    try {
      return this.s3.getObject(params).promise();
    } catch (error) {
      console.error("Error fetching JSON from S3:", error);
    }
  }

  uploadConfig(fileBlob) {
    const params = {
      Bucket: this.bucketName,
      Key: this.configFileName, // e.g., 'path/to/yourfile.json'
      Body: fileBlob,
      ContentType: 'application/json',
    };
    try {
      return this.s3.putObject(params).promise();
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  }


  uploadFile = (file, saveProgress) => {
    const params = {
      Bucket: this.bucketName,
      Key: file?.name,
      Body: file?.file,
      ContentType: file.type,
    };


    var upload = this.s3
      .upload(params)
      .on("httpUploadProgress", (evt) => {
        console.log(saveProgress(parseInt((evt.loaded * 100) / evt.total)));
        console.log(
          "Uploading " + parseInt((evt.loaded * 100) / evt.total) + "%"
        );
      })
      .promise();
    return upload;
  };
};

export default Aws;