function ShimmerBlock({ className = "" }) {
  return <div className={`shimmer-block ${className}`} />;
}

export function ProductGridShimmer({ count = 8 }) {
  return (
    <div className="max-w-7xl w-full mx-auto pb-10 sm:pb-16 px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
        {Array.from({ length: count }).map((_, index) => (
          <div key={index} className="bg-white rounded-2xl shadow-md overflow-hidden">
            <ShimmerBlock className="w-full aspect-square" />
            <div className="p-4 sm:p-5 space-y-3">
              <ShimmerBlock className="h-5 w-3/4 rounded-lg" />
              <ShimmerBlock className="h-4 w-1/2 rounded-lg" />
              <ShimmerBlock className="h-9 w-full rounded-lg" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ListShimmer({ rows = 6 }) {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-4">
      {Array.from({ length: rows }).map((_, index) => (
        <div key={index} className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center gap-4">
            <ShimmerBlock className="h-14 w-14 rounded-lg" />
            <div className="flex-1 space-y-2">
              <ShimmerBlock className="h-4 w-2/3 rounded" />
              <ShimmerBlock className="h-3 w-1/3 rounded" />
            </div>
            <ShimmerBlock className="h-6 w-20 rounded-full" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function TableShimmer({ rows = 7 }) {
  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <ShimmerBlock className="h-6 w-56 rounded" />
      </div>
      <div className="p-4 space-y-3">
        {Array.from({ length: rows }).map((_, index) => (
          <div key={index} className="grid grid-cols-4 gap-4">
            <ShimmerBlock className="h-5 rounded" />
            <ShimmerBlock className="h-5 rounded" />
            <ShimmerBlock className="h-5 rounded" />
            <ShimmerBlock className="h-5 rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function CheckoutShimmer() {
  return (
    <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen pb-32 lg:pb-0">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-x-12 gap-y-12 px-4 py-8 sm:px-6 lg:px-12 lg:grid-cols-2">
        <div className="bg-white rounded-xl border border-gray-100 p-6 sm:p-8 space-y-4">
          <ShimmerBlock className="h-7 w-44 rounded" />
          {Array.from({ length: 6 }).map((_, index) => (
            <ShimmerBlock key={index} className="h-12 w-full rounded-lg" />
          ))}
        </div>
        <div className="bg-white rounded-xl border border-gray-100 p-6 sm:p-8 space-y-4">
          <ShimmerBlock className="h-7 w-40 rounded" />
          {Array.from({ length: 4 }).map((_, index) => (
            <ShimmerBlock key={index} className="h-14 w-full rounded-lg" />
          ))}
        </div>
      </div>
    </div>
  );
}
