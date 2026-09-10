// SVG files that page content included raw, with no wrapper: {% include "components/icons/
// x.svg" %} rather than the `navoption`/`ffIconLg` shortcodes that NavIcon reproduces.
//
// They cannot go through NavIcon or an <img>:
//  - NavIcon wraps its payload in an outer <svg viewBox="0 0 24 24"> carrying a fixed
//    ff-icon size class, which would crop the ones drawn on a 93x80 or 220x220 canvas.
//  - <img> breaks `currentColor`, and all but the SOC 2 badge are coloured by the class
//    on their container.
//
// Every file here already declares width="100%" height="100%", so it sizes to whatever
// box the caller puts it in, exactly as the {% include %} did.
//
// Imports are listed explicitly rather than globbed, for the same reason navIcons.ts
// does: an eager glob of the icon directory inlines all ~137 KB of it into the bundle.
import aAirGappedDeployment from '../../src/_includes/components/icons/air-gapped-deployment.svg?raw'
import aAuditLogs from '../../src/_includes/components/icons/audit-logs.svg?raw'
import aCertificate from '../../src/_includes/components/icons/certificate.svg?raw'
import aClipboardDocumentCheck from '../../src/_includes/components/icons/clipboard-document-check.svg?raw'
import aDocumentChartBar from '../../src/_includes/components/icons/document-chart-bar.svg?raw'
import aRoleBasedAccess from '../../src/_includes/components/icons/role-based-access.svg?raw'
import aShieldCheck from '../../src/_includes/components/icons/shield-check.svg?raw'
import aSingleSignOn from '../../src/_includes/components/icons/single-sign-on.svg?raw'
import aSoc2Badge from '../../src/_includes/components/icons/soc-2-badge.svg?raw'

export const siteArt: Record<string, string> = {
    'air-gapped-deployment': aAirGappedDeployment,
    'audit-logs': aAuditLogs,
    'certificate': aCertificate,
    'clipboard-document-check': aClipboardDocumentCheck,
    'document-chart-bar': aDocumentChartBar,
    'role-based-access': aRoleBasedAccess,
    'shield-check': aShieldCheck,
    'single-sign-on': aSingleSignOn,
    'soc-2-badge': aSoc2Badge,
}
