// tests/unit/applicationWorkflow.test.ts

import { describe, expect, it } from "vitest";
import {
  moveApplicationStatus,
  type ApplicationStatus,
} from "../../src/domain/applicationWorkflow";

describe("moveApplicationStatus", () => {
  const statuses: ApplicationStatus[] = [
    "draft",
    "sent",
    "interview",
    "rejected",
    "accepted",
  ];

  const allowedTransitions: Array<[ApplicationStatus, ApplicationStatus]> = [
    ["draft", "sent"],
    ["sent", "interview"],
    ["sent", "rejected"],
    ["interview", "rejected"],
    ["interview", "accepted"],
  ];

  function isAllowedTransition(
    currentStatus: ApplicationStatus,
    nextStatus: ApplicationStatus,
  ): boolean {
    return allowedTransitions.some(
      ([from, to]) => from === currentStatus && to === nextStatus,
    );
  }

  const forbiddenTransitions: Array<[ApplicationStatus, ApplicationStatus]> =
    statuses.flatMap((currentStatus) =>
      statuses
        .filter((nextStatus) => !isAllowedTransition(currentStatus, nextStatus))
        .map((nextStatus): [ApplicationStatus, ApplicationStatus] => [
          currentStatus,
          nextStatus,
        ]),
    );

  it.each(allowedTransitions)(
    "autorise la transition de %s vers %s",
    (currentStatus, nextStatus) => {
      expect(moveApplicationStatus(currentStatus, nextStatus)).toBe(nextStatus);
    },
  );

  it.each(forbiddenTransitions)(
    "interdit la transition de %s vers %s",
    (currentStatus, nextStatus) => {
      expect(() => moveApplicationStatus(currentStatus, nextStatus)).toThrow(
        `Cannot move application from ${currentStatus} to ${nextStatus}`,
      );
    },
  );
});
