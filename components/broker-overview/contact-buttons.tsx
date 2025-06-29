import { Phone, Mail, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function ContactButtons() {
  return (
    <div className="grid grid-cols-3 gap-2 mb-6">
      <Button variant="outline" size="sm" className="flex items-center gap-2">
        <Phone className="h-4 w-4" />
        Call
      </Button>
      <Button variant="outline" size="sm" className="flex items-center gap-2">
        <Mail className="h-4 w-4" />
        Email
      </Button>
      <Button variant="outline" size="sm" className="flex items-center gap-2">
        <MessageCircle className="h-4 w-4" />
        Chat
      </Button>
    </div>
  );
}