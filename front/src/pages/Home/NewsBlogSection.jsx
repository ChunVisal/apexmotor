import { useEffect, useState } from "react";
import { FaCalendarAlt, FaArrowRight, FaNewspaper, FaBook } from "react-icons/fa";
import { Link } from "react-router-dom";
import newsData from "../../data/newsData";
import NewsModal from "../../components/common/NewsModal";
const NewsBlogSection = () => {
  const [contentItems, setContentItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    // 1. Define the start date of the cycle
    const startDate = new Date("2025-01-01T00:00:00Z");
    const today = new Date();

    // 2. Calculate the number of days passed since the start date
    // Math.floor to get a whole number of days
    const daysPassed = Math.floor((today - startDate) / (1000 * 60 * 60 * 24));

    // 3. Determine the current "block" of data to display (4 days per block)
    // The modulo operator (%) ensures the cycle repeats every 16 days (4 blocks * 4 days/block)
    const blockIndex = Math.floor((daysPassed % 16) / 4);

    // 4. Calculate the start and end index for slicing the data array
    const startIndex = blockIndex * 4;
    const endIndex = startIndex + 4;
    
    // 5. Slice the data array to get the 4 items for the current block
    const currentBlockData = newsData.slice(startIndex, endIndex);

    // 6. Sort by date (newest first) to ensure the featured story is always the latest in the current block
    const sorted = [...currentBlockData].sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );
    
    // 7. Update the state
    setContentItems(sorted);
  }, []); // Empty dependency array means this runs only once on component mount

  const handleOpenModal = (item) => {
    setSelectedPost(item);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPost(null);
  };

  if (!contentItems.length) {
    return <p className="text-center text-gray-500">No news available</p>;
  }

  return (
    <section className="p-4 sm:p-6-lg max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Featured Card */}
        <div className="flex flex-col w-full md:w-3/4 bg-white shadow-sm overflow-hidden md:h-[370px]">
          <div className="relative flex-grow-0">
            <img
              src={contentItems[0].image}
              className="w-full h-48 md:h-56 object-cover object-[center_70%]"
              alt={contentItems[0].title}
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
              <div className="btn-Bg text-white text-[11px] px-3 py-1-md inline-flex items-center gap-2">
                <FaNewspaper /> <span>FEATURED STORY</span>
              </div>
              <h3 className="text-md font-bold text-white mt-2">{contentItems[0].title}</h3>
            </div>
          </div>
          <div className="p-4 border-t-4 border-blue-400 flex flex-col justify-between flex-grow">
            <p className="text-[12.5px] text-gray-600 mb-3">
              {contentItems[0].excerpt}
            </p>
            <div className="flex justify-between items-center mt-auto">
              <span className="text-xs text-gray-400 flex items-center gap-2">
                <FaCalendarAlt /> {new Date(contentItems[0].date).toLocaleDateString()}
              </span>
              <Link
                onClick={() => handleOpenModal(contentItems[0])}
                className="text-xs font-medium text-blue-600 hover:text-blue-800 flex items-center gap-1"
              >
                Read Full Story <FaArrowRight className="text-[10px]" />
              </Link>
            </div>
          </div>
        </div>

        {/* Side list */}
        <div className="w-full md:w-max flex flex-col space-y-4 max-h-[400px] md:max-h-[370px] overflow-y-auto pr-2 custom-scrollbar">
          {contentItems.slice(1).map((item, index) => (
            <div
              key={index}
              className="flex gap-3 bg-white p-3 shadow-sm border border-gray-100 hover:shadow-md transition-all"
            >
              <div className="w-35 h-29 -m-3 mr-0.5 relative">
                <img src={item.image} className="w-full h-full object-cover" width={600} 
                      height={400} 
                      loading="lazy" alt={item.title} />
                <div className="absolute bottom-1 right-1 bg-black/70 text-white text-[9px] px-1.5 py-0.5-sm flex items-center gap-1">
                  {item.type === "news" ? (
                    <FaNewspaper className="text-[8px]" />
                  ) : (
                    <FaBook className="text-[8px]" />
                  )}
                  <span>{item.category}</span>
                </div>
              </div>
              <div className="flex-1 min-w-0 flex flex-col justify-between">
                <div>
                  <h3 className="text-xs font-semibold text-gray-900 line-clamp-2 leading-tight">
                    {item.title}
                  </h3>
                  <p className="text-[11px] text-gray-500 mt-1 line-clamp-2">{item.excerpt}</p>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-[10px] text-gray-400 flex items-center gap-1">
                    <FaCalendarAlt /> {new Date(item.date).toLocaleDateString()}
                  </span>
                  <Link
                    onClick={() => handleOpenModal(contentItems[0])}
                    className="text-[10px] font-medium text-blue-600 hover:underline flex items-center"
                  >
                    Read <FaArrowRight className="ml-0.5 text-[8px]" />
                  </Link>

                </div>
                
                  {isModalOpen && selectedPost && (
                    <NewsModal post={selectedPost} onClose={handleCloseModal} />
                  )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewsBlogSection;