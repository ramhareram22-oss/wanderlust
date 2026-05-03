# wanderlust

## Deployment Environment Variables

For Vercel deployment, set these project environment variables in the Vercel dashboard:

- `ATLASDB_URL` or `MONGO_URL` or `DATABASE_URL` - MongoDB connection string
- `SECRET` - session secret for `express-session`
- `CLOUDINARY_URL` or all of:
  - `CLOUD_NAME`
  - `CLOUD_API_KEY`
  - `CLOUD_API_SECRET`

### Why this matters

The app loads on Vercel as a serverless function. In production, it will not read your local `.env` file, so these values must be configured in Vercel.

If the MongoDB URL is missing, database routes will fail and may return a `500` error. If Cloudinary credentials are missing, image upload routes may fail.
