import { site } from "@/config/site"

/**
 * Photo uploads need a Vercel Blob store (BLOB_READ_WRITE_TOKEN). Every piece of copy that
 * mentions uploading photos reads this, so the site never promises an uploader it can't show.
 */
export const photoUploadsEnabled = site.forms.photoUploads && Boolean(process.env.BLOB_READ_WRITE_TOKEN)
