import { handleUpload, type HandleUploadBody } from "@vercel/blob/client"
import { site } from "@/config/site"

const MAX_BYTES = 10 * 1024 * 1024

export async function POST(request: Request) {
  if (!site.forms.photoUploads || !process.env.BLOB_READ_WRITE_TOKEN) {
    return Response.json({ error: "Photo uploads are not configured." }, { status: 503 })
  }

  const body = (await request.json()) as HandleUploadBody
  try {
    const result = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (pathname) => {
        if (!pathname.startsWith("quote-photos/")) throw new Error("Invalid upload path.")
        return {
          allowedContentTypes: ["image/jpeg", "image/png", "image/webp", "image/heic", "image/heif"],
          maximumSizeInBytes: MAX_BYTES,
          addRandomSuffix: true,
          validUntil: Date.now() + 10 * 60 * 1000,
        }
      },
    })
    return Response.json(result)
  } catch (error) {
    return Response.json({ error: (error as Error).message }, { status: 400 })
  }
}
