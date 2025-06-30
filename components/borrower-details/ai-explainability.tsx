'use client';

import { useState } from 'react';
import { AlertTriangle, ChevronDown, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface AIExplainabilityProps {
  aiFlags: string[];
  onRequestDocuments: () => void;
  onSendToValuer: () => void;
  onApprove: () => void;
}

export function AIExplainability({ 
  aiFlags, 
  onRequestDocuments, 
  onSendToValuer, 
  onApprove 
}: AIExplainabilityProps) {
  console.log('AI Flags:', aiFlags);
  const [isOpen, setIsOpen] = useState(true);

  return (
    <Card className="mb-6 p-0 ">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <CardHeader role="button" tabIndex={0} onKeyDown={e => { if(e.key === 'Enter' || e.key === ' ') setIsOpen(!isOpen); }} className="cursor-pointer hover:bg-gray-50 transition-colors py-6">
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span>AI Explainability</span>
                {aiFlags.length > 0 && (
                  <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">
                    {aiFlags.length} issues
                  </span>
                )}
              </div>
              {isOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
            </CardTitle>
          </CardHeader>
        </CollapsibleTrigger>
        
        <CollapsibleContent>
          <CardContent data-testid="ai-explainability-content" className='pb-6'>
            {aiFlags.length > 0 ? (
              <div className="space-y-3 mb-6">
                {aiFlags.map((flag, index) => (
                  <Alert key={index} className="border-red-200 bg-red-50">
                    <AlertTriangle className="h-4 w-4 text-red-600" />
                    <AlertDescription className="text-red-800">
                      {flag}
                    </AlertDescription>
                  </Alert>
                ))}
              </div>
            ) : (
              <div className="text-center py-4 text-gray-500 mb-6">
                No AI flags detected. All checks passed.
              </div>
            )}

            <div className="flex flex-wrap gap-3">
              <Button 
                onClick={onRequestDocuments}
                variant="outline"
                className="flex-1 sm:flex-none"
              >
                Request Documents
              </Button>
              <Button 
                onClick={onSendToValuer}
                variant="outline"
                className="flex-1 sm:flex-none"
              >
                Send to Valuer
              </Button>
              <Button 
                onClick={onApprove}
                className="flex-1 sm:flex-none bg-green-600 hover:bg-green-700"
                disabled={aiFlags.length > 0}
              >
                Approve
              </Button>
            </div>
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
}