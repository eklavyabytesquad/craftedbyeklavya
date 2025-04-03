import Navbar from '../../components/DNS/navbar';
import Background3D from '../../components/mainpage/3dbackground';

export default function Super30Page() {
  return (
    <main className="relative min-h-screen bg-gray-900 text-white">
      <Background3D />
      <Navbar />
      
      <div className="container mx-auto px-4 pt-32 pb-16 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-12 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-amber-400">
              Super30 Technical Event
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              An elite technical training program fostering innovation and excellence in engineering
            </p>
          </div>
          
          {/* Main content */}
          <div className="space-y-10 backdrop-blur-sm bg-purple-900/20 p-6 md:p-10 rounded-xl border border-purple-500/30">
            {/* About section */}
            <section>
              <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-amber-300">About Super30</h2>
              <p className="text-gray-200 mb-4">
                Super30 is our flagship technical event designed to identify and nurture the brightest engineering minds. 
                Participants undergo an intensive training program focusing on cutting-edge technologies, problem-solving, 
                and innovation.
              </p>
              <p className="text-gray-200">
                Created with the vision to bridge the gap between academic knowledge and industry requirements, 
                Super30 has become a launchpad for future tech leaders and innovators.
              </p>
            </section>
            
            {/* Key features */}
            <section>
              <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-amber-300">Program Highlights</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-purple-800/30 p-5 rounded-lg border border-purple-500/30 hover:bg-purple-700/40 transition-all">
                  <h3 className="text-xl font-medium mb-2 text-pink-300">Intensive Training</h3>
                  <p className="text-gray-300">Advanced workshops and hands-on sessions led by industry experts and academic leaders</p>
                </div>
                <div className="bg-purple-800/30 p-5 rounded-lg border border-purple-500/30 hover:bg-purple-700/40 transition-all">
                  <h3 className="text-xl font-medium mb-2 text-pink-300">Hackathons</h3>
                  <p className="text-gray-300">Competitive coding challenges to solve real-world problems under time constraints</p>
                </div>
                <div className="bg-purple-800/30 p-5 rounded-lg border border-purple-500/30 hover:bg-purple-700/40 transition-all">
                  <h3 className="text-xl font-medium mb-2 text-pink-300">Mentorship</h3>
                  <p className="text-gray-300">One-on-one guidance from tech industry veterans and successful entrepreneurs</p>
                </div>
                <div className="bg-purple-800/30 p-5 rounded-lg border border-purple-500/30 hover:bg-purple-700/40 transition-all">
                  <h3 className="text-xl font-medium mb-2 text-pink-300">Industry Connect</h3>
                  <p className="text-gray-300">Networking opportunities with leading tech companies and potential employers</p>
                </div>
              </div>
            </section>
            
            {/* Timeline */}
            <section>
              <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-amber-300">Event Timeline</h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0">1</div>
                  <div>
                    <h3 className="text-xl font-medium text-white">Registration Phase</h3>
                    <p className="text-gray-300">Open for all engineering students. Selection based on aptitude test and previous projects.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0">2</div>
                  <div>
                    <h3 className="text-xl font-medium text-white">Training Program</h3>
                    <p className="text-gray-300">Six weeks of intensive training covering algorithms, system design, and emerging technologies.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0">3</div>
                  <div>
                    <h3 className="text-xl font-medium text-white">Final Project</h3>
                    <p className="text-gray-300">Participants showcase their skills by developing innovative solutions to real-world problems.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0">4</div>
                  <div>
                    <h3 className="text-xl font-medium text-white">Demo Day</h3>
                    <p className="text-gray-300">Present projects to a panel of judges from leading tech companies and academia.</p>
                  </div>
                </div>
              </div>
            </section>
            
            {/* CTA */}
            <section className="text-center py-6">
              <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-amber-300">Join Super30</h2>
              <p className="text-gray-200 mb-8 max-w-2xl mx-auto">
                Applications for the next cohort are now open. Take the first step towards becoming part of an elite technical community.
              </p>
              <button className="bg-gradient-to-r from-purple-500/80 to-amber-500/80 text-white px-8 py-3 rounded-lg text-lg font-medium hover:from-purple-600/90 hover:to-amber-600/90 transition-all duration-300">
                Register Now
              </button>
            </section>
          </div>
          
          {/* Footer note */}
          <div className="mt-16 text-center text-gray-400">
            <p>For more information, reach out to us at super30@example.com</p>
          </div>
        </div>
      </div>
    </main>
  );
}