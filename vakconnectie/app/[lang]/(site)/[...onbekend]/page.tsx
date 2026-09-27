import { notFound } from "next/navigation";

// Vangt onbekende URL's met meerdere segmenten op, zodat ook die de eigen 404-pagina tonen.
export default function UnknownPage() {
  notFound();
}
