import React from 'react';

const Success: React.FC = () => {
  return (
    <>
      {/* Trigger button */}
      <a
        href="#popup"
        className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Show Popup
      </a>

      {/* Popup overlay */}
      <div
        id="popup"
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 pointer-events-none transition-opacity duration-300
                   target:opacity-100 target:pointer-events-auto"
      >
        {/* Popup content box */}
        <div className="bg-white rounded-lg max-w-sm p-6 text-center mx-4 shadow-lg">
          <h2 className="text-2xl font-bold mb-2">Congratulations!</h2>
          <p className="mb-4 text-gray-700">
            You have successfully completed the task.
          </p>
          <a
            href="#_"
            className="inline-block px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Close
          </a>
        </div>
      </div>
    </>
  );
};

export default Success;
