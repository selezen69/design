export function projectTypeLabel(project) {
  return project.typeLabel ?? (project.type === "house" ? "Загородный дом" : "Квартира");
}

export function projectSubtitle(project) {
  return [
    projectTypeLabel(project),
    project.area ? `${project.area} м²` : null,
    project.location ?? null,
  ]
    .filter(Boolean)
    .join(" • ");
}
