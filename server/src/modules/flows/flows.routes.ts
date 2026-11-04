import { Router } from 'express';
import { z } from 'zod';
import { prisma } from '../../config/prisma';
import { asyncHandler, created, ok } from '../../common/http/response';
import { validate, validated } from '../../common/middleware/validate';
import { notFound } from '../../common/errors/app-error';
import { getWorkspace, resolveSlug } from '../../common/workspace';

const nodeSchema = z.object({
  kind: z.enum(['greeting', 'question', 'answer', 'escalation']).default('question'),
  title: z.string().trim().min(2).max(150),
  description: z.string().trim().max(2_000).default(''),
  sortOrder: z.number().int().min(0).max(999).default(0),
  isActive: z.boolean().default(true),
});

const updateNodeSchema = nodeSchema.partial();

export const flowsRouter = Router();

/** GET /api/v1/flows — node alur percakapan (halaman Flow Builder). */
flowsRouter.get(
  '/',
  asyncHandler(async (req, res) => {
    const workspace = await getWorkspace(resolveSlug(req.header('x-workspace-slug')));
    const nodes = await prisma.flowNode.findMany({
      where: { workspaceId: workspace.id },
      orderBy: { sortOrder: 'asc' },
    });
    ok(
      res,
      nodes.map((node) => ({
        id: node.id,
        kind: node.kind,
        title: node.title,
        description: node.description,
        sortOrder: node.sortOrder,
        isActive: node.isActive,
      })),
    );
  }),
);

flowsRouter.post(
  '/',
  validate(nodeSchema),
  asyncHandler(async (req, res) => {
    const workspace = await getWorkspace(resolveSlug(req.header('x-workspace-slug')));
    const node = await prisma.flowNode.create({
      data: { workspaceId: workspace.id, ...validated<z.infer<typeof nodeSchema>>(req) },
    });
    created(res, node);
  }),
);

flowsRouter.patch(
  '/:id',
  validate(updateNodeSchema),
  asyncHandler(async (req, res) => {
    const workspace = await getWorkspace(resolveSlug(req.header('x-workspace-slug')));
    const existing = await prisma.flowNode.findFirst({
      where: { id: String(req.params.id ?? ''), workspaceId: workspace.id },
    });
    if (!existing) throw notFound('Node alur tidak ditemukan');
    const node = await prisma.flowNode.update({
      where: { id: existing.id },
      data: validated<z.infer<typeof updateNodeSchema>>(req),
    });
    ok(res, node);
  }),
);

flowsRouter.delete(
  '/:id',
  asyncHandler(async (req, res) => {
    const workspace = await getWorkspace(resolveSlug(req.header('x-workspace-slug')));
    const existing = await prisma.flowNode.findFirst({
      where: { id: String(req.params.id ?? ''), workspaceId: workspace.id },
    });
    if (!existing) throw notFound('Node alur tidak ditemukan');
    await prisma.flowNode.delete({ where: { id: existing.id } });
    ok(res, { id: existing.id });
  }),
);
