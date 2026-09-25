/**
 * Тонкая редакционная линия, вырастающая слева направо через scaleX при
 * появлении раздела. Только для режима "Живее" — привязана к тому же
 * reveal-состоянию, что и заголовок раздела (отдельного observer не
 * заводит).
 */
export default function RevealLine({ visible, delayMs = 0, className = "" }) {
  return (
    <span
      aria-hidden="true"
      style={{ transitionDelay: `${delayMs}ms` }}
      className={`block h-px bg-accent/50 origin-left transition-transform duration-[700ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
        visible ? "scale-x-100" : "scale-x-0"
      } ${className}`}
    />
  );
}
