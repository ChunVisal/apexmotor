import { FaTimes } from "react-icons/fa";

const NewsModal = ({ post, onClose }) => {
  return (
    // Backdrop
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 bg-opacity-35 p-4" onClick={onClose}>
      {/* Modal Container */}
      <div 
        className="bg-white rounded-sm shadow-xl max-w-4xl max-h-[90vh] overflow-y-auto w-full relative"
        onClick={(e) => e.stopPropagation()} // Prevents closing when clicking inside the modal
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-700 hover:text-gray-900 z-10 p-2 rounded-full bg-white/50"
        >
          <FaTimes size={24} />
        </button>
        
        {/* Modal Content */}
        <div className="relative">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-80 sm:h-96 object-cover object-[center_60%]"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 sm:p-8">
            <h1 className="text-2xl font-extrabold text-white leading-tight">
              {post.title}
            </h1>
          </div>
        </div>

        <div className="p-6 sm:p-8">
          <p className="text-gray-500 text-[12.5px] font-medium mb-4">
            {post.category} - {new Date(post.date).toLocaleDateString()}
          </p>
          <p className="text-gray-700 leading-relaxed text-md mb-2">
            {post.excerpt}
          </p>
          {/* Add more detailed content or paragraphs here if you want */}
          <p className="text-gray-600 text-[12.5px]">
            This is a placeholder for more detailed content about the article.
            You can expand on the excerpt here to provide the full story.
          </p>
        </div>
      </div>
    </div>
  );
};

export default NewsModal;