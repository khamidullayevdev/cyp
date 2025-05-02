'use client';

import { useState } from "react";
import { Card, CardBody, CardFooter, Image } from "@heroui/react";
import { Tabs, Tab } from "@heroui/react";
import { useRouter } from "next/navigation";

export default function Template() {
  const [selectedTab, setSelectedTab] = useState("All");
  const router = useRouter();

  const list = [
    { title: "Orange", img: "https://www.heroui.com/images/fruit-1.jpeg", price: "free" },
    { title: "Tangerine", img: "https://www.heroui.com/images/fruit-2.jpeg", price: "$free" },
    { title: "Raspberry", img: "https://www.heroui.com/images/fruit-3.jpeg", price: "$10.00" },
    { title: "Lemon", img: "https://www.heroui.com/images/fruit-4.jpeg", price: "$free" },
    { title: "Avocado", img: "https://www.heroui.com/images/fruit-5.jpeg", price: "$15.70" },
    { title: "Lemon 2", img: "https://www.heroui.com/images/fruit-6.jpeg", price: "$8.00" },
    { title: "Banana", img: "https://www.heroui.com/images/fruit-7.jpeg", price: "$7.50" },
    { title: "Watermelon", img: "https://www.heroui.com/images/fruit-8.jpeg", price: "$12.20" },
  ];

  const filteredList = list.filter((item) => {
    const numericPrice = parseFloat(item.price.replace("$", ""));
    if (selectedTab === "Free") {
      return item.price.toLowerCase().includes("free");
    } else if (selectedTab === "Standard") {
      return !item.price.toLowerCase().includes("free") && numericPrice <= 10;
    } else if (selectedTab === "Premium") {
      return numericPrice > 10;
    }
    return true; // All
  });

  return (
    <>
      <div className="flex flex-wrap gap-4 mb-5">
        <Tabs
          aria-label="Tabs colors"
          color="primary"
          radius="full"
          selectedKey={selectedTab}
          onSelectionChange={(key) => setSelectedTab(key as string)}
        >
          <Tab className="px-[30px]" key="All" title="All" />
          <Tab className="px-[30px]" key="Free" title="Free" />
          <Tab className="px-[30px]" key="Standard" title="Standard" />
          <Tab className="px-[30px]" key="Premium" title="Premium" />
        </Tabs>
      </div>
      <div className="gap-2 grid grid-cols-2 sm:grid-cols-4">
        {filteredList.map((item, index) => (
          <Card key={index} isPressable shadow="sm" onPress={() => {
            router.push(`/template/${item.title.toLowerCase()}`);
          }}>
            <CardBody className="overflow-visible p-0">
              <Image
                alt={item.title}
                className="w-full object-cover h-[140px]"
                radius="lg"
                shadow="sm"
                src={item.img}
                width="100%"
              />
            </CardBody>
            <CardFooter className="text-small justify-between">
              <b>{item.title}</b>
              <p className="text-default-500">{item.price}</p>
            </CardFooter>
          </Card>
        ))}
      </div>
    </>
  );
}