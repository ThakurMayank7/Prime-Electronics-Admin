"use client";

import React from "react";

import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

type ComboBoxProps = {
  datas: {
    value: string;
    label: string;
  }[];
  valueChange: (color: string) => void;
};

function ComboBox({ datas, valueChange }: ComboBoxProps) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  return (
    <div>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[200px] justify-between"
          >
            {value
              ? datas.find((data) => data.value === value)?.label
              : "Select data..."}
            <ChevronsUpDown className="opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder="Search data..." />
            <CommandList>
              <CommandEmpty>No data found.</CommandEmpty>
              <CommandGroup>
                {datas.map((data) => (
                  <CommandItem
                    key={data.value}
                    value={data.value}
                    onSelect={(currentValue) => {
                      setValue(currentValue === value ? "" : currentValue);
                      valueChange(currentValue === value ? "" : currentValue);
                      setOpen(false);
                    }}
                  >
                    {data.label}
                    <Check
                      className={cn(
                        "ml-auto",
                        value === data.value ? "opacity-100" : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}

export default ComboBox;
