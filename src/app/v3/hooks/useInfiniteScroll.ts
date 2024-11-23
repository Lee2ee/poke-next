import { useCallback, useRef } from "react";

interface UseInfiniteScrollProps {
  isLoading: boolean;
  hasMore: boolean;
  onLoadMore: () => void;
}

export default function useInfiniteScroll({ isLoading, hasMore, onLoadMore }: UseInfiniteScrollProps) {
  const observer = useRef<IntersectionObserver | null>(null);
  const lastElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (isLoading) true;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          onLoadMore();
        }
      });
      if (node) observer.current.observe(node);
    },
    [isLoading, hasMore, onLoadMore]
  );
  return { lastElementRef };
}
