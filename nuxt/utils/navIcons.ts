// Icon markup for the marketing nav, keyed exactly as src/_data/chrome.json spells it,
// plus the handful of keys page content asks for by name through <NavIcon>.
//
// These are the same files Eleventy's `navoption` shortcode reads, so both
// renderers draw the identical glyph from one source. The imports are listed
// explicitly rather than globbed: an eager glob of the icon directory would
// inline all of it (~137 KB, including large unused art) into the client bundle.
//
// Adding a nav entry with a new icon means adding one line here. nuxt/lib/chrome.test.mjs
// fails if chrome.json names a key this map does not cover, so CI will tell you.

import iAcademicCap from '../assets/icons/academic-cap.svg?raw'
import iAirplane from '../assets/icons/airplane.svg?raw'
import iArrowRight from '../assets/icons/arrow-right.svg?raw'
import iArrowTrendingUp from '../assets/icons/arrow-trending-up.svg?raw'
import iArrowsPointingOut from '../assets/icons/arrows-pointing-out.svg?raw'
import iArrowsRightLeft from '../assets/icons/arrows-right-left.svg?raw'
import iBellAlert from '../assets/icons/bell-alert.svg?raw'
import iBolt from '../assets/icons/bolt.svg?raw'
import iBookOpen from '../assets/icons/book-open.svg?raw'
import iBuildingLibrary from '../assets/icons/building-library.svg?raw'
import iBuildingOffice2 from '../assets/icons/building-office-2.svg?raw'
import iCamera from '../assets/icons/camera.svg?raw'
import iCar from '../assets/icons/car.svg?raw'
import iCase from '../assets/icons/case.svg?raw'
import iCertificate from '../assets/icons/certificate.svg?raw'
import iChart from '../assets/icons/chart.svg?raw'
import iClipboardDocumentCheck from '../assets/icons/clipboard-document-check.svg?raw'
import iClock from '../assets/icons/clock.svg?raw'
import iCloud from '../assets/icons/cloud.svg?raw'
import iCodeblock from '../assets/icons/codeblock.svg?raw'
import iChat from '../assets/icons/chat.svg?raw'
import iComputerDesktop from '../assets/icons/computer-desktop.svg?raw'
import iCubeTransparent from '../assets/icons/cube-transparent.svg?raw'
import iData from '../assets/icons/data.svg?raw'
import iDatabase from '../assets/icons/database.svg?raw'
import iDocumentCheck from '../assets/icons/document-check.svg?raw'
import iFactory from '../assets/icons/factory.svg?raw'
import iGlobeAlt from '../assets/icons/globe-alt.svg?raw'
import iLink from '../assets/icons/link.svg?raw'
import iLock from '../assets/icons/lock.svg?raw'
import iChatBubbleLeftRightSm from '../assets/icons/chat-bubble-left-right-sm.svg?raw'
import iCheckBadge from '../assets/icons/check-badge.svg?raw'
import iChip from '../assets/icons/chip.svg?raw'
import iCircleStack from '../assets/icons/circle-stack.svg?raw'
import iCodeBracket from '../assets/icons/code-bracket.svg?raw'
import iCog from '../assets/icons/cog.svg?raw'
import iCog6Tooth from '../assets/icons/cog-6-tooth.svg?raw'
import iDashboard from '../assets/icons/dashboard.svg?raw'
import iDeviceAgent from '../assets/icons/device-agent.svg?raw'
import iDocumentText from '../assets/icons/document-text.svg?raw'
import iDollar from '../assets/icons/dollar.svg?raw'
import iFlowfuse from '../assets/icons/flowfuse.svg?raw'
import iFoodBeverage from '../assets/icons/food-beverage.svg?raw'
import iGithub from '../assets/icons/github.svg?raw'
import iLifebuoy from '../assets/icons/lifebuoy.svg?raw'
import iLockClosed from '../assets/icons/lock-closed.svg?raw'
import iMail from '../assets/icons/mail.svg?raw'
import iNewspaper from '../assets/icons/newspaper.svg?raw'
import iPower from '../assets/icons/power.svg?raw'
import iPresentation from '../assets/icons/presentation.svg?raw'
import iPulse from '../assets/icons/pulse.svg?raw'
import iPuzzlePiece from '../assets/icons/puzzle-piece.svg?raw'
import iRectangleStack from '../assets/icons/rectangle-stack.svg?raw'
import iRocketLaunch from '../assets/icons/rocket-launch.svg?raw'
import iScreen from '../assets/icons/screen.svg?raw'
import iServerStack from '../assets/icons/server-stack.svg?raw'
import iShare from '../assets/icons/share.svg?raw'
import iShieldCheck from '../assets/icons/shield-check.svg?raw'
import iSparkles from '../assets/icons/sparkles.svg?raw'
import iSquaresPlus from '../assets/icons/squares-plus.svg?raw'
import iStar from '../assets/icons/star.svg?raw'
import iUns from '../assets/icons/uns.svg?raw'
import iUserGroup from '../assets/icons/user-group.svg?raw'
import iWifi from '../assets/icons/wifi.svg?raw'
import iWindTurbine from '../assets/icons/wind-turbine.svg?raw'
import iWrenchScrewdriver from '../assets/icons/wrench-screwdriver.svg?raw'

export const navIcons: Record<string, string> = {
    'academic-cap': iAcademicCap,
    'airplane': iAirplane,
    'arrow-right': iArrowRight,
    'arrow-trending-up': iArrowTrendingUp,
    'arrows-pointing-out': iArrowsPointingOut,
    'arrows-right-left': iArrowsRightLeft,
    'bell-alert': iBellAlert,
    'bolt': iBolt,
    'book-open': iBookOpen,
    'building-library': iBuildingLibrary,
    'building-office-2': iBuildingOffice2,
    'camera': iCamera,
    'car': iCar,
    'case': iCase,
    'certificate': iCertificate,
    'chart': iChart,
    'chat': iChat,
    'clipboard-document-check': iClipboardDocumentCheck,
    'clock': iClock,
    'cloud': iCloud,
    'codeblock': iCodeblock,
    'computer-desktop': iComputerDesktop,
    'cube-transparent': iCubeTransparent,
    'data': iData,
    'database': iDatabase,
    'document-check': iDocumentCheck,
    'factory': iFactory,
    'globe-alt': iGlobeAlt,
    'link': iLink,
    'lock': iLock,
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
    'rectangle-stack': iRectangleStack,
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
