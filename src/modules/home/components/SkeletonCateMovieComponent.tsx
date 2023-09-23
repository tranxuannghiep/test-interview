import { SkeletonMovieComponent } from './SkeletonMovieComponent'

export function SkeletonCateMovieComponent() {
  return (
    <div>
      <div className="h-5 bg-gray-200 rounded-lg mb-2 w-52 ml-2"></div>
      <div className="hide-scrollbar w-full flex-1 overflow-x-scroll p-2">
        <div className="flex gap-5">
          {Array.from(Array(10)).map((_, index) => (
            <SkeletonMovieComponent key={index} />
          ))}
        </div>
      </div>
    </div>
  )
}
