import { defineEventHandler, getRouterParam, createError } from 'h3'
import { buildEnrichedIntegrations } from '../../utils/integrations-enrich'

export default defineEventHandler(async (event) => {
    const id = getRouterParam(event, 'id')
    if (!id) {
        throw createError({ statusCode: 400, statusMessage: 'Missing id' })
    }

    const all = await buildEnrichedIntegrations()
    const node = all.find(n => n._id === id)
    if (!node) {
        throw createError({ statusCode: 404, statusMessage: `Integration not found: ${id}` })
    }

    return node
})
