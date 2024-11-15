const UnderMaintainance = () => {
  return (
    <div className="flex flex-col justify-center items-center text-center p-4 h-[75vh]">
      <h1 className="text-5xl font-bold text-gray-700 mb-7">
        Page Under Maintenance
      </h1>
      <p className="text-xl w-1/2 mx-auto text-gray-600 mb-6">
        We're currently working on this page. Please check back later.
      </p>
      <div className="flex flex-col items-center">
        <p className="text-lg text-gray-500">Thank you for your patience!</p>
      </div>
    </div>
  );
};

export default UnderMaintainance;
