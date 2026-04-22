import { motion } from "motion/react";

const ConfirmationWindow = (handelClick, setConfirmation, message) => {
  return (
    <motion.div className="fixed inset-0 flex items-center justify-center backdrop-blur-xs bg-opacity-50 z-999 bg-[#0000007c]">
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0 }}
        transition={{ duration: 0.3 }}
        className="w-full relative"
        onClick={(e) => e.stopPropagation()}>
        <div className="fixed inset-0 flex items-center justify-center z-[999]">
          <div className="bg-blue-50 text-black p-6 rounded-2xl shadow-2xl w-80 text-center">
            <h2 className="text-lg font-semibold mb-4">Are you sure you want to {message}?</h2>

            <div className="flex justify-center gap-4">
              <button
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                onClick={() => {
                  handelClick();
                  setConfirmation(false);
                }}>
                Yes
              </button>

              <button
                className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
                onClick={() => setConfirmation(false)}>
                No
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ConfirmationWindow;
