import { ICredentialType, INodeProperties } from 'n8n-workflow';

export class SpacKitApi implements ICredentialType {
  name = 'spacKitApi';
  displayName = 'SPAC-KIT API';
  documentationUrl = 'https://github.com/Pi-R-SQUARE-Co-ltd/spac-kit';
  properties: INodeProperties[] = [
    {
      displayName: 'Anthropic API Key',
      name: 'anthropicApiKey',
      type: 'string',
      typeOptions: { password: true },
      default: '',
      description: 'API key for Claude AI auto-fill feature (optional)',
    },
  ];
}
