import { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import { Swiper as SwiperClass } from 'swiper';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Import Swiper core and autoplay styles
import 'swiper/css';
import 'swiper/css/autoplay';

import { useBanners } from '../hooks/useBanners';

export const getLocalBannerPath = (bannerName: string) => {
  const match = bannerName.match(/Banner\s*(\d+)/i);
  if (match) {
    return `/core/Banner ${match[1]}.png`;
  }
  return `/core/${bannerName}.png`;
};

export default function PromoSlider() {
  const { banners, loading, error } = useBanners();
  const swiperRef = useRef<SwiperClass | null>(null);

  if (loading) {
    return (
      <div className="sims-promo-section animate-fade-in">
        <h2 className="sims-section-title">Temukan promo menarik</h2>
        <div className="sims-promo-container">
          {Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              className="sims-promo-card bg-slate-100 animate-pulse min-w-[270px]"
            />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="sims-promo-section bg-white p-6 rounded-2xl border border-rose-100 text-center py-6 mt-4">
        <span className="text-rose-500 font-medium text-sm mb-2">{error}</span>
      </div>
    );
  }

  return (
    <div className="sims-promo-section animate-fade-in relative group">
      <h2 className="sims-section-title">Temukan promo menarik</h2>

      <div className="relative px-0.5">
        <button
          onClick={() => swiperRef.current?.slidePrev()}
          className="absolute left-[-16px] top-1/2 -translate-y-1/2 z-10 w-9 h-9 flex items-center justify-center bg-white border border-slate-100 text-slate-700 rounded-full shadow-md hover:bg-slate-50 transition-all cursor-pointer opacity-90 hover:opacity-100 active:scale-95"
          aria-label="Scroll left"
        >
          <ChevronLeft size={18} strokeWidth={2.5} />
        </button>

        <button
          onClick={() => swiperRef.current?.slideNext()}
          className="absolute right-[-16px] top-1/2 -translate-y-1/2 z-10 w-9 h-9 flex items-center justify-center bg-white border border-slate-100 text-slate-700 rounded-full shadow-md hover:bg-slate-50 transition-all cursor-pointer opacity-90 hover:opacity-100 active:scale-95"
          aria-label="Scroll right"
        >
          <ChevronRight size={18} strokeWidth={2.5} />
        </button>

        {banners && banners.length > 0 ? (
          <Swiper
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            modules={[Autoplay]}
            loop={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            breakpoints={{
              0: { slidesPerView: 1, spaceBetween: 16 },
              640: { slidesPerView: 2, spaceBetween: 20 },
              1024: { slidesPerView: 4, spaceBetween: 24 },
            }}
            className="w-full py-2"
          >
            {banners.map((banner, index) => {
              const localPath = getLocalBannerPath(banner.banner_name);

              return (
                <SwiperSlide key={banner.banner_name || index}>
                  <div className="sims-promo-card w-full relative overflow-hidden group">
                    <img
                      src={localPath}
                      alt={banner.banner_name}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-355 group-hover:scale-105"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = banner.banner_image;
                      }}
                    />
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        ) : (
          <div className="sims-promo-card bg-slate-100 flex items-center justify-center">
            <span className="text-slate-400 text-sm">Tidak ada promo tersedia</span>
          </div>
        )}
      </div>
    </div>
  );
}
