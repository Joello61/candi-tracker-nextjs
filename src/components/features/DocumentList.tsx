'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

import {
  FileText,
  Image,
  Archive,
  File,
  MoreHorizontal,
  Edit,
  Trash2,
  Download,
  Eye,
  Building2,
  Calendar,
  HardDrive,
  Plus,
} from 'lucide-react';

import { type DocumentWithApplication, DocumentType } from '@/types';
import {
  useDeleteDocument,
  useDeleteDocuments,
  useDownloadDocument,
} from '@/hooks/useDocuments';

interface DocumentListProps {
  documents: DocumentWithApplication[];
  loading?: boolean;
  selectable?: boolean;
  onSelectionChange?: (selectedIds: string[]) => void;
  selectedIds?: string[];
}

const typeIcons = {
  [DocumentType.CV]: FileText,
  [DocumentType.COVER_LETTER]: FileText,
  [DocumentType.PORTFOLIO]: Image,
  [DocumentType.CERTIFICATE]: FileText,
  [DocumentType.OTHER]: File,
};

const typeLabels = {
  [DocumentType.CV]: 'CV',
  [DocumentType.COVER_LETTER]: 'Lettre de motivation',
  [DocumentType.PORTFOLIO]: 'Portfolio',
  [DocumentType.CERTIFICATE]: 'Certificat',
  [DocumentType.OTHER]: 'Autre',
};

const typeVariants = {
  [DocumentType.CV]: 'default' as const,
  [DocumentType.COVER_LETTER]: 'secondary' as const,
  [DocumentType.PORTFOLIO]: 'outline' as const,
  [DocumentType.CERTIFICATE]: 'default' as const,
  [DocumentType.OTHER]: 'secondary' as const,
};

const getFileIcon = (url: string, type: DocumentType) => {
  const extension = url.split('.').pop()?.toLowerCase();

  if (['jpg', 'jpeg', 'png', 'gif'].includes(extension || '')) return Image;
  if (['zip', 'rar', '7z'].includes(extension || '')) return Archive;

  return typeIcons[type] || File;
};

const formatFileSize = (bytes?: number): string => {
  if (!bytes) return 'Taille inconnue';
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
};

const getFileName = (url: string, name: string): string => {
  if (name && name.trim()) return name;
  return url.split('/').pop() || 'Document sans nom';
};

export const DocumentList: React.FC<DocumentListProps> = ({
  documents,
  loading,
  selectable = false,
  onSelectionChange,
  selectedIds = [],
}) => {
  const navigate = useRouter();
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [showBulkDeleteDialog, setShowBulkDeleteDialog] = useState(false);

  const deleteDocument = useDeleteDocument();
  const deleteDocuments = useDeleteDocuments();
  const downloadDocument = useDownloadDocument();

  const handleDelete = async () => {
    if (deleteId) {
      await deleteDocument.mutateAsync(deleteId);
      setDeleteId(null);
    }
  };

  const handleBulkDelete = async () => {
    if (selectedIds.length > 0) {
      await deleteDocuments.mutateAsync(selectedIds);
      setShowBulkDeleteDialog(false);
      onSelectionChange?.([]);
    }
  };

  const handleDownload = async (document: DocumentWithApplication) => {
    const filename = getFileName(document.url, document.name);
    await downloadDocument.mutateAsync({
      id: document.id,
      filename,
    });
  };

  const handleSelectionChange = (documentId: string, checked: boolean) => {
    if (!onSelectionChange) return;

    const newSelection = checked
      ? [...selectedIds, documentId]
      : selectedIds.filter((id) => id !== documentId);

    onSelectionChange(newSelection);
  };

  const handleSelectAll = (checked: boolean) => {
    if (!onSelectionChange) return;

    onSelectionChange(checked ? documents.map((doc) => doc.id) : []);
  };

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <Card key={i}>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <Skeleton className="h-12 w-12 rounded-lg" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-48" />
                  <Skeleton className="h-3 w-32" />
                  <Skeleton className="h-3 w-24" />
                </div>
                <Skeleton className="h-6 w-20" />
                <Skeleton className="h-8 w-8" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (documents.length === 0) {
    return (
      <Card>
        <CardContent className="text-center py-12">
          <FileText className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Aucun document trouvé
          </h3>
          <p className="text-gray-500 mb-6">
            Aucun document ne correspond à vos critères de recherche.
          </p>
          <Button onClick={() => navigate.push('/documents/upload')}>
            <Plus className="h-4 w-4 mr-2" />
            Ajouter un document
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      {/* En-tête avec sélection en masse */}
      {selectable && (
        <div className="flex items-center justify-between mb-4 p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center space-x-4">
            <Checkbox
              checked={selectedIds.length === documents.length}
              onCheckedChange={handleSelectAll}
              className="h-4 w-4"
            />
            <span className="text-sm text-gray-600">
              {selectedIds.length > 0
                ? `${selectedIds.length} document${
                    selectedIds.length > 1 ? 's' : ''
                  } sélectionné${selectedIds.length > 1 ? 's' : ''}`
                : `Sélectionner tout (${documents.length})`}
            </span>
          </div>

          {selectedIds.length > 0 && (
            <Button
              variant="destructive"
              size="sm"
              onClick={() => setShowBulkDeleteDialog(true)}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Supprimer la sélection
            </Button>
          )}
        </div>
      )}

      {/* Liste des documents */}
      <div className="space-y-4">
        {documents.map((document) => {
          const FileIcon = getFileIcon(document.url, document.type);
          const filename = getFileName(document.url, document.name);

          return (
            <Card
              key={document.id}
              className="hover:shadow-md transition-shadow"
            >
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  {/* Checkbox de sélection */}
                  {selectable && (
                    <Checkbox
                      checked={selectedIds.includes(document.id)}
                      onCheckedChange={(checked) =>
                        handleSelectionChange(document.id, checked as boolean)
                      }
                      className="h-4 w-4"
                    />
                  )}

                  {/* Icône du fichier */}
                  <div className="flex-shrink-0">
                    <div className="h-12 w-12 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
                      <FileIcon className="h-6 w-6" />
                    </div>
                  </div>

                  {/* Informations du document */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2">
                      <h3 className="text-lg font-semibold text-gray-900 truncate">
                        {filename}
                      </h3>
                      <Badge
                        variant={typeVariants[document.type]}
                        className="text-xs"
                      >
                        {typeLabels[document.type]}
                      </Badge>
                    </div>

                    {/* Candidature associée */}
                    {document.application && (
                      <div className="flex items-center space-x-2 mt-1">
                        <Building2 className="h-4 w-4 text-gray-400" />
                        <span
                          className="text-sm font-medium text-gray-700 cursor-pointer hover:text-blue-600"
                          onClick={() =>
                            navigate.push(
                              `/applications/${document.application?.id}`
                            )
                          }
                        >
                          {document.application.position} -{' '}
                          {document.application.company}
                        </span>
                      </div>
                    )}

                    {/* Métadonnées */}
                    <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <HardDrive className="h-3 w-3" />
                        <span>{formatFileSize(document.size)}</span>
                      </div>

                      <div className="flex items-center space-x-1">
                        <Calendar className="h-3 w-3" />
                        <span>
                          {formatDistanceToNow(new Date(document.createdAt), {
                            addSuffix: true,
                            locale: fr,
                          })}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Actions rapides */}
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDownload(document)}
                      disabled={downloadDocument.isPending}
                    >
                      <Download className="h-4 w-4" />
                    </Button>

                    {/* Menu actions */}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                          onClick={() => handleDownload(document)}
                        >
                          <Download className="h-4 w-4 mr-2" />
                          Télécharger
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => window.open(document.url, '_blank')}
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          Aperçu
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() =>
                            navigate.push(`/documents/${document.id}/edit`)
                          }
                        >
                          <Edit className="h-4 w-4 mr-2" />
                          Modifier
                        </DropdownMenuItem>
                        {document.application && (
                          <DropdownMenuItem
                            onClick={() =>
                              navigate.push(
                                `/applications/${document.application?.id}`
                              )
                            }
                          >
                            <Building2 className="h-4 w-4 mr-2" />
                            Voir la candidature
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => setDeleteId(document.id)}
                          className="text-red-600"
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Supprimer
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Dialog de confirmation de suppression individuelle */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Supprimer le document</AlertDialogTitle>
            <AlertDialogDescription>
              Êtes-vous sûr de vouloir supprimer ce document ? Cette action est
              irréversible.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700"
              disabled={deleteDocument.isPending}
            >
              {deleteDocument.isPending ? 'Suppression...' : 'Supprimer'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Dialog de confirmation de suppression en masse */}
      <AlertDialog
        open={showBulkDeleteDialog}
        onOpenChange={setShowBulkDeleteDialog}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Supprimer les documents sélectionnés
            </AlertDialogTitle>
            <AlertDialogDescription>
              Êtes-vous sûr de vouloir supprimer {selectedIds.length} document
              {selectedIds.length > 1 ? 's' : ''} ? Cette action est
              irréversible.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleBulkDelete}
              className="bg-red-600 hover:bg-red-700"
              disabled={deleteDocuments.isPending}
            >
              {deleteDocuments.isPending ? 'Suppression...' : 'Supprimer tout'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
