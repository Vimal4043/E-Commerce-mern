import { Link } from "react-router-dom";
import { FiLogIn, FiUserPlus } from "react-icons/fi";

const NoCart = () => (
  <div className="min-h-screen bg-dark flex items-center justify-center px-6">
    <div className="text-center max-w-md">
      <div className="w-24 h-24 mx-auto mb-8 rounded-full bg-linear-to-br from-dark-card to-dark-elevated border border-dark-border flex items-center justify-center"><span className="text-5xl">&#128722;</span></div>
      <span className="typo-label-gold mb-4 block">Shopping Bag</span>
      <h2 className="typo-h2 text-white mb-4">Sign in to view your cart</h2>
      <div className="divider-gold mx-auto mb-6" />
      <p className="typo-body-sm text-text-secondary mb-8">Sign in to access your saved items and continue your luxury shopping experience.</p>
      <div className="flex flex-col sm:flex-row justify-center gap-3">
        <Link to="/login" className="btn btn-primary group">Sign In <FiLogIn className="group-hover:translate-x-1 transition-transform" size={16} /></Link>
        <Link to="/signup" className="btn btn-outline group">Create Account <FiUserPlus className="group-hover:translate-x-1 transition-transform" size={16} /></Link>
      </div>
    </div>
  </div>
);

export default NoCart;
