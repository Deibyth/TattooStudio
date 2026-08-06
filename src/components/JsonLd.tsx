/**
 * Renderizador reutilizable de JSON-LD (Schema.org).
 *
 * Entrega un bloque <script type="application/ld+json"> con el objeto
 * serializado. Al no ser un script ejecutable (application/ld+json no es
 * javascript), no es bloqueado por el CSP `script-src 'self'` de producción.
 */
export default function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}