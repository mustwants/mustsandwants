export default function HomeCard({ home }) {
  return (
    <div className="bg-gray-50 shadow-sm rounded-xl p-4 border">
      <a href={home.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 font-semibold break-words">
        {home.url}
      </a>
      {home.notes && <p className="text-gray-700 mt-2">{home.notes}</p>}
      {home.tags?.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-2">
          {home.tags.map((tag, i) => (
            <span key={i} className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded">
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}
