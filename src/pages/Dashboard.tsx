import ProfileForm from "../components/ProfileForm";
import RedirectSection from "../components/RedirectSection";
import StatCard from "../components/StatCard";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-black">
      <div className="mx-auto max-w-6xl">
        {/* Header with gradient background and profile */}
        <div className="relative">
          {/* Gradient Header Background */}
          <div className="h-48 md:h-64 w-full overflow-hidden rounded-b-[24px] md:rounded-b-[32px]">
            <img 
              src="/header-gradient.svg" 
              alt="Header Background" 
              className="h-full w-full object-cover"
            />
          </div>
          
          {/* Profile Picture - Overlays the header */}
          <div className="absolute left-1/2 -translate-x-1/2 -bottom-16 md:-bottom-20">
            <div className="relative">
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-[#D4AF37] overflow-hidden bg-gray-200">
                <img 
                  src="/profile-placeholder.jpg" 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = "https://ui-avatars.com/api/?name=John+Doe&size=200&background=D4AF37&color=000";
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Username and Status */}
        <div className="mt-20 md:mt-24 px-3 md:px-6 text-center">
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-3">@john_doe_24</h1>
          <div className="inline-flex rounded-full bg-[#B4FFE6] px-4 py-1.5 text-sm font-bold text-[#10B981]">
            <span className="mr-2 inline-block h-2 w-2 rounded-full bg-[#10B981]"></span>
            Active
          </div>
        </div>

        {/* Stats and Content */}
        <div className="mt-8 px-3 md:px-6 space-y-6 pb-8">
        <div className="flex flex-row gap-4">
          <StatCard icon="/tap-one.svg" label="TOTAL TAPS" value="1,568" />
          <StatCard
            icon="/tick-one.svg"
            label="VALID REDIRECTS"
            value="1,540"
          />
        </div>

          <div className="rounded-[8px] bg-[#202022] p-6 md:p-8">
            <RedirectSection />
            <ProfileForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
