/**
 * Google Sheets Synchronization Utility
 * This sends task data to a Google Apps Script Webhook
 */
export async function syncTaskToGoogleSheets(task: any) {
  const webhookUrl = process.env.GOOGLE_SHEET_WEBHOOK;
  if (!webhookUrl) {
    console.warn("GOOGLE_SHEET_WEBHOOK not found in environment. Skipping Google Sheets sync.");
    return;
  }

  try {
    const payload = {
      timestamp: new Date().toISOString(),
      taskTitle: task.title,
      patientName: task.patient,
      patientPhone: task.patientPhone || "N/A",
      patientEmail: task.patientEmail || "N/A",
      location: task.location || "N/A",
      assignedTo: task.assignedToName || task.assignedTo,
      priority: task.priority,
      status: task.status,
      date: task.date,
      time: task.time || "N/A"
    };

    const response = await fetch(webhookUrl, {
      method: "POST",
      mode: "no-cors", // Required for some Apps Script setups
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    return response;
  } catch (error) {
    console.error("Failed to sync task to Google Sheets:", error);
  }
}
