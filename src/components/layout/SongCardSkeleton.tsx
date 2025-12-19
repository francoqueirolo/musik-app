// src/components/layout/SongCardSkeleton.tsx
import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

const SongCardSkeleton = () => {
  return (
    <Card className="group overflow-hidden border-none bg-background/50 backdrop-blur-sm cursor-pointer">
      <CardContent className="p-4">
        <div className="relative aspect-square mb-4 overflow-hidden rounded-md shadow-md">
          <Skeleton className="h-full w-full" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-3 w-1/2" />
        </div>
      </CardContent>
    </Card>
  )
}

export default SongCardSkeleton
