const form = document.getElementById("application-form");
const applicationsList = document.getElementById("applications-list");
const message = document.getElementById("message");

function showMessage(text) {
  message.textContent = text;
}

async function loadApplications() {
  const response = await fetch("/applications");
  const applications = await response.json();

  applicationsList.innerHTML = "";

  for (const application of applications) {
    const item = document.createElement("li");

    item.innerHTML = `
      <strong>${application.company}</strong>
      <span>(${application.id})</span>
      <span> - statut : ${application.status}</span>

      <select data-application-id="${application.id}">
        <option value="draft">draft</option>
        <option value="sent">sent</option>
        <option value="interview">interview</option>
        <option value="rejected">rejected</option>
        <option value="accepted">accepted</option>
      </select>

      <button data-change-status="${application.id}">
        Changer le statut
      </button>
    `;

    const select = item.querySelector("select");
    select.value = application.status;

    applicationsList.appendChild(item);
  }
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const id = document.getElementById("application-id").value;
  const company = document.getElementById("company").value;

  const response = await fetch("/applications", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id, company }),
  });

  const body = await response.json();

  if (!response.ok) {
    showMessage(body.error);
    return;
  }

  showMessage("Candidature créée");
  form.reset();
  await loadApplications();
});

applicationsList.addEventListener("click", async (event) => {
  const button = event.target;

  if (!(button instanceof HTMLButtonElement)) {
    return;
  }

  const applicationId = button.dataset.changeStatus;

  if (!applicationId) {
    return;
  }

  const select = applicationsList.querySelector(
    `select[data-application-id="${applicationId}"]`,
  );

  const response = await fetch(`/applications/${applicationId}/status`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      status: select.value,
    }),
  });

  const body = await response.json();

  if (!response.ok) {
    showMessage(body.error);
    return;
  }

  showMessage("Statut modifié");
  await loadApplications();
});

loadApplications();
