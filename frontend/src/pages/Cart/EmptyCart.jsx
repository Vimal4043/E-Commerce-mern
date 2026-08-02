import { Link } from "react-router-dom";
import { FiSearch } from "react-icons/fi";

const EmptyCart = () => (
  <div className="min-h-screen bg-dark flex items-center justify-center px-6">
    <div className="text-center max-w-md">
      <div className="w-32 h-32 mx-auto mb-8 rounded-full bg-linear-to-br from-dark-card to-dark-elevated border border-dark-border flex items-center justify-center animate-[pulse_3s_ease-in-out_infinite]"><span className="text-6xl">&#128722;</span></div>
      <span className="typo-label-gold mb-4 block">Shopping Bag</span>
      <h2 className="typo-h2 text-white mb-4">Your Cart is Empty</h2>
      <div className="divider-gold mx-auto mb-6" />
      <p className="typo-body-sm text-text-secondary mb-8">Discover our exquisite collection of luxury timepieces and find the perfect addition to your collection.</p>
      <Link to="/shop" className="btn btn-primary btn-lg group">Explore Collection <FiSearch className="group-hover:translate-x-1 transition-transform inline ml-2" size={16} /></Link>
    </div>
  </div>
);

export default EmptyCart;