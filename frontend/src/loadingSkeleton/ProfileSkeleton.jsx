const ProfileSkeleton = () => {
    return (
        <div className="min-h-screen bg-gray-100 p-4 md:p-6 animate-pulse">

            {/* PROFILE CARD */}
            <div className="bg-white p-6 rounded-2xl shadow max-w-3xl mx-auto">

                {/* Title */}
                <div className="h-6 bg-gray-300 rounded w-40 mb-6 mx-auto md:mx-0"></div>

                {/* Content */}
                <div className="flex flex-col md:flex-row items-center md:items-start gap-6">

                    {/* Avatar */}
                    <div className="w-24 h-24 bg-gray-300 rounded-full"></div>

                    {/* Info */}
                    <div className="flex-1 w-full space-y-3 text-center md:text-left">
                        <div className="h-4 bg-gray-300 rounded w-2/3 mx-auto md:mx-0"></div>
                        <div className="h-4 bg-gray-300 rounded w-3/4 mx-auto md:mx-0"></div>
                        <div className="h-3 bg-gray-300 rounded w-1/3 mx-auto md:mx-0"></div>
                    </div>
                </div>

                {/* Buttons */}
                <div className="flex flex-col md:flex-row gap-3 mt-6">
                    <div className="h-12 bg-gray-300 rounded-lg w-full"></div>
                    <div className="h-12 bg-gray-300 rounded-lg w-full"></div>
                </div>
            </div>

            {/* ADDRESS SECTION */}
            <div className="max-w-3xl mx-auto mt-8">

                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-3 mb-4">
                    <div className="h-5 bg-gray-300 rounded w-40"></div>
                    <div className="h-10 bg-gray-300 rounded w-32"></div>
                </div>

                {/* Address Card */}
                <div className="bg-white p-5 rounded-xl shadow space-y-3">
                    <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                    <div className="h-3 bg-gray-300 rounded w-1/3"></div>
                    <div className="h-3 bg-gray-300 rounded w-2/3"></div>
                    <div className="h-3 bg-gray-300 rounded w-3/4"></div>
                </div>
            </div>

            {/* LOGOUT BUTTON */}
            <div className="max-w-3xl mx-auto mt-6">
                <div className="h-12 bg-gray-300 rounded-lg w-full"></div>
            </div>

        </div>
    );
};

export default ProfileSkeleton;