import AWS from 'aws-sdk'
import multerS3 from 'multer-s3'
import {env} from '@src/env'
import path from 'path'
import multer from 'multer'

const s3 = new AWS.S3({
  accessKeyId: env.STORAGE_ID,
  secretAccessKey: env.STORAGE_KEY,
  region: env.REGION,
})

const options = {
  limits: {
    fileSize: 3 * 1024 * 1024,
  },
}

export let storage = multerS3({
  s3,
  bucket: env.STORAGE,
  acl: 'public-read',
  contentDisposition: 'attachment',
  serverSideEncryption: 'AES256',
  key: (req, file, cb) => {
    cb(null, `questions/${Date.now().toString()}}`)
  },
})

if (!env.isDevelopment) {
  storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.join(__dirname, '../../../uploads'))
    },
  })
}

export const getS3Object = (Key): object =>
  s3.getObject({
    Bucket: env.STORAGE,
    Key,
  })

export default (): any => ({
  storage,
  ...options,
})
