import { NextRequest, NextResponse } from "next/server";

interface ContactFormData {
  fullName: string;
  email: string;
  phone: string;
  userType: string;
  message?: string;
  officeName?: string;
  mainField?: string;
  mainArea?: string;
  consent: boolean;
}

export async function POST(request: NextRequest) {
  try {
    const data: ContactFormData = await request.json();

    // Validate required fields
    if (!data.fullName || !data.email || !data.phone || !data.userType || !data.consent) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Map user type to Hebrew
    const userTypeMap: Record<string, string> = {
      lawyer: "עו\"ד",
      mediator: "מגשרים",
      parent: "הורים",
      other: "אחר",
    };

    // Map main field to Hebrew
    const mainFieldMap: Record<string, string> = {
      "family-law": "דיני משפחה וגירושין",
      "family-mediation": "גישור משפחתי",
      other: "אחר",
    };

    // Map main area to Hebrew
    const mainAreaMap: Record<string, string> = {
      "tel-aviv": "תל אביב והמרכז",
      sharon: "השרון",
      jerusalem: "ירושלים",
      haifa: "חיפה והצפון",
      south: "דרום",
      nationwide: "כלל־ארצי",
    };

    // Build email content
    const isProfessional = data.userType === "lawyer" || data.userType === "mediator";

    let emailBody = `
פנייה חדשה מאתר NEST

פרטי הפונה:
-----------
שם מלא: ${data.fullName}
דוא"ל: ${data.email}
טלפון: ${data.phone}
סוג פונה: ${userTypeMap[data.userType] || data.userType}
`;

    if (isProfessional) {
      emailBody += `
פרטים מקצועיים:
---------------
שם המשרד: ${data.officeName || "לא צוין"}
תחום עיסוק עיקרי: ${mainFieldMap[data.mainField || ""] || data.mainField || "לא צוין"}
אזור פעילות עיקרי: ${mainAreaMap[data.mainArea || ""] || data.mainArea || "לא צוין"}
`;
    }

    if (data.message) {
      emailBody += `
הודעה:
------
${data.message}
`;
    }

    emailBody += `
---
נשלח מטופס יצירת קשר באתר NEST
`;

    // For now, log the email content (in production, integrate with email service)
    console.log("Contact form submission:");
    console.log("To: info@nestinsure.co.il");
    console.log("Subject: פנייה חדשה מאתר NEST");
    console.log("Body:", emailBody);

    // In production, you would send the email here using a service like:
    // - Resend
    // - SendGrid
    // - Nodemailer with SMTP
    // - Netlify Forms (by adding data-netlify="true" to the form)

    // For Netlify, you can also use Netlify Functions with email integration
    // or use a third-party form service

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error processing contact form:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
