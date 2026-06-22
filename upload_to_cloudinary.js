import { v2 as cloudinary } from 'cloudinary';
import sharp from 'sharp';
import fs from 'fs';
import 'dotenv/config';

// 1. Configurer Cloudinary
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});

async function run() {
  const originalImagePath = './public/images/Adobe Express - file.png';
  const compressedImagePath = './public/images/Adobe Express - compressed.webp';

  try {
    console.log(`Lecture et compression de l'image ${originalImagePath}...`);
    
    // Compression de l'image avec Sharp :
    // - On convertit en WebP (excellent ratio qualité/poids)
    // - On limite la largeur à 1920 pixels maximum pour garder une très bonne qualité pour le web
    await sharp(originalImagePath)
      .resize({ width: 1920, withoutEnlargement: true })
      .webp({ quality: 85 })
      .toFile(compressedImagePath);

    const stats = fs.statSync(compressedImagePath);
    console.log(`Compression terminée ! Nouvelle taille : ${(stats.size / 1024 / 1024).toFixed(2)} MB`);

    // 2. Upload de l'image compressée
    console.log(`\nUploading ${compressedImagePath} vers Cloudinary...`);
    const uploadResult = await cloudinary.uploader.upload(compressedImagePath, {
      public_id: 'adob_machin_portfolio'
    });
    
    console.log("\nUpload successful!");
    console.log("Secure URL:", uploadResult.secure_url);
    console.log("Public ID:", uploadResult.public_id);
    
    // 3. Détails de l'image
    console.log("\nImage Details:");
    console.log("- Width:", uploadResult.width);
    console.log("- Height:", uploadResult.height);
    console.log("- Format:", uploadResult.format);
    console.log("- File size (bytes):", uploadResult.bytes);
    
    // 4. Transformation de l'image
    const transformedUrl = cloudinary.url(uploadResult.public_id, {
      fetch_format: 'auto',
      quality: 'auto'
    });
    
    console.log("\nDone! Click link below to see optimized version of the image. Check the size and the format.");
    console.log(transformedUrl);

  } catch (error) {
    console.error("Erreur lors du traitement ou de l'upload:", error);
  }
}

run();
