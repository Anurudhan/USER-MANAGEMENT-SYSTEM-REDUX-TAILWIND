
import Slider from "react-slick";
import UserNavbar from "../../../Components/UserNavbar";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './Home.css';

// Custom arrow component
const CustomArrow = ({ className, style, onClick }) => (
  <div
    className={className}
    style={{ ...style, display: 'block', background: 'rgba(255, 255, 255, 0.5)', borderRadius: '100%' }}
    onClick={onClick}
  />
);

function Home() {
  const slides = [
    { id: 1, title: 'iPhone 12', description: 'The iPhone 12 features a new design, improved cameras, and 5G support.', imageUrl: 'https://www.cnet.com/a/img/resize/4dfd428ca182e0b90a2262b2df6cdb0ceb0355ae/hub/2020/10/30/067bd108-d594-41a2-a390-2a73f9f1ad41/apple-iphone-12-confetti-9923.jpg?auto=webp&fit=crop&height=1200&width=1200' },
    { id: 2, title: 'iPhone 13', description: 'The iPhone 13 offers longer battery life, better performance, and new color options.', imageUrl: 'https://images.pexels.com/photos/14666017/pexels-photo-14666017.jpeg?cs=srgb&dl=pexels-doouglasma-14666017.jpg&fm=jpg' },
    { id: 3, title: 'iPhone 14', description: 'The iPhone 14 introduces advanced camera technology and a sleek design.', imageUrl: 'https://www.91-img.com/gallery_images_uploads/d/e/de8d66ea3666bd222e40da58623e02b8457adac6.JPG?tr=h-630,c-at_max,q-80' },
    { id: 4, title: 'iPhone 12 Pro', description: 'The iPhone 12 Pro comes with enhanced camera features and LiDAR technology.', imageUrl: 'https://techcrunch.com/wp-content/uploads/2020/10/heroimage.jpg?w=1024' },
    { id: 5, title: 'iPhone 13 Pro', description: 'The iPhone 13 Pro offers ProMotion display and improved battery life.', imageUrl: 'https://www.91-img.com/gallery_images_uploads/2/7/2736acf8e6adc92cf6970c457d2112c6a7a65767.JPG?tr=h-630,c-at_max,q-80' },
    { id: 6, title: 'iPhone 14 Pro', description: 'The iPhone 14 Pro includes an Always-On display and new dynamic island.', imageUrl: 'https://images.moneycontrol.com/static-mcnews/2022/11/iphone-14-india-770x433.jpg?impolicy=website&width=770&height=431' },
  ];

  const carouselImages = [
    'https://www.apple.com/newsroom/images/tile-images/Apple_new-iphone-se_04152020.jpg.og.jpg?202405161748',
    'https://media.idownloadblog.com/wp-content/uploads/2020/05/Vector-wave-iPhone-wallpaper-Arthur1992aS-iDownloadBlog-mockup.png',
    'https://techcrunch.com/wp-content/uploads/2023/09/1-e1695088502767.jpeg',
  ];

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };

  const slideSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <CustomArrow />,
    prevArrow: <CustomArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ]
  };

  return (
    <>
      <UserNavbar />
      <div className="bg-gray-900 text-white min-h-screen relative overflow-hidden">
        <div className="overlay"></div> {/* Overlay for dark effect */}
        <main className="container mx-auto py-8 relative z-10">
          {/* Main Carousel */}
          <div className="full-screen-carousel">
            <Slider {...settings} className="h-full">
              {carouselImages.map((url, index) => (
                <div key={index} className="carousel-image-container">
                  <img src={url} alt={`Slide ${index + 1}`} className="carousel-image" />
                </div>
              ))}
            </Slider>
          </div>

          {/* Main heading */}
          <h1 className="text-3xl font-bold mb-4 mt-4">Welcome to Apple Store</h1>

          {/* Section for iPhone slides */}
          <section className="mt-8">
            <h2 className="text-2xl font-bold mb-4">iPhones</h2>
            <Slider {...slideSettings} className="slides-container">
              {slides.map(slide => (
                <div key={slide.id} className="p-4">
                  <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                    <div className="slide-image-container">
                      <img src={slide.imageUrl} alt={slide.title} className="slide-image" />
                    </div>
                    <h3 className="text-lg font-bold mb-2">{slide.title}</h3>
                    <p className="text-gray-300">{slide.description}</p>
                  </div>
                </div>
              ))}
            </Slider>
          </section>
        </main>

        {/* Footer section */}
        <footer className="bg-gray-800 text-center p-4 mt-8 relative z-10">
          <p className="text-gray-300">&copy; 2024 User Management Demo. All rights reserved.</p>
        </footer>
      </div>
    </>
  );
}

export default Home;