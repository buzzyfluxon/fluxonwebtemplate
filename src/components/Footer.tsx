import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Footer() {
  return (
    <footer className="w-full bg-gradient-to-t from-primary/[1%] to-transparent">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-between gap-6 py-8 md:flex-row">
          {/* Empty footer content */}
        </div>
        <div className="h-1 bg-[radial-gradient(closest-side,#8486ff,#42357d,#5d83ff,transparent)] opacity-50" />
      </div>
    </footer>
  );
}
