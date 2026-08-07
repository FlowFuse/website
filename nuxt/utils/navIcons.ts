// Icon markup for the marketing nav, keyed exactly as src/_data/chrome.json spells it.
//
// These are the same files Eleventy's `navoption` shortcode reads, so both
// renderers draw the identical glyph from one source. The imports are listed
// explicitly rather than globbed: an eager glob of the icon directory would
// inline all of it (~137 KB, including large unused art) into the client bundle.
//
// Adding a nav entry with a new icon means adding one line here. nuxt/lib/chrome.test.mjs
// fails if chrome.json names a key this map does not cover, so CI will tell you.

import iAcademicCap from '../../src/_includes/components/icons/academic-cap.svg?raw'
import iAirplane from '../../src/_includes/components/icons/airplane.svg?raw'
import iArrowRight from '../../src/_includes/components/icons/arrow-right.svg?raw'
import iArrowsRightLeft from '../../src/_includes/components/icons/arrows-right-left.svg?raw'
import iBookOpen from '../../src/_includes/components/icons/book-open.svg?raw'
import iBuildingLibrary from '../../src/_includes/components/icons/building-library.svg?raw'
import iBuildingOffice2 from '../../src/_includes/components/icons/building-office-2.svg?raw'
import iCamera from '../../src/_includes/components/icons/camera.svg?raw'
import iCar from '../../src/_includes/components/icons/car.svg?raw'
import iCase from '../../src/_includes/components/icons/case.svg?raw'
import iCertificate from '../../src/_includes/components/icons/certificate.svg?raw'
import iChart from '../../src/_includes/components/icons/chart.svg?raw'
import iChat from '../../src/_includes/components/icons/chat.svg?raw'
import iChatBubbleLeftRightSm from '../../src/_includes/components/icons/chat-bubble-left-right-sm.svg?raw'
import iCheckBadge from '../../src/_includes/components/icons/check-badge.svg?raw'
import iChip from '../../src/_includes/components/icons/chip.svg?raw'
import iCircleStack from '../../src/_includes/components/icons/circle-stack.svg?raw'
import iCodeBracket from '../../src/_includes/components/icons/code-bracket.svg?raw'
import iCog from '../../src/_includes/components/icons/cog.svg?raw'
import iCog6Tooth from '../../src/_includes/components/icons/cog-6-tooth.svg?raw'
import iDashboard from '../../src/_includes/components/icons/dashboard.svg?raw'
import iDeviceAgent from '../../src/_includes/components/icons/device-agent.svg?raw'
import iDocumentText from '../../src/_includes/components/icons/document-text.svg?raw'
import iDollar from '../../src/_includes/components/icons/dollar.svg?raw'
import iFlowfuse from '../../src/_includes/components/icons/flowfuse.svg?raw'
import iFoodBeverage from '../../src/_includes/components/icons/food-beverage.svg?raw'
import iGithub from '../../src/_includes/components/icons/github.svg?raw'
import iLifebuoy from '../../src/_includes/components/icons/lifebuoy.svg?raw'
import iLockClosed from '../../src/_includes/components/icons/lock-closed.svg?raw'
import iMail from '../../src/_includes/components/icons/mail.svg?raw'
import iNewspaper from '../../src/_includes/components/icons/newspaper.svg?raw'
import iPower from '../../src/_includes/components/icons/power.svg?raw'
import iPresentation from '../../src/_includes/components/icons/presentation.svg?raw'
import iPulse from '../../src/_includes/components/icons/pulse.svg?raw'
import iPuzzlePiece from '../../src/_includes/components/icons/puzzle-piece.svg?raw'
import iRocketLaunch from '../../src/_includes/components/icons/rocket-launch.svg?raw'
import iScreen from '../../src/_includes/components/icons/screen.svg?raw'
import iServerStack from '../../src/_includes/components/icons/server-stack.svg?raw'
import iShare from '../../src/_includes/components/icons/share.svg?raw'
import iShieldCheck from '../../src/_includes/components/icons/shield-check.svg?raw'
import iSparkles from '../../src/_includes/components/icons/sparkles.svg?raw'
import iSquaresPlus from '../../src/_includes/components/icons/squares-plus.svg?raw'
import iStar from '../../src/_includes/components/icons/star.svg?raw'
import iUns from '../../src/_includes/components/icons/uns.svg?raw'
import iUserGroup from '../../src/_includes/components/icons/user-group.svg?raw'
import iWifi from '../../src/_includes/components/icons/wifi.svg?raw'
import iWindTurbine from '../../src/_includes/components/icons/wind-turbine.svg?raw'
import iWrenchScrewdriver from '../../src/_includes/components/icons/wrench-screwdriver.svg?raw'

export const navIcons: Record<string, string> = {
    'academic-cap': iAcademicCap,
    'airplane': iAirplane,
    'arrow-right': iArrowRight,
    'arrows-right-left': iArrowsRightLeft,
    'book-open': iBookOpen,
    'building-library': iBuildingLibrary,
    'building-office-2': iBuildingOffice2,
    'camera': iCamera,
    'car': iCar,
    'case': iCase,
    'certificate': iCertificate,
    'chart': iChart,
    'chat': iChat,
    'chat-bubble-left-right-sm': iChatBubbleLeftRightSm,
    'check-badge': iCheckBadge,
    'chip': iChip,
    'circle-stack': iCircleStack,
    'code-bracket': iCodeBracket,
    'cog': iCog,
    'cog-6-tooth': iCog6Tooth,
    'dashboard': iDashboard,
    'device-agent': iDeviceAgent,
    'document-text': iDocumentText,
    'dollar': iDollar,
    'flowfuse': iFlowfuse,
    'food-beverage': iFoodBeverage,
    'github': iGithub,
    'lifebuoy': iLifebuoy,
    'lock-closed': iLockClosed,
    'mail': iMail,
    'newspaper': iNewspaper,
    'power': iPower,
    'presentation': iPresentation,
    'pulse': iPulse,
    'puzzle-piece': iPuzzlePiece,
    'rocket-launch': iRocketLaunch,
    'screen': iScreen,
    'server-stack': iServerStack,
    'share': iShare,
    'shield-check': iShieldCheck,
    'sparkles': iSparkles,
    'squares-plus': iSquaresPlus,
    'star': iStar,
    'uns': iUns,
    'user-group': iUserGroup,
    'wifi': iWifi,
    'wind-turbine': iWindTurbine,
    'wrench-screwdriver': iWrenchScrewdriver,
}
