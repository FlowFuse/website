function countWords(node: any): number {
    if (!node) return 0
    if (node.type === 'text') return (node.value ?? '').trim().split(/\s+/).filter(Boolean).length
    if (Array.isArray(node.children)) return node.children.reduce((sum: number, child: any) => sum + countWords(child), 0)
    return 0
}

const WORDS_PER_MINUTE = 200

export function estimateReadingMinutes(body: unknown): number {
    return Math.max(1, Math.ceil(countWords(body) / WORDS_PER_MINUTE))
}
