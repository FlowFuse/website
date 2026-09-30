export function withTrailingSlash(path: string): string {
    return path.endsWith('/') ? path : `${path}/`
}
