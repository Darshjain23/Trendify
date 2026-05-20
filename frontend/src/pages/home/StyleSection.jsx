import card1 from "../../assets/card-1.png";
import card2 from "../../assets/card-2.png";
import card3 from "../../assets/card-3.png";

const cards = [
  {
    id: 1,
    image: card1,
    trend: "2026 Trend",
    title: "Womens Shirt",
  },
  {
    id: 2,
    image: card2,
    trend: "2026 Trend",
    title: "Womens Dresses",
  },
  {
    id: 3,
    image: card3,
    trend: "2026 Trend",
    title: "Womens Casuals",
  },
];

const StyleSection = () => {
  return (
    <section className="py-16 bg-gray-50 border-y border-gray-100">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        {cards.map((card) => {
          return (
            <div 
              key={card.id} 
              className="group relative block aspect-[4/3] overflow-hidden rounded-2xl bg-white shadow-md border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              {/* Image */}
              <img 
                src={card.image} 
                alt={card.title} 
                className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              
              {/* Dark Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
              
              {/* Content Overlay */}
              <div className="absolute inset-0 p-8 flex flex-col justify-end text-white">
                <p className="text-xs font-bold text-pink-400 uppercase tracking-widest mb-1 opacity-90">
                  {card.trend}
                </p>
                <h4 className="text-2xl font-extrabold tracking-wide uppercase mb-3 text-white">
                  {card.title}
                </h4>
                <div>
                  <Link
                    to={`/shop`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold tracking-widest text-white uppercase border-b-2 border-primary pb-1 hover:border-white transition-colors"
                  >
                    <span>Discover More</span>
                    <i className="ri-arrow-right-up-line"></i>
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default StyleSection;
