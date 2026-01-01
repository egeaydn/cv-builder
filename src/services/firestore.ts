import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDoc,
    getDocs,
    query,
    setDoc,
    Timestamp,
    updateDoc,
    where
} from 'firebase/firestore';
import { CV, User } from '../types';
import { db } from './firebase';

// Collections
const USERS_COLLECTION = 'users';
const CVS_COLLECTION = 'cvs';
const TEMPLATES_COLLECTION = 'templates';

// ==================== USERS ====================

export const createUser = async (
  uid: string,
  email: string,
  name?: string,
  photoURL?: string
): Promise<void> => {
  const userRef = doc(db, USERS_COLLECTION, uid);
  await setDoc(userRef, {
    uid,
    email,
    name: name || null,
    photoURL: photoURL || null,
    createdAt: Timestamp.now(),
  });
};

export const getUser = async (uid: string): Promise<User | null> => {
  const userRef = doc(db, USERS_COLLECTION, uid);
  const userSnap = await getDoc(userRef);

  if (userSnap.exists()) {
    return userSnap.data() as User;
  }
  return null;
};

export const updateUser = async (
  uid: string,
  data: Partial<User>
): Promise<void> => {
  const userRef = doc(db, USERS_COLLECTION, uid);
  await updateDoc(userRef, data as any);
};

// ==================== CVs ====================

export const createCV = async (cvData: Omit<CV, 'id'>): Promise<string> => {
  const cvRef = await addDoc(collection(db, CVS_COLLECTION), {
    ...cvData,
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
  });
  return cvRef.id;
};

export const getCV = async (cvId: string): Promise<CV | null> => {
  const cvRef = doc(db, CVS_COLLECTION, cvId);
  const cvSnap = await getDoc(cvRef);

  if (cvSnap.exists()) {
    return { id: cvSnap.id, ...cvSnap.data() } as CV;
  }
  return null;
};

export const getUserCVs = async (userId: string): Promise<CV[]> => {
  const q = query(
    collection(db, CVS_COLLECTION),
    where('userId', '==', userId)
  );

  const querySnapshot = await getDocs(q);
  const cvs = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as CV[];
  
  // Sort by updatedAt on client side to avoid needing a composite index
  return cvs.sort((a, b) => {
    const dateA = a.updatedAt instanceof Date ? a.updatedAt : new Date(a.updatedAt);
    const dateB = b.updatedAt instanceof Date ? b.updatedAt : new Date(b.updatedAt);
    return dateB.getTime() - dateA.getTime();
  });
};

export const updateCV = async (
  cvId: string,
  data: Partial<CV>
): Promise<void> => {
  const cvRef = doc(db, CVS_COLLECTION, cvId);
  await updateDoc(cvRef, {
    ...data,
    updatedAt: Timestamp.now(),
  } as any);
};

export const deleteCV = async (cvId: string): Promise<void> => {
  const cvRef = doc(db, CVS_COLLECTION, cvId);
  await deleteDoc(cvRef);
};

// ==================== TEMPLATES ====================

export const getTemplates = async () => {
  const querySnapshot = await getDocs(collection(db, TEMPLATES_COLLECTION));
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

export const getTemplate = async (templateId: string) => {
  const templateRef = doc(db, TEMPLATES_COLLECTION, templateId);
  const templateSnap = await getDoc(templateRef);

  if (templateSnap.exists()) {
    return { id: templateSnap.id, ...templateSnap.data() };
  }
  return null;
};
