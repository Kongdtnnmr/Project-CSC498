import { useEffect, useState } from "react";
import { getNews } from "../services/news";

export default function News() {
    
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getNews()
      .then(setNews)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="text-center py-20">
        กำลังโหลดข่าว...
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">
        ข่าวประชาสัมพันธ์
      </h1>

      {news.length === 0 && (
        <p>ยังไม่มีข่าว</p>
      )}

      <div className="grid md:grid-cols-3 gap-6">
        {news.map(item => (
          <div
            key={item.id}
            className="bg-white rounded-lg shadow hover:shadow-lg transition"
          >
            {item.image && (
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-48 object-cover rounded-t-lg"
              />
            )}

            <div className="p-4">
              <h3 className="font-semibold text-lg mb-2">
                {item.title}
              </h3>

              <p className="text-sm text-gray-600 line-clamp-3">
                {item.content}
              </p>

              <p className="text-xs text-gray-400 mt-3">
                {item.createdAt?.toDate
                  ? item.createdAt.toDate().toLocaleDateString("th-TH")
                  : ""}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
