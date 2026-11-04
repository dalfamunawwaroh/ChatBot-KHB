import { prisma } from '../../config/prisma';
import { llmConfigured, ragChatConfigured } from '../../config/env';
import { getWorkspace } from '../../common/workspace';
import type { UpdateChatbotSettingsInput } from './chatbot.schema';

export interface ChatbotSettingsView {
  assistantName: string;
  greeting: string;
  language: string;
  tone: string;
  fallbackMode: string;
  showSources: boolean;
  autoEscalate: boolean;
  requestContact: boolean;
  allowGeneralKnowledge: boolean;
  generalDisclaimer: boolean;
  model: string | null;
  temperature: number;
  capabilities: {
    llmConfigured: boolean;
    ragChatConfigured: boolean;
    canAnswerGeneral: boolean;
  };
}

export async function getChatbotSettings(slug: string): Promise<ChatbotSettingsView> {
  const workspace = await getWorkspace(slug);
  const settings = workspace.settings;
  return {
    ...settings,
    capabilities: {
      llmConfigured,
      ragChatConfigured,
      canAnswerGeneral: llmConfigured && settings.allowGeneralKnowledge,
    },
  };
}

export async function updateChatbotSettings(
  slug: string,
  input: UpdateChatbotSettingsInput,
): Promise<ChatbotSettingsView> {
  const workspace = await getWorkspace(slug);
  await prisma.chatbotSetting.update({ where: { workspaceId: workspace.id }, data: input });
  return getChatbotSettings(slug);
}
