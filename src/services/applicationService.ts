import {
  moveApplicationStatus,
  type ApplicationStatus,
} from "../domain/applicationWorkflow";

export type Application = {
  id: string;
  company: string;
  status: ApplicationStatus;
};

const applications: Application[] = []; // note: simule une base de donnée. Fonctionne de la même manière, donc à vider entre chaque test, donc important en "intégration"

export function createApplication(id: string, company: string): Application {
  const application: Application = {
    id,
    company,
    status: "draft",
  };

  applications.push(application);

  return application;
}

export function changeApplicationStatus(
  id: string,
  nextStatus: ApplicationStatus,
): Application {
  const application = applications.find((item) => item.id === id);

  if (!application) {
    throw new Error(`Application ${id} not found`);
  }

  const newStatus = moveApplicationStatus(application.status, nextStatus);

  application.status = newStatus;

  return application;
}

export function clearApplications(): void {
  applications.length = 0;
}
