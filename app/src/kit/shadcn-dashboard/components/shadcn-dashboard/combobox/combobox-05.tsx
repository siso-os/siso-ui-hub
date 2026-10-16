"use client";

import { useState } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "../../../../shadcn/ui/avatar";
import {
  Combobox,
  ComboboxCollection,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "../../../../shadcn/ui/combobox";
import { InputGroupAddon } from "../../../../shadcn/ui/input-group";

const users = [
  {
    name: "Albert Flores",
    email: "albert12@gmail.com",
    avatar: "https://images.shadcnspace.com/assets/shadcn-dashboard/profile/user-1.webp",
    status: "online",
  },
  {
    name: "Davis Donin",
    email: "davisdonin@gmail.com",
    avatar: "https://images.shadcnspace.com/assets/shadcn-dashboard/profile/user-8.webp",
    status: "offline",
  },
  {
    name: "Emily Davis",
    email: "emilydavis@gmail.com",
    avatar: "https://images.shadcnspace.com/assets/shadcn-dashboard/profile/user-2.webp",
    status: "away",
  },
  {
    name: "Jenny Wilson",
    email: "jennylouise@gmail.com",
    avatar: "https://images.shadcnspace.com/assets/shadcn-dashboard/profile/user-10.webp",
    status: "online",
  },
  {
    name: "Jessica Brown",
    email: "jessicabrown@gmail.com",
    avatar: "https://images.shadcnspace.com/assets/shadcn-dashboard/profile/user-6.webp",
    status: "busy",
  },
  {
    name: "Linda Davis",
    email: "lindadavis@gmail.com",
    avatar: "https://images.shadcnspace.com/assets/shadcn-dashboard/profile/user-9.webp",
    status: "online",
  },
];

const ComboboxUserDemo = () => {
  const [selectedUser, setSelectedUser] = useState<typeof users[number] | null>(null);
  const [inputValue, setInputValue] = useState("");

  const showAvatar = selectedUser && inputValue === selectedUser.name;

  return (
    <div className="w-full max-w-xs">
      <Combobox
        items={users}
        value={selectedUser}
        onValueChange={setSelectedUser}
        inputValue={inputValue}
        onInputValueChange={setInputValue}
        itemToStringLabel={(user) => user?.name ?? ""}
      >
        <ComboboxInput placeholder="Select user..." showTrigger showClear>
          {showAvatar && (
            <InputGroupAddon align="inline-start" className="ps-2.5 pe-0">
              <Avatar className="size-6">
                <AvatarImage src={selectedUser.avatar} alt={selectedUser.name} />
                <AvatarFallback>{selectedUser.name[0]}</AvatarFallback>
              </Avatar>
            </InputGroupAddon>
          )}
        </ComboboxInput>
        <ComboboxContent className="bg-popover before:hidden">
          <ComboboxList>
            <ComboboxEmpty>No users found.</ComboboxEmpty>
            <ComboboxCollection>
              {(user: typeof users[number]) => (
                <ComboboxItem key={user.name} value={user}>
                  <Avatar className="size-7">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback>{user.name[0]}</AvatarFallback>
                  </Avatar>
                  <span className="flex flex-col">
                    <span className="font-medium text-foreground">{user.name}</span>
                    <span className="text-muted-foreground text-xs">{user.email}</span>
                  </span>
                </ComboboxItem>
              )}
            </ComboboxCollection>
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    </div>
  );
};

export default ComboboxUserDemo;
