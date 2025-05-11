export default function RetroLayout({ children }: { children: React.ReactNode }) {
  return (
    <section>
      <div>{children}</div>
    </section>
  );
}