import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Sparkles, Rocket } from 'lucide-react';

interface SubscriptionPromptProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SubscriptionPrompt({ isOpen, onClose }: SubscriptionPromptProps) {
  const navigate = useNavigate();

  const handleChoosePlan = () => {
    navigate('/pricing');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[485px] p-0 overflow-hidden">
        <div className="bg-gradient-to-br from-primary/20 via-primary/10 to-background py-3 px-6 border-b">
          <DialogHeader className="pt-4">
            <div className="flex items-center justify-center mb-2">
              <div className="bg-primary/10 p-3 rounded-full">
                <Sparkles className="h-6 w-6 text-primary" />
              </div>
            </div>
            <DialogTitle className="text-center text-xl font-bold">
              Unlock Automated Writing
            </DialogTitle>
            <DialogDescription className="text-center">
              Experience the full power of AI content generation
            </DialogDescription>
          </DialogHeader>
        </div>
        
        <div className="p-6">
          <div className="space-y-4">
            <div className="bg-amber-50 text-amber-800 rounded-lg p-4 border border-amber-200">
              <p className="font-medium">Free Trial Limit Reached</p>
              <p className="text-sm mt-1">
                The Free plan allows only 2 posts as a trial. Upgrade to our Starter plan to continue creating content.
              </p>
            </div>
            
            <p className="text-center">
              Upgrade your plan to unlock our powerful Automated Writing service and start generating high-quality, 
              SEO-optimized content instantly.
            </p>
            
            <div className="bg-muted/50 rounded-lg p-4 space-y-2">
              <div className="flex items-center gap-2">
                <div className="h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="text-xs font-medium">✓</span>
                </div>
                <p className="text-sm">30 posts per month (Starter plan)</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="text-xs font-medium">✓</span>
                </div>
                <p className="text-sm">Advanced AI models</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="text-xs font-medium">✓</span>
                </div>
                <p className="text-sm">Scheduling and automated posting</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="text-xs font-medium">✓</span>
                </div>
                <p className="text-sm">SEO optimization</p>
              </div>
            </div>
          </div>
        </div>
        
        <DialogFooter className="px-6 pb-6">
          <Button 
            className="w-full" 
            onClick={handleChoosePlan}
          >
            <Rocket className="w-4 h-4 mr-2" />
            Upgrade to Starter Plan ($5/month)
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
