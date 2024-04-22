## Getting Started

First, run the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

# Environment Variables

This project uses environment variables to manage sensitive information and configuration settings. These variables are stored in a file named `.env` in the root directory of the project. You should create this file if it doesn't already exist and populate it with the necessary variables. Here's how to set up each variable:

## NEXT_PUBLIC_GITHUB_SECRET
- **Description:** GitHub secret token for authentication.
- **Example:** `NEXT_PUBLIC_GITHUB_SECRET="1208423c62f200fb4535af63a82d5e9069c7d1b3"`

## NEXT_PUBLIC_GITHUB_ID
- **Description:** GitHub client ID for authentication.
- **Example:** `NEXT_PUBLIC_GITHUB_ID="9bfd2118ee92129d5daf"`

## GOOGLE_CLIENT_ID
- **Description:** Google client ID for authentication.
- **Example:** `GOOGLE_CLIENT_ID="001830557285-91bdcaunf748lktpidlrpbgh7fg2ms2z.apps.googleusercontent.com"` (Fill in with your actual client ID)

## GOOGLE_CLIENT_SECRET
- **Description:** Google client secret for authentication.
- **Example:** `GOOGLE_CLIENT_SECRET="AGULNZ-KQWKlnKQ-nNnsasaO9ZBna2AbfQG"` (Fill in with your actual client secret)

## DATABASE_URL
- **Description:** URL for the MongoDB database connection.
- **Example:** `DATABASE_URL="mongodb+srv://user1:l1hkqMbL41kJA4L@cluster0.mklfkaa.mongodb.net/test"` (Fill in with your actual MongoDB database URL)

## NEXTAUTH_SECRET
- **Description:** Secret key used by NextAuth for session encryption.
- **Example:** `NEXTAUTH_SECRET="l1hkqMbL41kJA4L"` (Fill in with a randomly generated secret key)

## NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
- **Description:** Cloudinary cloud name for image storage.
- **Example:** `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="knkn14lqv"` (Fill in with your actual cloud name)

## NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
- **Description:** Cloudinary upload preset for image uploads.
- **Example:** `NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET="l511brha"` (Fill in with your actual upload preset)

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
