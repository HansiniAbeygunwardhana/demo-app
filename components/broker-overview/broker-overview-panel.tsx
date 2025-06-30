'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { ContactButtons } from './contact-buttons';
import { OnboardingWorkflow } from './onboarding-workflow';
import { BrokerInfo } from '@/types';
import { ChevronDown, ChevronUp } from 'lucide-react';

export function BrokerOverviewPanel() {
  const [brokerInfo, setBrokerInfo] = useState<BrokerInfo | null>(null);
  const [aiAssistantEnabled, setAiAssistantEnabled] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    fetchBrokerInfo();
  }, []);

  const fetchBrokerInfo = async () => {
    try {
      const response = await fetch('/api/broker/1');
      const data = await response.json();
      setBrokerInfo(data);
    } catch (error) {
      console.error('Failed to fetch broker info:', error);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  if (!brokerInfo) {
    return (
      <Card className="h-fit">
        <CardContent className="p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-6 bg-gray-200 rounded w-1/2"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-fit">
      <CardHeader className="flex flex-row items-center justify-between sm:justify-start">
        <CardTitle className="text-lg sm:text-xl">Broker Overview</CardTitle>

        {/* Collapse Toggle for Mobile */}
        <button
          className="sm:hidden text-gray-600"
          onClick={() => setIsExpanded(!isExpanded)}
          aria-label="Toggle Broker Info"
        >
          {isExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
        </button>
      </CardHeader>

      {/* Content: Always visible on desktop, toggle on mobile */}
      <CardContent
        className={`transition-all ${isExpanded ? 'block' : 'hidden'} sm:block`}
      >
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">{brokerInfo.name}</h3>

          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{brokerInfo.deals}</div>
              <div className="text-sm text-gray-600">Deals</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{brokerInfo.approval_rate}</div>
              <div className="text-sm text-gray-600">Approval Rate</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">
                {formatCurrency(brokerInfo.pending)}
              </div>
              <div className="text-sm text-gray-600">Pending</div>
            </div>
          </div>

          <ContactButtons />

          <div className="border-t pt-6 mb-6">
            <OnboardingWorkflow />
          </div>

          <div className="border-t pt-6">
            <div className="flex items-center justify-between">
              <Label htmlFor="ai-assistant" className="text-sm font-medium">
                AI Assistant (E Ardsassist)
              </Label>
              <Switch
                id="ai-assistant"
                checked={aiAssistantEnabled}
                onCheckedChange={setAiAssistantEnabled}
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
