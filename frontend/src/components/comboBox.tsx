"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

const employees = [
  {
    value: "John Doe",
    role: "IT Department",
    label: "John Doe",
  },
  {
    value: "Jane Smith",
    role: "HR Department",
    label: "Jane Smith",
  },
  {
    value: "Mike Johnson",
    role: "Finance",
    label: "Mike Johnson",
  },
  {
    value: "Sarah Williams",
    role: "Marketing",
    label: "Sarah Williams",
  },
  {
    value: "Jane Doe",
    role: "Content Writer",
    label: "Jane Doe",
  },
]

export function ComboboxDemo() {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")

  return (
    <div className="w-full">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
          >
            {value
              ? employees.find((employee) => employee.value === value)?.label
              : "Select Employee"}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-20" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[--radix-popover-trigger-width]">
          <Command className="w-full">
            <CommandInput placeholder="Search employee..." className="w-full p-0"/>
            <CommandList className="w-full">
              <CommandEmpty className="w-full p-0">No employee found.</CommandEmpty>
              <CommandGroup className="w-full">
                {employees.map((employee) => (
                  <CommandItem
                    className="w-full flex items-center justify-between"
                    key={employee.value}
                    value={employee.value}
                    onSelect={(currentValue) => {
                      setValue(currentValue === value ? "" : currentValue)
                      setOpen(false)
                    }}
                  >
                    <div className=" flex items-center">
                      <Check
                        className={cn(
                          "mr-2 h-4 w-full",
                          value === employee.value ? "opacity-100" : "opacity-0"
                        )}
                      />
                      <span className="w-full p-0">{employee.label}</span>
                    </div>
                    <span className="text-sm text-muted-foreground ">
                      {employee.role}
                    </span>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}
