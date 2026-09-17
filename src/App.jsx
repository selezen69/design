import { useState } from "react";
import ProjectDetail from "./sections/ProjectDetail";
import HomeB from "./variants/b/HomeB";
import { useScrollToHash } from "./hooks/useScrollToHash";
import { MotionModeProvider } from "./hooks/MotionModeProvider";
// ВРЕМЕННО: переключатель интенсивности движения "Спокойно" / "Живее" для
// локального сравнения — не часть утверждённого дизайна, не переносить в
// основной сайт. См. src/variants/shared/MotionModeSwitcher.jsx. По обычной
// клиентской ссылке скрыт — виден только с ?motion-review=1 в URL.
import MotionModeSwitcher from "./variants/shared/MotionModeSwitcher";
// Варианты A и C сохранены в src/variants/{a,c}/ на случай возврата до
// окончательного утверждения дизайна — сейчас не подключены.

function useMotionReviewParam() {
  const [enabled] = useState(
    () =>
      typeof window !== "undefined" &&
      new URLSearchParams(window.location.search).get("motion-review") === "1"
  );
  return enabled;
}

export default function App() {
  const [selectedProject, setSelectedProject] = useState(null);
  useScrollToHash();
  const motionReview = useMotionReviewParam();

  return (
    <MotionModeProvider>
      <HomeB onSelectProject={setSelectedProject} />
      {selectedProject && (
        <ProjectDetail
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
      {motionReview && <MotionModeSwitcher />}
    </MotionModeProvider>
  );
}
