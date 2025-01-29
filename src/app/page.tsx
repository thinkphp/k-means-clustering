import KMeansClustering from '@/components/kmeans-clustering';

export default function Home() {
  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-gray-100 text-gray-900">
        <KMeansClustering />
        <p className="mt-6 max-w-2xl text-lg text-center text-gray-700 leading-relaxed shadow-lg p-6 rounded-2xl bg-white border border-gray-200">
          Discover the power of K-Means clustering and how it can help uncover hidden patterns in your data. 
          With this interactive tool, you can visualize how data points are grouped based on their similarities.
        </p>
                <p className="mt-6 max-w-2xl text-lg text-center text-blue-700 leading-relaxed shadow-lg p-6 rounded-2xl bg-white border border-gray-200">
         Created by <a href="http://github.com/thinkphp">Adrian Statescu </a>
        </p>

      </main>
    </>
  );
}

