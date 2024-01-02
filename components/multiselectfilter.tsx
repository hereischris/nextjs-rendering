"use client";

import * as React from "react";
import { X } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Command,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";
import { Command as CommandPrimitive } from "cmdk";

import { useSearchParams, usePathname, useRouter } from 'next/navigation';


export function MultiSelectFilter(props: any) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const handleSelect = (facet: any) => {
        const params = new URLSearchParams(searchParams);

        params.append(facetName, facet);
         
        replace(`${pathname}?${params.toString()}`);
        //console.log(facet);
    }
    const handleUnselect = (facet:any) => {
        const params = new URLSearchParams(searchParams);
        params.delete(facetName, facet);
        replace(`${pathname}?${params.toString()}`);
    }
    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        const input = inputRef.current
        if (input) {
          if (e.key === "Delete" || e.key === "Backspace") {
           /* if (input.value === "") {
              setSelected(prev => {
                const newSelected = [...prev];
                newSelected.pop();
                return newSelected;
              })
            }*/
          }
          // This is not a default behaviour of the <input /> field
          if (e.key === "Escape") {
            input.blur();
          }
        }
    };


    const name = props?.name || 'brands';
    const facetName = props?.facetName || 'brands';
    const facets = props?.facets || {};
    const facetsAsArray = Object.keys(facets);

    const fn = searchParams.getAll(facetName);
    const selectedFacetValues = fn.filter((v:any)=>Object.hasOwn(facets, decodeURIComponent(v))).map(decodeURIComponent)
    const inputRef = React.useRef<HTMLInputElement>(null);
    const [open, setOpen] = React.useState(false);
    const [inputValue, setInputValue] = React.useState("");

    const selectables = facetsAsArray.filter((f:any) => !selectedFacetValues.includes(f));
  return (
    <Command onKeyDown={handleKeyDown} className="overflow-visible bg-transparent">
      <div
        className="z-50 group border border-input px-3 py-2 text-sm ring-offset-background rounded-md focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2"
      >
        <div className="flex gap-1 flex-wrap">
          {selectedFacetValues.map((selectedFacet) => {
            return (
              <Badge key={selectedFacet} variant="secondary">
                {selectedFacet} ({facets[selectedFacet]})
                <button
                  className="ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleUnselect(selectedFacet);
                    }
                  }}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  onClick={() => handleUnselect(selectedFacet)}
                >
                  <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                </button>
              </Badge>
            )
          })}
          {/* Avoid having the "Search" Icon */}
          <CommandPrimitive.Input
            ref={inputRef}
            value={inputValue}
            onValueChange={setInputValue}
            onBlur={() => setOpen(false)}
            onFocus={() => setOpen(true)}
            placeholder={`Select ${name}`}
            className="ml-2 bg-transparent outline-none placeholder:text-muted-foreground flex-1"
          />
        </div>
      </div>
      <div className="relative mt-2">
        {open && selectables.length > 0 ?
          <div className="absolute bg-slate-900	h-90 w-full z-10 top-0 rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in">
            <CommandGroup className="h-90 ">
              {selectables.map((f) => {
                return (
                  <CommandItem
                    key={f}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                    onSelect={(value) => {
                      setInputValue("")
                        handleSelect(f);
                    }}
                    className={"cursor-pointer"}
                  >
                    {f} ({facets[f]})
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </div>
          : null}
      </div>
    </Command >
  )
}