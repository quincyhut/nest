/**
 * Migration script to import all existing hardcoded content into Sanity CMS
 *
 * Prerequisites:
 * 1. Create a Sanity project at https://sanity.io/manage
 * 2. Set environment variables in .env.local:
 *    - NEXT_PUBLIC_SANITY_PROJECT_ID
 *    - NEXT_PUBLIC_SANITY_DATASET (usually 'production')
 *    - SANITY_API_TOKEN (create a token with write access)
 *
 * Run with: npx tsx scripts/migrate-content.ts
 */

import * as dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })

import { createClient } from '@sanity/client'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const token = process.env.SANITY_API_TOKEN

if (!projectId || !token) {
  console.error('Missing environment variables. Please set:')
  console.error('- NEXT_PUBLIC_SANITY_PROJECT_ID')
  console.error('- SANITY_API_TOKEN')
  process.exit(1)
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: '2024-01-01',
  useCdn: false,
})

// Helper to create portable text blocks
function createTextBlock(text: string, marks: string[] = []) {
  return {
    _type: 'block',
    _key: generateKey(),
    style: 'normal',
    children: [
      {
        _type: 'span',
        _key: generateKey(),
        text,
        marks,
      },
    ],
    markDefs: [],
  }
}

// Helper to create text with NEST brand styling
function createTextWithNestBrand(parts: Array<{ text: string; isNest?: boolean; isBold?: boolean }>) {
  return {
    _type: 'block',
    _key: generateKey(),
    style: 'normal',
    children: parts.map((part) => ({
      _type: 'span',
      _key: generateKey(),
      text: part.text,
      marks: [
        ...(part.isNest ? ['nestBrand'] : []),
        ...(part.isBold ? ['strong'] : []),
      ],
    })),
    markDefs: [],
  }
}

function generateKey() {
  return Math.random().toString(36).substring(2, 10)
}

// Page data for migration
const pages = [
  // Homepage
  {
    _type: 'page',
    title: 'דף הבית',
    slug: { _type: 'slug', current: 'home' },
    isHomepage: true,
    seoTitle: 'NEST - ביטוח מזונות',
    layout: 'heroWithImage',
    backgroundPatterns: [
      { enabled: true, position: 'topLeft', color: '#EDF2EC', opacity: 1 },
      { enabled: true, position: 'topRight', color: '#EDF2EC', opacity: 1 },
      { enabled: true, position: 'bottomRight', color: '#508B58', opacity: 0.33 },
    ],
    pageImage: {
      imagePath: '/page-0/boy.png',
      alt: 'Boy',
      clipType: 'arch',
      clipLeft: false,
      hideOnMobile: false,
    },
    contentBlocks: [
      {
        _type: 'heroBlock',
        _key: generateKey(),
        heading: [
          createTextWithNestBrand([
            { text: 'NEST', isNest: true },
            { text: ' ביטוח מזונות.' },
          ]),
          createTextBlock('הורות ממשיכה גם אחרי פרידה.'),
        ],
        subheading: [
          createTextWithNestBrand([
            { text: 'NEST', isNest: true },
            { text: ' מבטיחה רצף תשלומי מזונות לילדים' },
          ]),
          createTextBlock('גם כאשר מתרחש אירוע בלתי צפוי אצל אחד ההורים.'),
          createTextBlock('הפתרון הוגן, אחראי, יציב ומגן על המשפחה.'),
        ],
        imagePosition: 'right',
        maxTextWidth: 'md:max-w-85',
        textAlignment: 'center',
        textContainerPadding: 'pt-6 md:pt-30',
        cta: {
          _type: 'ctaButton',
          text: 'לקבלת הצעה לביטוח מזונות',
          link: '/contact',
          style: 'primary',
        },
      },
    ],
  },

  // About page
  {
    _type: 'page',
    title: 'אודות',
    slug: { _type: 'slug', current: 'about' },
    isHomepage: false,
    seoTitle: 'אודות | NEST',
    layout: 'heroWithImage',
    backgroundPatterns: [
      { enabled: true, position: 'topLeft', color: '#EDF2EC', opacity: 1 },
    ],
    pageImage: {
      imagePath: '/page-1/family.png',
      alt: 'Family',
      clipType: 'arch',
      clipLeft: false,
      hideOnMobile: false,
    },
    contentBlocks: [
      {
        _type: 'heroBlock',
        _key: generateKey(),
        heading: [createTextBlock('אודות')],
        subheading: [
          createTextWithNestBrand([
            { text: 'NEST', isNest: true },
            { text: ' הוקמה מתוך הבנה שהשינוי המשפחתי אינו אמור לפגוע בילדים.' },
          ]),
          createTextBlock('בישראל מתרחשים מדי שנה אלפי מקרים שבהם הורה אינו מסוגל להמשיך לשלם מזונות בשל מחלה, תאונה או פטירה.'),
          createTextBlock('במצבים אלה ההורה האחר מוצא עצמו נושא לבדו בנטל הכלכלי.'),
          createTextWithNestBrand([
            { text: 'NEST', isNest: true },
            { text: ' מעניקה שכבת הגנה שמבטיחה שהמזונות יועברו בדיוק כפי שנקבע בהסכם.' },
          ]),
          createTextBlock('החזון שלנו הוא להגן על ילדים, להפחית קונפליקטים, ולשמור על יציבות כלכלית ומשפחתית גם ברגעים של חוסר ודאות.'),
          createTextBlock('אנו פועלים בשיתוף מומחים בתחום המשפט, הביטוח והמשפחה ומחויבים לשקיפות, מקצועיות ורגישות.'),
          createTextWithNestBrand([
            { text: 'NEST', isNest: true },
            { text: ' פועלת בשיתוף פעולה עם חברת הביטוח מגדל, מהחברות המובילות והמוערכות בישראל, כדי להבטיח יציבות לאורך זמן, שירות מעולה ותהליך הפעלה פשוט וברור.' },
          ]),
        ],
        imagePosition: 'right',
        maxTextWidth: 'md:max-w-120',
        textAlignment: 'right',
        textContainerPadding: 'pt-6 md:pt-15',
      },
    ],
  },

  // Insurance page
  {
    _type: 'page',
    title: 'פירוט ביטוחי',
    slug: { _type: 'slug', current: 'insurance' },
    isHomepage: false,
    seoTitle: 'פירוט ביטוחי | NEST',
    layout: 'heroWithImage',
    backgroundPatterns: [
      { enabled: true, position: 'topLeft', color: '#EDF2EC', opacity: 1 },
      { enabled: true, position: 'topRight', color: '#EDF2EC', opacity: 1 },
      { enabled: true, position: 'bottomRight', color: '#508B58', opacity: 0.33 },
    ],
    pageImage: {
      imagePath: '/page-2/children.png',
      alt: 'Children',
      clipType: 'arch',
      clipLeft: false,
      hideOnMobile: false,
    },
    contentBlocks: [
      {
        _type: 'textSectionBlock',
        _key: generateKey(),
        heading: 'פירוט כיסוי ביטוחי',
        headingSize: 'large',
      },
      {
        _type: 'iconGridBlock',
        _key: generateKey(),
        items: [
          { iconType: 'illness', label: 'מחלה קשה' },
          { iconType: 'accident', label: 'תאונה' },
          { iconType: 'death', label: 'פטירה' },
        ],
      },
      {
        _type: 'textSectionBlock',
        _key: generateKey(),
        heading: 'תשלום חודשי',
        headingSize: 'medium',
        content: [
          createTextBlock('הביטוח יעביר תשלום אשר יכסה את המקור למזונות בהתאם לקבוע בהסכם הגירושין, לתקופה של עשר שנים ממועד מקרה הביטוח, ללא תלות בגיל המוטב (כל עוד מקרה הביטוח אירע בתחולת הפוליסה).'),
          createTextBlock('חברת הביטוח נכנסת בנעלי ההורה המשלם ומספקת מקור כספי לתשלום המזונות, על מנת להבטיח הילדים לא ייפגעו במקרה של שינויים בלתי צפויים בנסיבות חיי ההורים.'),
          createTextBlock('* במקרה של מקרה נכות מתאונה או מחלה קשה הסכום יועבר בפעימה אחת.'),
        ],
        textSize: 'small',
      },
      {
        _type: 'processStepsBlock',
        _key: generateKey(),
        heading: 'תהליך הפעלה',
        steps: [
          { stepNumber: 1, stepLabel: 'שלב ראשון', description: 'דיווח על מקרה הביטוח.' },
          { stepNumber: 2, stepLabel: 'שלב שני', description: 'בדיקה מקצועית ומהירה בסיוע NEST מול חברת הביטוח.' },
          { stepNumber: 3, stepLabel: 'שלב שלישי', description: 'אישור התביעה על ידי חברת הביטוח.' },
          { stepNumber: 4, stepLabel: 'שלב רביעי', description: 'תחילת קבלת התשלום החודשי ברצף עד לקבלת מלוא הכיסוי. במקרה של נכות מתאונה או מחלה, מלוא התשלום יתקבל בפעימה אחת.' },
        ],
      },
      {
        _type: 'ctaButton',
        _key: generateKey(),
        text: 'צרו קשר',
        link: '/contact',
        style: 'primary',
      },
      {
        _type: 'disclaimerBlock',
        _key: generateKey(),
        text: 'השירות ניתן על ידי מ. רוני סוכנות לביטוח (2003) בע״מ - מ.ר. 513410365. האמור לעיל כפוף להוראות הדין, הרגולציה ותוכניות הביטוח. הכיסוי הביטוחי המוצע (ביטוח מזונות) מורכב ממספר מוצרי ביטוח: ביטוח למקרה מוות ו/או ביטוח לנכות מתאונה ו/או ביטוח מחלות קשות, שנועדו לשמש את המקור לתשלומי המזונות בקרות מקרה ביטוח בהתאם לתנאי הפוליסה של חברת הביטוח ביחס לכל מוצר ומוצר. אין באמור לעיל בכדי להוות ייעוץ ו/או המלצה כלשהם המתחשבים במאפיינים של כל אדם ונסיבותיו. במקרה של סתירה בין האמור לעיל לבין הוראות הפוליסות, תגברנה הוראות הפוליסות. סוכנות הביטוח ו/או חברת הביטוח אינן אחראיות על האמור בהסכם הגירושין, והן לא תהיינה אחראיות לכל אי התאמה בין תנאי הכיסוי הביטוחי לבין הוראות הסכמי הגירושין ו/או כל עניין אחר הקשור בהסכם הגירושין.',
      },
    ],
  },

  // FAQ page
  {
    _type: 'page',
    title: 'שאלות ותשובות',
    slug: { _type: 'slug', current: 'faq' },
    isHomepage: false,
    seoTitle: 'שאלות ותשובות | NEST',
    layout: 'heroWithImage',
    backgroundPatterns: [
      { enabled: true, position: 'topLeft', color: '#EDF2EC', opacity: 1 },
      { enabled: true, position: 'topRight', color: '#EDF2EC', opacity: 1 },
      { enabled: true, position: 'bottomRight', color: '#508B58', opacity: 0.33 },
    ],
    pageImage: {
      imagePath: '/page-3/little-girl.png',
      alt: 'Little Girl',
      clipType: 'arch',
      clipLeft: false,
      hideOnMobile: false,
    },
    contentBlocks: [
      {
        _type: 'faqBlock',
        _key: generateKey(),
        heading: 'שאלות ותשובות',
        items: [
          {
            question: 'האם הפוליסה מחליפה את ההסכם בין ההורים?',
            answer: [createTextBlock('לא. הפוליסה משלימה את ההסכם ומוודאת שהוא ייושם גם במצבי קיצון.')],
          },
          {
            question: 'האם התשלום הוא חד פעמי?',
            answer: [createTextBlock('לא, במרבית המקרים הפוליסה תשלם מדי חודש את סכום המזונות המבוטח למשך עשר שנים ממקרה הביטוח. במקרים של נכות מתאונה או מחלה קשה הסכום יתקבל בפעימה אחת לפי ערך סכום המזונות המבוטח לעשר שנים.')],
          },
          {
            question: 'האם NEST מתאימה להורות משותפת?',
            answer: [createTextBlock('כן... ומנסה למנוע קריסה כלכלית של אחד ההורים במקרה של אירוע פתאומי בלתי צפוי להורה השני.')],
          },
          {
            question: 'מי המוטרים?',
            answer: [createTextBlock('הילדים בלבד.')],
          },
          {
            question: 'איך מפעילים את הפוליסה?',
            answer: [
              createTextWithNestBrand([
                { text: 'באמצעות מסמכים רפואיים או רשמיים. התהליך פשוט וברור ללא התמודדות מול ההורה השני, ובסיוע נציגי ' },
                { text: 'NEST', isNest: true },
                { text: '.' },
              ]),
            ],
          },
          {
            question: 'מה עלות הביטוח?',
            answer: [createTextBlock('הסכום מותאם לגובה המזונות שתרצו לבטח, גילאי הילדים וצרכי המשפחה. צפוי כי הסכום יהיה נמוך משמעותית מהנזק הכלכלי שעלול להגרם בהעדר ביטוח אם חלילה יהיה בו צורך.')],
          },
          {
            question: 'האם הורה אחד יכול לרכוש את הפוליסה לבד?',
            answer: [createTextBlock('כן. כל הורה יכול לרכוש פוליסה ולהבטיח את דמי המזונות שהתחייב לשלם לילדיו. מעבר לכך, במקרה בו הצד המבטח הפסיק לשלם את הפרמיה החודשית, מכל סיבה שהיא, בן / בת הזוג יהיו רשאים להכנס בנעליו, לשלם את התשלום החודשי עבור ביטוח ולשמר את הזכאות לכיסוי הביטוחי עבור הילדים.')],
          },
        ],
      },
    ],
  },

  // Parents page
  {
    _type: 'page',
    title: 'מידע להורים',
    slug: { _type: 'slug', current: 'parents' },
    isHomepage: false,
    seoTitle: 'מידע להורים | NEST',
    layout: 'heroWithImage',
    backgroundPatterns: [
      { enabled: true, position: 'topLeft', color: '#EDF2EC', opacity: 1 },
      { enabled: true, position: 'topRight', color: '#508B58', opacity: 0.33 },
      { enabled: true, position: 'bottomRight', color: '#EDF2EC', opacity: 1 },
    ],
    pageImage: {
      imagePath: '/page-4/dad.png',
      alt: 'Dad',
      clipType: 'arch',
      clipLeft: false,
      hideOnMobile: false,
    },
    contentBlocks: [
      {
        _type: 'textSectionBlock',
        _key: generateKey(),
        heading: 'הורים במשפחה בשינוי',
        headingSize: 'large',
      },
      {
        _type: 'textSectionBlock',
        _key: generateKey(),
        heading: 'הורות ממשיכה גם אחרי פרידה והילדים זקוקים ליציבות',
        headingSize: 'small',
        content: [
          createTextWithNestBrand([
            { text: 'NEST', isNest: true, isBold: true },
            { text: ' ביטוח מזונות.', isBold: true },
          ]),
        ],
        textSize: 'small',
      },
      {
        _type: 'textSectionBlock',
        _key: generateKey(),
        content: [
          createTextBlock('ההסכם צריך לייצר ודאות, יציבות, ומנגנוני אכיפה ברורים לאורך זמן.'),
          createTextBlock('חלוקת הוצאות גידול הילדים היא אחת הסיבות המרכזיות למחלוקות בין הורים נפרדים.'),
          createTextBlock('גם כאשר מגיעים להסכם גירושין מאוזן, שינוי נסיבות בלתי צפוי עלול לערער אותו.'),
          createTextWithNestBrand([
            { text: 'NEST', isNest: true, isBold: true },
            { text: ' מעניקה לכם רשת ביטחון כלכלית שמבטיחה מקור הכספי להמשך תשלומי המזונות' },
          ]),
          createTextBlock('במקרה שבו ההורה המשלם אינו מסוגל לעמוד בהתחייבותו בשל מחלה קשה, נכות מתאונה או פטירה.'),
        ],
        textSize: 'small',
      },
      {
        _type: 'featureListBlock',
        _key: generateKey(),
        heading: 'למה הורים בוחרים NEST?',
        items: [
          { text: 'ביטחון כלכלי אמיתי לילדים.' },
          { text: 'שקט נפשי בתקופה של שינוי.' },
          { text: 'הוגנות ושמירה על שותפות הורית.' },
          { text: 'רציפות ואמון בין ההורים לאורך זמן.' },
        ],
        listStyle: 'bullet',
      },
      {
        _type: 'highlightBoxBlock',
        _key: generateKey(),
        heading: 'לא עוד ויכוחים על "מה יקרה אם?"',
        content: [
          createTextBlock('לא עוד חשש שמשבר יערער את ההסכם ואת הביטחון הכלכלי.'),
          createTextWithNestBrand([
            { text: 'NEST', isNest: true, isBold: true },
            { text: ' מציעה בהירות ושקט, ומשאירה את טובת הילדים במרכז.' },
          ]),
        ],
        backgroundColor: '#f4f5f2',
        headingColor: '#7fa687',
      },
      {
        _type: 'ctaButton',
        _key: generateKey(),
        text: 'ליעוץ לקבלת הצעה לביטוח מזונות',
        link: '/contact',
        style: 'primary',
      },
    ],
  },

  // Partners page
  {
    _type: 'page',
    title: 'שותפים מקצועי',
    slug: { _type: 'slug', current: 'partners' },
    isHomepage: false,
    seoTitle: 'שותפים מקצועי | NEST',
    layout: 'twoColumn',
    backgroundPatterns: [
      { enabled: true, position: 'topLeft', color: '#EDF2EC', opacity: 1 },
    ],
    contentBlocks: [
      {
        _type: 'twoColumnBlock',
        _key: generateKey(),
        heading: 'מסלול שותפים מקצועי',
        rightColumn: [
          {
            sectionHeading: 'NEST ביטוח מזונות',
            content: [
              createTextBlock('ההורות ממשיכה גם אחרי הפרידה.'),
              createTextBlock('הסכם הגירושין צריך לייצר ודאות, יציבות, ומנגנוני אכיפה ברורים לאורך זמן.'),
              createTextBlock('חלוקת הוצאות גידול הילדים היא אחת הסיבות המרכזיות למחלוקות בין הורים נפרדים.'),
              createTextBlock('גם כאשר מגיעים להסכם מאוזן, שינוי נסיבות בלתי צפוי עלול לערער אותו.'),
              createTextWithNestBrand([
                { text: 'NEST', isNest: true, isBold: true },
                { text: ' מעניקה ללקוחותיכם כיסוי שנועד להוות מקור להמשך תשלומי מזונות במקרה שבו ההורה המשלם אינו מסוגל לעמוד בהתחייבותו עקב מחלה קשה, נכות מתאונה ופטירה, כמפורט בתנאי הפוליסות.', isBold: true },
              ]),
            ],
          },
          {
            sectionHeading: 'מהו ביטוח המזונות של NEST?',
            content: [
              createTextWithNestBrand([
                { text: 'NEST', isNest: true },
                { text: ' היא פוליסת ביטוח חדשנית.' },
              ]),
              createTextBlock('היא מבטיחה את מימוש התחייבות המזונות גם במצב של מחלה קשה, נכות מתאונה ופטירה.'),
              createTextBlock('הילדים הם המוטבים.'),
              createTextBlock('זהו מנגנון שמגן על הילדים, ההורים ועל ההסכם שנוסח במאמץ רב.'),
            ],
          },
          {
            sectionHeading: 'חדשנות בדיני משפחה:',
            content: [
              createTextBlock('• בישראל בין 15,000-18,000 זוגות מתגרשים מדי שנה.'),
              createTextBlock('• סוגיית המזונות וההוצאות היא מוקד חיכוך חוזר ונשנה.'),
              createTextBlock('• שינוי נסיבות של אחד ההורים הוא אחת הסיבות הנפוצות לפתיחה מחודשת של הסכמים.'),
              createTextWithNestBrand([
                { text: 'NEST', isNest: true },
                { text: ' מזמינה את עורכי הדין לאמץ מנגנון שמפחית מחלוקות עתידיות, מחזק את ההסכם ומשפר את איכות הייצוג, כאשר ההגנה על טובת הילדים משרתת את שני הצדדים.' },
              ]),
            ],
          },
        ],
        leftColumn: [
          {
            sectionHeading: 'הערך ללקוחות:',
            content: [
              createTextBlock('NEST מעניקה לשני ההורים את מה שחשוב באמת לילדים: יציבות, ודאות ושקט נפשי.'),
              createTextBlock('הכיסוי הביטוחי נועד להבטיח שיהיה מקור לתשלום מזונות גם כשהחיים משתנים לפתע, ומונעת מתחים, חששות ועומס מיותר.'),
              createTextBlock('זהו מנגנון הוגן ושקוף שמגן על שני ההורים ומחזק את ההסכם.'),
              createTextBlock('במקרים של הורות או משמורת משותפת, שבהם שני ההורים חולקים את ההוצאות באופן מאוזן, NEST הופכת משמעותית במיוחד.'),
              createTextBlock('הפוליסה שומרת על האיזון, ומבטיחה שהילדים ימשיכו לקבל את התמיכה שנקבעה עבורם.'),
              createTextWithNestBrand([
                { text: 'NEST', isNest: true, isBold: true },
                { text: ' מאפשרת לשני ההורים לעמוד יחד מאחורי המחויבות לילדים, גם אחרי הפרידה.', isBold: true },
              ]),
            ],
          },
          {
            sectionHeading: 'הערך לעורכי דין ומגשרים:',
            content: [
              createTextBlock('• כלי אסטרטגי למו״מ המפחית את עוצמת הקונפליקט.'),
              createTextBlock('• חיזוק משפטי של הסכם הגירושין באמצעות מנגנון חיצוני יציב.'),
              createTextBlock('• יתרון תדמיתי כמי שמובילים חשיבה חדשנית בתחום.'),
              createTextBlock('• חיסכון בזמן ובהתמודדות עם תיקי המשך ומחלוקות עתידיות.'),
            ],
          },
          {
            sectionHeading: 'הזמנה להצטרפות כשותפים מומחים:',
            content: [
              createTextBlock('NEST מקימה קבוצה מצומצמת של משרדי עורכי דין ומגשרים מובילים.'),
              createTextBlock('הקבוצה תקבל גישה לכלי עבודה מקצועיים, מודל תגמול ייעודי, ליווי אישי, וחומרי הסברה איכותיים.'),
              createTextBlock('שותפי NEST הם אלו שמובילים את התחום, מאמצים פתרון שמעניק'),
              createTextBlock('יציבות למשפחות ומגדיל את הערך שהם מציעים ללקוחות.'),
            ],
          },
        ],
        cta: {
          _type: 'ctaButton',
          text: 'צרו קשר',
          link: '/contact',
          style: 'primary',
        },
      },
    ],
  },

  // Contact page
  {
    _type: 'page',
    title: 'צרו קשר',
    slug: { _type: 'slug', current: 'contact' },
    isHomepage: false,
    seoTitle: 'צרו קשר | NEST',
    layout: 'contact',
    backgroundPatterns: [
      { enabled: true, position: 'topLeft', color: '#EDF2EC', opacity: 1 },
      { enabled: true, position: 'topRight', color: '#EDF2EC', opacity: 1 },
      { enabled: true, position: 'bottomRight', color: '#508B58', opacity: 0.33 },
    ],
    pageImage: {
      imagePath: '/page-5/mother.png',
      alt: 'Mother',
      clipType: 'arch',
      clipLeft: false,
      hideOnMobile: true, // Contact form image is hidden on mobile
    },
    contentBlocks: [
      {
        _type: 'contactFormBlock',
        _key: generateKey(),
        heading: 'צרו קשר',
        introText: [
          createTextWithNestBrand([
            { text: 'צוות ' },
            { text: 'NEST', isNest: true, isBold: true },
            { text: ' זמין לשאלות, לייעוץ ולהצטרפות. מלאו פרטים ונשוב אליכם או צרו קשר:' },
          ]),
        ],
        formFields: {
          fullName: 'שם מלא',
          email: 'דוא"ל',
          phone: 'טלפון',
          userType: 'בחרו',
          officeName: 'שם המשרד',
          mainField: 'תחום עיסוק עיקרי',
          mainArea: 'אזור פעילות עיקרי',
          message: 'הודעה',
          submit: 'אישור ושליחה',
        },
        userTypeOptions: [
          { value: 'lawyer', label: 'עו"ד' },
          { value: 'mediator', label: 'מגשרים' },
          { value: 'parent', label: 'הורים' },
          { value: 'other', label: 'אחר' },
        ],
        mainFieldOptions: [
          { value: 'family-law', label: 'דיני משפחה וגירושין' },
          { value: 'family-mediation', label: 'גישור משפחתי' },
          { value: 'other', label: 'אחר' },
        ],
        mainAreaOptions: [
          { value: 'tel-aviv', label: 'תל אביב והמרכז' },
          { value: 'sharon', label: 'השרון' },
          { value: 'jerusalem', label: 'ירושלים' },
          { value: 'haifa', label: 'חיפה והצפון' },
          { value: 'south', label: 'דרום' },
          { value: 'nationwide', label: 'כלל־ארצי' },
        ],
        consentText: 'אני מאשר/ת את תנאי מדיניות הפרטיות של אתר NEST, ואני מאשר/ת ל-NEST ליצור איתי קשר ולשלוח לי פרטים לגבי השירות ו/או המוצרים אשר היא מציעה באתר.',
        successMessage: 'הפרטים נשלחו בהצלחה, ניצור עמכם קשר בהקדם. תודה, צוות NEST.',
        errorMessage: 'אירעה שגיאה בשליחת ההודעה. אנא נסו שוב או צרו קשר ישירות במייל.',
      },
    ],
  },

  // Privacy page
  {
    _type: 'page',
    title: 'מדיניות פרטיות',
    slug: { _type: 'slug', current: 'privacy' },
    isHomepage: false,
    seoTitle: 'מדיניות פרטיות | NEST',
    layout: 'privacy',
    backgroundPatterns: [
      { enabled: true, position: 'topLeft', color: '#EDF2EC', opacity: 1 },
    ],
    contentBlocks: [
      {
        _type: 'heroBlock',
        _key: generateKey(),
        heading: [createTextBlock('מדיניות פרטיות')],
        subheading: [
          createTextWithNestBrand([
            { text: '(נסט ' },
            { text: 'NEST', isNest: true },
            { text: ' - מ. רוני סוכנות לביטוח (2003) בע"מ)' },
          ]),
        ],
      },
      {
        _type: 'textSectionBlock',
        _key: generateKey(),
        content: [
          createTextBlock('*מדיניות הפרטיות מנוסחת בלשון זכר מטעמי נוחות בלבד, ופונה לכלל המגדרים והמינים*'),
        ],
        textSize: 'xsmall',
      },
      {
        _type: 'privacySectionBlock',
        _key: generateKey(),
        sectionNumber: 1,
        heading: 'כללי',
        content: [
          createTextWithNestBrand([
            { text: 'ברוך הבא לאתר הבית של ' },
            { text: 'NEST', isNest: true },
            { text: ' (להלן: "החברה"). אנו מודים לך על העניין שגילית בשירותינו ועל ביקורך באתר.' },
          ]),
          createTextBlock('נתונים שתמסור ואשר יאספו אודותייך במסגרת שימושך בשירותים שמציע האתר, יישמרו במאגרי המידע הרשומים שלנו ויעובדו על ידינו בהתאם להוראות החוק ולפי הסכמתך. נציין בפניך כי לא חלה עליך כל חובה חוקית למסור את המידע ומסירתו תלויה ברצונך בעת גלישתך באתר ובעת מסירת פרטייך לצורך שימוש בשירותי האתר.'),
          createTextBlock('הסכמתך לתנאי השימוש ומדיניות הפרטיות – השימוש באתר מעיד על הסכמתך למדיניות פרטיות זו, בהתאם לכל דין אשר חל או יחול על שימוש סביר באתר. אם אינך מסכים לאחד מהתנאים, אנא הימנע מהמשך השימוש באתר ו/או פנה אלינו על-מנת שנוכל לסייע לך בדרכים חלופיות. שימוש במידע אודותייך ייעשה אך ורק בהתאם לחובות שבדין.'),
        ],
      },
      {
        _type: 'privacySectionBlock',
        _key: generateKey(),
        sectionNumber: 2,
        heading: 'מטרות ואופן השימוש במידע',
        content: [
          createTextBlock('מידע טכני ומזהים דיגיטליים – בעת גלישתך באתר, נשמר אצלנו באופן אוטומטי מידע טכני מסוים, כגון שמו של ספק שירותי האינטרנט שלך, כתובת ה-IP שלך, תאריך ביקורך, משך הביקור, באילו עמודים ביקרת באתר וסוג הדפדפן בו נעשה שימוש. מידע זה ייאסף באמצעות "עוגיות" כמפורט בסעיף מטה.'),
          createTextBlock('נתונים אישיים מזהים אודותיך יישמרו במאגרי החברה הרשומים על-פי חוק, אך ורק אם מסרת אותם מיוזמתך, ולפי הסכמתך באותן נסיבות, כגון הרשמה לאחד השירותים המוצעים באתר או כל פניה אחרת אלינו הכרוכה במסירת פרטייך לצורך מתן השירות. כל פרט שתמסור ישמר לפי הוראות קפדניות שבחוק ובכפוף להסכמה שתינתן על-ידך בסמוך למסירת המידע.'),
        ],
      },
      {
        _type: 'privacySectionBlock',
        _key: generateKey(),
        sectionNumber: 3,
        heading: 'Cookies, Conversions API, Enhanced conversion data',
        content: [
          createTextBlock('לידיעתך – השירותים משתמשים בתוכנות צוברות מידע, בעוגיות ודומיהן – דוגמת pixels, web beacons, Conversions API, Enhanced conversion data, google analytics (להלן יחדיו "Cookies" ו/או "עוגיות") לצורך תפעולם השוטף והתקין, לשם אבטחת הנתונים בהם והמידע הנמסר, ובכלל זה כדי לאסוף נתונים סטטיסטיים אודות השימוש בשירותים, לשם קבלת החלטות בנוגע לפרופיל שלך ו/או פעילותך, לשם אימות פרטים וזיהוי, מניעת הונאות ותרמיות, לשם שיפור חווית השימוש בשירותים, תוך התאמת התכנים והשירותים להעדפותיך האישיות, לשם אפיון המוצרים המתאימים לך, להתאים עבורך פרסומות ותכנים הרלבנטיים אליך, הכל למטרות סטטיסטיות, מחקריות, שיווקיות, שירותיות ומסחריות, וכמובן לצרכי אבטחת מידע.'),
          createTextBlock('עוגיות, באופן כללי ובתמצית, הן קבצי טקסט אשר הדפדפן או היישומון של משתמש יוצר לפי פקודה ממחשבי החברה. חלק מהעוגיות יפקעו כאשר תסגור את היישום הרלבנטי, ואחרות נשמרות על גבי זיכרון המכשיר שלך.'),
          createTextBlock('עוגיות עשויות להיות מטעם צד ג\' – למשל עוגיות של חברת Google כגון אלו המוטמעות תוך שימוש ב-Google Analytics ו/או שימוש בכלים של חברת Meta בהם עושה החברה שימוש.'),
          createTextBlock('תוכל גם לשנות את הגדרות הדפדפן בו אתה משתמש, ולחסום שימוש בעוגיות ודומיהן במקרה כזה, ייתכן כי שירותים מסוימים, כולם או חלקם, לא יפעלו כראוי.'),
        ],
      },
      {
        _type: 'privacySectionBlock',
        _key: generateKey(),
        sectionNumber: 4,
        heading: 'היכן ישמר המידע',
        content: [
          createTextBlock('המידע שתמסור בעת שימושך באתר והשירותים המוצעים בו, יישמר במאגרי המידע הרשומים של החברה, שבין מטרותיהם ניהול וייעול השירות והקשר עם לקוחות החברה, חברות בנות ו/או חברות קשורות, לצרכים תפעוליים, שיווקיים, שמירת מידע חיוני ולצרכים סטטיסטיים, לרבות עיבוד המידע, דיוור ישיר ופניות לצורך מימוש מטרות אלו בכפוף להוראות הדין.'),
          createTextBlock('אינך נדרש למסור מידע זה לפי חוק, אך אם תבחר שלא למסור מידע במקום בו הוא נחוץ לתפעול שירות המוצע באתר, ייתכן כי לא תוכל ליהנות מחלקים מהאתר ו/או משירותים אותם החברה מציעה בו.'),
        ],
      },
      {
        _type: 'privacySectionBlock',
        _key: generateKey(),
        sectionNumber: 5,
        heading: 'השימוש במידע הנאסף',
        content: [
          createTextBlock('החברה או מי מטעמה, מחויבת לשמור על הסודיות ועל חשאיות המידע שברשותה ולציית להוראות החוק. ככל שייאסף מידע אודותייך בעת השימוש באתר או אם תמסור מידע מיוזמתך באמצעות השירותים המוצעים באתר, החברה תשתמש במידע רק על פי מדיניות פרטיות זו או על פי הוראות כל דין.'),
          createTextBlock('עיקר המידע שנאסף מעצם שימושך באתר הינו מידע סטטיסטי, אנונימי, שאינו מזהה אותך אישית, ונועד כדי להתאים את האתר ואת השירותים המוצעים בו להעדפותייך ולצרכייך.'),
          createTextBlock('הניהול התקין של האתר ותפעול השירותים המוצעים בו.'),
          createTextBlock('מתן שירות לקוחות וייעול ההתקשרות עם החברה.'),
          createTextBlock('ביצוע סקרים וסטטיסטיקות, ולצרכי שיווק – והכול בכפוף להסכמות שיתקבלו ממך לפי החוק, ולצרכים פנימיים של החברה.'),
        ],
      },
      {
        _type: 'privacySectionBlock',
        _key: generateKey(),
        sectionNumber: 6,
        heading: 'העברת המידע לצדדים שלישיים',
        content: [
          createTextBlock('החברה עשויה להעביר מידע אודותיך לצדדים שלישיים מעת לעת, כמפורט להלן או בכל מקרה אחר בו תידרש העברתו:'),
          createTextBlock('על פי דרישת המשתמש ו/או בהסכמתו המפורשת;'),
          createTextBlock('במסגרת פעילותה מול חברות קשורות עסקית ו/או זכיינים ו/או ספקים לצורך מתן השירותים עבורך;'),
          createTextBlock('בכל מקרה בו תפר את תנאי השימוש באתרי החברה, לרבות תנאי מדיניות הפרטיות;'),
          createTextBlock('לצרכים חוקיים, דוגמת מסירה לרשות בשל הוראה חוקית, בשל חובה שבדין;'),
          createTextBlock('בכל מקרה בו תסבור החברה, כי מסירת המידע נחוצה על מנת למנוע נזק חמור;'),
          createTextBlock('במקרה בו תעביר ו/או תמכור ו/או תמחה החברה לצד שלישי את פעילותה ו/או את זכויותיה וחובותיה כלפי המשתמש.'),
        ],
      },
      {
        _type: 'privacySectionBlock',
        _key: generateKey(),
        sectionNumber: 7,
        heading: 'חופש הבחירה ודיוור',
        content: [
          createTextBlock('אנו מעוניינים לשלוח אליך מדי פעם מידע בדבר שירותיה ומוצריה של החברה. מידע כזה ישוגר אליך אך ורק אם נתת את הסכמתך לכך בעת השימוש באתר ו/או עם הרשמתך לאחד השירותים המוצעים בו. בכל מקרה, בכל עת תוכל לבטל את הסכמתך ובכך למנוע את המשך קבלת המידע.'),
        ],
      },
      {
        _type: 'privacySectionBlock',
        _key: generateKey(),
        sectionNumber: 8,
        heading: 'שינויים במדיניות הפרטיות',
        content: [
          createTextBlock('החברה שומרת לעצמה את הזכות לשנות את מדיניות הפרטיות מעת לעת. במקרה שכזה, השינוי יעודכן במסמך זה ויפורסם באתר. שימושך באתר לאחר ביצוע השינויים ומתן ההודעה על כך, יעיד על הסכמתך לשינויים אלו, ועל כן אנו ממליצים לעיין במדיניות זו מעת לעת.'),
        ],
      },
      {
        _type: 'privacySectionBlock',
        _key: generateKey(),
        sectionNumber: 9,
        heading: 'זכותך לעיין במידע',
        content: [
          createTextBlock('על-פי חוק הגנת הפרטיות, התשמ"א-1981, הינך, או מי מטעמך, רשאי לעיין במידע אודותיך אשר מצוי במאגר החברה ואף לבקש מאיתנו לתקן מידע זה אם אינו נכון, שלם או מדויק. כדי לממש זכות זו, יש לפנות לחברה בפרטים המופיעים מטה.'),
        ],
      },
      {
        _type: 'privacySectionBlock',
        _key: generateKey(),
        sectionNumber: 10,
        heading: 'אבטחת האתר',
        content: [
          createTextWithNestBrand([
            { text: 'NEST', isNest: true },
            { text: ' עושה כל שביכולתה ונעזרת באמצעי אבטחה טכנולוגיים וארגוניים מתקדמים כדי לאבטח את המידע המצוי בשליטתה, כנגד ניצול מקרי או מכוון, אובדן, הרס או כנגד גישה על ידי אנשים בלתי מוסמכים או מורשים. על אף האמור, ' },
          ]),
          createTextWithNestBrand([
            { text: 'NEST', isNest: true },
            { text: ' אינה יכולה להבטיח את אבטחת המידע ושמירתו באופן מוחלט ואינה מתחייבת ששירותיה יהיו חסינים באופן מוחלט מפני גישה בלתי מורשית למידע המאוחסן בהם.' },
          ]),
        ],
      },
      {
        _type: 'privacySectionBlock',
        _key: generateKey(),
        sectionNumber: 11,
        heading: 'שאלות, בקשות והערות',
        content: [
          createTextBlock('בכל מקרה של שאלה ו/או בקשה, אנא פנו אלינו באמצעות טופס צור קשר או באימייל info@nestinsure.co.il'),
        ],
      },
    ],
  },
]

// Navigation data
const navigation = {
  _type: 'navigation',
  title: 'Main Navigation',
  menuItems: [
    { _key: generateKey(), label: 'משרדי עורכי דין ומגשרים', href: '/partners', isHighlighted: true, order: 1 },
    { _key: generateKey(), label: 'בית', href: '/', isHighlighted: false, order: 2 },
    { _key: generateKey(), label: 'אודות', href: '/about', isHighlighted: false, order: 3 },
    { _key: generateKey(), label: 'כיסוי ביטוחי', href: '/insurance', isHighlighted: false, order: 4 },
    { _key: generateKey(), label: 'שאלות ותשובות', href: '/faq', isHighlighted: false, order: 5 },
    { _key: generateKey(), label: 'מידע והצטרפות להורים', href: '/parents', isHighlighted: false, order: 6 },
    { _key: generateKey(), label: 'צרו קשר', href: '/contact', isHighlighted: false, order: 7 },
  ],
  mobileContactTitle: 'רוצים לדבר איתנו?',
  mobileContactSubtext: 'צוות NEST זמין לשאלות, לייעוץ ולהצטרפות.',
}

async function migrate() {
  console.log('Starting migration...')
  console.log(`Project: ${projectId}, Dataset: ${dataset}`)

  // Create navigation
  console.log('Creating navigation...')
  try {
    const navResult = await client.create(navigation)
    console.log(`✓ Created: Navigation (${navResult._id})`)
  } catch (error) {
    console.error('✗ Failed to create navigation:', error)
  }

  // Create pages
  for (const page of pages) {
    console.log(`Creating page: ${page.title}...`)

    try {
      const result = await client.create(page)
      console.log(`✓ Created: ${page.title} (${result._id})`)
    } catch (error) {
      console.error(`✗ Failed to create ${page.title}:`, error)
    }
  }

  console.log('\nMigration complete!')
}

migrate().catch(console.error)
