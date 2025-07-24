import { z } from 'zod';
import { DocumentType } from '@/types';

// Schéma pour l'upload de documents
export const uploadDocumentSchema = z.object({
  applicationId: z
    .string()
    .min(1, 'L\'ID de la candidature est requis'),
  files: z
    .instanceof(FileList)
    .refine(files => files.length > 0, 'Au moins un fichier est requis')
    .refine(files => files.length <= 5, 'Maximum 5 fichiers autorisés')
    .refine(
      files => Array.from(files).every(file => file.size <= 10 * 1024 * 1024),
      'Chaque fichier doit faire moins de 10MB'
    )
    .refine(
      files => Array.from(files).every(file => {
        const allowedTypes = [
          'application/pdf',
          'application/msword',
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
          'text/plain',
          'image/jpeg',
          'image/png',
          'image/gif',
          'application/zip',
          'application/x-zip-compressed'
        ];
        return allowedTypes.includes(file.type);
      }),
      'Types de fichiers non autorisés. Formats acceptés: PDF, Word, TXT, images, ZIP'
    ),
  name: z
    .string()
    .max(100, 'Le nom ne peut pas dépasser 100 caractères')
    .optional(),
  type: z.nativeEnum(DocumentType).optional(),
});

// Schéma pour la mise à jour d'un document
export const updateDocumentSchema = z.object({
  name: z
    .string()
    .min(1, 'Le nom est requis')
    .max(100, 'Le nom ne peut pas dépasser 100 caractères')
    .optional(),
  type: z.nativeEnum(DocumentType).optional(),
});

// Schéma pour les filtres de documents
export const documentFiltersSchema = z.object({
  page: z.number().min(1).optional(),
  limit: z.number().min(1).max(100).optional(),
  type: z.nativeEnum(DocumentType).optional(),
  applicationId: z.string().optional(),
  search: z.string().optional(),
  sortBy: z.enum(['name', 'type', 'createdAt', 'size']).optional(),
  sortOrder: z.enum(['asc', 'desc']).optional(),
});

// Schéma pour la suppression en masse
export const bulkDeleteSchema = z.object({
  ids: z
    .array(z.string().min(1))
    .min(1, 'Au moins un document doit être sélectionné')
    .max(50, 'Maximum 50 documents peuvent être supprimés à la fois'),
});

export type UploadDocumentFormData = z.infer<typeof uploadDocumentSchema>;
export type UpdateDocumentFormData = z.infer<typeof updateDocumentSchema>;
export type DocumentFiltersData = z.infer<typeof documentFiltersSchema>;
export type BulkDeleteData = z.infer<typeof bulkDeleteSchema>;