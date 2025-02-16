"use client";

import { ChevronDown } from "lucide-react";

import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { 
  Popover, 
  PopoverTrigger, 
  PopoverContent 
} from "@/components/ui/popover";

interface Option {
  id: string;
  name: string;
}

interface SelectTechProps {
  options: Option[];
  selectedTech: Set<string>;
  onSelectionChange: (selectedTech: Set<string>) => void;
}

export default function SelectTech({
  options,
  selectedTech,
  onSelectionChange,
}: SelectTechProps) {

  const handleCheckboxChange = (id: string) => {
    const newSelectedTech = new Set(selectedTech);
    if (newSelectedTech.has(id)) {
      newSelectedTech.delete(id);
    } else {
      newSelectedTech.add(id);
    }
    onSelectionChange(newSelectedTech);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="space-x-2" variant="outline">
            <p>Select</p>
            <ChevronDown size={18} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-4 max-h-60 overflow-y-auto">
        {options.map((option) => (
          <div key={option.id} className="flex items-center mb-2">
            <Checkbox
              id={option.id}
              checked={selectedTech.has(option.id)}
              onCheckedChange={() => handleCheckboxChange(option.id)}
            />
            <label htmlFor={option.id} className="ml-2">
              {option.name}
            </label>
          </div>
        ))}
      </PopoverContent>
    </Popover>
  );
}
