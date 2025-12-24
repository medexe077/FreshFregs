export default function Loading() {
  return (
    <div className="min-h-screen bg-background pt-32 pb-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Hero Section Skeleton */}
        <div className="text-center">
          <div className="h-4 w-32 bg-gray-200 dark:bg-gray-800 rounded-full mx-auto mb-4"></div>
          <div className="h-12 w-64 bg-gray-200 dark:bg-gray-800 rounded-lg mx-auto mb-4"></div>
          <div className="h-6 w-96 bg-gray-200 dark:bg-gray-800 rounded-lg mx-auto mb-4"></div>
        </div>

        {/* Filter Bar Skeleton */}
        <div className="mt-12">
          <div className="flex items-center justify-between py-4 border-b border-border">
            <div className="flex items-center gap-8">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="h-6 w-20 bg-gray-200 dark:bg-gray-800 rounded"
                ></div>
              ))}
            </div>
            <div className="flex items-center gap-4">
              <div className="h-6 w-16 bg-gray-200 dark:bg-gray-800 rounded"></div>
              <div className="h-6 w-24 bg-gray-200 dark:bg-gray-800 rounded"></div>
            </div>
          </div>
        </div>

        {/* Product Grid Skeleton */}
        <div className="mt-12">
          <div className="h-6 w-32 bg-gray-200 dark:bg-gray-800 rounded mb-8"></div>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-10 md:gap-x-6 md:gap-y-12">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-square bg-gray-200 dark:bg-gray-800 rounded-lg mb-4"></div>
                <div className="h-4 w-20 bg-gray-200 dark:bg-gray-800 rounded mb-2"></div>
                <div className="h-6 w-32 bg-gray-200 dark:bg-gray-800 rounded mb-2"></div>
                <div className="h-4 w-16 bg-gray-200 dark:bg-gray-800 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}