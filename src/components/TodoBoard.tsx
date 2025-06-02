"use client";

import { useRef, useState } from "react";
import clsx from "clsx";

type ItemType = "Fruit" | "Vegetable";
interface Item {
  type: ItemType;
  name: string;
}

/* ---------- init data ---------- */
const initial: Item[] = [
  { type: "Fruit", name: "Apple" },
  { type: "Vegetable", name: "Broccoli" },
  { type: "Vegetable", name: "Mushroom" },
  { type: "Fruit", name: "Banana" },
  { type: "Vegetable", name: "Tomato" },
  { type: "Fruit", name: "Orange" },
  { type: "Fruit", name: "Mango" },
  { type: "Fruit", name: "Pineapple" },
  { type: "Vegetable", name: "Cucumber" },
  { type: "Fruit", name: "Watermelon" },
  { type: "Vegetable", name: "Carrot" },
];

export default function TodoBoard() {
  /* 🌳—state forest —🌳 */
  const [main, setMain] = useState<Item[]>(initial);
  const [fruit, setFruit] = useState<Item[]>([]);
  const [veg, setVeg] = useState<Item[]>([]);

  /* 🕰️ store timers so we can cancel them */
  const timers = useRef<Record<string, NodeJS.Timeout>>({});

  /* ---------- helpers ---------- */
  const sendToColumn = (item: Item, index: number) => {
    setMain((m) => m.filter((_, i) => i !== index));

    if (item.type === "Fruit") setFruit((f) => [...f, item]);
    else setVeg((v) => [...v, item]);

    /* 5-second auto-return */
    timers.current[item.name] = setTimeout(() => moveBack(item), 5000);
  };

  const moveBack = (item: Item) => {
    clearTimeout(timers.current[item.name]);
    delete timers.current[item.name];

    setFruit((f) => f.filter((i) => i.name !== item.name));
    setVeg((v) => v.filter((i) => i.name !== item.name));
    setMain((m) => [...m, item]); // bottom of list
  };

  /* ---------- render ---------- */
  const Column = ({
    title,
    items,
    click,
  }: {
    title: string;
    items: Item[];
    click: (item: Item, idx: number) => void;
  }) => (
    <div className="flex-1 flex flex-col gap-2 rounded-lg border p-4">
      <h2 className="mb-3 text-center font-semibold">{title}</h2>
      <div className="flex flex-col gap-2">
        {items.map((item, idx) => (
          <button
            key={item.name}
            onClick={() => click(item, idx)}
            className={clsx(
              "rounded-sm px-3 py-1 text-sm shadow ",
              item.type === "Fruit"
                ? "bg-pink-200 hover:bg-pink-300"
                : "bg-lime-200 hover:bg-lime-300"
            )}
          >
            {item.name}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      <Column title="Main List" items={main} click={sendToColumn} />
      
        <Column title="Fruit 🥭" items={fruit} click={(i) => moveBack(i)} />
        <Column
          title="Vegetable 🥦"
          items={veg}
          click={(i) => moveBack(i)}
        />
      
    </div>
  );
}
