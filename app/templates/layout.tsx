export default function TemplatesLayout({ children }: { children: React.ReactNode }) {
  return (
    <section>
      <div>{children}</div>
    </section>
  );
}
