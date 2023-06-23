import AWS from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';

const S3_BUCKET: any = process.env.REACT_APP_S3_BUCKET;
const S3_ACCESS_KEY: any = process.env.REACT_APP_S3_ACCESS_KEY;
const S3_SECRET_ACCESS_KEY: any = process.env.REACT_APP_S3_SECRET_ACCESS_KEY;
const S3_SESSION_TOKEN: any = process.env.REACT_APP_S3_SESSION_TOKEN;
const S3_REGION: any = process.env.REACT_APP_S3_REGION;

AWS.config.update({
    accessKeyId: S3_ACCESS_KEY,
    secretAccessKey: S3_SECRET_ACCESS_KEY,
    sessionToken: S3_SESSION_TOKEN,
    region: S3_REGION,
});

const s3 = new AWS.S3();

const S3Aws = {
    getImage: async (key: string) => {
        let image: any = await s3.getObject({ Bucket: S3_BUCKET, Key: key }, (error: any, data: any) => { }).promise();
        return image?.Body.toString('base64') ? image.Body.toString('base64') : false;
    },
    uploadImage: async (file: any) => {
        let key = uuidv4(file.name);
        const params = {
            ACL: 'public-read',
            Body: file,
            Bucket: S3_BUCKET,
            Key: "files/" + key
        };

        return new Promise((resolve, reject) => {
            s3.putObject(params, function (err, result) {
                if (err) reject(err);
                if (result) resolve(key);
            });
        })
    }
}
export default S3Aws;

