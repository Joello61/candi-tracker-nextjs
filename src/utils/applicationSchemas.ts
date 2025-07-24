import { z } from 'zod';
import { ApplicationStatus } from '@/types';

export const applicationSchema = z.object({
  company: z
    .string()
    .min(1, 'Le nom de l\'entreprise est requis')
    .max(100, 'Le nom ne peut pas dépasser 100 caractères'),
  position: z
    .string()
    .min(1, 'Le poste est requis')
    .max(100, 'Le poste ne peut pas dépasser 100 caractères'),
  status: z.nativeEnum(ApplicationStatus).optional(),
  appliedAt: z
    .string()
    .optional(),
  notes: z
    .string()
    .max(1000, 'Les notes ne peuvent pas dépasser 1000 caractères')
    .optional(),
  salary: z
    .string()
    .max(50, 'Le salaire ne peut pas dépasser 50 caractères')
    .optional(),
  location: z
    .string()
    .max(100, 'La localisation ne peut pas dépasser 100 caractères')
    .optional(),
  jobUrl: z
    .string()
    .url('URL invalide')
    .optional()
    .or(z.literal('')),
  contactName: z
    .string()
    .max(100, 'Le nom du contact ne peut pas dépasser 100 caractères')
    .optional(),
  contactEmail: z
    .string()
    .email('Email invalide')
    .optional()
    .or(z.literal('')),
});

export type ApplicationFormData = z.infer<typeof applicationSchema>;