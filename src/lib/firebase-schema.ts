/**
 * Toolora AI — Firebase Architecture & Storage Blueprint
 * Prepares the schema definitions, collection references, and storage conventions
 * for Firestore and Firebase Storage integration in Phase 2+.
 */

import { UserProfile, GenerationRecord, CreditTransaction, PricingPlan, SystemSettings } from '../types';

/**
 * Firestore Collection Names
 */
export const COLLECTIONS = {
  USERS: 'users',
  GENERATIONS: 'generations',
  CREDIT_TRANSACTIONS: 'creditTransactions',
  PLANS: 'plans',
  SYSTEM_SETTINGS: 'systemSettings',
  PAYMENTS: 'payments',
} as const;

/**
 * Cloud Storage Path Conventions
 * users/{uid}/generations/{generationId}/{filename}
 */
export const getStoragePaths = (uid: string, generationId: string) => ({
  userRoot: `users/${uid}`,
  generationRoot: `users/${uid}/generations/${generationId}`,
  image: (filename: string) => `users/${uid}/generations/${generationId}/images/${filename}`,
  voice: (filename: string) => `users/${uid}/generations/${generationId}/audio/${filename}`,
  video: (filename: string) => `users/${uid}/generations/${generationId}/videos/${filename}`,
  textExport: (filename: string) => `users/${uid}/generations/${generationId}/documents/${filename}`,
});

/**
 * Reference blueprint schemas for collection documents
 */
export interface FirestoreSchema {
  users: {
    [uid: string]: UserProfile;
  };
  generations: {
    [generationId: string]: GenerationRecord;
  };
  creditTransactions: {
    [transactionId: string]: CreditTransaction;
  };
  plans: {
    [planId: string]: PricingPlan;
  };
  systemSettings: {
    global: SystemSettings;
  };
}

/**
 * Security rule validation guidelines for Phase 2:
 * 1. Users can only read/write their own user document (request.auth.uid == resource.data.uid)
 * 2. Credits field can only be updated via trusted server functions/rules, never client-side overrides.
 * 3. Generations can only be read/deleted by their owner (resource.data.userId == request.auth.uid).
 * 4. Storage rules restrict reads and writes to request.auth.uid == userId path segments.
 */
export const FIREBASE_STATUS = {
  isConfigured: false,
  targetPhase: 'Phase 2 (Firebase Authentication & Firestore)',
  readyCollections: Object.values(COLLECTIONS),
};
