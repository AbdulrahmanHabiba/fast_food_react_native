import { CreateUserPrams , GetMenuParams, SignInParams } from "@/type";
import { Account, Avatars, Client, Databases, ID, Query ,Storage} from "react-native-appwrite";

export const appwriteConfig = {
  endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT as string,
  projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID as string,
  platform: "com.abdohsan.foodordering",
  databaseId: "68e3ba0e001dfc361ccd",
  bucketId: "68ec1d6d003349c74083" ,
  userCollectionId: "user",
  categoriesCollectionId: "categories",
  menuCollectionId: "menu" ,
  customizationCollectionId: "customization" ,
  menuCustomizationCollectionId: "menu_customization"
};


const client = new Client();

client
  .setEndpoint(appwriteConfig.endpoint)
  .setProject(appwriteConfig.projectId)
  .setPlatform(appwriteConfig.platform);

export const account = new Account(client);
export const database = new Databases(client);
export const storage = new Storage(client)
export const avatars = new Avatars(client);

export const createUser = async ({ email, password, name }: CreateUserPrams) => {
  try {
    const newAccount = await account.create(ID.unique(), email, password, name);
    if(!newAccount) throw Error;

    await signIn({email , password});
    
    return await database.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      ID.unique(),
      {
        name,
        email,
        accountId: newAccount.$id,
        avatar: avatars.getInitialsURL(name),
      }
    );
  } catch (error) {
    throw new Error(error as string);
  }
};

export const signIn = async ({email , password}: SignInParams) => {
    try {
        const session = await account.createEmailPasswordSession(email ,password)    
    } catch (error) {
        throw new Error(error as string)
    }
}

export const getCurrentUser = async () => {
    try {
        const currentAccount = await account.get() ;
        if(!currentAccount) throw Error

        const currentUser = await database.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            [Query.equal('accountId' ,currentAccount.$id)]
        )

        if(!currentUser) throw Error

        return currentUser.documents[0]
    } catch (error) {
        throw new Error(error as string)
    }
}



export const getMenu = async ({category, query} :GetMenuParams ) =>{
    const queries: string[] = [];
  try {
      if(category) queries.push(Query.equal('categories' ,category))
      if(query)  queries.push(Query.search('name' ,query)) ;

      const menu = await database.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.menuCollectionId,
        queries
      )
      return menu.documents
    }
    catch (error) {
      throw new Error(error as string)
    }
}

export const getCategories = async () => {
    try {
        const categories = await database.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.categoriesCollectionId,
        )

        return categories.documents
    } catch (error) {
        throw new Error(error as string)
    }
}

export const getUsers = async ()=>{
    try {
        const users = await database.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
        )

        if(!users) throw Error

}
catch (error) {
    throw new Error(error as string)
}
}
export const getAllMenues = async ()=>{
  try {
    const allMenues = await database.listDocuments({
      databaseId: appwriteConfig.databaseId,
      collectionId: appwriteConfig.menuCollectionId,
    })
    if(!allMenues) throw Error
    return allMenues.documents
  }
  catch(e) {
    throw new Error(e as string)
  }
}