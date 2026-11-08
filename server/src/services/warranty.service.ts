
export type WarrantyStatus =
  | "VALID"
  | "EXPIRING_SOON"
  | "EXPIRED"
  | "NOT_RECORDED";

export function getWarrantyStatus(
  warrantyExpiryDate: Date | null | undefined,
  today: Date = new Date(),
): WarrantyStatus {
  if (warrantyExpiryDate == null) {
    return "NOT_RECORDED";
  }

  const expiry = new Date(
    warrantyExpiryDate.getFullYear(),
    warrantyExpiryDate.getMonth(),
    warrantyExpiryDate.getDate(),
  );

  const currentDate = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
  );

  const daysRemaining = Math.floor(
    (expiry.getTime() - currentDate.getTime()) / 86_400_000,
  );

  if (daysRemaining < 0) {
    return "EXPIRED";
  }

  if (daysRemaining <= 30) {
    return "EXPIRING_SOON";
  }

  return "VALID";
}
