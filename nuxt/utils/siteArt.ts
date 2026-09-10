// SVG files that page content included raw, with no wrapper: {% include "components/icons/
// x.svg" %} rather than the `navoption`/`ffIconLg` shortcodes that NavIcon reproduces.
//
// They cannot go through NavIcon or an <img>:
//  - NavIcon wraps its payload in an outer <svg> carrying a fixed ff-icon size class,
//    which would override the size the caller's box sets.
//  - <img> breaks `currentColor`, and these are coloured by the class on their container.
//
// The larger enterprise/SOC 2 art from the same directory is NOT here: it already has
// hand-written Vue components under components/icons/, used by <EnterpriseSecurity>.
//
// Every file here declares width="100%" height="100%", so it sizes to whatever box the
// caller puts it in, exactly as the {% include %} did.
import aCertificate from '../../src/_includes/components/icons/certificate.svg?raw'
import aClipboardDocumentCheck from '../../src/_includes/components/icons/clipboard-document-check.svg?raw'
import aDocumentChartBar from '../../src/_includes/components/icons/document-chart-bar.svg?raw'
import aShieldCheck from '../../src/_includes/components/icons/shield-check.svg?raw'

export const siteArt: Record<string, string> = {
    'certificate': aCertificate,
    'clipboard-document-check': aClipboardDocumentCheck,
    'document-chart-bar': aDocumentChartBar,
    'shield-check': aShieldCheck,
}
