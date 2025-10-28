/**
 * Adds a buyer to the buyerwaitlist collection in Firestore.
 * @param buyerData - Object containing buyer info: fullName, email, brandName, website
 */
export async function addBuyerToWaitlist(buyerData: {
  fullName: string;
  email: string;
  shoppingHabits?: string;
  website?: string;
}) {
  // Normalize fields
  const emailLower = buyerData.email?.trim().toLowerCase();
  const shoppingHabitsNormalized = buyerData.shoppingHabits?.toLowerCase() || '';
  const websiteNormalized = buyerData.website?.toLowerCase() || '';
  const source = 'buyer-waitlist-form';
  const submittedAt = new Date().toISOString();

  // Dedupe by emailLower: if exists, update; otherwise create new
  const colRef = collection(db, 'buyerwaitlist');
  const q = query(colRef, where('emailLower', '==', emailLower));
  const snap = await getDocs(q);
  if (!snap.empty) {
    const docRef = snap.docs[0].ref;
    await setDoc(
      docRef,
      {
        fullName: buyerData.fullName,
        email: emailLower,
        emailLower,
        shoppingHabits: buyerData.shoppingHabits || '',
        shoppingHabitsNormalized,
        website: buyerData.website || '',
        websiteNormalized,
        source,
        submittedAt,
        updatedAt: submittedAt,
      },
      { merge: true }
    );
    return docRef;
  }
  return await addDoc(colRef, {
    fullName: buyerData.fullName,
    email: emailLower,
    emailLower,
    shoppingHabits: buyerData.shoppingHabits || '',
    shoppingHabitsNormalized,
    website: buyerData.website || '',
    websiteNormalized,
    source,
    submittedAt,
  });
}
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, query, where, getDocs, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyASxZtLGgldtjwiQKzpnPAAeAjUDCkE4wY",
  authDomain: "skaptixwaitlist.firebaseapp.com",
  projectId: "skaptixwaitlist",
  storageBucket: "skaptixwaitlist.firebasestorage.app",
  messagingSenderId: "594355519065",
  appId: "1:594355519065:web:fde09d0f021b2edc7bbb48",
  measurementId: "G-1FZBLH82FQ"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { db };

/**
 * Adds a seller to the waitlist collection in Firestore.
 * @param sellerData - Object containing seller info: fullName, brandName, email, website, numItems
 */
export async function addSellerToWaitlist(sellerData: {
  fullName: string;
  brandName: string;
  email: string;
  website?: string;
  numItems?: number;
}) {
  // Normalize brandName and website for uniqueness (simple lowercasing)
  const brandNameNormalized = sellerData.brandName?.toLowerCase() || '';
  const websiteNormalized = sellerData.website?.toLowerCase() || '';
  // Source can be set to 'seller-waitlist-form' for tracking
  const source = 'seller-waitlist-form';
  // submittedAt in ISO format
  const submittedAt = new Date().toISOString();
  return await addDoc(collection(db, "waitlistRequests"), {
    fullName: sellerData.fullName,
    email: sellerData.email,
    brandName: sellerData.brandName,
    brandNameNormalized,
    website: sellerData.website || '',
    websiteNormalized,
    source,
    submittedAt
  });
}
