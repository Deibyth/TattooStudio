/**
 * Renderizador reutilizable de JSON-LD (Schema.org).
 *
 * Entrega un bloque <script type="application/ld+json"> con el objeto
 * serializado. Al no ser un script ejecutable (application/ld+json no es
 * javascript), no es bloqueado por el CSP `script-src 'self'` de producción.
 */
export default function JsonLd({ data }: { data: Record<string, unknown> }) {
  // Escapamos "<" como \u003c: evita que un string con "</script>" dentro del
  // JSON rompa el tag y convierta el bloque JSON-LD en un vector XSS. Es un
  // escape JSON válido (JSON.parse lo interpreta idéntico), así que no altera
  // los datos para los parsers de Schema.org.
  const safeJson = JSON.stringify(data).replace(/</g, "\\u003c");
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: safeJson }}
    />
  );
}