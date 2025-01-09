import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "@/pages/Index";
import CreateCoin from "@/pages/CreateCoin";

const App = () => {
  return (
    <Router>
      <TooltipProvider>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/create-coin" element={<CreateCoin />} />
        </Routes>
        <Toaster />
        <Sonner />
      </TooltipProvider>
    </Router>
  );
};

export default App;