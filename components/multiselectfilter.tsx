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

type Framework = Record<"value" | "label", string>;
type facetValue = Record<"value" | "label", string>;

const FRAMEWORKS = [
  {
    value: "next.js",
    label: "Next.js",
  },
  {
    value: "sveltekit",
    label: "SvelteKit",
  },
  {
    value: "nuxt.js",
    label: "Nuxt.js",
  },
  {
    value: "remix",
    label: "Remix",
  },
  {
    value: "astro",
    label: "Astro",
  },
  {
    value: "wordpress",
    label: "WordPress",
  },
  {
    value: "express.js",
    label: "Express.js",
  },
  {
    value: "nest.js",
    label: "Nest.js",
  }
] satisfies Framework[]; 


export function MultiSelectFilter(props: any) {
    function encodeMultiValue(value: any): string {
        if (Array.isArray(value)) {
            return value.map(encodeURIComponent).join(",");
        } else {
            return encodeURIComponent(value);
        }
    }
    function decodeMultiValue(value: any): string[] {
        if (!value) return [];
        return value.split(",").filter((v:any)=>Object.hasOwn(facets, decodeURIComponent(v))).map(decodeURIComponent);
    }
    function handleSelect(facet: any) {

        const params = new URLSearchParams(searchParams);
        const current = decodeMultiValue(params.get(facetName))
        current.push(facet);
        params.set(facetName, encodeMultiValue(current));
         
        replace(`${pathname}?${params.toString()}`);
        console.log(facet);
        //setSelected(prev => [...prev, facet])
    }
    const handleUnselect = (facet:any) => {
        const params = new URLSearchParams(searchParams);
        let current = decodeMultiValue(params.get(facetName));
        current = current.filter(s => s !== facet);
        params.set(facetName, encodeMultiValue(current));
        if(current.length<1) params.delete(facetName);
        replace(`${pathname}?${params.toString()}`);
        //setSelected(prev => prev.filter(s => s.value !== framework.value));
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
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const name = props?.name || 'frameworks';
    const facetName = props?.facetName || 'frameworks';
    const facets = props?.facets || {};
    const facetsAsArray = Object.keys(facets);

    const fn = searchParams.get(facetName)?.toString()
    const selectedFacetValues = decodeMultiValue(fn);
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
                {selectedFacet}
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
                    {f}
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