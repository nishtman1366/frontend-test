export default function ItemCard({ item }) {
  return (
    <div className="border border-slate-200 rounded-2xl p-3 flex items-center gap-3 bg-white">
      <img
        src={
          item.avatar ||
          `https://robohash.org/${encodeURIComponent(
            String(item.id)
          )}.png?size=80x80`
        }
        alt={item.name}
        width={64}
        height={64}
        loading="lazy"
        className="rounded-lg object-cover"
      />
      <div>
        <div className="font-semibold">{item.name}</div>
        {item.email && (
          <div className="text-slate-500 text-sm">{item.email}</div>
        )}
      </div>
    </div>
  );
}
