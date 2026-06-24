import type { IntegrationCatalogEntry } from '../types/integrations'

export const MANUAL_CERTIFIED_NODES: IntegrationCatalogEntry[] = [
    {
        _id: '@flowfuse-certified-nodes/rtsp',
        name: 'RTSP Video Feed',
        description: 'Connects to an RTSP camera stream and extracts still frames as PNG images',
        categories: ['hardware', 'ai'],
        npmScope: 'flowfuse-certified-nodes',
        ffCertified: true,
        docsUrl: '/node-red/flowfuse/edge/rtsp/',
        version: '',
        downloads: { week: 0 },
        updatedAt: ''
    }
]
