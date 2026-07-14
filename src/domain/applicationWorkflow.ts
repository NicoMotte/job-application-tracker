export type ApplicationStatus =
  | "draft"
  | "sent"
  | "interview"
  | "rejected"
  | "accepted";

const allowedTransitions: Record<ApplicationStatus, ApplicationStatus[]> = {
  draft: ["sent"],
  sent: ["interview", "rejected"],
  interview: ["rejected", "accepted"],
  rejected: [],
  accepted: [],
};

export function moveApplicationStatus(
  currentStatus: ApplicationStatus,
  nextStatus: ApplicationStatus,
): ApplicationStatus {
  const allowedNextStatuses = allowedTransitions[currentStatus];

  if (!allowedNextStatuses.includes(nextStatus)) {
    throw new Error(
      `Cannot move application from ${currentStatus} to ${nextStatus}`,
    );
  }

  return nextStatus;
}
