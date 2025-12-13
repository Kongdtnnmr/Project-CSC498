import { db } from "./firebase";
import { collection, getDocs } from "firebase/firestore";

export const getNews = async () => {
  const snap = await getDocs(collection(db, "news"));

  return snap.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
};
