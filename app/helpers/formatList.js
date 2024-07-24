export default function formatList(items, getName) {
  return items.length > 0 ? items.map(getName).join(", ") : "N/A";
}
