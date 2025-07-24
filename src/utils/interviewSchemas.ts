import { z } from 'zod';
import { InterviewType } from '@/types';

export const interviewSchema = z.object({
  applicationId: z
    .string()
    .min(1, 'L\'ID de la candidature est requis'),
  type: z.nativeEnum(InterviewType, {
    errorMap: () => ({ message: 'Type d\'entretien requis' }),
  }),
  scheduledAt: z
    .string()
    .min(1, 'La date et l\'heure sont requises')
    .refine((date) => {
      const scheduledDate = new Date(date);
      const now = new Date();
      return scheduledDate > now;
    }, 'La date doit être dans le futur'),
  duration: z
    .number()
    .min(15, 'La durée minimale est de 15 minutes')
    .max(480, 'La durée maximale est de 8 heures')
    .optional(),
  notes: z
    .string()
    .max(1000, 'Les notes ne peuvent pas dépasser 1000 caractères')
    .optional(),
  feedback: z
    .string()
    .max(2000, 'Le feedback ne peut pas dépasser 2000 caractères')
    .optional(),
  interviewers: z
    .array(z.string().min(1, 'Le nom de l\'intervieweur ne peut pas être vide'))
    .min(1, 'Au moins un intervieweur est requis')
    .max(10, 'Maximum 10 intervieweurs'),
});

// Schema pour la validation lors de l'édition (tous les champs optionnels sauf type et scheduledAt)
export const updateInterviewSchema = z.object({
  applicationId: z.string().optional(),
  type: z.nativeEnum(InterviewType).optional(),
  scheduledAt: z
    .string()
    .optional()
    .refine((date) => {
      if (!date) return true; // Optional field
      const scheduledDate = new Date(date);
      const now = new Date();
      return scheduledDate > now;
    }, 'La date doit être dans le futur'),
  duration: z
    .number()
    .min(15, 'La durée minimale est de 15 minutes')
    .max(480, 'La durée maximale est de 8 heures')
    .optional(),
  notes: z
    .string()
    .max(1000, 'Les notes ne peuvent pas dépasser 1000 caractères')
    .optional(),
  feedback: z
    .string()
    .max(2000, 'Le feedback ne peut pas dépasser 2000 caractères')
    .optional(),
  interviewers: z
    .array(z.string().min(1, 'Le nom de l\'intervieweur ne peut pas être vide'))
    .min(1, 'Au moins un intervieweur est requis')
    .max(10, 'Maximum 10 intervieweurs')
    .optional(),
});

// Schema pour les filtres de recherche (aligné sur le backend)
export const interviewFiltersSchema = z.object({
  page: z.number().min(1).optional(),
  limit: z.number().min(1).max(100).optional(),
  type: z.nativeEnum(InterviewType).optional(),
  applicationId: z.string().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  sortBy: z.enum(['scheduledAt', 'type', 'createdAt']).optional(), // Supprimé 'duration' selon le backend
  sortOrder: z.enum(['asc', 'desc']).optional(),
  upcoming: z.boolean().optional(),
  past: z.boolean().optional(),
});

export type InterviewFormData = z.infer<typeof interviewSchema>;
export type UpdateInterviewFormData = z.infer<typeof updateInterviewSchema>;
export type InterviewFiltersData = z.infer<typeof interviewFiltersSchema>;