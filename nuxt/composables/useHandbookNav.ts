export const useHandbookNav = () =>
    useAsyncData('handbook-nav', () => queryCollectionNavigation('handbook'))
