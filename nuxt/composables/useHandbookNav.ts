import { getHandbookNav } from '../utils/sharedContent'

export const useHandbookNav = () =>
    useAsyncData('handbook-nav', () => getHandbookNav())
