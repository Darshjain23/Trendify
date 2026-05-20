const PromoBanner = () => {
  const promotions = [
    {
      icon: "ri-truck-line",
      title: "Free Delivery",
      description: "Enjoy zero delivery fees on all orders above $50. Fast, secure shipping direct to your doorstep.",
    },
    {
      icon: "ri-money-dollar-circle-line",
      title: "100% Money Back",
      description: "Not satisfied with your purchase? Return it within 30 days for a hassle-free, full refund.",
    },
    {
      icon: "ri-user-voice-line",
      title: "Dedicated Support",
      description: "Our support agents are available 24/7 to resolve queries, track orders, or assist with returns.",
    },
  ];

  return (
    <section className="py-16 bg-white max-w-[1400px] mx-auto px-4 md:px-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {promotions.map((promo, index) => (
          <div
            key={index}
            className="group flex items-start gap-5 p-6 rounded-2xl border border-gray-100 hover:border-transparent hover:shadow-xl hover:-translate-y-1 transition-all duration-300 bg-white"
          >
            {/* Icon Box */}
            <div className="h-12 w-12 rounded-xl bg-pink-50 text-primary flex items-center justify-center text-xl shrink-0 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
              <i className={promo.icon}></i>
            </div>
            
            {/* Content text */}
            <div className="space-y-1">
              <h4 className="text-base font-extrabold text-gray-800 tracking-wide uppercase">
                {promo.title}
              </h4>
              <p className="text-xs text-gray-400 leading-relaxed">
                {promo.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PromoBanner;
