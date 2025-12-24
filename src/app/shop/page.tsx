import { Suspense } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ShopContent from "./ShopContent";
import Loading from "./loading"; // This should now work

export default function ShopPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Suspense fallback={<Loading />}>
        <ShopContent />
      </Suspense>
      <Footer />
    </div>
  );
}