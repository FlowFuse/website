// Mirrors src/_data/blogTags.json (11ty). Kept as a small static duplicate here since
// @nuxt/content's file-per-item `data` collections don't fit a single 13-entry array file.
export interface BlogTag {
    label: string
    value: string
}

export const blogTags: BlogTag[] = [
    { label: 'All', value: 'posts' },
    { label: 'How-To', value: 'how-to' },
    { label: 'Node-RED', value: 'node-red' },
    { label: 'AI', value: 'ai' },
    { label: 'UNS', value: 'uns' },
    { label: 'Dashboard', value: 'dashboard' },
    { label: 'FlowFuse', value: 'flowfuse' },
    { label: 'Releases', value: 'releases' },
    { label: 'News', value: 'news' },
    { label: 'PLC', value: 'plc' },
    { label: 'MQTT', value: 'mqtt' },
    { label: 'OPC UA', value: 'opcua' },
    { label: 'Modbus', value: 'modbus' },
]
