'use client';

import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { BorrowerCard } from './borrower-card';
import { Borrower } from '@/types';
import { usePipelineStore } from '@/store/pipelinestore';
import { toast } from '@/hooks/use-toast';
import { useBorrowerDetailStore } from '@/store/borrowerDetailsStore';


export function PipelineTabs() {
  
  const {error , fetchPipeline , loading , pipeline} = usePipelineStore()
  const {selectBorrower , selectedBorrower} = useBorrowerDetailStore();
  const [activeTab, setActiveTab] = useState('new');
  const [radioValue, setRadioValue] = useState('active');

  useEffect(() => {
    fetchPipeline().catch((err) => {
      console.error('Failed to fetch pipeline:', err);
      toast({
        title: 'Error',
        description: error || 'Failed to load pipeline data',
        variant: 'destructive',
      });
    });
  }, []);


  if (!pipeline || loading) {
    return <div className="animate-pulse">Loading...</div>;
  }

  const getTabCount = (tab: string) => {
    switch (tab) {
      case 'new':
        return pipeline.new.length;
      case 'in_review':
        return pipeline.in_review.length;
      case 'approved':
        return pipeline.approved.length;
      default:
        return 0;
    }
  };

  const renderBorrowers = (borrowers: Borrower[]) => {
    if (borrowers.length === 0) {
      return (
        <div className="text-center py-8 text-gray-500">
          No borrowers in this category
        </div>
      );
    }

    return (
      <div className="space-y-3">
        {borrowers.map((borrower) => (
          <BorrowerCard
            key={borrower.id}
            borrower={borrower}
            isActive={selectedBorrower?.id === borrower.id}
            onClick={() => selectBorrower(borrower)}
          />
        ))}
      </div>
    );
  };

  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle>Borrower Pipeline</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">

  {/* Mobile Dropdown */}
  <div className="sm:hidden mb-4">
    <select
      value={activeTab}
      onChange={(e) => setActiveTab(e.target.value)}
      className="w-full border rounded px-3 py-2 text-sm"
    >
      <option value="new">New ({getTabCount('new')})</option>
      <option value="in_review">In Review ({getTabCount('in_review')})</option>
      <option value="approved">Approved ({getTabCount('approved')})</option>
    </select>
  </div>

  {/* Desktop Tabs */}
  <TabsList className="hidden sm:flex flex-wrap justify-center w-full gap-2 mb-4">
    <TabsTrigger value="new" className="relative flex items-center">
      New
      <span className="ml-2 bg-blue-500 text-white text-xs rounded-full px-2 py-0.5">
        {getTabCount('new')}
      </span>
    </TabsTrigger>

    <TabsTrigger value="in_review" className="relative flex items-center">
      In Review
      <span className="ml-2 bg-amber-500 text-white text-xs rounded-full px-2 py-0.5">
        {getTabCount('in_review')}
      </span>
    </TabsTrigger>

    <TabsTrigger value="approved" className="relative flex items-center">
      Approved
      <span className="ml-2 bg-green-500 text-white text-xs rounded-full px-2 py-0.5">
        {getTabCount('approved')}
      </span>
    </TabsTrigger>
  </TabsList>

  <TabsContent value="new" className="mt-0">
    {renderBorrowers(pipeline.new)}
  </TabsContent>

  <TabsContent value="in_review" className="mt-0">
    {renderBorrowers(pipeline.in_review)}
  </TabsContent>

  <TabsContent value="approved" className="mt-0">
    {renderBorrowers(pipeline.approved)}
  </TabsContent>
  
</Tabs>

        <div className="mt-6 pt-6 border-t">
          <Label className="text-sm font-medium text-gray-700 uppercase tracking-wide">
            F-SANITISED ACTIVE
          </Label>
          <RadioGroup value={radioValue} onValueChange={setRadioValue} className="mt-2">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="active" id="active" />
              <Label htmlFor="active">Active</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="inactive" id="inactive" />
              <Label htmlFor="inactive">Inactive</Label>
            </div>
          </RadioGroup>
        </div>
      </CardContent>
    </Card>
  );
}