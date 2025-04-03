// components/RewardsSection.jsx
import React from 'react';

const RewardsSection = () => {
  const rewards = [
    {
      title: "Certificate of Completion",
      description: "Receive an official Super30 certificate recognizing your achievement and technical skills.",
      icon: "🏆"
    },
    {
      title: "Hackathon Prizes",
      description: "Win exciting prizes in our final hackathon including cash rewards and tech gadgets.",
      icon: "💰"
    },
    {
      title: "Perfect Attendance Bonus",
      description: "Special recognition and additional perks for students with 100% attendance.",
      icon: "🎯"
    },
    {
      title: "Project Showcase",
      description: "Opportunity to showcase your final projects to industry professionals and potential employers.",
      icon: "🌟"
    },
    {
      title: "LinkedIn Recommendation",
      description: "Personal recommendation on LinkedIn from our lead instructor and mentor.",
      icon: "👑"
    },
    {
      title: "Internship Opportunities",
      description: "Top performers get direct internship referrals to partner companies.",
      icon: "🚀"
    }
  ];

  return (
    <section id="rewards" className="py-16 bg-gradient-to-b from-purple-900/10 to-purple-900/20">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-amber-400">
            Rewards &amp; Recognition
          </h2>
          
          <p className="text-xl text-center text-gray-300 mb-12 max-w-3xl mx-auto">
            At Super30, we believe in recognizing and rewarding excellence. Here's what you can earn through your dedication and hard work.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rewards.map((reward, index) => (
              <div 
                key={index}
                className="bg-gradient-to-br from-purple-900/40 to-purple-800/40 backdrop-blur-sm rounded-xl border border-purple-500/30 p-6 shadow-lg hover:shadow-purple-500/20 transition-all duration-300"
              >
                <div className="text-4xl mb-4">{reward.icon}</div>
                <h3 className="text-xl font-semibold text-amber-300 mb-3">{reward.title}</h3>
                <p className="text-gray-300">{reward.description}</p>
              </div>
            ))}
          </div>
          
          <div className="mt-16 bg-purple-800/40 rounded-xl p-6 md:p-8 border border-purple-400/20 text-center">
            <h3 className="text-2xl font-semibold text-amber-300 mb-6">
              Final Hackathon Event
            </h3>
            <p className="text-gray-200 max-w-3xl mx-auto mb-8">
              The program culminates in an exciting 36-hour hackathon where you'll form teams and build 
              innovative solutions to real-world problems. Industry experts will judge your projects, 
              with substantial prizes for the winning teams!
            </p>
            <div className="inline-block bg-gradient-to-r from-purple-500 to-amber-500 p-px rounded-lg">
              <button className="bg-purple-900 text-white font-medium px-8 py-3 rounded-lg hover:bg-purple-800 transition duration-300">
                View Last Year's Projects
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RewardsSection;