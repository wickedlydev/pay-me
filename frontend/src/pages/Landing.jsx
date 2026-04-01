import { useNavigate } from "react-router-dom";

export const Landing = () => {
    const navigate = useNavigate();

    return (
        <div className="bg-slate-50 min-h-screen font-sans">
        
            <nav className="flex justify-between items-center px-6 md:px-10 py-6 bg-white shadow-sm">
            <div className="text-2xl font-black text-blue-600 tracking-tighter hover:opacity-80 transition cursor-pointer">
                    PAYTM<span className="text-sky-400">CLONE</span>
    </div>
    <div className="flex items-center gap-3 md:gap-4">
        <button 
            onClick={() => navigate("/signin")} 
            className="font-semibold text-slate-600 hover:text-blue-600 transition px-4 py-2 rounded-full hover:bg-slate-100"
        >
            Login
        </button>
        <button 
            onClick={() => navigate("/signup")} 
            className="bg-blue-600 text-white px-5 md:px-6 py-2 rounded-full font-bold hover:bg-blue-700 transition shadow-sm hover:shadow-md"
        >
            Get Started
        </button>
    </div>
</nav>

            {/* Hero Section */}
            <header className="flex flex-col items-center justify-center text-center py-24 px-6">
                <div className="bg-blue-100 text-blue-700 px-4 py-1 rounded-full text-sm font-bold mb-4">
                    TRUSTED BY  USERS
                </div>
                <h1 className="text-6xl font-extrabold text-slate-900 leading-tight max-w-4xl">
                    The fastest way to <span className="text-green-600">pay & get paid.</span>
                </h1>
                <p className="mt-6 text-xl text-slate-500 max-w-2xl">
                    Experience seamless money transfers, real-time balance tracking, and bank-grade security all in one simple dashboard.
                </p>
                <div className="mt-10 flex gap-4">
                    <button onClick={() => navigate("/signup")} className="bg-slate-900 text-white px-8 py-4 rounded-xl font-bold text-lg hover:shadow-lg transition">Open Free Account</button>
                    <button className="bg-white border border-slate-200 text-slate-900 px-8 py-4 rounded-xl font-bold text-lg hover:bg-slate-50 transition">Learn More</button>
                </div>
            </header>

            {/* Feature Grid */}
            <section className="py-20 bg-white">
                <div className="max-w-6xl mx-auto px-10 grid grid-cols-1 md:grid-cols-3 gap-12">
                    <FeatureCard title="Instant Transfers" desc="Send money to anyone instantly using their name or ID." icon="⚡" />
                    <FeatureCard title="Secure Vault" desc="Your transactions are protected by industry-leading encryption." icon="🔒" />
                    <FeatureCard title="Smart Analytics" desc="Keep track of your spending with our real-time balance updates." icon="📊" />
                </div>
            </section>
        </div>
    );
};

// Helper Component for Features
const FeatureCard = ({ title, desc, icon }) => (
    <div className="flex flex-col items-start p-4 hover:translate-y-1.25 transition-transform">
        <div className="text-4xl mb-4">{icon}</div>
        <h3 className="text-xl font-bold text-slate-900">{title}</h3>
        <p className="text-slate-500 mt-2 leading-relaxed">{desc}</p>
    </div>
);
