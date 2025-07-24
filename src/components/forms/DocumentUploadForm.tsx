'use client'

import { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

import {
  Upload,
  File,
  X,
  Loader2,
  FileText,
  Image,
  Archive,
  CheckCircle,
} from 'lucide-react';

import { DocumentType } from '@/types';
import { cn } from '@/lib/utils';
import { uploadDocumentSchema, type UploadDocumentFormData } from '@/utils/documentSchemas';
import { useUploadDocuments } from '@/hooks/useDocuments';

interface DocumentUploadFormProps {
  applicationId: string;
  applications?: Array<{ id: string; company: string; position: string }>;
  onSuccess?: () => void;
  onCancel?: () => void;
  className?: string;
}

const typeOptions = [
  { value: 'auto', label: 'Détection automatique' },
  { value: DocumentType.CV, label: 'CV' },
  { value: DocumentType.COVER_LETTER, label: 'Lettre de motivation' },
  { value: DocumentType.PORTFOLIO, label: 'Portfolio' },
  { value: DocumentType.CERTIFICATE, label: 'Certificat' },
  { value: DocumentType.OTHER, label: 'Autre' },
];

const getFileIcon = (type: string) => {
  if (type.startsWith('image/')) return Image;
  if (type.includes('pdf') || type.includes('word') || type.includes('text')) return FileText;
  if (type.includes('zip')) return Archive;
  return File;
};

const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
};

// Fonction utilitaire pour créer une FileList à partir d'un tableau de File
const createFileList = (files: File[]): FileList => {
  const dt = new DataTransfer();
  files.forEach(file => dt.items.add(file));
  return dt.files;
};

export const DocumentUploadForm: React.FC<DocumentUploadFormProps> = ({
  applicationId,
  applications = [],
  onSuccess,
  onCancel,
  className,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);

  // Hook pour l'upload
  const uploadDocuments = useUploadDocuments();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
    trigger,
  } = useForm<UploadDocumentFormData>({
    resolver: zodResolver(uploadDocumentSchema),
    defaultValues: {
      applicationId,
      name: '',
      type: undefined,
    },
  });

  const handleFileSelect = (files: FileList | null) => {
    if (!files) return;
    
    const newFiles = Array.from(files);
    const validFiles = newFiles.filter(file => {
      // Vérifications côté client basiques
      const maxSize = 10 * 1024 * 1024; // 10MB
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
      
      return file.size <= maxSize && allowedTypes.includes(file.type);
    });

    const updatedFiles = [...selectedFiles, ...validFiles].slice(0, 5); // Max 5 fichiers
    setSelectedFiles(updatedFiles);
    
    // Mettre à jour la FileList dans le formulaire
    const fileList = createFileList(updatedFiles);
    setValue('files', fileList);
    
    // Déclencher la validation
    trigger('files');
  };

  const removeFile = (index: number) => {
    const updatedFiles = selectedFiles.filter((_, i) => i !== index);
    setSelectedFiles(updatedFiles);
    
    // Mettre à jour la FileList dans le formulaire
    if (updatedFiles.length > 0) {
      const fileList = createFileList(updatedFiles);
      setValue('files', fileList);
    } else {
      setValue('files', createFileList([]));
    }
    
    // Déclencher la validation
    trigger('files');
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    handleFileSelect(e.dataTransfer.files);
  };

  const onSubmit = async (data: UploadDocumentFormData) => {
    try {
      // Vérifier que les fichiers sont présents
      if (!data.files || data.files.length === 0) {
        throw new Error('Aucun fichier sélectionné');
      }

      // Préparer les options
      const options: { name?: string; type?: string } = {};
      if (data.name && data.name.trim()) {
        options.name = data.name.trim();
      }
      if (data.type) {
        options.type = data.type;
      }

      // Appel au hook pour uploader
      await uploadDocuments.mutateAsync({
        files: data.files,
        applicationId: data.applicationId,
        options: Object.keys(options).length > 0 ? options : undefined,
      });

      // Réinitialiser le formulaire après succès
      setSelectedFiles([]);
      reset({
        applicationId: data.applicationId, // Garder l'applicationId
        name: '',
        type: undefined,
      });

      // Callback de succès
      onSuccess?.();
      
    } catch (error) {
      console.error('Erreur lors de l\'upload:', error);
      // L'erreur est déjà gérée par le hook (toast)
    }
  };

  // Calculer l'état de chargement
  const isUploading = uploadDocuments.isPending;
  const uploadProgress = isUploading ? 85 : 0; // Simulation du progrès

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Upload className="h-5 w-5" />
          <span>Upload de documents</span>
        </CardTitle>
        <CardDescription>
          Ajoutez des documents à votre candidature (PDF, Word, images, etc.)
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Sélection de candidature */}
          {applications.length > 0 && (
            <div className="space-y-2">
              <Label>Candidature associée</Label>
              <Select
                value={watch('applicationId')}
                onValueChange={(value) => setValue('applicationId', value)}
                disabled={isUploading}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner une candidature" />
                </SelectTrigger>
                <SelectContent>
                  {applications.map((app) => (
                    <SelectItem key={app.id} value={app.id}>
                      {app.position} - {app.company}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.applicationId && (
                <p className="text-sm text-red-500">{errors.applicationId.message}</p>
              )}
            </div>
          )}

          {/* Zone de drop */}
          <div
            className={cn(
              "border-2 border-dashed rounded-lg p-8 text-center transition-colors",
              isDragOver ? "border-blue-500 bg-blue-50" : "border-gray-300",
              selectedFiles.length > 0 && "border-green-500 bg-green-50",
              isUploading && "opacity-50 cursor-not-allowed"
            )}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            {selectedFiles.length === 0 ? (
              <>
                <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Glissez-déposez vos fichiers ici
                </h3>
                <p className="text-gray-500 mb-4">
                  ou cliquez pour sélectionner (max 5 fichiers, 10MB chacun)
                </p>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isUploading}
                >
                  Choisir des fichiers
                </Button>
              </>
            ) : (
              <>
                <CheckCircle className="mx-auto h-12 w-12 text-green-500 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {selectedFiles.length} fichier{selectedFiles.length > 1 ? 's' : ''} sélectionné{selectedFiles.length > 1 ? 's' : ''}
                </h3>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isUploading}
                >
                  Ajouter d&apos;autres fichiers
                </Button>
              </>
            )}
          </div>

          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png,.gif,.zip"
            onChange={(e) => handleFileSelect(e.target.files)}
            className="hidden"
            disabled={isUploading}
          />

          {/* Liste des fichiers sélectionnés */}
          {selectedFiles.length > 0 && (
            <div className="space-y-3">
              <Label>Fichiers sélectionnés</Label>
              <div className="space-y-2">
                {selectedFiles.map((file, index) => {
                  const FileIcon = getFileIcon(file.type);
                  return (
                    <div key={index} className="flex items-center space-x-3 p-3 border rounded-lg">
                      <FileIcon className="h-8 w-8 text-gray-400" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {file.name}
                        </p>
                        <div className="flex items-center space-x-2 text-xs text-gray-500">
                          <span>{formatFileSize(file.size)}</span>
                          <Badge variant="secondary" className="text-xs">
                            {file.type.split('/')[1]?.toUpperCase()}
                          </Badge>
                        </div>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeFile(index)}
                        disabled={isUploading}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  );
                })}
              </div>
              {errors.files && (
                <p className="text-sm text-red-500">{errors.files.message}</p>
              )}
            </div>
          )}

          {/* Options d'upload */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nom personnalisé (optionnel)</Label>
              <Input
                id="name"
                {...register('name')}
                placeholder="ex: CV - Version finale"
                disabled={isUploading}
              />
              {errors.name && (
                <p className="text-sm text-red-500">{errors.name.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label>Type de document</Label>
              <Select
                value={watch('type') || 'auto'}
                onValueChange={(value) => setValue('type', value === 'auto' ? undefined : value as DocumentType)}
                disabled={isUploading}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Type de document" />
                </SelectTrigger>
                <SelectContent>
                  {typeOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Progrès d'upload */}
          {isUploading && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Upload en cours...</span>
                <span>{uploadProgress}%</span>
              </div>
              <Progress value={uploadProgress} className="w-full" />
            </div>
          )}

          {/* Messages d'erreur de mutation */}
          {uploadDocuments.isError && (
            <div className="bg-red-50 border border-red-200 rounded-md p-3">
              <p className="text-sm text-red-700">
                {uploadDocuments.error?.message || 'Erreur lors de l\'upload des documents'}
              </p>
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-end space-x-2">
            {onCancel && (
              <Button type="button" variant="outline" onClick={onCancel} disabled={isUploading}>
                Annuler
              </Button>
            )}
            <Button 
              type="submit" 
              disabled={selectedFiles.length === 0 || isUploading}
            >
              {isUploading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isUploading ? 'Upload en cours...' : `Uploader ${selectedFiles.length} fichier${selectedFiles.length > 1 ? 's' : ''}`}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};