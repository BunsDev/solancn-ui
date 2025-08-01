"use client";
import type React from "react";
import { Suspense, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import TickerView from "./ticker-view";

interface NumberTickerProps {
	value: number;
	duration?: number;
	delay?: number;
	decimalPlaces?: number;
	prefix?: string;
	suffix?: string;
	className?: string;
	onComplete?: () => void;
}

export const NumberTicker: React.FC<NumberTickerProps> = ({
	value,
	duration = 2000,
	delay = 0,
	decimalPlaces = 0,
	prefix = "",
	suffix = "",
	className = "",
	onComplete,
}) => {
	const [displayValue, setDisplayValue] = useState(0);

	useEffect(() => {
		let animationId: number;

		const startAnimation = () => {
			const startTime = performance.now();
			const startValue = 0; // Always start from 0

			const animate = (currentTime: number) => {
				const elapsed = currentTime - startTime;
				const progress = Math.min(elapsed / duration, 1);

				// Smooth easing function
				const easeOutQuart = 1 - (1 - progress) ** 4;
				const currentValue = startValue + (value - startValue) * easeOutQuart;

				setDisplayValue(currentValue);

				if (progress < 1) {
					animationId = requestAnimationFrame(animate);
				} else {
					onComplete?.();
				}
			};

			animationId = requestAnimationFrame(animate);
		};

		const timeoutId: number = window.setTimeout(startAnimation, delay);

		return () => {
			if (animationId) cancelAnimationFrame(animationId);
			if (timeoutId) clearTimeout(timeoutId);
		};
	}, [value, duration, delay, onComplete]);

	const formatNumber = (num: number): string => {
		return num.toFixed(decimalPlaces).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	};

	return (
		<span className={`inline-block ${className}`}>
			{prefix}
			{formatNumber(displayValue)}
			{suffix}
		</span>
	);
};



export default function TickerPage() {
  return (
	<div className="container mx-auto py-10">
	  <h1 className="text-3xl font-bold mb-6">Number Ticker Component</h1>
	  <p className="text-lg mb-8">
		A smooth number animation ticker component for displaying numeric values with animated counting effect.
	  </p>
	  
	  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
		<Card>
		  <CardHeader>
			<CardTitle>Basic Example</CardTitle>
			<CardDescription>Simple number ticker animation from 0 to 1000</CardDescription>
		  </CardHeader>
		  <CardContent>
			<Suspense fallback={<div>Loading...</div>}>
			  <NumberTicker 
				value={1000} 
				duration={2000} 
				prefix="$" 
				className="text-2xl font-bold text-solana-purple" 
			  />
			</Suspense>
		  </CardContent>
		</Card>
		
		<Card>	
		  <CardHeader>
			<CardTitle>Advanced Usage</CardTitle>
			<CardDescription>Multiple ticker examples with different configurations</CardDescription>
		  </CardHeader>
		  <CardContent>
			<Suspense fallback={<div>Loading...</div>}>
			  <TickerView />
			</Suspense>
		  </CardContent>
		</Card>
	  </div>
	</div>
  );
}
