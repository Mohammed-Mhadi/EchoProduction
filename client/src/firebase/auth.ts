import { auth } from "./firebaseconfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  sendEmailVerification,
  updatePassword,
  UserCredential,
} from "firebase/auth";

/**
 * Create user with email and password
 */
export const doCreateUserWithEmailAndPassword = async (
  email: string,
  password: string
): Promise<UserCredential> => {
  return createUserWithEmailAndPassword(auth, email, password);
};

/**
 * Sign in user with email and password
 */
export const doSignInWithEmailAndPassword = (
  email: string,
  password: string
): Promise<UserCredential> => {
  return signInWithEmailAndPassword(auth, email, password);
};

/**
 * Sign out the current user
 */
export const doSignOut = (): Promise<void> => {
  return auth.signOut();
};

/**
 * Send password reset email
 */
export const doPasswordReset = (email: string): Promise<void> => {
  return sendPasswordResetEmail(auth, email);
};

/**
 * Change password for the current user
 */
export const doPasswordChange = (password: string): Promise<void> => {
  const currentUser = auth.currentUser;
  if (!currentUser) throw new Error("No user is currently signed in.");
  return updatePassword(currentUser, password);
};

/**
 * Send email verification to the current user
 */
export const doSendEmailVerification = (): Promise<void> => {
  const currentUser = auth.currentUser;
  if (!currentUser) throw new Error("No user is currently signed in.");
  return sendEmailVerification(currentUser, {
    url: `${window.location.origin}/home`,
  });
};
