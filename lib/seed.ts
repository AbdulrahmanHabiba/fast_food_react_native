import { ID } from "react-native-appwrite";
import { appwriteConfig, database, storage } from "./appwrite";
import dummyData from "./data";

interface MenuItem {
  name: string;
  description: string;
  image_url: string;
  price: number;
  rating: number;
  calories: number;
  protein: number;
  categories: string;
  customizations: string[];
}

const data = dummyData.menu as MenuItem[];

async function clearCollection(collectionId: string) {
  const list = await database.listDocuments(appwriteConfig.databaseId, collectionId);

  await Promise.all(
    list.documents.map((doc) =>
      database.deleteDocument(appwriteConfig.databaseId, collectionId, doc.$id)
    )
  );
}

async function clearStorage() {
  const list = await storage.listFiles(appwriteConfig.bucketId);

  await Promise.all(
    list.files.map((file) =>
      storage.deleteFile(appwriteConfig.bucketId, file.$id)
    )
  );
}

async function uploadImageToStorage(imageUrl: string) {
  try {
    const response = await fetch(imageUrl);
    const blob = await response.blob();

    const file = await storage.createFile(
      appwriteConfig.bucketId,
      ID.unique(),
      {
        uri: imageUrl,
        name: imageUrl.split("/").pop() || `file-${Date.now()}.jpg`,
        type: blob.type,
        size: blob.size,
      }
    );

    return storage.getFileViewURL(appwriteConfig.bucketId, file.$id);
  } catch (error) {
    console.error("❌ Error uploading image:", error);
    return imageUrl; // fallback to original URL
  }
}

export default async function seed() {
  console.log("🍔 Seeding Menu items...");

  // 🧹 Clear previous data
  await clearCollection(appwriteConfig.menuCollectionId);
  await clearStorage();

  // 🍱 Create Menu Items
  for (const item of data) {
    try {
      const uploadedImage = await uploadImageToStorage(item.image_url);

      await database.createDocument(
        appwriteConfig.databaseId,
        appwriteConfig.menuCollectionId,
        ID.unique(),
        {
          name: item.name,
          description: item.description,
          image_url: uploadedImage,
          price: item.price,
          rating: item.rating,
          calories: item.calories,
          protein: item.protein,
          categories: item.category_name, // just a string for now
        }
      );

      console.log(`✅ Added: ${item.name}`);
    } catch (error) {
      console.error(`❌ Failed to add ${item.name}:`, error);
    }
  }

  console.log("🎉 Menu seeding complete!");
}
