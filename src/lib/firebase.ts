/**
 * Adds a buyer to the buyerwaitlist collection in Firestore.
 * @param buyerData - Object containing buyer info: fullName, email, brandName, website
 */
export async function addBuyerToWaitlist(buyerData: {
  fullName: string;
  email: string;
  brandName?: string;
  website?: string;
}) {
  // Normalize brandName and website for uniqueness (simple lowercasing)
  const brandNameNormalized = buyerData.brandName?.toLowerCase() || '';
  const websiteNormalized = buyerData.website?.toLowerCase() || '';
  // Source can be set to 'buyer-waitlist-form' for tracking
  const source = 'buyer-waitlist-form';
  // submittedAt in ISO format
  const submittedAt = new Date().toISOString();
  return await addDoc(collection(db, "buyerwaitlist"), {
    fullName: buyerData.fullName,
    email: buyerData.email,
    brandName: buyerData.brandName || '',
    brandNameNormalized,
    website: buyerData.website || '',
    websiteNormalized,
    source,
    submittedAt
  });
}
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

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
import { collection, addDoc } from "firebase/firestore";

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
