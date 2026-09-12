"use client";

import React from "react";
import Link from "next/link";

interface AtticLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  showText?: boolean;
}

export const AtticLogo: React.FC<AtticLogoProps> = ({
  className = "",
  size = "md",
  showText = true,
}) => {
  const iconSizes = {
    sm: "w-6 h-6",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  };

  const textSizes = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-3xl",
  };

  return (
    <Link href="/" className={`flex items-center gap-2.5 group select-none ${className}`}>
      {/* Arch Icon with Chair */}
      <div className="relative flex items-center justify-center">
        <svg
          viewBox="0 0 100 120"
          className={`${iconSizes[size]} fill-[#0B192C] transition-transform duration-200 group-hover:scale-105`}
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Outer Portal / Arch */}
          <path
            d="M 12 110 L 12 50 C 12 22.38 34.38 0 62 0 C 89.62 0 112 22.38 112 50 L 112 110 L 88 110 L 88 52 C 88 37.64 76.36 26 62 26 C 47.64 26 36 37.64 36 52 L 36 110 Z"
            transform="scale(0.8) translate(12, 5)"
          />
          {/* Stylized Chair Inside Arch */}
          <path
            d="M 38 42 C 43 36 57 36 62 42 L 60 74 C 58 76 54 77 50 77 C 46 77 42 76 40 74 Z"
            fill="none"
            stroke="#0B192C"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <line x1="50" y1="40" x2="50" y2="76" stroke="#0B192C" strokeWidth="4" />
          {/* Chair Legs & Base */}
          <path
            d="M 38 78 C 34 85 34 100 34 105"
            fill="none"
            stroke="#0B192C"
            strokeWidth="5"
            strokeLinecap="round"
          />
          <path
            d="M 62 78 C 66 85 66 100 66 105"
            fill="none"
            stroke="#0B192C"
            strokeWidth="5"
            strokeLinecap="round"
          />
          <path
            d="M 44 78 C 42 88 42 98 42 105"
            fill="none"
            stroke="#0B192C"
            strokeWidth="4"
          />
          <path
            d="M 56 78 C 58 88 58 98 58 105"
            fill="none"
            stroke="#0B192C"
            strokeWidth="4"
          />
        </svg>
      </div>

      {showText && (
        <span
          className={`font-serif font-bold tracking-tight text-[#0B192C] ${textSizes[size]}`}
          style={{ fontFamily: "'Playfair Display', Georgia, Cambria, 'Times New Roman', serif" }}
        >
          Attic
        </span>
      )}
    </Link>
  );
};
