'use client';

import { useState, useEffect } from "react";
import { Card, CardBody, CardFooter, Image } from "@heroui/react";
import { Tabs, Tab } from "@heroui/react";
import { useRouter } from "next/navigation";
import { supabase } from "../lib/supabaseClient";

export default function Template() {
  const [selectedTab, setSelectedTab] = useState("All");
  const [list, setList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchTemplates = async () => {
      setLoading(true);
      const { data, error } = await supabase.from('templates').select('*');
      console.log(data)
      if (!error && data) {
        setList(data);
      }
      setLoading(false);
    };
    fetchTemplates();
  }, []);

  const filteredList = list.filter((item) => {
    if (selectedTab === "Free") {
      return item.category === "free";
    } else if (selectedTab === "Standard") {
      return item.category === "standard";
    } else if (selectedTab === "Premium") {
      return item.category === "premium";
    }
    return true; // All
  });

  if (loading) {
    return <div>Loading...</div>;
  }

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
          <Card key={item.id} isPressable shadow="sm" onPress={() => {
            router.push(`/template/${item.name}?id=${item.id}`);
          }}>
            <CardBody className="overflow-visible p-0">
              <Image
                alt={item.name}
                className="w-full object-cover h-[240px]"
                radius="lg"
                shadow="sm"
                src={`${item.img}`}
                width="100%"
              />
            </CardBody>
            <CardFooter className="text-small justify-between">
              <b>{item.name}</b>
              <p className="text-default-500 capitalize">{item.price == 'free' ? 'Free' : `${item.price}$`}</p>
            </CardFooter>
          </Card>
        ))}
      </div>
    </>
  );
}