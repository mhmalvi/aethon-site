'use client';

import type React from 'react';
import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

type AnimationType = 'dynamic' | 'spring' | 'none';
type SwapMode = 'hover' | 'drop';

type Config = {
  animation: AnimationType;
  continuousMode: boolean;
  manualSwap: boolean;
  swapMode: SwapMode;
  autoScrollOnDrag: boolean;
};

type SwapyLayoutProps = {
  id: string;
  enable?: boolean;
  onSwap?: (event: { newSlotItemMap: { asArray: unknown[] } }) => void;
  config?: Partial<Config>;
  className?: string;
  children: React.ReactNode;
};

export const SwapyLayout = ({
  id,
  onSwap,
  config = {},
  className,
  children,
}: SwapyLayoutProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const swapyRef = useRef<{ destroy: () => void } | null>(null);
  const configRef = useRef(config);
  configRef.current = config;
  const [ready, setReady] = useState(false);

  // Wait one tick after mount so all slot/item children are in the DOM
  useEffect(() => {
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    const container = containerRef.current;
    if (!container) return;
    if (typeof window === 'undefined') return;

    let instance: { destroy: () => void; onSwap: (cb: (e: any) => void) => void } | null = null;

    const init = async () => {
      try {
        const { createSwapy } = await import('swapy');
        instance = createSwapy(container, configRef.current);
        swapyRef.current = instance;

        if (onSwap && instance) {
          instance.onSwap(onSwap);
        }
      } catch (err) {
        console.warn('[Swapy] Failed to initialize:', err);
      }
    };

    init();

    return () => {
      try {
        instance?.destroy();
      } catch {
        // ignore cleanup errors
      }
      swapyRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready]);

  return (
    <div id={id} ref={containerRef} className={className}>
      {children}
    </div>
  );
};

export const DragHandle = ({ className }: { className?: string }) => {
  return (
    <div
      data-swapy-handle
      className={cn(
        'absolute top-3 right-3 cursor-grab text-white/30 hover:text-white/60 rounded-md bg-transparent active:cursor-grabbing transition-colors duration-200 z-20',
        className
      )}
    >
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='20'
        height='20'
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      >
        <circle cx='9' cy='12' r='1' />
        <circle cx='9' cy='5' r='1' />
        <circle cx='9' cy='19' r='1' />
        <circle cx='15' cy='12' r='1' />
        <circle cx='15' cy='5' r='1' />
        <circle cx='15' cy='19' r='1' />
      </svg>
    </div>
  );
};

export const SwapySlot = ({
  id,
  className,
  children,
}: {
  id: string;
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={cn(className)}
      data-swapy-slot={id}
    >
      {children}
    </div>
  );
};

export const SwapyItem = ({
  id,
  className,
  children,
}: {
  id: string;
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div className={cn(className)} data-swapy-item={id}>
      {children}
    </div>
  );
};
