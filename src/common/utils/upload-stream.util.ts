import AWS from 'aws-sdk'
import bluebird from 'bluebird'

interface UploadStream {
	key: string
	bucket: string
	body: any
}

export const uploadStream = async ({ key, bucket, body }: UploadStream) => {
	const {
		AWS_ACCESSKEYID: ACCESS_KEY_ID,
		AWS_SECRET: SECRET_ACCESS_KEY,
		AWS_REGION,
		AWS_PHOTO_DIRNAME
	} = process.env

	AWS.config.setPromisesDependency(bluebird)
	AWS.config.update({
		accessKeyId: ACCESS_KEY_ID,
		secretAccessKey: SECRET_ACCESS_KEY,
		region: AWS_REGION
	})

	const s3 = new AWS.S3()

	const result = await s3
		.upload({
			Bucket: bucket,
			Key: AWS_PHOTO_DIRNAME ? `${AWS_PHOTO_DIRNAME}/${key}` : key,
			Body: body,
			ACL: 'public-read'
		})
		.promise()

	return result.Location
}

export default uploadStream
