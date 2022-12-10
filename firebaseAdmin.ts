import * as admin from 'firebase-admin';
import { doc, getDoc } from 'firebase/firestore';
import { db } from './firebase';

const serviceAccount = require("./serviceAccountKey.json")

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://aftin-3516f-default-rtdb.firebaseio.com",
  });
}

export const getUserTier = async (token: string): 'bronze' | 'silver' | 'gold' | 'unauthorized' => {
  let userTier: 'bronze' | 'silver' | 'gold' | 'unauthorized' = 'bronze'
  await admin.auth().verifyIdToken(token).then(async (decodedIdToken) => {
    const docRef = doc(db, "users", decodedIdToken.uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log(`docSnap.data():`, docSnap.data());
      
      userTier = docSnap.data().subscriptionLevel
    } else {
      // doc.data() will be undefined in this case
      userTier = 'unauthorized'
    }
  }).catch(error => {
    userTier = 'unauthorized'
  });
  return userTier
}