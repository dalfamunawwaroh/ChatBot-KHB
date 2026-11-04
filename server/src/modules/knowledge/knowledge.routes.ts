import { Router } from 'express';
import { asyncHandler, created, ok, paginated } from '../../common/http/response';
import { validate, validated } from '../../common/middleware/validate';
import { getWorkspace, resolveSlug } from '../../common/workspace';
import {
  createDocumentSchema,
  listDocumentsQuerySchema,
  updateDocumentSchema,
  type CreateDocumentInput,
  type ListDocumentsQuery,
  type UpdateDocumentInput,
} from './knowledge.schema';
import {
  createDocument,
  deleteDocument,
  getKnowledgeStats,
  listDocuments,
  updateDocument,
} from './knowledge.service';

export const knowledgeRouter = Router();

/** GET /api/v1/knowledge — daftar dokumen + filter + paginasi. */
knowledgeRouter.get(
  '/',
  validate(listDocumentsQuerySchema, 'query'),
  asyncHandler(async (req, res) => {
    const workspace = await getWorkspace(resolveSlug(req.header('x-workspace-slug')));
    const query = validated<ListDocumentsQuery>(req, 'query');
    const { rows, total } = await listDocuments(workspace.id, query);
    paginated(res, rows, { page: query.page, perPage: query.perPage, total });
  }),
);

/** GET /api/v1/knowledge/stats — ringkasan untuk kartu statistik. */
knowledgeRouter.get(
  '/stats',
  asyncHandler(async (req, res) => {
    const workspace = await getWorkspace(resolveSlug(req.header('x-workspace-slug')));
    ok(res, await getKnowledgeStats(workspace.id));
  }),
);

/** POST /api/v1/knowledge — tambah dokumen (teks hasil ekstraksi). */
knowledgeRouter.post(
  '/',
  validate(createDocumentSchema),
  asyncHandler(async (req, res) => {
    const workspace = await getWorkspace(resolveSlug(req.header('x-workspace-slug')));
    created(res, await createDocument(workspace.id, validated<CreateDocumentInput>(req)));
  }),
);

/** PATCH /api/v1/knowledge/:id */
knowledgeRouter.patch(
  '/:id',
  validate(updateDocumentSchema),
  asyncHandler(async (req, res) => {
    const workspace = await getWorkspace(resolveSlug(req.header('x-workspace-slug')));
    ok(res, await updateDocument(workspace.id, String(req.params.id ?? ''), validated<UpdateDocumentInput>(req)));
  }),
);

/** DELETE /api/v1/knowledge/:id */
knowledgeRouter.delete(
  '/:id',
  asyncHandler(async (req, res) => {
    const workspace = await getWorkspace(resolveSlug(req.header('x-workspace-slug')));
    ok(res, await deleteDocument(workspace.id, String(req.params.id ?? '')));
  }),
);
