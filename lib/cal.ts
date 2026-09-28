"use client";

export const CAL_LINK = "taner-gurkan/30min";
const NAMESPACE = "30min";

/**
 * Ouvre la prise de rendez-vous Cal.com dans une modale.
 * Le SDK n'est chargé qu'au premier clic : il ne pèse pas sur le chargement de la page.
 */
export async function openCal() {
  const { getCalApi } = await import("@calcom/embed-react");
  const cal = await getCalApi({ namespace: NAMESPACE });
  cal("ui", { hideEventTypeDetails: false, layout: "month_view" });
  cal("modal", { calLink: CAL_LINK, config: { layout: "month_view" } });
}
