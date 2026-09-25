// Icon markup for the marketing nav, keyed exactly as nuxt/data/chrome.json spells it,
// plus the handful of keys page content asks for by name through <NavIcon>.
//
// The imports are listed explicitly rather than globbed: an eager glob of the icon
// directory would inline all of it (~137 KB, including large unused art) into the
// client bundle.
//
// Adding a nav entry with a new icon means adding one line here. nuxt/lib/chrome.test.mjs
// fails if chrome.json names a key this map does not cover, so CI will tell you.

import iAcademicCap from '../assets/nav-icons/academic-cap.svg?raw'
import iAirplane from '../assets/nav-icons/airplane.svg?raw'
import iArrowRight from '../assets/nav-icons/arrow-right.svg?raw'
import iArrowTrendingUp from '../assets/nav-icons/arrow-trending-up.svg?raw'
import iArrowsPointingOut from '../assets/nav-icons/arrows-pointing-out.svg?raw'
import iArrowsRightLeft from '../assets/nav-icons/arrows-right-left.svg?raw'
import iBellAlert from '../assets/nav-icons/bell-alert.svg?raw'
import iBolt from '../assets/nav-icons/bolt.svg?raw'
import iBookOpen from '../assets/nav-icons/book-open.svg?raw'
import iBuildingLibrary from '../assets/nav-icons/building-library.svg?raw'
import iBuildingOffice2 from '../assets/nav-icons/building-office-2.svg?raw'
import iCamera from '../assets/nav-icons/camera.svg?raw'
import iCar from '../assets/nav-icons/car.svg?raw'
import iCase from '../assets/nav-icons/case.svg?raw'
import iCertificate from '../assets/nav-icons/certificate.svg?raw'
import iChart from '../assets/nav-icons/chart.svg?raw'

import iCloud from '../assets/nav-icons/cloud.svg?raw'
import iLink from '../assets/nav-icons/link.svg?raw'
import iCodeblock from '../assets/nav-icons/codeblock.svg?raw'
import iChat from '../assets/nav-icons/chat.svg?raw'

import iCubeTransparent from '../assets/nav-icons/cube-transparent.svg?raw'
import iClipboardDocumentCheck from '../assets/nav-icons/clipboard-document-check.svg?raw'
import iClock from '../assets/nav-icons/clock.svg?raw'
import iComputerDesktop from '../assets/nav-icons/computer-desktop.svg?raw'
import iData from '../assets/nav-icons/data.svg?raw'
import iDatabase from '../assets/nav-icons/database.svg?raw'
import iDocumentCheck from '../assets/nav-icons/document-check.svg?raw'
import iFactory from '../assets/nav-icons/factory.svg?raw'
import iGlobeAlt from '../assets/nav-icons/globe-alt.svg?raw'
import iLock from '../assets/nav-icons/lock.svg?raw'
import iChatBubbleLeftRightSm from '../assets/nav-icons/chat-bubble-left-right-sm.svg?raw'
import iCheckBadge from '../assets/nav-icons/check-badge.svg?raw'
import iChip from '../assets/nav-icons/chip.svg?raw'
import iCircleStack from '../assets/nav-icons/circle-stack.svg?raw'
import iCodeBracket from '../assets/nav-icons/code-bracket.svg?raw'
import iCog from '../assets/nav-icons/cog.svg?raw'
import iCog6Tooth from '../assets/nav-icons/cog-6-tooth.svg?raw'
import iDashboard from '../assets/nav-icons/dashboard.svg?raw'
import iDeviceAgent from '../assets/nav-icons/device-agent.svg?raw'
import iDocumentText from '../assets/nav-icons/document-text.svg?raw'
import iDollar from '../assets/nav-icons/dollar.svg?raw'
import iFlowfuse from '../assets/nav-icons/flowfuse.svg?raw'
import iFoodBeverage from '../assets/nav-icons/food-beverage.svg?raw'
import iGithub from '../assets/nav-icons/github.svg?raw'
import iLifebuoy from '../assets/nav-icons/lifebuoy.svg?raw'
import iLockClosed from '../assets/nav-icons/lock-closed.svg?raw'
import iMail from '../assets/nav-icons/mail.svg?raw'
import iNewspaper from '../assets/nav-icons/newspaper.svg?raw'
import iPower from '../assets/nav-icons/power.svg?raw'
import iPresentation from '../assets/nav-icons/presentation.svg?raw'
import iPulse from '../assets/nav-icons/pulse.svg?raw'
import iPuzzlePiece from '../assets/nav-icons/puzzle-piece.svg?raw'
import iRectangleStack from '../assets/nav-icons/rectangle-stack.svg?raw'
import iRocketLaunch from '../assets/nav-icons/rocket-launch.svg?raw'
import iScreen from '../assets/nav-icons/screen.svg?raw'
import iServerStack from '../assets/nav-icons/server-stack.svg?raw'
import iShare from '../assets/nav-icons/share.svg?raw'
import iShieldCheck from '../assets/nav-icons/shield-check.svg?raw'
import iSparkles from '../assets/nav-icons/sparkles.svg?raw'
import iSquaresPlus from '../assets/nav-icons/squares-plus.svg?raw'
import iStar from '../assets/nav-icons/star.svg?raw'
import iUns from '../assets/nav-icons/uns.svg?raw'
import iUserGroup from '../assets/nav-icons/user-group.svg?raw'
import iWifi from '../assets/nav-icons/wifi.svg?raw'
import iWindTurbine from '../assets/nav-icons/wind-turbine.svg?raw'
import iWrenchScrewdriver from '../assets/nav-icons/wrench-screwdriver.svg?raw'

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

    'cloud': iCloud,
    // /vs/litmus/ and /vs/kepware/ (merged in #5783) name these two keys in their
    // content, but they were never added here, so NavIcon rendered nothing for them.
    'link': iLink,
    'cube-transparent': iCubeTransparent,
    'codeblock': iCodeblock,
    'clipboard-document-check': iClipboardDocumentCheck,
    'clock': iClock,
    'computer-desktop': iComputerDesktop,
    'data': iData,
    'database': iDatabase,
    'document-check': iDocumentCheck,
    'factory': iFactory,
    'globe-alt': iGlobeAlt,
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
