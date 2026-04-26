import { Star } from 'lucide-react';

const SkeletonCard = ({ type = 'doctor' }) => {
  return (
    <div className="glass-card rounded-card p-4 animate-pulse">
      {type === 'doctor' && (
        <div className="flex gap-4">
          <div className="w-20 h-20 rounded-full skeleton"></div>
          <div className="flex-1">
            <div className="h-5 w-3/4 skeleton rounded mb-2"></div>
            <div className="h-4 w-1/2 skeleton rounded mb-2"></div>
            <div className="h-4 w-1/3 skeleton rounded"></div>
          </div>
        </div>
      )}
      {type === 'hospital' && (
        <div className="flex gap-4">
          <div className="w-24 h-24 rounded-lg skeleton"></div>
          <div className="flex-1">
            <div className="h-5 w-3/4 skeleton rounded mb-2"></div>
            <div className="h-4 w-1/2 skeleton rounded mb-2"></div>
            <div className="flex gap-1">
              <div className="h-6 w-16 skeleton rounded-full"></div>
              <div className="h-6 w-16 skeleton rounded-full"></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SkeletonCard;