import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";

const reviewVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: i * 0.15,
            duration: 0.5,
            ease: "easeOut",
        },
    }),
};

export default function ReviewCard({ index, text, user, imgSrc }) {
    return (
        <motion.blockquote
            className="bg-white p-6 rounded-md shadow-md italic text-gray-700 flex flex-col justify-between cursor-pointer"
            custom={index}
            initial="hidden"
            animate="visible"
            variants={reviewVariants}
            whileHover={{ scale: 1.05, boxShadow: "0 8px 20px rgba(128,128,128,0.3)" }}
            transition={{ type: "tween", duration: 0.3 }}
        >
            <div className="flex flex-col items-center">
                <img src="/citation.png" alt="face" className="h-8 mb-4" />
                {/* Star Rating */}
                <div className="flex mb-2 text-yellow-400 justify-center">
                    {[...Array(5)].map((_, starIdx) => (
                        <FaStar key={starIdx} />
                    ))}
                </div>
                <p className="text-center">{text}</p>
            </div>

            <footer className="mt-4 text-center font-semibold">{user}</footer>
        </motion.blockquote>
    );
}
